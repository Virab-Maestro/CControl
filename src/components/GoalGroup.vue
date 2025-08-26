<script setup lang="ts">
import Goal from "@/components/Goal.vue";
import type { Goal as GoalT } from "@/types";

defineProps<{
  goals: GoalT[]
}>()

</script>

<template>
  <div class="goal-group__wrapper">
    <v-chip
        class="pa-4"
        color="primary"
        label
    >
      <!-- group name -->
      <slot></slot>
    </v-chip>

    <v-card class="goal-group overflow-auto" color="primary" variant="elevated" rounded="xl" height="100%">
      <v-card-item v-if="goals.length >= 1" class="pa-5">
        <Goal v-for="goal in goals" :goal />
      </v-card-item>
      <span v-else class="goal-group__hint">No goals</span>
    </v-card>
  </div>
</template>

<style scoped>
.goal-group {
  scrollbar-width: thin;
}
.goal-group__wrapper {
  display: flex;
  flex-direction: column;
  gap: 40px;
  flex: 1;
}

.goal-group__hint {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  color: #757575;
}

@media(min-width: 1280px) {
  .goal-group__wrapper:nth-child(2) {
    flex: 2;
  }
}

</style>