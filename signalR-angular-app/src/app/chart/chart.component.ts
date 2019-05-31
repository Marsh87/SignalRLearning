import { Component, OnInit } from '@angular/core';
import { SignalRChartService } from '../service/signalRChartService';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

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

  constructor(public signalRChartService: SignalRChartService, private http: HttpClient ) { }

  ngOnInit() {
    this.signalRChartService.startConnection();
    this.signalRChartService.addTransferChartDataListener();
    this.startHttpRequest();
    console.log(this.signalRChartService.data);
  }

  private startHttpRequest = () => {
    this.http.get('http://localhost:58283/api/chart')
      .subscribe(res => {
        console.log(res);
      });
  }
}
