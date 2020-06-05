import { TestBed, inject } from '@angular/core/testing';
import { Statistique } from '../models/Statistique';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StatService } from './stat.service';

describe('StatsService', () => {
  let stats: Statistique[];

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: StatService = TestBed.get(StatService);
    expect(service).toBeTruthy();
  });

  it('should get all return stat array with mocked data',
    inject([HttpTestingController, StatService],
      (httpMock: HttpTestingController, service: StatService) => {

        service.getAllStats().then(data => {
          let stats = data;
          expect(stats.length != 0);
          expect(stats[0]).toEqual(jasmine.any(Statistique));
          expect(stats[0].getId() == "db16b8a0-9a97-11ea-b257-394a70a769ac");
        });


        const req = httpMock.expectOne("https://stats.naminilamy.fr");
        expect(req.request.method).toEqual('GET');

        req.flush({
          data: [{
            "appreciation": "SUCCESS",
            "value": "60.000.000",
            "id": "db16b8a0-9a97-11ea-b257-394a70a769ac",
            "icon": "globe",
            "updatedAt": 1589978759466,
            "title": "Démographie française"
          }]
        });
      })
  );

});
