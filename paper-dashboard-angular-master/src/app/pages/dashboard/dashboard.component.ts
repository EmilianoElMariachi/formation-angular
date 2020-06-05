import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Statistique } from 'app/shared/models/Statistique';
import { Appreciation } from 'app/shared/models/Appreciation';

import Chart from 'chart.js';
import { StatService } from 'app/shared/services/stat.service';
import { AppreciationToColorPipe } from 'app/shared/pipes/appreciation-to-color.pipe';

@Component({
  selector: 'dashboard-cmp',
  templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {

  public tabStats:Statistique[];
  public canvas: any;
  public ctx;
  public chartColor;
  public chartEmail;
  public chartHours;

  public editMode:boolean = false;
  public editedStat:Statistique;

  constructor(private statService : StatService) { }

  ngOnInit() {
    this.statService.getAllStats().then(
      (res : Statistique[]) => {
        this.tabStats = res;
      }
    );


    this.initCharts();

    setTimeout(() => {
      this.chartHours.data.datasets.forEach((dataset) => {
        dataset.data[1] = 500;
      });
      this.chartHours.update();
    }, 5000);
  }

  /* -------------------------------- */
  /* EVENEMENTS COMPOSANT FORMULAIRE */
  /* -------------------------------- */  

  /* Demande d'annulation de mise à jour */
  cancelEdit() {
    this.editMode = false;
  }
  
  /* Demande de création de stat */
  addStat(stat: Statistique) {
    this.statService.addStat(stat).then(
      statistique => {
        this.tabStats.push(statistique);}
    );
  }

  /* Demande de validation d'une mise à jour */
  saveUpdate(stat: Statistique) {
    this.statService.updateStat(stat).then(
      res => {
        let index = this.tabStats.findIndex(stat => stat.getId() == res.getId());
        this.tabStats[index].setAppreciation(res.getAppreciation());
        this.tabStats[index].setIntitule(res.getIntitule());
        this.tabStats[index].setIcone(res.getIcone());
        this.tabStats[index].setValeur(res.getValeur());
      }
    );
    this.editMode = false;
  }

  /* -------------------------------- */
  /* EVENEMENTS COMPOSANT STATISTIQUE */
  /* -------------------------------- */

  /* Demande de suppression d'une statistique*/
  deleteStat(stat: Statistique) {
    this.statService.removeStat(stat).then(
      (res:any) => {
        let index = this.tabStats.findIndex(stat => stat.getId() == res.id);
        this.tabStats.splice(index, 1);
      }
    );
  }

  /* Demande de mise à jour d'une statistique */
  updateStat(stat: Statistique) {
    this.editMode = true;
    this.editedStat = stat;
  }

  /* Demande de refresh d'une statistique */
  refreshStatistique(stat: Statistique) {
    this.statService.getStat(stat.getId()).then(
      res => {
        let index = this.tabStats.findIndex(stat => stat.getId() == res.getId());
        this.tabStats[index].setAppreciation(res.getAppreciation());
        this.tabStats[index].setIntitule(res.getIntitule());
        this.tabStats[index].setIcone(res.getIcone());
        this.tabStats[index].setValeur(res.getValeur());
      }
    );
  }

  initCharts() {
    
    this.chartColor = "#FFFFFF";

    this.canvas = document.getElementById("chartHours");
    this.ctx = this.canvas.getContext("2d");

    this.chartHours = new Chart(this.ctx, {
      type: 'line',

      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
        datasets: [{
          borderColor: "#6bd098",
          backgroundColor: "#6bd098",
          pointRadius: 0,
          pointHoverRadius: 0,
          borderWidth: 3,
          data: [300, 310, 316, 322, 330, 326, 333, 345, 338, 354]
        },
        {
          borderColor: "#f17e5d",
          backgroundColor: "#f17e5d",
          pointRadius: 0,
          pointHoverRadius: 0,
          borderWidth: 3,
          data: [320, 340, 365, 360, 370, 385, 390, 384, 408, 420]
        },
        {
          borderColor: "#fcc468",
          backgroundColor: "#fcc468",
          pointRadius: 0,
          pointHoverRadius: 0,
          borderWidth: 3,
          data: [370, 394, 415, 409, 425, 445, 460, 450, 478, 484]
        }
        ]
      },
      options: {
        legend: {
          display: false
        },

        tooltips: {
          enabled: false
        },

        scales: {
          yAxes: [{

            ticks: {
              fontColor: "#9f9f9f",
              beginAtZero: false,
              maxTicksLimit: 5,
              //padding: 20
            },
            gridLines: {
              drawBorder: false,
              zeroLineColor: "#ccc",
              color: 'rgba(255,255,255,0.05)'
            }

          }],

          xAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(255,255,255,0.1)',
              zeroLineColor: "transparent",
              display: false,
            },
            ticks: {
              padding: 20,
              fontColor: "#9f9f9f"
            }
          }]
        },
      }
    });


    this.canvas = document.getElementById("chartEmail");
    this.ctx = this.canvas.getContext("2d");
    this.chartEmail = new Chart(this.ctx, {
      type: 'pie',
      data: {
        labels: [1, 2, 3],
        datasets: [{
          label: "Emails",
          pointRadius: 0,
          pointHoverRadius: 0,
          backgroundColor: [
            '#e3e3e3',
            '#4acccd',
            '#fcc468',
            '#ef8157'
          ],
          borderWidth: 0,
          data: [342, 480, 530, 120]
        }]
      },

      options: {

        legend: {
          display: false
        },

        pieceLabel: {
          render: 'percentage',
          fontColor: ['white'],
          precision: 2
        },

        tooltips: {
          enabled: false
        },

        scales: {
          yAxes: [{

            ticks: {
              display: false
            },
            gridLines: {
              drawBorder: false,
              zeroLineColor: "transparent",
              color: 'rgba(255,255,255,0.05)'
            }

          }],

          xAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(255,255,255,0.1)',
              zeroLineColor: "transparent"
            },
            ticks: {
              display: false,
            }
          }]
        },
      }
    });

    var speedCanvas = document.getElementById("speedChart");

    var dataFirst = {
      data: [0, 19, 15, 20, 30, 40, 40, 50, 25, 30, 50, 70],
      fill: false,
      borderColor: '#fbc658',
      backgroundColor: 'transparent',
      pointBorderColor: '#fbc658',
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8,
    };

    var dataSecond = {
      data: [0, 5, 10, 12, 20, 27, 30, 34, 42, 45, 55, 63],
      fill: false,
      borderColor: '#51CACF',
      backgroundColor: 'transparent',
      pointBorderColor: '#51CACF',
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8
    };

    var speedData = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [dataFirst, dataSecond]
    };

    var chartOptions = {
      legend: {
        display: false,
        position: 'top'
      }
    };

    var lineChart = new Chart(speedCanvas, {
      type: 'line',
      hover: false,
      data: speedData,
      options: chartOptions
    });
  }
}
