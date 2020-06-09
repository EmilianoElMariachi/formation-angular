import {Appreciation} from './Appreciation';

export class Statistique {
    private intitule: string;
    private valeur: string;
    private icone: string;
    private appreciation: Appreciation;

    constructor(intitule: string, valeur: string, icone: string, appreciation: Appreciation) {
        this.intitule = intitule;
        this.valeur = valeur;
        this.icone = icone;
        this.appreciation = appreciation;
    }

    getIntitule(): string {
        return this.intitule;
    }

    setIntitule(intitule: string) {
        this.intitule = intitule;
    }
    
    getValeur(): string {
        return this.valeur;
    }

    setValeur(valeur: string) {
        this.valeur = valeur;
    }

    getIcone(): string {
        return this.icone;
    }

    setIcone(icone: string) {
        this.icone = icone;
    }

    getAppreciation(): Appreciation {
        return this.appreciation;
    }

    setAppreciation(appreciation: Appreciation) {
        this.appreciation = appreciation;
    }

}