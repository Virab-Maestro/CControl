<script setup lang="ts">
import GoalGroup from "@/components/GoalGroup.vue";
import useGoalStore from "@/stores/goalStore.ts";
import { onMounted } from "vue";
//types
import {type Goal, type GoalTypes} from "@/types";

const goalStore = useGoalStore();

function filterGoals(goalType: GoalTypes):Goal[] | [] {
  return goalStore.goalList.filter(g => g.type === goalType)
}

onMounted(() => {
  if(window.innerWidth <= 1280) {
    goalStore.actvGoalMob = "day";
  }
  goalStore.goalList = JSON.parse(localStorage.getItem("goals")) || [];
})

function isActive(t) {
  if(goalStore.actvGoalMob === t || goalStore.actvGoalMob === "any") {
    return true;
  }
}
</script>

<template>
  <div class="goal-groups-wrapper">
    <div class="goal-groups">
      <!-- why can't use enums as filterGoals argument? -->
      <GoalGroup v-show="isActive('day')" :goals="filterGoals('day')"><v-icon icon="mdi-sun-clock-outline" start /> Day</GoalGroup>
      <GoalGroup v-show="isActive('global')" :goals="filterGoals('global')"><v-icon icon="mdi-hiking" start /> Global</GoalGroup>
      <GoalGroup v-show="isActive('daily')" :goals="filterGoals('daily')"><v-icon icon="mdi-repeat-variant" start /> Daily</GoalGroup>
    </div>

    <div class="goal-groups__nav">
      <v-btn density="compact" icon="mdi-sun-clock-outline" @click="goalStore.actvGoalMob='day'"/>
      <v-btn density="compact" icon="mdi-hiking" @click="goalStore.actvGoalMob='global'"/>
      <v-btn density="compact" icon="mdi-repeat-variant" @click="goalStore.actvGoalMob='daily'"/>
    </div>
  </div>
</template>

<style scoped>
.goal-groups-wrapper {
  position: relative;
  max-height: calc(100% - 118px);
  flex: 1;
}

.goal-groups {
  max-height: 100%;
  min-height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 35px;
}

.goal-groups__nav {
  display: none;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
}

@media(max-width: 1280px) {
  .goal-groups {
    margin-right: 38px;
  }

  .goal-groups__nav {
    display: flex;
  }
}
</style>