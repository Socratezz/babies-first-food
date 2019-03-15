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
        _this.month = 0;
        _this.monthString = '';
        _this.year = 0;
        _this.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        _this.calendarData = [];
        return _this;
    }
    CalendarComponent.prototype.created = function () {
        var date = new Date();
        this.month = date.getMonth();
        this.monthString = date.toLocaleString('en-us', { month: 'long' });
        this.year = date.getFullYear();
        this.getDatesInMonth(date.getMonth(), date.getFullYear());
        this.$store.commit('MutateCalendar', this.calendarData);
    };
    CalendarComponent.prototype.getDatesInMonth = function (month, year) {
        this.calendarData = [];
        var numOfDays = new Date(year, month + 1, 0).getDate();
        var today = new Date().setHours(0, 0, 0, 0);
        for (var i = 1; i <= numOfDays; i++) {
            var date = {
                date: new Date(year, month, i),
                day: new Date(year, month, i).getDate(),
                currentMonth: true,
                currentDay: today === new Date(year, month, i).setHours(0, 0, 0, 0) ? true : false
            };
            this.calendarData.push(date);
        }
        for (var i = this.calendarData[0].date.getDay(); i > 0; i--) {
            var yesterday = new Date(this.calendarData[0].date.getTime());
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
            var tomorrow = new Date(this.calendarData[i - 1].date.getTime());
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
    CalendarComponent.prototype.nextMonth = function () {
        var currentMonth = new Date(this.year, this.month, 1);
        var nextMonth = new Date(currentMonth.setMonth(currentMonth.getMonth() + 1));
        this.month = nextMonth.getMonth();
        this.monthString = nextMonth.toLocaleString('en-us', { month: 'long' });
        this.year = nextMonth.getFullYear();
        this.getDatesInMonth(nextMonth.getMonth(), nextMonth.getFullYear());
    };
    CalendarComponent.prototype.previousMonth = function () {
        var currentMonth = new Date(this.year, this.month, 1);
        var previousMonth = new Date(currentMonth.setMonth(currentMonth.getMonth() - 1));
        this.month = previousMonth.getMonth();
        this.monthString = previousMonth.toLocaleString('en-us', { month: 'long' });
        this.year = previousMonth.getFullYear();
        this.getDatesInMonth(previousMonth.getMonth(), previousMonth.getFullYear());
    };
    CalendarComponent.prototype.openEnterFoodModal = function (index) {
        this.$modal.show('EnterFoodModal', { options: index });
    };
    CalendarComponent = __decorate([
        Component({
            components: {
                NewFood: require('../new-food-modal/new-food-modal.vue').default
            }
        })
    ], CalendarComponent);
    return CalendarComponent;
}(Vue));
export default CalendarComponent;
//# sourceMappingURL=calendar.js.map