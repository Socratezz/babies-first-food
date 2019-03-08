import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { CalendarData } from '../calendar/model';

@Component
export default class CalendarComponent extends Vue {
    monthString: string = '';
    yearString: string = ''; 
    days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    calendarData: CalendarData[] = [];

    created(): void {
        let date = new Date();
        this.monthString = date.toLocaleString('en-us', { month: 'long' });
        this.yearString = date.getFullYear().toString();
        this.getDatesInMonth(date.getMonth(), date.getFullYear());
    }

    getDatesInMonth(month: number, year: number) {
        let numOfDays = new Date(year, month + 1, 0).getDate();
        let today = new Date();
        for (var i = 1; i <= numOfDays; i++) {
            const date: CalendarData = {
                date: new Date(year, month, i),
                day: new Date(year, month, i).getDate(),
                currentMonth: true,
                currentDay: today.getDate() === new Date(year, month, i).getDate() ? true : false
            };
            this.calendarData.push(date);           
        }
        for (var i = this.calendarData[0].date.getDay(); i > 0; i--) {
            let yesterday = new Date();
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
            let tomorrow = new Date();
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
}