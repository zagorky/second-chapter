import { Badge } from '~components/ui/badge/badge';
import { withDataTestId } from '~utils/helpers';
import { HeartPulse } from 'lucide-react';

type BadgeConditionProps = {
  label: string;
  conditionKey: string;
  id: string;
  className?: string;
};

const CONDITIONS_TOTAL = 4;
const ICON_SIZE = 16;
const STROKE_WIDTH = 1;
const STROKE_COLOR = 'var(--color-border)';
const FILLED_ICON_COLOR = 'text-main';
const EMPTY_ICON_COLOR = 'text-border';

type ConditionIconProps = {
  isFilled: boolean;
  index: number;
};

const ConditionIcon = ({ isFilled, index }: ConditionIconProps) => (
  <div key={String(index)} className={isFilled ? FILLED_ICON_COLOR : EMPTY_ICON_COLOR}>
    <HeartPulse size={ICON_SIZE} stroke={STROKE_COLOR} strokeWidth={STROKE_WIDTH} fill="currentColor" />
  </div>
);

export const BadgeCondition = ({ label, conditionKey, id, className }: BadgeConditionProps) => {
  const filledIconsAmount = CONDITIONS_TOTAL - Number(conditionKey);
  const emptyIconsAmount = CONDITIONS_TOTAL - filledIconsAmount;

  return (
    <Badge className={className} {...withDataTestId(`${id}-condition`)}>
      {label}
      <div className="flex items-center gap-0.5 pl-1">
        {Array.from({ length: filledIconsAmount }, (_, index) => (
          <ConditionIcon key={`filled-${String(index)}`} isFilled={true} index={index} />
        ))}
        {Array.from({ length: emptyIconsAmount }, (_, index) => (
          <ConditionIcon key={`empty-${String(index)}`} isFilled={false} index={index} />
        ))}
      </div>
    </Badge>
  );
};
