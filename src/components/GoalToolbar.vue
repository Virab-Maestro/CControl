<script setup lang="ts">
import useGoalStore from "@/stores/goalStore.ts";
import {ref} from "vue";
import type {Goal} from "../types";

const goalStore = useGoalStore(),
    addGoalDial = ref(false),
    newDayDial = ref(false);

//bindings to dialog form
const addGoalForm = ref(),
    goalDesc = ref<string>(),
    goalAcvType = ref<string>(),
    goalTypes = ["day", "daily", "global"],
    goalTotal = ref<number>(),
    goalUnit = ref<string>(""),
    goalCurrentStep = ref<number>(),
    goalStepValue = ref<number>();

const onNewDay = () => {
  newDayDial.value = true;
}

const newDay = () => {
  //delete day goals from store and LStorage
  goalStore.newDay();
  newDayDial.value = false;
}

const onAddGoal = () => {
  addGoalDial.value = true;
}

const addGoal = async () => {
  //validate
  const { valid: isFormValid } = await addGoalForm.value.validate();
  if(!isFormValid) {
    return;
  }

  //add to goalStore.goalList
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

const rules = {
  goalDesc: [
    (v) => !!v || "Какова цель",
    (v) => v.length > 2 || "Мин. кол-во символов - 3"
  ],
  goalAcvType: [
    (v) => !!v || "Какой тип цели",
  ],
  goalTotal: [
    (v) => v > 0 || "Заполните поле",
  ],
  goalUnit: [
    (v) => !!v || "Заполните поле",
  ],
  goalCurrentStep: [
    (v) => v >= 0 || "Корректно заполните поле",
    (v) => v <= goalTotal.value || "Current step не может быть больше total",
  ],
  goalStepValue: [
    (v) => v > 0 || "Корректно заполните поле",
    (v) => v < goalTotal.value || "Step value не может быть больше total",
  ],
}

</script>

<template>
  <div class="goal-toolbar">
    <v-btn color="info" icon="mdi-plus" @click="onAddGoal"/>
    <v-btn color="info" append-icon="mdi-autorenew" @click="onNewDay">New Day</v-btn>
  </div>

<!-- newDay dialog -->
  <v-dialog v-model="newDayDial" :max-width="500">
    <v-card>
      <v-card-text>
        Вы уверены? Все цели текущего дня будут стерты.
      </v-card-text>
      <v-card-actions>
        <v-btn @click="newDayDial = false">Не уверен</v-btn>
        <v-btn @click="newDay">Уверен</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

<!-- addGoal dialog -->
  <v-dialog class="add-goal-dialog" v-model="addGoalDial" :max-width="500">
    <v-card>
      <v-card-text>
        <v-form ref="addGoalForm" @submit.prevent="addGoal">
          <v-row><v-text-field v-model="goalDesc" label="Goal" :rules="rules.goalDesc" /></v-row>
          <v-row><v-select v-model="goalAcvType" :items="goalTypes" :rules="rules.goalAcvType" /></v-row>
          <v-row>
            <v-col>
              <v-number-input v-model="goalTotal" label="Total" controlVariant="split" :rules="rules.goalTotal" />
            </v-col>
            <v-col>
              <v-text-field v-model="goalUnit" label="Unit" :rules="rules.goalUnit" />
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-number-input v-model="goalCurrentStep" label="CurrentStep" controlVariant="split" :rules="rules.goalCurrentStep"/>
            </v-col>
            <v-col>
              <v-number-input v-model="goalStepValue" label="StepValue" controlVariant="split" :rules="rules.goalStepValue" />
            </v-col>
          </v-row>

          <v-btn type="submit">Add</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style>
.goal-toolbar {
  display: flex;
  align-items: center;
  gap: 25px;
  align-self: flex-end;
}

.add-goal-dialog .v-overlay__content {
  position: absolute;
  right: 0;
  bottom: 80px;
}
</style>