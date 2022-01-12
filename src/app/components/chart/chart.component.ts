import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MyPoll } from 'src/app/interfaces/my-poll';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges {
  basicData: any;
  basicOptions: any;
  
  @Input() myPoll: MyPoll | undefined;

  constructor() { }

  get pollDetail() {
    const { question, options = [] } = this.myPoll || {};
    return {question, options};
  }

  ngOnInit(): void {
    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#000'
          }
        }
        },
        scales: { 
          x: {
            ticks: {
              color: '#000'
            },
            grid: {
              color: 'rgba(255,255,255,0.8)'
            }
          },
          y: {
            ticks: {
              color: '#000'
            },
            grid: {
              color: 'rgba(255,255,255,0.8)'
            }
          }
        }
      };
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && this.myPoll) {
      this.setChart();
    }
  }

  setChart() {
    const { question, options } = this.pollDetail;

    this.basicData = {
      labels: [],
      datasets: [
        {
          label: '',
          backgroundColor: [ '#42A5F5'],
          data: []
        }
      ]
    };

    this.basicData.datasets[0].label = question;
    for(const option of options) {
      this.basicData.labels.push(option.label);
      this.basicData.datasets[0].data.push(option.vote);
    }
  }

}
