export default async function fetchSet(url=false, cb=false){
  if (url===false) return false;
  try {
    const response = await fetch(url);
    const responseJSON = await response.json();
    if (cb!== false) cb(responseJSON);
    return true;
  } catch(error) {
    console.log('error in fetchSet' + error);
    return false;
  }
}