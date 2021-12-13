export const Keyboard_arrow = ({
  className = '',
  color = 'white',
  scale = 16,
}) => {
  return (
    <svg
      className={className}
      width={scale}
      height={scale}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.59 3.41L9.17 8L4.59 12.59L6 14L12 8L6 2L4.59 3.41Z"
        fill={color}
      />
    </svg>
  );
};
