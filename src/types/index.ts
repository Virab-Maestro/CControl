export interface Goal {
    id: number;
    type: GoalTypes;
    desc: string;
    unit: string;
    total: number;
    currentStep: number;
    stepValue: number;
}

export enum GoalTypes {
    DAY = 'day',
    GLOBAL = 'global',
    DAILY = 'daily',
}