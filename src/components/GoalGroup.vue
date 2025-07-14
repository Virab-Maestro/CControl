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
    <v-card-item>
      <v-card class="mb-5 pa-2" v-for="(goal) in goals" variant="tonal">
        <v-card-title>
          {{ goal.desc }}
        </v-card-title>

        <v-card-subtitle class="mt-3">
          <v-row align="center" justify="space-between">
            <v-col cols="9">
              <v-progress-linear :model-value="Math.round(goal.currentStep / goal.total * 100)" color="blue-grey" height="25"/>
            </v-col>
            <v-col>
              {{ goal.currentStep }}/{{ goal.total }} <span>{{ goal.unit }}</span>
            </v-col>
          </v-row>
        </v-card-subtitle>

        <v-card-actions>
          <v-btn icon="mdi-plus" @click="plusStep(goal)" :disabled="isBtnDisabled" />
          <v-btn icon="mdi-minus" @click="minusStep(goal)" :disabled="isBtnDisabled" />
        </v-card-actions>
      </v-card>
    </v-card-item>
  </v-card>
</template>

<style scoped>
.goal-group {
  flex: 1;
}

.goal-group__title {

}
</style>