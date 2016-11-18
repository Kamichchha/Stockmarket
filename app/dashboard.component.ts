import {Component,OnInit,OnChanges} from '@angular/core';
import {Stock} from './stock';
import {Router} from '@angular/router';

@Component({
    selector:'dashboard',
    templateUrl:'dashboard.component.html',
    styleUrls:['dashboard.component.css'],
    moduleId:module.id
})
export class DashboardComponent implements OnInit{
    
    stock:Stock={
        revenue:100000,
        forecastPeriod:5,
        wcapital:9000,
        discountRate:11,
        cashFlowGrowthRate:4,
        terminalValue:0,
        terminalValue2:0,
        enterpriseValue:0,
        debt:50,
        fairValue:0,
        sharesOutstanding:1000,
        intrinsicValue:0
    };    

    forecastYears:number[]=[1,2,3,4,5,6,7,8,9,10];
    growthRate:number[]=[0,20,20,15,15,10,20,20,20,20,20];
    revenueInYears:number[]=[this.stock.revenue,0,0,0,0,0,0,0,0,0,0];
    taxes:number[]=[0,0,0,0,0,0,0,0,0,0,0];
    oprMarginPer:number[]=[0,65,65,65,70,70,20,20,20,20,20];
    taxRate:number[]=[0,30,30,30,30,30,30,30,30,30,30];
    netInvestment:number[]=[0,0,0,0,0,0,0,0,0,0];
    opCostInYears:number[]=[0,0,0,0,0,0,0,0,0,0];
    cashflow:number[]=[0,0,0,0,0,0,0,0,0,0];
    netInvestmentPer:number[]=[7,7.6,8.2,8.8,9.4,10,30,30,30,30];
    workCapitalInYears:number[]=[this.stock.wcapital,0,0,0,0,0,0,0,0,0,0];
    

    calculateRevenue():void{
        console.log("called");
        this.revenueInYears[0]=this.stock.revenue;
        this.forecastYears.slice(0,this.stock.forecastPeriod).forEach(
            i=>{this.revenueInYears[i]=(this.revenueInYears[i-1]*(1+this.growthRate[i]/100)),
            this.workCapitalInYears[i]=(this.workCapitalInYears[i-1]*(1+this.growthRate[i]/100)),
            this.taxes[i]=(this.taxRate[i])*(this.revenueInYears[i]-this.opCostInYears[i])/100
            this.netInvestment[i]=this.revenueInYears[i]*this.netInvestmentPer[i]/100,
            this.opCostInYears[i]=this.revenueInYears[i]*this.oprMarginPer[i]/100,
            this.cashflow[i]=this.revenueInYears[i]-(this.opCostInYears[i]+this.taxes[i]+this.netInvestment[i]+this.workCapitalInYears[i]-this.workCapitalInYears[i-1])
        });        
        this.stock.terminalValue=this.cashflow[this.stock.forecastPeriod]*(100+this.stock.cashFlowGrowthRate)/(this.stock.discountRate-this.stock.cashFlowGrowthRate);    
        this.stock.terminalValue2=this.cashflow[this.stock.forecastPeriod]*15;
        this.stock.enterpriseValue=0;
       			
        this.forecastYears.slice(0,this.stock.forecastPeriod).forEach(
        i=>{
            this.stock.enterpriseValue+=this.cashflow[this.stock.forecastPeriod]/Math.pow((1+this.stock.discountRate/100),i)
        });
        
        this.stock.enterpriseValue+=this.stock.terminalValue/Math.pow((1+this.stock.discountRate/100),this.stock.forecastPeriod);
        this.stock.fairValue=this.stock.enterpriseValue-this.stock.debt;
        this.stock.intrinsicValue=this.stock.fairValue/this.stock.sharesOutstanding;
           
 }
    ngOnInit(){
        this.calculateRevenue();
    }

    ngDoCheck(){
        console.log('Check called');
        this.calculateRevenue();
    }

    onchange(){
        this.calculateRevenue();
    }

    ngOnChanges(){
        this.calculateRevenue();
    }
    
   
}

