<script setup lang="ts">
import { ref } from "vue";
import type { Goal } from "@/types";

const props = defineProps<{
  goals: Goal[]
}>()

const isBtnDisabled = ref(false);

const plusStep = (goal: Goal) => {
  //dis btn for a moment
  isBtnDisabled.value = true;
  setTimeout(() => {
    isBtnDisabled.value = false;
  }, 700)

  if(goal.currentStep < goal.total) {
    goal.currentStep = goal.currentStep + goal.stepValue
  }
  //send data to DB
}

const minusStep = (goal: Goal) => {
  //dis btn for a moment
  isBtnDisabled.value = true;
  setTimeout(() => {
    isBtnDisabled.value = false;
  }, 500)

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
        <v-btn icon="mdi-plus" @click="plusStep(goal)" :disabled="isBtnDisabled" />
        <v-btn icon="mdi-minus" @click="minusStep(goal)" :disabled="isBtnDisabled" />
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