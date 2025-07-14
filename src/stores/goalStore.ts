import { defineStore } from "pinia"
import { ref } from "vue"

//types
import type { Goal } from "@/types";

export const useGoalStore = defineStore("goal", () => {
    const goalList = ref<Goal[] | []>([
        {
            type: "daily",
            desc: "watch webpack video",
            unit: "bar",
            total: 10,
            currentStep: 1,
            stepValue: 1,
        },
        {
            type: "global",
            desc: "Build a project",
            unit: "%",
            total: 100,
            currentStep: 50,
            stepValue: 25,
        },
        {
            type: "day",
            desc: "Apply to 200 vacancies",
            unit: "ps",
            total: 150,
            currentStep: 50,
            stepValue: 10,
        },
    ])

    const newDay = () => {
        goalList.value = goalList.value.filter((g) => g.type !== "day");
    }

    return {
        goalList,
        newDay,
    }
})

export default useGoalStore