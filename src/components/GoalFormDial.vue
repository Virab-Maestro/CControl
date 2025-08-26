<script setup lang="ts">
import { ref } from "vue";
import useGoalStore from "@/stores/goalStore.ts";
import type { Goal } from "@/types";

const props = defineProps<{
  formType: "add" | "edit",
  goal?: Goal;
}>()

const goalStore = useGoalStore();
const addGoalDial = defineModel();

//bindings to dialog form
const addGoalForm = ref(),
    goalDesc = ref<string>(),
    goalAcvType = ref<string>("day"),
    goalTypes = ["day", "daily", "global"],
    goalTotal = ref<number>(0),
    goalUnit = ref<string>(),
    goalCurrentStep = ref<number>(0),
    goalStepValue = ref<number>(1);

if(props.formType === "edit") {
  goalDesc.value = props.goal.desc;
  goalAcvType.value = props.goal.type;
  goalTotal.value = props.goal.total;
  goalUnit.value = props.goal.unit;
  goalCurrentStep.value = props.goal.currentStep;
  goalStepValue.value = props.goal.stepValue;
}

const addGoal = async () => {
  //validate
  const { valid: isFormValid } = await addGoalForm.value.validate();
  if(!isFormValid) {
    return;
  }

  //add to goalStore.goalList
  const goal: Goal = {
    id: Math.floor(Math.random() * 1000),
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
  refreshForm();
}

const editGoal = async () => {
  //validate
  const { valid: isFormValid } = await addGoalForm.value.validate();
  if(!isFormValid) {
    return;
  }

  const goal: Goal = {
    id: props.goal.id,
    type: goalAcvType.value,
    desc: goalDesc.value,
    unit: goalUnit.value,
    total: goalTotal.value,
    currentStep: goalCurrentStep.value,
    stepValue: goalStepValue.value,
  };

  goalStore.editGoal(props.goal.id, goal);
  addGoalDial.value = false;
}

const refreshForm = () => {
  goalDesc.value = null;
  goalAcvType.value = 'day';
  goalUnit.value = null;
  goalTotal.value = 0;
  goalCurrentStep.value = 0;
  goalStepValue.value = 1;
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
  <!-- addGoal dialog -->
  <v-dialog
      class="add-goal-dialog"
      v-model="addGoalDial"
      :max-width="500"
      :scrim="false">
    <v-card
        :title="formType === 'add' ? 'Set Goal' : 'Edit Goal'"
        color="info">
      <!-- close -->
      <template v-slot:append>
        <v-icon class="cursor-pointer" icon="mdi-window-close" @click="addGoalDial = false" />
      </template>

      <v-card-text>
        <v-form class="mt-6" ref="addGoalForm" @submit.prevent="() => formType === 'add' ? addGoal() : editGoal()">
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
              <v-btn type="submit">{{ formType === "add" ? "Add" : "Edit" }}</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.add-goal-dialog .v-overlay__content {
  position: absolute;
  right: 0;
  bottom: 80px;
}
</style>