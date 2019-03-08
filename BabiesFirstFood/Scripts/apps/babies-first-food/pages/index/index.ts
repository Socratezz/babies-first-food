import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({
    components: {
        Calendar: require('../../components/calendar/calendar.vue').default
    }
})
export default class IndexComponent extends Vue {

}