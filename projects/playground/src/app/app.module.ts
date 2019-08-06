import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NotifyLiteModule } from "../../../notify-lite/src/lib/notify-lite.module";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        NotifyLiteModule.forRoot(),
        BrowserModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
