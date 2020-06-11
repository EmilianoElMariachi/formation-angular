import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AppTranslateService {
  private currentLang = 'fr';

  constructor(private translate: TranslateService) {
      // this language will be used as a fallback when a translation isn't found in the current language
      translate.setDefaultLang(this.currentLang);

       // the lang to use, if the lang isn't available, it will use the current loader to get them
      translate.use(this.currentLang);
  }

  instant(key: string) : string {
    return this.translate.instant(key);
  }

  instantWithValues(key: string, values: any) {
    return this.translate.instant(key, values);
  }

  switchLang() {
    if(this.currentLang == 'fr') {
      this.translate.use('en');
      this.currentLang = 'en';
    } else {
      this.translate.use('fr');
      this.currentLang = 'fr';
    }
  }
}
