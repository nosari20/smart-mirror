<template>
    <div class="weather-component">
        <header>
            <div class="time">{{data.info.time.h}}:{{data.info.time.m}}</div>
            <div class="date">{{data.info.date}}</div>
            <div class="local">{{data.info.local}}</div>
            
        </header>
        <div class="current">
            <div class="condition"><i :class="'wi '+ FONT_MAPPING[this.data.current.condition]"></i></div>
            <div class="temp">{{this.data.current.temp}}°C</div>
            <div class="how-high">
                <div>{{this.data.current.low}}°C</div>
                <div>{{this.data.current.high}}°C</div>
            </div>
        </div>
        <div class="forecast">
            <ol>
                <li>
                    <div class="condition"><i :class="'wi '+ FONT_MAPPING[this.data.forecast[0].condition]"></i></div>
                    <div class="temp">{{this.data.forecast[0].low}}°C</div>
                    <div class="temp">{{this.data.forecast[0].high}}°C</div>
                </li>

                <li>
                    <div class="condition"><i :class="'wi '+ FONT_MAPPING[this.data.forecast[1].condition]"></i></div>
                    <div class="temp">{{this.data.forecast[1].low}}°C</div>
                    <div class="temp">{{this.data.forecast[1].high}}°C</div>
                </li>
            </ol>
        </div>
    </div>
</template>

<script  lang="ts">
import Vue = require('vue');
import Component from 'vue-class-component'
import WeatherService from '../services/WeatherService';


@Component()
export default class Weather extends Vue {
    name: string =  'weather';

        
    FONT_MAPPING : any = {
        0  :  'wi-tornado',
        1  :  'wi-storm-showers',
        2  :  'wi-hurricane',
        3  :  'wi-hurricane',
        4  :  'wi-hurricane',
        5  :  'wi-rain-mix',
        6  :  'wi-sleet',
        7  :  'wi-sleet',
        8  :  'wi-raindrops',
        9  :  'wi-raindrops',
        10  :  'wi-rain',
        11  :  'wi-showers',
        12  :  'wi-showers',
        13  :  'wi-snow',
        14  :  'wi-snow',
        15  :  'wi-snow-wind',
        16  :  'wi-snow',
        17  :  'wi-hail',
        18  :  'wi-sleet',
        19  :  'wi-dust',
        20  :  'wi-fog',
        21  :  'wi-day-haze',
        22  :  'wi-smoke',
        23  :  'wi-strong-wind',
        24  :  'wi-windy',
        25  :  'wi-snowflake-cold',
        26  :  'wi-cloudy',
        27  :  'wi-night-alt-cloudy',
        28  :  'wi-day-cloudy',
        29  :  'wi-night-partly-cloudy',
        30  :  'wi-day-sunny-overcast',
        31  :  'wi-night-clear',
        32  :  'wi-day-sunny',
        33  :  'wi-night-clear',
        34  :  'wi-day-sunny',
        35  :  'wi-hail',
        36  :  'wi-hot',
        37  :  'wi-hurricane',
        38  :  'wi-hurricane',
        39  :  'wi-hurricane',
        40  :  'wi-showers',
        41  :  'wi-snow',
        42  :  'wi-snow',
        43  :  'wi-snow',
        44  :  'wi-cloudy',
        45  :  'wi-hurricane',
        46  :  'wi-snow',
        47  :  'wi-storm-showers',
        3200 :  'wi-na'

    };

    service : WeatherService = new WeatherService();


    // displayed data
    data : any = {
        info: {
            local: "",
            date: ""
            time: {
                h: 0,
                m: 0
            }
        },
        current: {
            condition : 3200,
            temp : 0,
            high : 0,
            low: 0,
        },
        forecast : [
            {
                condition : 3200,
                high : 0,
                low: 0
            },
            {
                condition : 3200,
                high : 0,
                low: 0
            }

        ]
    }

    mounted(){
        this.load();
        setInterval(this.load(), 10);
        setInterval(() => {
            this.data.info.time = this.time();
        },1000);


    }

    load(){
        
        this.service.search('Villers-Les-Nancy, Lorraine, FR').then(

            response => {
                // success callback
                console.log(response.data)
                if(response.data.query.results){


                    this.data.info.local = response.data.query.results.channel.location.city;
                    this.data.info.date = this.dateFr();


                    let local = response.data.query.results.channel.item;




                    this.data.current.condition = local.condition.code;
                    this.data.current.temp = local.condition.temp;
                    this.data.current.low = local.forecast[0].low;
                    this.data.current.high = local.forecast[0].high;

                    for(let i = 1; i <= 2; i++){
                        this.data.forecast[i-1].condition = local.forecast[i].code;
                        this.data.forecast[i-1].low = local.forecast[i].low;
                        this.data.forecast[i-1].high = local.forecast[i].high;
                    }
                                        
                }
                
            },

            error => {
                // error callback
                console.log(error)
            }
        );

    }

    dateFr() : string
    {
        var jours = new Array("dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi");
        var mois = new Array("janvier", "fevrier", "mars", "avril", "mai", "juin", "juillet", "aout", "septembre", "octobre", "novembre", "decembre");
        var date = new Date();
        var message = jours[date.getDay()] + " ";
        message += date.getDate() + " ";
        message += mois[date.getMonth()] + " ";
        message += date.getFullYear();
        return message;
    }

    time() : string
    {
        var date = new Date();
        var h = date.getHours();
        var m = date.getMinutes();
        if(m < 10)
            m = "0" + m;
        return {
            h: h,
            m: h
        }
    }
}

</script>

<style scoped lang="sass">
    .weather-component{
        display: flex;
        flex: 1;
        flex-direction: column;


        div{
            flex: 1;
        }

        .current{


            .condition{
                padding: 5px 5px 1em 5px;

                i{
                    font-size: 5em;
                }
            }

            .temp{
                font-size : 3em;
            }

            .how-high{
               font-size : 1em; 
            }
        }

        .forecast{
            font-size: 1.5em;
            ol{
                list-style: none;
                display: flex;
                flex-direction: row;
                padding: 0;
                align-items: center;

                li{
                    display: flex;
                    flex: 1;
                    flex-direction: column;
                    margin: 0;

                    .condition{
                        padding: 5px 5px 1em 5px;

                        i{
                            font-size: 2em;
                        }
                    }

                    .temp{
                        font-size : 1em;
                    }
                }
            }
        }
    }
</style>