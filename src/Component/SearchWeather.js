import React, { useEffect, useState } from 'react'
import { BsCloudy } from 'react-icons/bs'
import { BsSearch } from 'react-icons/bs'

const SearchWeather = () => {
    
    const [city, setCity] = useState(null);
    const [search, setSearch] = useState("london");
    const [input, setInput] = useState("");
    
    let componentMounted =true;
    let api_key = "8996cd31837c1b752fc554860d835272";

    useEffect(() => {
        const fetchWeather = async () => {
        //    const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${api_key}`;
           try{
            const url = `https://api.weatherapi.com/v1/current.json?key=e5ebb935d2e544cabb963959232509&q=${search}&aqi=no`
           const res = await fetch(url);
           if(!res.ok){
            throw new Error('Location Not Found')
            
           }
           const resJson = await res.json();
           console.log(resJson)
           setCity(resJson)
           console.log(city)
           console.log(city?.current?.temp_c)
           }
           catch(error){
            console.log(error);
            alert(error?.message)
            
           }
        }
        fetchWeather();
    }, [search])

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearch(input);
    }
    return (
        <div>
            <div className='container mt-5'>
                <div className='row justify-content-center'>
                    <div className='col-md-4'>
                        <div className='card text-white text-center border-0'>
                            <img src='https://images.unsplash.com/photo-1414609245224-afa02bfb3fda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60' className='card-img' alt='' />
                            <div className='card-img-overlay'>
                                <form>
                                    <div className='input-group mb-4 w-75 mx-auto'>
                                        <input type='search' className='form-control' id='sarch-field' placeholder='Enter location....' aria-label='serach city' aria-describedby='basic-addon2' onChange={(e) => {setInput(e.target.value)}} required/>
                                        <button type='submit' className='input-group-text' id='basic-addon2'>
                                            <BsSearch onClick={handleSubmit} />
                                        </button>
                                    </div>
                                </form>
                               {!city?"NO DATA FOUND":
                               (
                                <div className='bg-dark bg-opacity-50 py-5 mt-5'>
                                    <h2 className='card-title'>{city?.location.name}</h2>
                                    <hr />
                                    <div className='temp-detail'>
                                    <h1 className='lead fw-bolder mb-0'>{city?.current?.condition?.text}</h1>
                                    <span>|</span>
                                    <h1 className='lead fw-bolder mb-0'><img src={city?.current?.condition?.icon}/></h1>
                                    </div>
                                    <h1 className='fw-bolder mt-4 mb-4'>{city?.current?.temp_c}<span>&deg;</span>C</h1>
                                    <h4>Humidity : <span className='card-text lead mt-5 mb-4'>{city?.current?.humidity}%</span></h4>
                                    <h4><span className='card-text lead mt-7'>{city?.location?.localtime}</span></h4>
                              
                                </div>
                               )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchWeather
