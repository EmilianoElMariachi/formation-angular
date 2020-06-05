import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Statistique } from 'app/shared/models/Statistique';
import { Appreciation } from 'app/shared/models/Appreciation';

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.scss']
})
export class StatistiqueComponent  {

  @Input()
  public stat:Statistique;
  
  @Output()
  public refreshMe: EventEmitter<Statistique> = new EventEmitter<Statistique>();

  @Output()
  public deleteMe: EventEmitter<Statistique> = new EventEmitter<Statistique>();

  @Output()
  public updateMe: EventEmitter<Statistique> = new EventEmitter<Statistique>();

  constructor() { }

  askForDelete() {
    this.deleteMe.emit(this.stat);
  }

  askForUpdate() {
    this.updateMe.emit(this.stat);
  }

  askForRefresh() {
    this.refreshMe.emit(this.stat);
  }

}
