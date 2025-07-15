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
  <div class="goal-group__wrapper">
    <v-chip
        color="primary"
        label
    >
      <slot></slot>
    </v-chip>

    <v-card class="goal-group" color="primary" variant="elevated" rounded="xl">
      <!-- v-list of other cards -->
      <v-card-item>
        <v-card class="mb-5 pa-2" v-for="(goal) in goals" color="secondary" variant="tonal">
          <v-card-title class="text-info">
            {{ goal.desc }}
          </v-card-title>

          <v-card-subtitle class="mt-3">
            <v-row align="center" justify="space-between">
              <v-col cols="9">
                <v-progress-linear :model-value="goal.currentStep / goal.total * 100" color="surface" height="25"/>
              </v-col>
              <v-col class="text-info">
                {{ goal.currentStep }}/{{ goal.total }} <span>{{ goal.unit }}</span>
              </v-col>
            </v-row>
          </v-card-subtitle>

          <v-card-actions>
            <v-btn color="surface" icon="mdi-plus" @click="plusStep(goal)" :disabled="isBtnDisabled" />
            <v-btn color="surface" icon="mdi-minus" @click="minusStep(goal)" :disabled="isBtnDisabled" />
          </v-card-actions>
        </v-card>
      </v-card-item>
    </v-card>
  </div>
</template>

<style scoped>
.goal-group {
  height: 100%;
}

.goal-group__wrapper {
  display: flex;
  flex-direction: column;
  gap: 40px;
  flex: 1;
}
.goal-group__wrapper:nth-child(2) {
  flex: 2;
}

</style>