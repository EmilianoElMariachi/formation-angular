import { Injectable } from '@angular/core';
import { Statistique } from '../models/Statistique';
import { HttpClient } from '@angular/common/http';
import { Appreciation } from '../models/Appreciation';

@Injectable({
  providedIn: 'root'
})
export class StatService {

  private API_URL = "https://stats.naminilamy.fr";

  constructor(private http: HttpClient) {}

  getAllStats(): Promise<Statistique[]> {
    return this.http.get(this.API_URL).toPromise().then(
      (res:Array<any>) => {
        let tabStats: Statistique[] = [];
        for (let stat of res) {
          tabStats.push(
            new Statistique(stat.id, stat.title, stat.value, stat.icon, Appreciation[stat.appreciation])
          );
        }
        return tabStats;
      },
      err => {
        return [];
      }
    );
  }

  public getStat(id: string) : Promise<Statistique> {
    return this.http.get(this.API_URL + "/" + id, {}).toPromise().then(
      (res:any) => {
        return new Statistique(res.id, res.title, res.value, res.icon, Appreciation[res.appreciation]);
      }
    );
  }

  public addStat(stat: Statistique) : Promise<Statistique> {
    var enumAppreciation = Appreciation;
    var data = {
      title: stat.getIntitule(),
      value: stat.getValeur(),
      icon: stat.getIcone(),
      appreciation: this.getEnumKeyByEnumValue(enumAppreciation, stat.getAppreciation())
    }
    return this.http.post(this.API_URL,data).toPromise().then(
      (res:any) => {
        return new Statistique(res.id, res.title, res.value, res.icon, Appreciation[res.appreciation]);
      }
    );
  }

  getEnumKeyByEnumValue(myEnum, enumValue) {
    let keys = Object.keys(myEnum).filter(x => myEnum[x] == enumValue);
    return keys.length > 0 ? keys[0] : null;
  }

  public removeStat(statToDelete:Statistique) : Promise<Object> {
    return this.http.delete(this.API_URL + "/" + statToDelete.getId()).toPromise();
  }

  public updateStat(statToUpdate:Statistique) : Promise<Statistique> {
    var enumAppreciation = Appreciation;
    var data = {
      title: statToUpdate.getIntitule(),
      value: statToUpdate.getValeur(),
      icon: statToUpdate.getIcone(),
      appreciation: this.getEnumKeyByEnumValue(enumAppreciation, statToUpdate.getAppreciation())
    }
    return this.http.put(this.API_URL + "/" + statToUpdate.getId(),data).toPromise().then(
      (res:any) => {
        return new Statistique(res.id, res.title, res.value, res.icon, Appreciation[res.appreciation]);
      }
    );
  }
}
