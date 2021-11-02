import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from 'moment';

import * as config from '../../config'
import "./styles.css";

class CityTemp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            weatherData: null,
            dataReady:false,
            weatherList:[],
            selectedData:{ 
                cityname : "",
                futuredays : []
            },
            cityNotSelected:true
        };
    }

    componentDidMount() {
        if(this.props.cityNameToGetTemp !== ""){
            this.getWeather()
        }
    }
    // await fetch(`${config.WEATHER_APP_API_URL}/weather/?q=Gaza&appid=${config.WEATHER_APP_API_KEY}`)
    // await fetch(`https://api.openweathermap.org/data/2.5/weather/?q=Gaza&appid=${config.WEATHER_APP_API_KEY}`)
    // await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=München,DE&appid=${config.WEATHER_APP_API_KEY}`)

    async getWeather(){
        // await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=München&appid=${config.WEATHER_APP_API_KEY}`)
        // await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Gaza&appid=${config.WEATHER_APP_API_KEY}`)
        // await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=London&appid=${config.WEATHER_APP_API_KEY}`)
        await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${this.props.cityNameToGetTemp}&appid=${config.WEATHER_APP_API_KEY}`)
        .then(res => res.json())
        .then(result => {
            this.setState({weatherData:result,dataReady:true,weatherList:result.list,cityNotSelected:false})
            // console.log(result);
            this.getdataReady()
        })
    }

    getdataReady(){
        var i;
        var days = [];
        var list = this.state.weatherList
        for(i = 0; i < list.length; i+=8) { 
            var temp = [];
            
            temp.push(new Date(list[i+5].dt_txt));
            const maxTemp = this.findMax(list, i);
            temp.push(maxTemp);
            temp.push(list[i].weather[0].main);
            temp.push(list[i+3].weather[0].description);
            temp.push(list[i].weather[0].icon);
            days.push(temp);
        }
        this.setState({selectedData:{ 
            cityname : 'name',
            futuredays : days
        }})
    }

    findMax(weatherList, start){ 
        var i; 
        var max = 0;
        for(i = start; i < start+8; i++) { 
            max = Math.max(max, weatherList[i].main.feels_like);
        }
        max = ((max * 9/5) - 459.67).toFixed(1);
        return max;
    }

    findMin(weatherList, start){ 
        var i; 
        var min = 0;
        for(i = start; i < start+8; i++) { 
            min = Math.min(min, weatherList[i].main.feels_like);
        }
        min = ((min * 9/5) - 459.67).toFixed(1);
        return min;
    }

    render() {
        return (
        <>
        {
            this.state.dataReady &&
            <div id="game-cards" className="row">
                {(this.state.selectedData.futuredays).map(function(anObjectMapped, index){
                    return (
                        <div key={index} className="col-3 g-card" style={{backgroundColor:'white'}}>
                            
                            <div>
                                {/* <h6>{JSON.stringify(anObjectMapped[0])}</h6> */}
                                <h4>{moment(anObjectMapped[0]).format('dddd')}</h4>
                                <h4>{moment(anObjectMapped[0]).format('MM/DD/YYYY')}</h4>

                                <div>
                                    <img className="img-fluid" 
                                        src={`http://openweathermap.org/img/wn/${anObjectMapped[4]}@2x.png`}
                                        alt="new"
                                    />
                                </div>

                                <h3 className='title'>{anObjectMapped[1]} F</h3>
                                <h3 className='title'>{anObjectMapped[2]}</h3>
                                <h3 className='title'>{anObjectMapped[3]}</h3>
                            </div>
                        </div>
                    );
                })}
            </div>
        }
        {
            !this.state.dataReady &&
            <div id="list">
                <h1>Waiting</h1>
            </div>
        }
        </>
        );
    }
}

const stateToProps = (state) => {
    return {
      cityNameToGetTemp: state.cityTemp.cityName,
    };
};

const dispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            setCityName: (cityName) => {
                return { type: "CHANGE_CITY_NAME", payload: cityName };
            },
        },
        dispatch
    );
};

export default connect(stateToProps, dispatchToProps)(CityTemp);