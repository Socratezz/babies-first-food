var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
var CalendarComponent = /** @class */ (function (_super) {
    __extends(CalendarComponent, _super);
    function CalendarComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.monthString = '';
        _this.yearString = '';
        _this.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        _this.calendarData = [];
        return _this;
    }
    CalendarComponent.prototype.created = function () {
        var date = new Date();
        this.monthString = date.toLocaleString('en-us', { month: 'long' });
        this.yearString = date.getFullYear().toString();
        this.getDatesInMonth(date.getMonth(), date.getFullYear());
    };
    CalendarComponent.prototype.getDatesInMonth = function (month, year) {
        var numOfDays = new Date(year, month + 1, 0).getDate();
        var today = new Date();
        for (var i = 1; i <= numOfDays; i++) {
            var date = {
                date: new Date(year, month, i),
                day: new Date(year, month, i).getDate(),
                currentMonth: true,
                currentDay: today.getDate() === new Date(year, month, i).getDate() ? true : false
            };
            this.calendarData.push(date);
        }
        for (var i = this.calendarData[0].date.getDay(); i > 0; i--) {
            var yesterday = new Date();
            yesterday.setDate(this.calendarData[0].date.getDate() - 1);
            var date = {
                date: yesterday,
                day: yesterday.getDate(),
                currentMonth: false,
                currentDay: false
            };
            this.calendarData.unshift(date);
        }
        for (var i = this.calendarData.length; i < 42; i++) {
            var tomorrow = new Date();
            tomorrow.setDate(this.calendarData[i - 1].date.getDate() + 1);
            var date = {
                date: tomorrow,
                day: tomorrow.getDate(),
                currentMonth: false,
                currentDay: false
            };
            this.calendarData.push(date);
        }
    };
    CalendarComponent = __decorate([
        Component
    ], CalendarComponent);
    return CalendarComponent;
}(Vue));
export default CalendarComponent;
//# sourceMappingURL=calendar.js.map