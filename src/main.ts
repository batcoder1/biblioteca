import 'core-js/es7/reflect';
import 'zone.js/dist/zone';
import 'ts-helpers';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
