export const getPositionClassName = (position?: string) => {
  if (position) {
    return position
      .split('-')
      .map((pos) => `${pos}-4`)
      .join(' ');
  }

  return 'bottom-4 right-4';
};
