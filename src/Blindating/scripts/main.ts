///<reference path="./../typings/core-js/index.d.ts"/>
///<reference path="./../typings/facebook/fbsdk.d.ts"/>

import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule }              from "./app.module";
const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);
