<template>
    <div id="calendar">
        <p class="header">
            <i class="fa fa-chevron-left previous" v-on:click="previousMonth()"></i>
            <strong>{{monthString}} {{year}}</strong>
            <i class="fa fa-chevron-right next" v-on:click="nextMonth()"></i>
        </p>
        <ul id="calendar-days" class="calendar-grid">
            <li v-for="day in days">
                {{ day }}
            </li>
        </ul>
        <ul id="calendar-dates" class="calendar-grid">
            <li v-for="(data, index) in calendarData">
                <div v-bind:class="{disabled: !data.currentMonth, enabled: data.currentMonth, today: data.currentDay}">
                    <p>{{data.day}}</p>
                    <p><input type="text" v-bind:value="data.food" @keyup.enter="SaveFood(index, $event)"/></p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script src="./calendar.ts"></script>
