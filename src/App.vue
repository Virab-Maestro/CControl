<script setup lang="ts">
import GoalGroups from "@/components/GoalGroups.vue"
import GoalToolbar from "@/components/GoalToolbar.vue";
</script>

<template>
  <div class="wrapper">
    <GoalGroups />
    <GoalToolbar />
  </div>
</template>

<style scoped>
.wrapper{
  display: flex;
  gap: 50px;
  flex-direction: column;
  justify-content: stretch;
  height: 100vh;
  padding: 20px 20px;
  background-color: rgb(var(--v-theme-background));
}
</style>