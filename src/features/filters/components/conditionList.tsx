import type { ConditionInfo } from '~features/filters/types/types';

import { ConditionItem } from '~features/filters/components/conditionItem';

type ConditionListProps = {
  conditions: [string, ConditionInfo][];
};

export const ConditionList = ({ conditions }: ConditionListProps) => {
  return (
    <>
      <h2>Conditions</h2>
      <ul className="flex flex-1 flex-col">
        {conditions.map(([label, { id, count }]) => (
          <li key={id} className="text-sm">
            <ConditionItem conditionType={[label, { id, count }]} />
          </li>
        ))}
      </ul>
    </>
  );
};
