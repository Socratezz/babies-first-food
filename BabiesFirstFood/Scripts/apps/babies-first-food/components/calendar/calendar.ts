import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import CalendarData from '../../store/model';
import Axios from 'axios';
import { AxiosResponse } from 'axios';

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
    mounted(): void {
        this.$store.watch(
            (state) => { return state.calendar; },
            () => { this.calendarData = this.$store.getters.calendar },
            { deep: true }
        );
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
        this.$store.commit('MutateCalendar', this.calendarData);
        const params = { StartDate: this.calendarData[0].date, EndDate: this.calendarData[this.calendarData.length - 1].date };
        Axios.post('/api/food/get', params)
            .then((response) => {
                let newData: CalendarData[] = [...this.$store.getters.calendar];
                response.data.forEach((food) => {
                    newData.forEach((c) => {
                        const foodDate = new Date(food.Date);
                        if (c.date.getTime() === foodDate.getTime())
                            c.food = food.Food;
                    });
                });
                this.$store.commit('MutateCalendar', newData);
            });
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

    SaveFood(index, event) {
        if (event.target.value == null || event.target.value == '')
            return;
        let dbData: CalendarData[] = [];
        let newData: CalendarData[] = [...this.$store.getters.calendar];
        newData[index].food = event.target.value;
        dbData.push(newData[index]);
        index++;
        newData[index].food = event.target.value;
        dbData.push(newData[index]);
        index++;
        newData[index].food = event.target.value;
        dbData.push(newData[index]);
        this.$store.commit('MutateCalendar', newData);
        let insert = [];
        dbData.forEach((food) => {
            insert.push({
                Date: food.date,
                Food: food.food
            });
        });
        Axios.post('/api/food/new', insert);
    }
}