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
      new Statistique(1, "Revenue", "1450$", "money-coins", Appreciation.SUCCESS),
      new Statistique(2, "Capacity", "150GB", "globe", Appreciation.WARNING),
      new Statistique(3, "Followers", "1450$", "favourite-28", Appreciation.WARNING),
      new Statistique(4, "Errors", "23", "vector", Appreciation.ERROR)
    ];
  }

  getAllStats() : Statistique[] {
    return this.tabStats;
  }

  addStat(statToAdd : Statistique) {
    this.tabStats.push(statToAdd);
  }

  removeStat(statToRemove: Statistique) {
    let index = this.tabStats.findIndex(stat => stat.getId() == statToRemove.getId());
    if (index != -1) this.tabStats.splice(index, 1);
  }

  updateStat(updatedStat: Statistique) {
    let index = this.tabStats.findIndex(stat => stat.getId() == updatedStat.getId());
    if (index != -1) {
      this.tabStats[index].setAppreciation(updatedStat.getAppreciation());
      this.tabStats[index].setIntitule(updatedStat.getIntitule());
      this.tabStats[index].setIcone(updatedStat.getIcone());
      this.tabStats[index].setValeur(updatedStat.getValeur());
    }
  }
}
