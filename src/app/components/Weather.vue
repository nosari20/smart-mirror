<template>
    <div>
        Weather
        <i :class="'wi '+ FONT_MAPPING[condition]"></i>
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

    condition : int = 3200;


    mounted(){
        
        this.service.search('Villers-Les-Nancy, Lorraine, FR').then(

            response => {
                // success callback
                console.log(response.data)
                if(response.data.query.results){
                    let local = response.data.query.results.channel.item;

                    this.condition = local.condition.code;

                    console.log(this.FONT_MAPPING[this.condition]);
                    console.log(this.FONT_MAPPING);
                    



                    
                }
                
            },

            error => {
                // error callback
                console.log(error)
            }
        );

    }
}

</script>

<style scoped>

</style>