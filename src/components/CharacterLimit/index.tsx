export const CharacterLimit = ({
  length,
  maxLength,
  className
}: {
  length: number;
  maxLength: number;
  className?: string;
}) => {
  const getColorClass = () => {
    if (length > maxLength) {
      return 'text-red-500';
    }
    if (length > maxLength * 0.75) {
      return 'text-orange-500';
    }

    return 'text-gray-500';
  };

  return (
    <div className={'flex justify-end items-center'}>
      <div
        className={
          className ??
          `text-sm ${getColorClass()} transition-opacity duration-500`
        }
      >
        {length} / {maxLength}
      </div>
    </div>
  );
};
