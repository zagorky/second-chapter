import type { ConditionInfo } from '~features/filters/types/types';

import { Checkbox } from '~components/ui/checkbox';

type ConditionItemProps = {
  conditionType: [string, ConditionInfo];
};

export const ConditionItem = ({ conditionType }: ConditionItemProps) => {
  const [label, { count }] = conditionType;

  return (
    <div className="flex w-full cursor-pointer items-center justify-start gap-4 p-2 text-sm">
      <Checkbox /> {label} ({count})
    </div>
  );
};
