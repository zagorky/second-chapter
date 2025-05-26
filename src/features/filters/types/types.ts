export type CategoryInfo = {
  id: string;
  name: string;
  count: number;
  parentId?: string;
  children: CategoryInfo[];
};

export type ConditionInfo = {
  id: string;
  count: number;
};
