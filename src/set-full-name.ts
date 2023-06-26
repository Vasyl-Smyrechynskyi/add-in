import "zone.js"; // Required for Angular
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import AppModule from "./app-module/app.module";


/* global console, document, Office */
Office.onReady(() => {
  // Bootstrap the app
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((error) => console.error(error));
});
