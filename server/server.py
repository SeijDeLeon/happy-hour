from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson.json_util import dumps, loads

app = Flask(__name__)

client = MongoClient('localhost',27017)

db = client.flask_db

todos = db.todos

restaurants = db.restaurants

def format_id(data):
   #data must be a list of mongodb search results, list(results)
   #Mongodb searches return an '_id' key with a value that cannot be JSONIFIED
   #This function overwrites the '_id' value for a single data element into a string
   for i in data:
    i['_id'] = str(i['_id'])
   return data

@app.route("/", methods=('GET', 'POST'))
def hello_world():
    if request.method =='POST':
        todos.insert_one({'content': 'dog', 'type': 'animal'})
        return "<p>inserted with POST</p>"
    else:
      return "<p>used get</p>"

@app.route("/restaurants", methods=('GET', 'POST'))
def index():
    if request.method == 'POST':
        try:
          content = request.get_json(silent=False)
          try:
             restaurants.insert_one(content)
          except:
             response = {'error': 'failed to insert data into mongodb'}
             code = 500
        except:
           response, code = {'error': 'invalid body type, expected json'}, 400
        response, code = {"success": 'posted the restaurant review'}, 201
    elif request.method == 'GET':
      cursor = restaurants.find()
      results = format_id(list(cursor))
      response, code = jsonify(results), 200
      response.headers.add('Access-Control-Allow-Origin', '*')
    else:
       response, code = {'error': 'expected GET or POST method'}, 405

    content_type = {'ContentType':'application/json'}
    return response, code, content_type