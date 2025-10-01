export default function Star17({
  color,
  size,
  stroke,
  strokeWidth,
  pathClassName,
  width,
  height,
  ...props
}: React.SVGProps<SVGSVGElement> & {
  color?: string;
  size?: number;
  stroke?: string;
  pathClassName?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 200 200"
      width={size ?? width}
      height={size ?? height}
      {...props}
    >
      <path
        fill={color ?? 'currentColor'}
        stroke={stroke}
        strokeWidth={strokeWidth}
        className={pathClassName}
        d="m100 5 14.542 59.893 52.633-32.068-32.068 52.633L195 100l-59.893 14.542 32.068 52.633-52.633-32.068L100 195l-14.542-59.893-52.633 32.068 32.068-52.633L5 100l59.893-14.542-32.068-52.633 52.633 32.068z"
      />
    </svg>
  );
}
