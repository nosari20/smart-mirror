import axios from 'axios';

export default class WeatherService {

    constructor(){}

    URL: string = 'https://query.yahooapis.com/v1/public/yql';
    FORMAT: string = 'json';


    private constructURL(str : string) : string{
        return encodeURI(this.URL+'?'+str+'&format='+this.FORMAT);
    }
    

    search(location: string) : Promise<any> {

        return axios.get(this.constructURL('q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="'+location+'")'));
    }



}