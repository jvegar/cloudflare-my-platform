export interface SkillItem {
  id: string;
  name: string;
  percentage: number;
  isMainSkill: boolean;
  lastWeek?: number;
  lastMonth?: number;
}
