import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

import { UserAuthenticationService } from '../api/UserAuthentication_service/UserAuthentication.service';
import { WeatherAPIService } from '../api/WeatherAPI_service/WeatherAPI.service';
import { ChangeScaleService } from '../api/ChangeScale_service/ChangeScale.service';
import { Weather } from '../api/Classes/weather';
import { User } from '../api/Classes/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  currentUser: User;
  email = 'anonymous@gmail.com';
  history: string[] = this.login.getCurrentUser().history;
  currentWeather: Weather;
  temperature: any;

  constructor(private login: UserAuthenticationService,
              private dashboard: WeatherAPIService,
              private header: ChangeScaleService,
              private http: Http) {}

  ngOnInit() {
    this.currentUser = this.login.getCurrentUser();
    this.history = this.currentUser.history;
    this.email = this.login.getCurrentUser().email;
  }

  weather() {
    return this.currentWeather == null ? false : true;
  }

  showWeather(e, location) {

    const apiString = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20'
    + 'where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22'
    + location
    + '%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';

    this.http.get(apiString)
      .subscribe(
      (res: Response) => {
        const weatherCity = res.json().query.results.channel;
        this.temperature = this.dashboard.convertTemperature(weatherCity.item.condition.temp);
        this.currentWeather = new Weather(   weatherCity.location.city + ', ' + weatherCity.location.country,
                                                  this.temperature,
                                                  weatherCity.item.condition.text,
                                                  weatherCity.atmosphere.humidity,
                                                  weatherCity.wind.speed);
    });

    this.dashboard.saveLocation(location);
    this.currentUser = this.login.getCurrentUser();
    this.history = this.currentUser.history;
  }
}
