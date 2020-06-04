import { Component, OnInit, Input } from '@angular/core';
import { Statistique } from 'app/shared/models/Statistique';
import { Appreciation } from 'app/shared/models/Appreciation';

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.scss']
})
export class StatistiqueComponent implements OnInit {

  @Input()
  public stat:Statistique;
  
  constructor() { }

  ngOnInit() {
  }
  
  getAppreciationClass(stat: Statistique) {
    switch (stat.getAppreciation()) {
      case Appreciation.SUCCESS:
        return "success"
      case Appreciation.WARNING:
        return "warning";
      case Appreciation.ERROR:
        return "danger";
    }
  }
}
