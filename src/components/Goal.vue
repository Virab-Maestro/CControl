<script setup lang="ts">
import { ref } from "vue";
import type { Goal } from "@/types";

defineProps<{
  goal: Goal
}>()

const isBtnDisabled = ref(false),
    editGoalDial = ref(false),
    rmGoalDial = ref(false);

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

        <!-- whar is 'key'? -->
        <v-btn key="1" icon="mdi-trash-can-outline"></v-btn>
        <v-btn key="2" icon="mdi-pencil"></v-btn>
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

  <!-- addGoal dialog -->
  <v-dialog
      class="add-goal-dialog"
      v-model="addGoalDial"
      :max-width="500"
      :scrim="false">
    <v-card title="Set Goal" color="info">
      <!-- close -->
      <template v-slot:append>
        <v-icon class="cursor-pointer" icon="mdi-window-close" @click="addGoalDial = false" />
      </template>

      <v-card-text>
        <v-form class="mt-6" ref="addGoalForm" @submit.prevent="addGoal">
          <v-row dense>
            <v-col>
              <v-text-field
                  v-model="goalDesc"
                  label="Title"
                  :rules="rules.goalDesc"
                  variant="outlined"
              />
            </v-col>
          </v-row>
          <v-row dense>
            <v-col>
              <v-select
                  v-model="goalAcvType"
                  :items="goalTypes"
                  :rules="rules.goalAcvType"
                  label="Type"
                  variant="outlined"
              />
            </v-col>
          </v-row>
          <v-row dense>
            <v-col>
              <v-number-input
                  v-model="goalTotal"
                  label="Total"
                  controlVariant="split"
                  :rules="rules.goalTotal"
                  variant="outlined"
              />
            </v-col>
            <v-col>
              <v-text-field
                  v-model="goalUnit"
                  label="Unit"
                  :rules="rules.goalUnit"
                  variant="outlined"
              />
            </v-col>
          </v-row>

          <v-row dense>
            <v-col>
              <v-number-input
                  v-model="goalCurrentStep"
                  label="CurrentStep"
                  controlVariant="split"
                  :rules="rules.goalCurrentStep"
                  variant="outlined"
              />
            </v-col>
            <v-col>
              <v-number-input
                  v-model="goalStepValue"
                  label="StepValue"
                  controlVariant="split"
                  :rules="rules.goalStepValue"
                  variant="outlined"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-btn type="submit">Add</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>