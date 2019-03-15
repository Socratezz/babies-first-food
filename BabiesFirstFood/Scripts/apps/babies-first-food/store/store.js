//If you have the Vue Chrome extension installed, you can check the data in the store
//by using '__VUE_DEVTOOLS_GLOBAL_HOOK__.store in the console
export var state = {
    calendar: [],
};
export var getters = {
    calendar: function (state) { return state.calendar; },
};
export var mutations = {
    MutateCalendar: function (state, item) {
        state.calendar = item;
    },
};
export var actions = {};
//# sourceMappingURL=store.js.map