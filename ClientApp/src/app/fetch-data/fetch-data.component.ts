import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConditionCode, ConditionCodesService } from '../data/condition-codes.service';
import { StateCode, StateCodesService } from '../data/state-codes.service';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public forecasts: WeatherForecast[];

	constructor(http: HttpClient, private readonly cc: ConditionCodesService, private readonly sc: StateCodesService, @Inject('BASE_URL') baseUrl: string) {
    http.get<WeatherForecast[]>(baseUrl + 'weatherforecast').subscribe(result => {
      this.forecasts = result;
	}, error => console.error(error));

		cc.allConditionCodes().subscribe(result => {
			console.log("the condition codes: %o", result);
		}, error => console.error(error));

		sc.allStateCodes().subscribe(result => {
			console.log("the state codes: %o", result);
		}, error => console.error(error));
  }
}

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
