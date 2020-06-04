import { Component, OnInit, Output, EventEmitter, Input, AfterViewInit, OnChanges } from '@angular/core';
import { Statistique } from 'app/shared/models/Statistique';
import { Appreciation } from 'app/shared/models/Appreciation';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-stat-templatedriven-form',
  templateUrl: './stat-templatedriven-form.component.html',
  styleUrls: ['./stat-templatedriven-form.component.scss']
})
export class StatTemplatedrivenFormComponent implements OnInit, OnChanges {
 
  //Hack pour le select
  public enumAppreciation = Appreciation;

  //Champs du formulaire
  public nom:string;
  public valeur:string;
  public icone:string;
  public appreciation:Appreciation;

  /* Flag permettant de switcher entre le mode création / édition d'une statistique */
  @Input()
  editMode: boolean;
  
  /* Statistique à mettre à jour ; ignorée si le flag editMode est à faux */
  @Input()
  editedStat: Statistique;

  /* Evenement propagé lorsque l'utilisateur valide une création de statistique et que la saisie est correcte */
  @Output()
  askForStatCreate: EventEmitter<Statistique> = new EventEmitter();

  /* Evenement propagé lorsque l'utilisateur valide une mise à jour de statistique et que la saisie est correcte */
  @Output()
  askForStatUpdate: EventEmitter<Statistique> = new EventEmitter();

  /* Evenement propagé lorsque l'utilisateur annule la mise à jour */
  @Output()
  askForStatUpdateCancel: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    /* Gestion de l'initialisation - reset du formulaire lorsque le mode d'affichage change */
    if (this.editedStat && this.editMode) {
      this.nom = this.editedStat.getIntitule();
      this.valeur = this.editedStat.getValeur();
      this.icone = this.editedStat.getIcone();
      this.appreciation = this.editedStat.getAppreciation();
    } else if (this.editedStat && !this.editMode) {
      this.nom = null;
      this.valeur = null;
      this.icone = null;
      this.appreciation = null;
    }
  }

  /* Soumission du formulaire : 
      - cas 1 : mode création, propagation de l'événement askForCreate 
      - cas 2 : mode édition, propagation de l'événement askForUpdate 
  */
  onSubmit(newStatForm: NgForm) {
    if (!this.editMode) {
      this.askForStatCreate.emit(new Statistique(null, this.nom, this.valeur, this.icone, this.appreciation));
    } else {
      this.askForStatUpdate.emit(new Statistique(this.editedStat.getId(), this.nom, this.valeur, this.icone, this.appreciation));
    }
    newStatForm.reset();
  }

  /* Demande d'annulation : propagation de l'événement askForStatUpdateCancel */
  onCancel() {
    this.askForStatUpdateCancel.emit();
  }

}
