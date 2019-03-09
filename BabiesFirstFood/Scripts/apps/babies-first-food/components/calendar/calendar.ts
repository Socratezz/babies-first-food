import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { CalendarData } from '../calendar/model';

@Component
export default class CalendarComponent extends Vue {
    month: number = 0;
    monthString: string = '';
    year: number = 0; 
    days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    calendarData: CalendarData[] = [];

    created(): void {
        let date = new Date();
        this.month = date.getMonth();
        this.monthString = date.toLocaleString('en-us', { month: 'long' });
        this.year = date.getFullYear();
        this.getDatesInMonth(date.getMonth(), date.getFullYear());
    }

    getDatesInMonth(month: number, year: number) {
        this.calendarData = [];
        let numOfDays = new Date(year, month + 1, 0).getDate();
        let today = new Date().setHours(0, 0, 0, 0);
        for (var i = 1; i <= numOfDays; i++) {
            const date: CalendarData = {
                date: new Date(year, month, i),
                day: new Date(year, month, i).getDate(),
                currentMonth: true,
                currentDay: today === new Date(year, month, i).setHours(0, 0, 0, 0) ? true : false
            };
            this.calendarData.push(date);           
        }
        for (var i = this.calendarData[0].date.getDay(); i > 0; i--) {
            let yesterday = new Date(this.calendarData[0].date.getTime());
            yesterday.setDate(this.calendarData[0].date.getDate() - 1);
            const date: CalendarData = {
                date: yesterday,
                day: yesterday.getDate(),
                currentMonth: false,
                currentDay: false
            };
            this.calendarData.unshift(date);
        }
        for (var i = this.calendarData.length; i < 42; i++) {
            let tomorrow = new Date(this.calendarData[i - 1].date.getTime());
            tomorrow.setDate(this.calendarData[i - 1].date.getDate() + 1);
            const date: CalendarData = {
                date: tomorrow,
                day: tomorrow.getDate(),
                currentMonth: false,
                currentDay: false
            };
            this.calendarData.push(date);
        }
    }

    nextMonth() {
        let currentMonth = new Date(this.year, this.month, 1);
        const nextMonth = new Date(currentMonth.setMonth(currentMonth.getMonth() + 1));
        this.month = nextMonth.getMonth();
        this.monthString = nextMonth.toLocaleString('en-us', { month: 'long' });
        this.year = nextMonth.getFullYear();
        this.getDatesInMonth(nextMonth.getMonth(), nextMonth.getFullYear());
    }

    previousMonth() {
        let currentMonth = new Date(this.year, this.month, 1);
        const previousMonth = new Date(currentMonth.setMonth(currentMonth.getMonth() - 1));
        this.month = previousMonth.getMonth();
        this.monthString = previousMonth.toLocaleString('en-us', { month: 'long' });
        this.year = previousMonth.getFullYear();
        this.getDatesInMonth(previousMonth.getMonth(), previousMonth.getFullYear());
    }
}