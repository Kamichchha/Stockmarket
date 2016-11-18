import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {ExampleComponent} from './example.component';

const routes=[{path:'dashboard',component:DashboardComponent},
                {path:'example',component:ExampleComponent},
                {path:'',redirectTo:'/dashboard',pathMatch:'full'}
                ];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]   
})
export class AppRoutingModule { }