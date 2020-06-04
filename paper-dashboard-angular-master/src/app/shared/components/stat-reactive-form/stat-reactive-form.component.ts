import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Appreciation } from 'app/shared/models/Appreciation';
import { Statistique } from 'app/shared/models/Statistique';

@Component({
  selector: 'app-stat-reactive-form',
  templateUrl: './stat-reactive-form.component.html',
  styleUrls: ['./stat-reactive-form.component.scss']
})
export class StatReactiveFormComponent implements OnInit {

  public statForm: FormGroup;

  //Hack pour le select
  public enumAppreciation = Appreciation;

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

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.statForm = this.fb.group({
      nom: [null, Validators.required],
      valeur: [null, Validators.required],
      icone: [null, Validators.required],
      appreciation: [null, Validators.required],
    });
  }

  ngOnChanges() {
    /* Gestion de l'initialisation - reset du formulaire lorsque le mode d'affichage change */
    if (this.editedStat && this.editMode) {
      this.statForm.controls.nom.setValue(this.editedStat.getIntitule());
      this.statForm.controls.valeur.setValue(this.editedStat.getValeur());
      this.statForm.controls.icone.setValue(this.editedStat.getIcone());
      this.statForm.controls.appreciation.setValue(this.editedStat.getAppreciation());
    } else if (this.editedStat && !this.editMode) {
      this.statForm.reset();
    }
  }

  /* Soumission du formulaire : 
      - cas 1 : mode création, propagation de l'événement askForCreate 
      - cas 2 : mode édition, propagation de l'événement askForUpdate 
  */
  onSubmit() {
    if (!this.editMode) {
      this.askForStatCreate.emit(
        new Statistique(
          null,
          this.statForm.controls.nom.value,
          this.statForm.controls.valeur.value,
          this.statForm.controls.icone.value,
          this.statForm.controls.appreciation.value)
      );
    } else {
      this.askForStatUpdate.emit(
        new Statistique(
          this.editedStat.getId(),
          this.statForm.controls.nom.value,
          this.statForm.controls.valeur.value,
          this.statForm.controls.icone.value,
          this.statForm.controls.appreciation.value)
      );
    }
    this.statForm.reset();
  }

  /* Demande d'annulation : propagation de l'événement askForStatUpdateCancel */
  onCancel() {
    this.askForStatUpdateCancel.emit();
  }
}
