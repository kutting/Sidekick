// See: https://material.angular.io/guide/getting-started#step-5-gesture-support
//  Some Angular Material components like Slide Toggle, Slider, and Tooltip rely on a library called HammerJS to capture touch gestures.
import 'hammerjs';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}

const providers = [
	{ provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] },
	{ provide: 'COMICVINE_API_KEY', useValue: '2d279cbc7181b2e850a24e5511a915044a1858da' }
];

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic(providers).bootstrapModule(AppModule)
  .catch(err => console.log(err));
