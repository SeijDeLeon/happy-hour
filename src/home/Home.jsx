import formatTime from '../utility/formatTime.js';
import fetchSet from '../utility/fetchSet.js';
import { useState, useEffect } from 'react';
import pic1 from './food1.png';
import pic2 from './food2.png';
import pic3 from './food3.png';
const pics = [pic1, pic2, pic3]; //TODO change this to get links



//const filledStar = <img width="48" height="48" src="https://img.icons8.com/fluency-systems-filled/48/star.png" alt="star"/>;
//const emptyStar = <img width="48" height="48" src="https://img.icons8.com/fluency-systems-regular/48/star--v1.png" alt="star--v1"/>;
//const foodIcon = <img width="50" height="50" src="https://img.icons8.com/ios/50/meal.png" alt="meal"/>;
//const drinkIcon = <img width="50" height="50" src="https://img.icons8.com/ios/50/cocktail.png" alt="cocktail"/>;

const filledStar = "https://img.icons8.com/fluency-systems-filled/48/star.png";
const emptyStar = "https://img.icons8.com/fluency-systems-regular/48/star--v1.png";
const foodIcon = "https://img.icons8.com/ios/50/meal.png";
const drinkIcon = "https://img.icons8.com/ios/50/cocktail.png";
const priceTag = "https://img.icons8.com/badges/48/sale-price-tag.png";



function Home() {
  useEffect(()=> {
    fetchSet('http://127.0.0.1:5000/restaurants', setData);
  },[])

  const [data, setData] = useState([]);

  const Search = () => {
    return (
      <div className="bg-yellow-50 sm:w-full md:w-2/12">
        <h2>Search Parameters</h2>
      </div>
    )
  }

  const Results = () => {

    return(
      <div className='bg-red-50 h-[50vh] md:overflow-hidden overflow-scroll md:h-auto sm:w-full md:w-6/12 grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2 gap-y-8'>
        {data.map((rest) => <SmallItem key={rest._id} rest={rest}/>)}
      </div>
    )
  }

  const Restaurant = () => {
    return (
        <div className="bg-orange-50 sm:w-full md:w-4/12">
          <h2>Single Restaurant</h2>
        </div>
      )
  }

  const SmallItem = ({rest}) => {
    var days = '';
    if (rest.days.length > 1) {
      days = rest.days[0].substr(0, 3).concat('-', rest.days[rest.days.length-1].substr(0, 3))
    } else {
      days = rest.days[0].substr(0, 3);
    }

    //format hours
    var hours = `${formatTime(rest.hours.start)}-${formatTime(rest.hours.stop)}`;

    return(
      <div key={rest._id} className='w-full h-60 md:h-80 md:border-solid md:rounded-lg md:border md:border-slate-200 max-w-80'>
        <div className="h-2/5 md:h-3/5 flex justify-around items-center md:block">
          <img className="h-20 md:h-full md:w-full md:object-cover rounded-lg md:rounded-b-none" src={pics[0]} alt="food"/>
          <img className=" h-20 md:hidden" src={pics[1]} alt="food"/>
          <img className=" h-20 md:hidden" src={pics[2]} alt="food"/>
        </div>
        <div className="h-3/5 md:h-2/5">
          <h2 className="md:h-1/6 text-left md:text-center font-bold">{rest.name}</h2>
          <div className='h-1/6 flex justify-center '>
            {rest.drinks === 'True' ? <img className="" src={drinkIcon} alt="drink" /> : ''}
            {rest.food === 'True' ? <img className="" src={foodIcon} alt="food" /> : ''}
            <img className="pl-4" src={filledStar} alt ="filled star" />
            {rest.ranking > 1 ? <img className="" src={filledStar} alt ="filled star" /> : <img className="" src={emptyStar} alt ="empty star" />}
            {rest.ranking > 2 ? <img className="" src={filledStar} alt ="filled star" /> : <img className="" src={emptyStar} alt ="empty star" />}
          </div>
          <div className='h-1/6'><p className="text-sm text-slate-600 font-medium">{days} {hours}</p></div>
          <div className='h-1/2 pt-2 flex'>
            <div className='w-1/6'>
              <img className='h-6 float-right pr-2' src={priceTag} alt="discount tag" />
            </div>
            <p className='w-5/6 text-left text-slate-500 leading-none'>{rest.deal}</p>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="flex flex-col md:flex-row h-full">
      <Search />
      <Results />
      <Restaurant />
    </div>
  );
}

export default Home;