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
    isAuthorized = ref(false);

//updating app theme
const updateActvTheme = (newTheme) => {
  theme.global.name.value = newTheme + "Theme";
}

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
    <v-btn
        :icon="isAuthorized ? 'mdi-account-outline' : 'mdi-account-question-outline'"
    ></v-btn>

    <div class="goal-toolbar__inner">
      <v-menu
          location="top center"
      >
        <template v-slot:activator="{props}">
          <v-btn v-bind="props" icon="">
            <v-sheet
                rounded="circle"
                class="pa-2"
                :color="theme.current.value.colors.primary"
            />
          </v-btn>
        </template>

        <v-list
            class="overflow-hidden"
            @click:select="(selScheme) => updateActvTheme(selScheme.id)"
        >
          <v-list-item
              v-for="(scheme, idx) in appThemes"
              :key="idx"
              :value="scheme"
              rounded="circle"
              max-width="48px"
          >
            <v-sheet
                rounded="circle"
                width="16px"
                height="16px"
                :color="theme.computedThemes.value[(scheme + 'Theme')].colors.primary"
            />
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn color="info" icon="mdi-autorenew" @click="onNewDay" />
      <v-btn color="info" icon="mdi-plus" @click="onAddGoal"/>
    </div>
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
  justify-content: space-between;
  gap: 20px;
  align-items: stretch;
}

.goal-toolbar__inner {
  max-width: 100%;
  display: flex;
  align-items: stretch;
  justify-content: end;
  gap: 25px;
}

.add-goal-dialog .v-overlay__content {
  position: absolute;
  right: 0;
  bottom: 80px;
}
</style>
