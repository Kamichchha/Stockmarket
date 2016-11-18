import {Component} from '@angular/core';

@Component({
    moduleId:module.id,
    selector:'my-app',
    styleUrls:['app.component.css'],    
    template:`<div class="container">
                <h3>{{title}}</h3><nav>
                <a routerLink='/dashboard' routerLinkActive="active">Dashboard</a>
                <a routerLink='/example' routerLinkActive="active">Help Page</a>
                </nav>
                <router-outlet></router-outlet>
                </div>`
})
export class AppComponent{
    title:string="Analysis";
}