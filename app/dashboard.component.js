"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var DashboardComponent = (function () {
    function DashboardComponent() {
        this.stock = {
            revenue: 100000,
            forecastPeriod: 5,
            wcapital: 9000,
            discountRate: 11,
            cashFlowGrowthRate: 4,
            terminalValue: 0,
            terminalValue2: 0,
            enterpriseValue: 0,
            debt: 50,
            fairValue: 0,
            sharesOutstanding: 1000,
            intrinsicValue: 0
        };
        this.forecastYears = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.growthRate = [0, 20, 20, 15, 15, 10, 20, 20, 20, 20, 20];
        this.revenueInYears = [this.stock.revenue, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.taxes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.oprMarginPer = [0, 65, 65, 65, 70, 70, 20, 20, 20, 20, 20];
        this.taxRate = [0, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30];
        this.netInvestment = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.opCostInYears = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.cashflow = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.netInvestmentPer = [7, 7.6, 8.2, 8.8, 9.4, 10, 30, 30, 30, 30];
        this.workCapitalInYears = [this.stock.wcapital, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
    DashboardComponent.prototype.calculateRevenue = function () {
        var _this = this;
        console.log("called");
        this.revenueInYears[0] = this.stock.revenue;
        this.forecastYears.slice(0, this.stock.forecastPeriod).forEach(function (i) {
            _this.revenueInYears[i] = (_this.revenueInYears[i - 1] * (1 + _this.growthRate[i] / 100)),
                _this.workCapitalInYears[i] = (_this.workCapitalInYears[i - 1] * (1 + _this.growthRate[i] / 100)),
                _this.taxes[i] = (_this.taxRate[i]) * (_this.revenueInYears[i] - _this.opCostInYears[i]) / 100;
            _this.netInvestment[i] = _this.revenueInYears[i] * _this.netInvestmentPer[i] / 100,
                _this.opCostInYears[i] = _this.revenueInYears[i] * _this.oprMarginPer[i] / 100,
                _this.cashflow[i] = _this.revenueInYears[i] - (_this.opCostInYears[i] + _this.taxes[i] + _this.netInvestment[i] + _this.workCapitalInYears[i] - _this.workCapitalInYears[i - 1]);
        });
        this.stock.terminalValue = this.cashflow[this.stock.forecastPeriod] * (100 + this.stock.cashFlowGrowthRate) / (this.stock.discountRate - this.stock.cashFlowGrowthRate);
        this.stock.terminalValue2 = this.cashflow[this.stock.forecastPeriod] * 15;
        this.stock.enterpriseValue = 0;
        this.forecastYears.slice(0, this.stock.forecastPeriod).forEach(function (i) {
            _this.stock.enterpriseValue += _this.cashflow[_this.stock.forecastPeriod] / Math.pow((1 + _this.stock.discountRate / 100), i);
        });
        this.stock.enterpriseValue += this.stock.terminalValue / Math.pow((1 + this.stock.discountRate / 100), this.stock.forecastPeriod);
        this.stock.fairValue = this.stock.enterpriseValue - this.stock.debt;
        this.stock.intrinsicValue = this.stock.fairValue / this.stock.sharesOutstanding;
    };
    DashboardComponent.prototype.ngOnInit = function () {
        this.calculateRevenue();
    };
    DashboardComponent.prototype.ngDoCheck = function () {
        console.log('Check called');
        this.calculateRevenue();
    };
    DashboardComponent.prototype.onchange = function () {
        this.calculateRevenue();
    };
    DashboardComponent.prototype.ngOnChanges = function () {
        this.calculateRevenue();
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'dashboard',
            templateUrl: 'dashboard.component.html',
            styleUrls: ['dashboard.component.css'],
            moduleId: module.id
        }), 
        __metadata('design:paramtypes', [])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map