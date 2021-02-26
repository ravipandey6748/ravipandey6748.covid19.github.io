import { Component, OnInit, Input } from '@angular/core';
import { DataServiceService } from '../services/data-service.service';
import { GlobalDataSummary } from '../models/global-data'
import { increaseData } from '../models/increase';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, SingleDataSet, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data: GlobalDataSummary[] = [];
  daily: increaseData[] = [];

  constructor(private dataService: DataServiceService) { 
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartColors: Array < any > = [{
    backgroundColor: ['#ff4d4d', '#ff8c1a', '#66ff99']
   
 }];


  
  active = [];
  deaths = [];
  confirmed = [];
  recovered = [];
  date = [];
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [

  ];
  public pieChartLabels: Label[] = [['Active'], ['Deaths'], ['Recovered']];
  public pieChartData:SingleDataSet  = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];


  ngOnInit(): void {
    this.dataService.getGlobalData().subscribe(result => {
      //console.log(result);
      this.data = result.statewise;

      console.log(this.data);
      
    this.pieChartData=[+(this.data[0].active),+(this.data[0].deaths),+(this.data[0].recovered)];
      

    });
    this.dataService.getGlobalData().subscribe(result => {
      //console.log(result);
      this.daily = result.cases_time_series;
      console.log(this.daily)
      for (let i = 0; i <= this.daily.length; i++) {

        this.recovered.push(this.daily[i].dailyrecovered);
        this.confirmed.push(this.daily[i].dailyconfirmed);
        this.deaths.push(this.daily[i].dailydeceased);
        this.date.push(this.daily[i].date);
      }
      console.log(this.daily);
    });
   
    this.barChartData = [
      { data: this.confirmed, label: 'Active', stack: 'a' },
      { data: this.recovered, label: 'Recovered', stack: 'a' },
      { data: this.deaths, label: 'Deaths', stack: 'a' },

    ];
    this.barChartLabels = this.date;

  }



}
