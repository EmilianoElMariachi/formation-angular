import { Injectable } from '@angular/core';
import { Statistique } from '../models/Statistique';
import { Appreciation } from '../models/Appreciation';

@Injectable({
  providedIn: 'root'
})
export class StatService {

  private tabStats : Statistique[];

  constructor() { 
    this.tabStats = [
      new Statistique("Revenue", "1450$", "money-coins", Appreciation.SUCCESS),
      new Statistique("Capacity", "150GB", "globe", Appreciation.WARNING),
      new Statistique("Followers", "1450$", "favourite-28", Appreciation.WARNING),
      new Statistique("Errors", "23", "vector", Appreciation.ERROR)
    ];
  }

  getAllStats() : Statistique[] {
    return this.tabStats;
  }

  addStat(statToAdd : Statistique) {
    this.tabStats.push(statToAdd);
  }

}
