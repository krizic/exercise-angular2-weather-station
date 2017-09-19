import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

import { LoginService } from '../api/login_service/login.service';
import { DashboardService } from '../api/dashboard_service/dashboard.service';
import { HeaderService } from '../api/header_service/header.service';
import { WeatherClass } from '../api/Classes/weather';
import { UserClass } from '../api/Classes/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  currentUser: UserClass;
  email = 'anonymous@gmail.com';
  history: string[] = this.login.getCurrentUser().history;
  currentWeather: WeatherClass;
  temperature: any;

  constructor(private login: LoginService,
              private dashboard: DashboardService,
              private header: HeaderService,
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
        this.currentWeather = new WeatherClass(   weatherCity.location.city + ', ' + weatherCity.location.country,
                                                  this.temperature,
                                                  weatherCity.item.condition.text,
                                                  weatherCity.atmosphere.humidity,
                                                  weatherCity.wind.speed);
    });

    this.dashboard.addToHistory(location);
    this.currentUser = this.login.getCurrentUser();
    this.history = this.currentUser.history;
  }
}
