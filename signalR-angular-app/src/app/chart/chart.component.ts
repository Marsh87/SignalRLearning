import { Component, OnInit } from '@angular/core';
import { SignalRChartService } from '../service/signalRChartService';
import { HttpClient } from '@angular/common/http';
import { BaseChartDirective } from 'ng2-charts-x';
import { ChartModel } from '../models/chart-model';
import { GraphModel } from '../models/graph-model';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  graphData: GraphModel;
  public chartOptions: any = {
    scaleShowVerticalLines: true,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

  public chartLabels: string[] = ['Real time data for the chart'];
  public chartType = 'bar';
  public chartLegend = true;

  public colors: any[] = [
  { backgroundColor: '#5491DA' },
  { backgroundColor: '#E74C3C' },
  { backgroundColor: '#82E0AA' },
  { backgroundColor: '#E5E7E9' }
];

  // lineChart
  public label = 8;
  public a = 0;
  public lineChartOptions: any = {
    responsive: true,
    scales : {
    yAxes: [{
       ticks: {
        //  steps : 25,
        //  stepValue : 15,
        //  max : 40,
          min : 0,
        }
    }]
  }
  };

  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  // public lineChartLegend: boolean = true;
  public lineChartType = 'line';

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  constructor(public signalRChartService: SignalRChartService, private http: HttpClient ) { }

  ngOnInit() {
    this.signalRChartService.startConnection();
    this.signalRChartService.addTransferChartDataListener();
    this.startHttpRequest();
  }

  private startHttpRequest = () => {
    this.http.get('http://localhost:58283/api/chart')
      .subscribe(res => {
        console.log(res);
      });
  }
}
