import { defineStore } from "pinia"
import { ref, watch } from "vue"

//types
import type { Goal } from "@/types";

export const useGoalStore = defineStore("goal", () => {
    const goalList = ref<Goal[] | []>([]),
        actvGoalMob = ref<string>("any")

    watch(goalList, () => {
        localStorage.setItem("goals", JSON.stringify(goalList.value))
        console.log("goalList has been changed")
    }, { deep: true })

    const newDay = () => {
        goalList.value = goalList.value
            .filter((g) => g.type !== "day")
            .map((g) => g.type === "daily" ? {...g, currentStep: 0} : g)
    }

    const editGoal = (id: number, goal: Goal) => {
        const editingGoalIdx = goalList.value.findIndex(g => g.id === id);
        goalList.value[editingGoalIdx] = goal;
    }

    const rmGoal = (id: number) => {
        const rmGoalIdx = goalList.value.findIndex(g => g.id === id);
        goalList.value.splice(rmGoalIdx, 1);
    }

    return {
        goalList,
        actvGoalMob,
        newDay,
        editGoal,
        rmGoal,
    }
})

export default useGoalStore