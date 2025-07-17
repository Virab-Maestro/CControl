<script setup lang="ts">
import GoalFormDial from "@/components/GoalFormDial.vue";
import { ref } from "vue";
import type { Goal } from "@/types";

defineProps<{
  goal: Goal
}>()

const isBtnDisabled = ref(false),
    editGoalDial = ref();

const onEditGoal = () => {
  editGoalDial.value = true;
}

const plusStep = (goal: Goal) => {
  //dis btn for a moment
  isBtnDisabled.value = true;
  setTimeout(() => {
    isBtnDisabled.value = false;
  }, 700)

  //may be overfull
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

  //may be overfull
  if(goal.currentStep > 0) { // goal.currentStep >= goal.stepValue
    goal.currentStep = goal.currentStep - goal.stepValue
  }
  //send data to DB
}
</script>

<template>
  <v-card
      class="mb-5 pa-2 border-sm border-background"
      color="secondary"
      variant="tonal"
      append-icon="$vuetify"
  >
    <template v-slot:title>
      <h4 class="text-info">
        {{ goal.desc }}
      </h4>
    </template>

    <template v-slot:append>
      <v-speed-dial location="bottom center" transition="fade-transition">
        <template v-slot:activator="{ props: actvProps }">
          <v-fab
            v-bind="actvProps"
            size="small"
            icon="mdi-dots-vertical"
          />
        </template>

        <!-- what is 'key'? -->
        <v-btn key="1" icon="mdi-trash-can-outline" />
        <v-btn key="2" icon="mdi-pencil" @click="onEditGoal"/>
      </v-speed-dial>
    </template>

    <v-card-title class="text-info">
    </v-card-title>

    <v-card-subtitle class="mt-3">
      <v-row align="center" justify="space-between">
        <v-col cols="9">
          <v-progress-linear :model-value="goal.currentStep / goal.total * 100" color="surface" height="25">
            <template v-slot:default="{ value }">
              <!-- 0 <= value <= 100 -->
              <span v-show="goal.currentStep < 0" class="text-orange-darken-2">negative</span>
              <span v-show="goal.currentStep > goal.total" class="text-light-green-accent-3">overdid</span>
            </template>
          </v-progress-linear>
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

  <GoalFormDial v-model="editGoalDial" form-type="edit" :goal="goal" />
</template>

<style scoped>

</style>