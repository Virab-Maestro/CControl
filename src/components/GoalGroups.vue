<script setup lang="ts">
import GoalGroup from "@/components/GoalGroup.vue";
</script>

<template>
  <div class="wrapper">
    <div class="goal-groups">
      <GoalGroup />
      <GoalGroup />
      <GoalGroup />
    </div>
  </div>
</template>

<style scoped>
.wrapper{
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  height: 100vh;
}

.goal-groups {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 35px;
  flex: 1;
}
</style>