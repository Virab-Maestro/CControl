import { defineStore } from "pinia"
import { ref, watch } from "vue"

//types
import type { Goal } from "@/types";

export const useGoalStore = defineStore("goal", () => {
    const goalList = ref<Goal[] | []>([])

    watch(goalList, () => {
        localStorage.setItem("goals", JSON.stringify(goalList.value))
        console.log("goalList has been changed")
    }, { deep: true })

    const newDay = () => {
        goalList.value = goalList.value
            .filter((g) => g.type !== "day")
            .map((g) => g.type === "daily" ? {...g, currentStep: 0} : g)
    }

    return {
        goalList,
        newDay,
    }
})

export default useGoalStore