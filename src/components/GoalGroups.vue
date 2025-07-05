<script setup lang="ts">
import GoalGroup from "@/components/GoalGroup.vue";
import useGoalStore from "@/stores/goalStore.ts";

//types
import {type Goal, type GoalTypes} from "@/types";

const goalStore = useGoalStore();

function filterGoals(goalType: GoalTypes):Goal[] | [] {
  return goalStore.goalList.filter(g => g.type === goalType)
}
</script>

<template>
  <div class="wrapper">
    <div class="goal-groups">
      <!-- why can't use enums as filterGoals argument? -->
      <GoalGroup :goals="filterGoals('day')">Day</GoalGroup>
      <GoalGroup :goals="filterGoals('global')">Global</GoalGroup>
      <GoalGroup :goals="filterGoals('daily')">Daily</GoalGroup>
    </div>
  </div>
</template>

<style scoped>
.wrapper{
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  height: 100vh;
  padding: 20px 70px;
  background-color: #424242;
}

.goal-groups {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 35px;
  flex: 1;
}
</style>