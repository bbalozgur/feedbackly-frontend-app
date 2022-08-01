import { useMemo } from 'react';
import { BiCommentDetail } from 'react-icons/bi';

import { Button } from 'components/Button';
import { getPositionClassName } from 'utils/getPositionClassName';
import { classNames } from 'utils';

export interface CTAButtonProps {
  className?: string;
  onClick?: () => void;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export const CTAButton = (props: CTAButtonProps) => {
  const { className, onClick, position = 'bottom-right' } = props || {};

  const defaultOnClick = () => {
    console.log('CTAButton: onClick');
  };

  const positionClass = getPositionClassName(position);

  return (
    <Button
      className={classNames(
        positionClass,
        className ||
          'fixed p-4 z-10 text-3xl text-center hover:bg-orange-600 hover:text-white hover:scale-110 rounded-full transition-all duration-150'
      )}
      onClick={onClick ?? defaultOnClick}
      aria-label="Send your feedback"
      title="Send your feedback"
    >
      <BiCommentDetail />
    </Button>
  );
};
