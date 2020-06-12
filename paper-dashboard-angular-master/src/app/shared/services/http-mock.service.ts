import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpMockService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // let newHeaders = req.headers;
    // newHeaders = newHeaders.append('content-type', 'application/xml');
    // const authReq = req.clone({headers: newHeaders});
    // return next.handle(authReq);

    if (req.url == "https://stats.naminilamy.fr" && req.method == "GET") {
      const body = [
        {
          "appreciation": "SUCCESS",
          "value": "Une valeur mockée",
          "id": "3ba31220-63b3-11ea-8348-2375089717a3",
          "icon": "satisfied",
          "updatedAt": 1583952692968,
          "title": "Une stat mockée"
        },
        {
          "appreciation": "ERROR",
          "value": "Une autre valeur mockée",
          "id": "d11b2600-63b1-11ea-8348-2375089717a3",
          "icon": "globe",
          "updatedAt": 1583942666665,
          "title": "Une autre stat mockée"
        }];
      return of(new HttpResponse(
        { status: 200, body: body }
      ));
    }

    return next.handle(req);
  }
}
