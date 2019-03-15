import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import CalendarData from '../../store/model';

@Component
export default class NewFoodComponent extends Vue {
    data: CalendarData = {};

    beforeOpen(event) {
        this.data = this.$store.getters.calendar[event.params.options];
    }
}