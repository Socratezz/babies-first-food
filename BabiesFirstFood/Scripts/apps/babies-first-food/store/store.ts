//If you have the Vue Chrome extension installed, you can check the data in the store
//by using '__VUE_DEVTOOLS_GLOBAL_HOOK__.store in the console

import { GetterTree, ActionTree, MutationTree, ActionContext } from 'vuex';
import { BabiesFirstFood } from './types';
import Axios from 'axios';

export const state: BabiesFirstFood = {
    calendar: [],
}

export const getters: GetterTree<BabiesFirstFood, any> = {
    calendar: state => state.calendar,
}

export const mutations: MutationTree<BabiesFirstFood> = {
    MutateCalendar(state, item) {
        state.calendar = item;
    },
}

export const actions: ActionTree<BabiesFirstFood, any> = {

};

