<template>
    <modal id="new-food" name="EnterFoodModal" @before-open="beforeOpen" @opened="opened" @before-close="beforeClose" width="55%" height="55%" adaptive="true">
        <p>{{data.date}}</p>
        <p>{{data.day}}</p>
        <p>{{data.food}}</p>
        <p><input type="text" v-model="data.food"/></p>
    </modal>
</template>

<script src="./new-food-modal.ts"></script>