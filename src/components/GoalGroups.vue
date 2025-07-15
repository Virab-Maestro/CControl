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
  goalStore.goalList = JSON.parse(localStorage.getItem("goals")) || [];
})
</script>

<template>
  <div class="goal-groups">
    <!-- why can't use enums as filterGoals argument? -->
    <GoalGroup :goals="filterGoals('day')"><v-icon icon="mdi-sun-clock-outline" start /> Day</GoalGroup>
    <GoalGroup :goals="filterGoals('global')"><v-icon icon="mdi-hiking" start /> Global</GoalGroup>
    <GoalGroup :goals="filterGoals('daily')"><v-icon icon="mdi-repeat-variant" start /> Daily</GoalGroup>
  </div>
</template>

<style scoped>
.goal-groups {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 35px;
  flex: 1;
}

</style>