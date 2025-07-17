<script setup lang="ts">
import useGoalStore from "@/stores/goalStore.ts";
import { ref, watch } from "vue";
import { useTheme } from "vuetify";
import type { Goal } from "../types";

const goalStore = useGoalStore(),
    theme = useTheme(),
    addGoalDial = ref(false),
    newDayDial = ref(false),
    appThemes = ['dark', 'neon', 'warm', 'muted'],
    activeTheme = ref('dark');

//updating app theme
watch(activeTheme, () => {
  theme.global.name.value = activeTheme.value + "Theme";
})

//bindings to dialog form
const addGoalForm = ref(),
    goalDesc = ref<string>(),
    goalAcvType = ref<string>(),
    goalTypes = ["day", "daily", "global"],
    goalTotal = ref<number>(0),
    goalUnit = ref<string>(),
    goalCurrentStep = ref<number>(0),
    goalStepValue = ref<number>(0);

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
  const goal: Goal = {
    type: goalAcvType.value,
    desc: goalDesc.value,
    unit: goalUnit.value,
    total: goalTotal.value,
    currentStep: goalCurrentStep.value,
    stepValue: goalStepValue.value,
  };
  goalStore.goalList.push(goal)

  //close dialog
  addGoalDial.value = false;

  //refresh from
  goalDesc.value = null;
  goalAcvType.value = null;
  goalUnit.value = null;
  goalTotal.value = 0;
  goalCurrentStep.value = 0;
  goalStepValue.value = 0;
}

const rules = {
  goalDesc: [
    (v) => !!v?.trim().length || "what's the goal",
    (v) => v.length >= 3 || "min char length - 3"
  ],
  goalAcvType: [
    (v) => !!v || "what's the goal's type",
  ],
  goalTotal: [
    (v) => v >= 1 || "min value - 1",
  ],
  goalUnit: [
    (v) => !!v?.trim().length || "min char length - 1",
    (v) => v.length <= 10 || "max char length - 10",
  ],
  goalCurrentStep: [
    (v) => v >= 0 || "min value - 0",
    (v) => v <= goalTotal.value || "current step can't be more then total",
  ],
  goalStepValue: [
    (v) => v > 0 || "min value - 0",
  ],
}

</script>

<template>
  <div class="goal-toolbar">
    <v-select
        v-model="activeTheme"
        bg-color="info"
        :items="appThemes"
        density="compact"
        width="150"
        rounded="lg"
        variant="solo-filled"
        hide-details
    />
    <v-btn color="info" append-icon="mdi-autorenew" @click="onNewDay">New Day</v-btn>
    <v-btn color="info" icon="mdi-plus" @click="onAddGoal"/>
  </div>

<!-- newDay dialog -->
  <v-dialog v-model="newDayDial" :max-width="500" :scrim="false">
    <v-card color="info">
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