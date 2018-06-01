import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  id = 'chart1';
  width = 800;
  height = 400;
  type = 'column2d';
  dataFormat = 'json';
  dataSource;
  title = 'Angular4 FusionCharts Sample';
  constructor(private router: Router, private user: UserService) {
      this.chart();
   }

  ngOnInit() {
  }

  chart() {
      this.dataSource = {
          'chart': {
              'caption': 'Harrys SuperMart',
              'subCaption': 'Top 5 stores in last month by revenue',
              'numberprefix': '#',
              'theme': 'ocean'
          },
          'data': [
              {
                  'label': 'Lagos',
                  'value': '880000'
              },
              {
                  'label': 'Abuja',
                  'value': '730000'
              },
              {
                  'label': 'Enugu',
                  'value': '590000'
              },
              {
                  'label': 'Jos',
                  'value': '520000'
              },
              {
                  'label': 'Ogun',
                  'value': '330000'
              }
          ]
      };
  }



}
