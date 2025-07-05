<script setup lang="ts">
import type { Goal } from "@/types";

const props = defineProps<{
  goals: Goal[]
}>()

const plusStep = (goal: Goal) => {
  if(goal.currentStep < goal.total) {
    goal.currentStep = goal.currentStep + goal.stepValue
  }
  //send data to DB
}

const minusStep = (goal: Goal) => {
  if(goal.currentStep >= goal.stepValue) {
    goal.currentStep = goal.currentStep - goal.stepValue
  }
  //send data to DB
}
</script>

<template>
  <v-card class="goal-group">
    <v-card-title class="goal-group__title"><slot></slot></v-card-title>

    <!-- v-list of other cards -->
    <template v-for="(goal) in goals">
      <div class="goal">
        <h4>{{ goal.desc }}</h4>
        <p> {{ goal.currentStep }}/{{ goal.total }} <span>{{ goal.unit }}</span></p>
        <!-- is changing props ok in vue -->
        <v-btn icon="mdi-plus" @click="plusStep(goal)"></v-btn>
        <v-btn icon="mdi-minus" @click="minusStep(goal)"></v-btn>
      </div>
    </template>
  </v-card>
</template>

<style scoped>
.goal-group {
  flex: 1;
}

.goal-group__title {}
</style>