import { Component, OnInit, OnDestroy} from '@angular/core';
import { Statistique } from 'app/shared/models/Statistique';

import Chart from 'chart.js';
import { StatService } from 'app/shared/services/stat.service';
import { AppTranslateService } from 'app/shared/services/app-translate-service';
import { WebSocketService } from 'app/shared/services/web-socket.service';
import { MessageType } from 'app/shared/models/ServerMessage';
import { AppToastService } from 'app/shared/services/app-toast-service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'dashboard-cmp',
  templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit, OnDestroy {

  public tabStats: Statistique[];
  public canvas: any;
  public ctx;
  public chartColor;
  public chartEmail;
  public chartHours;

  public editMode: boolean = false;
  public editedStat: Statistique;
  private subscription: Subscription;
  
  constructor(private statService: StatService,
    private wsService: WebSocketService,
    private translator: AppTranslateService,
    private toastService: AppToastService) { }

  ngOnInit() {
    if (!this.subscription) {
      this.subscription = this.wsService.getServerObservable().subscribe(
        message => {
          switch (message.type) {
            case MessageType.NEW_DATA: this.handleNewStat(message.objectRef, true); break;
            case MessageType.DELETED_DATA: this.handleDeletedStat(message.objectRef.getId(), true); break;
            case MessageType.UPDATED_DATA: this.handleUpdatedStat(message.objectRef, true); break;
          }
        }
      );
    }

    this.statService.getAllStats().then(
      (res: Statistique[]) => {
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

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
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
        this.handleNewStat(statistique, false);
        this.toastService.showSuccess(this.translator.instant('pages.dashboard.save_success'));
      }
    );
  }

  handleNewStat(newStat: Statistique, displayToast: boolean) {
    let index = this.tabStats.findIndex(stat => stat.getId() == newStat.getId());
    if (index == -1) {
      this.tabStats.push(newStat);
      if (displayToast) {
        this.toastService.showInfo(this.translator.instantWithValues('pages.dashboard.incoming_stat', { title: newStat.getIntitule() }));
      }      
    }
  }

  /* Demande de validation d'une mise à jour */
  saveUpdate(stat: Statistique) {
    this.statService.updateStat(stat).then(
      res => {
        this.handleUpdatedStat(res, false);
        this.toastService.showSuccess(this.translator.instant('pages.dashboard.update_success'));
      }
    );
    this.editMode = false;
  }

  handleUpdatedStat(updatedStat: Statistique, displayToast: boolean) {
    let index = this.tabStats.findIndex(stat => stat.getId() == updatedStat.getId());
    if (index != -1) {
      let hasChange: boolean;
      hasChange = JSON.stringify(this.tabStats[index]) != JSON.stringify(updatedStat);

      this.tabStats[index].setAppreciation(updatedStat.getAppreciation());
      this.tabStats[index].setIntitule(updatedStat.getIntitule());
      this.tabStats[index].setIcone(updatedStat.getIcone());
      this.tabStats[index].setValeur(updatedStat.getValeur());
      if (displayToast && hasChange) {
        this.toastService.showInfo(this.translator.instantWithValues('pages.dashboard.updated_stat', { title: updatedStat.getIntitule() }));
      }
    }
  }
  

  /* -------------------------------- */
  /* EVENEMENTS COMPOSANT STATISTIQUE */
  /* -------------------------------- */

  /* Demande de suppression d'une statistique*/
  deleteStat(stat: Statistique) {
    this.statService.removeStat(stat).then(
      (res: any) => {
        this.handleDeletedStat(res.id, false);
        this.toastService.showSuccess(this.translator.instant('pages.dashboard.delete_success'));
      }
    );
  }

  handleDeletedStat(statId: string, displayToast: boolean) {
    let index = this.tabStats.findIndex(stat => stat.getId() == statId);
    if (index != -1) {
      if (displayToast) {
        this.toastService.showInfo(this.translator.instantWithValues('pages.dashboard.deleted_stat', { title: this.tabStats[index].getIntitule() }));
      }
      this.tabStats.splice(index, 1);

    }
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

  switchLang() {
    this.translator.switchLang();
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
