import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';

import {RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {ExampleComponent} from './example.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpModule} from '@angular/http';

@NgModule({
    imports:[BrowserModule,FormsModule,AppRoutingModule,HttpModule],
    declarations:[AppComponent,DashboardComponent,ExampleComponent],  
    bootstrap:[AppComponent]
})
export class AppModule { }