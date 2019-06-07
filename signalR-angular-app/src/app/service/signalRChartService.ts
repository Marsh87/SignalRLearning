
import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { ChartModel } from '../models/chart-model';
import { GraphModel } from '../models/graph-model';

@Injectable({
  providedIn: 'root'
})
export class SignalRChartService {
  public data: GraphModel;

private hubConnection: signalR.HubConnection;

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl('http://localhost:58283/chartHub')
                            .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));
  }

  public addTransferChartDataListener = () => {
    this.hubConnection.on('transferchartdata', (data) => {
      this.data = new GraphModel();
      this.data.yData = data.yData;
      this.data.xData = data.xData;
    });
  }
}
