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
            <li v-for="(data, index) in calendarData" @click="openEnterFoodModal(index)">
                <div v-bind:class="{disabled: !data.currentMonth, enabled: data.currentMonth, today: data.currentDay}">
                    <p>{{data.day}}</p>
                    <p>{{data.food}}</p>
                </div>
            </li>
        </ul>
        <new-food />
    </div>
</template>

<script src="./calendar.ts"></script>
