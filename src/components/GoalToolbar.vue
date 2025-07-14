<script setup lang="ts">
import useGoalStore from "@/stores/goalStore.ts";
import {ref} from "vue";
import type {Goal} from "../types";

const goalStore = useGoalStore(),
    addGoalDial = ref(false);

//bindings to dialog form
const addGoalForm = ref(),
    goalDesc = ref<string>(),
    goalAcvType = ref<string>(),
    goalTypes = ["day", "daily", "global"],
    goalTotal = ref<number>(),
    goalUnit = ref<string>(""),
    goalCurrentStep = ref<number>(),
    goalStepValue = ref<number>();

const onAddGoal = () => {
  addGoalDial.value = true;
}

const addGoal = () => {
  //validate

  //add to goalStore.goalList
  console.log(typeof goalTotal.value)
  console.log(typeof goalCurrentStep.value)
  console.log(typeof goalStepValue.value)

  const goal = {
    type: goalAcvType.value,
    desc: goalDesc.value,
    unit: goalUnit.value,
    total: goalTotal.value,
    currentStep: goalCurrentStep.value,
    stepValue: goalStepValue.value,
  };

  goalStore.goalList.push(goal)
}
</script>

<template>
  <div class="goal-toolbar">
    <v-btn icon="mdi-plus" @click="onAddGoal"/>
    <v-btn append-icon="mdi-autorenew">New Day</v-btn>
  </div>

<!-- dialog -->
  <v-dialog v-model="addGoalDial" :max-width="500">
    <v-card>
      <v-card-text>
        <v-form v-model="addGoalForm" @submit.prevent="addGoal">
          <!--
        type: GoalTypes;
        desc: string;
        unit: string;
        total: number;
        currentStep: number;
        stepValue: number;-->

          <v-row><v-text-field v-model="goalDesc" label="Goal" /></v-row>
          <v-row><v-select v-model="goalAcvType" :items="goalTypes"></v-select></v-row>
          <v-row>
            <v-col>
              <v-number-input v-model="goalTotal" label="Total" controlVariant="split"/>
            </v-col>
            <v-col>
              <v-text-field v-model="goalUnit" label="Unit" />
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-number-input v-model="goalCurrentStep" label="CurrentStep" controlVariant="split"/>
            </v-col>
            <v-col>
              <v-number-input v-model="goalStepValue" label="StepValue" controlVariant="split"/>
            </v-col>
          </v-row>

          <v-btn type="submit">Add</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
<!--  form-->
</template>

<style scoped>
.goal-toolbar {
  display: flex;
  align-items: center;
  gap: 25px;
  align-self: flex-end;
}
</style>