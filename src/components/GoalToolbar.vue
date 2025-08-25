<script setup lang="ts">
import GoalFormDial from "@/components/GoalFormDial.vue";
import useGoalStore from "@/stores/goalStore.ts";
import { ref, watch } from "vue";
import { useTheme } from "vuetify";

const goalStore = useGoalStore(),
    theme = useTheme(),
    addGoalDial = ref(),
    newDayDial = ref(false),
    appThemes = ['dark', 'neon', 'warm', 'muted'],
    activeTheme = ref('dark');

//updating app theme
watch(activeTheme, () => {
  theme.global.name.value = activeTheme.value + "Theme";
})

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
        Do you wanna start a new day?
      </v-card-text>
      <v-card-actions>
        <v-btn @click="newDayDial = false">No</v-btn>
        <v-btn @click="newDay">Yes</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- addGoal dialog -->
  <GoalFormDial v-model="addGoalDial" form-type="add"/>
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
