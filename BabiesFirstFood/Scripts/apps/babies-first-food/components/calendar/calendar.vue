<template>
    <div id="calendar">
        <p><strong>{{monthString}} {{yearString}}</strong></p>
        <ul id="calendar-days" class="calendar-grid">
            <li v-for="day in days">
                {{ day }}
            </li>
        </ul>
        <ul id="calendar-dates" class="calendar-grid">
            <li v-for="date in dates">
                {{ date }}
            </li>
        </ul>
    </div>
</template>

<script src="./calendar.ts"></script>
