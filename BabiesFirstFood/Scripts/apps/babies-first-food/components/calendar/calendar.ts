import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class CalendarComponent extends Vue {
    monthString: string = '';
    yearString: string = ''; 
    days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    dates: Date[] = [];

    created(): void {
        let date = new Date();
        this.monthString = date.toLocaleString('en-us', { month: 'long' });
        this.yearString = date.getFullYear().toString();
        this.getDatesInMonth(date.getMonth(), date.getFullYear());
    }

    getDatesInMonth(month: number, year: number) {
        let numOfDays = new Date(year, month + 1, 0).getDate();
        for (var i = 1; i <= numOfDays; i++) {
            this.dates.push(new Date(year, month, i));           
        }
        for (var i = this.dates[0].getDay(); i > 0; i--) {
            let yesterday = new Date(this.dates[0].getTime());
            yesterday.setDate(this.dates[0].getDate() - 1);
            this.dates.unshift(yesterday);
        }
        for (var i = this.dates.length; i < 42; i++) {
            let tomorrow = new Date(this.dates[i - 1].getTime());
            tomorrow.setDate(this.dates[i - 1].getDate() + 1);
            this.dates.push(tomorrow);
        }
    }
}