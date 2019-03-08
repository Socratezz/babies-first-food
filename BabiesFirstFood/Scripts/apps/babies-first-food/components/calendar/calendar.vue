<template>
    <div id="calendar">
        <p class="header"><strong>{{monthString}} {{yearString}}</strong></p>
        <ul id="calendar-days" class="calendar-grid">
            <li v-for="day in days">
                {{ day }}
            </li>
        </ul>
        <ul id="calendar-dates" class="calendar-grid">
            <li v-for="data in calendarData">
                <div v-bind:class="{disabled: !data.currentMonth, enabled: data.currentMonth, today: data.currentDay}">
                    <p>{{data.day}}</p>
                    <p>FOOD TO EAT</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script src="./calendar.ts"></script>
