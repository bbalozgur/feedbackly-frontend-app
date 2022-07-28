import { useState } from 'react';

import { FeedbackDialog } from 'components/FeedbackDialog';
import { CTAButton } from 'components/CTAButton';
import { useFeedback } from 'hooks/useFeedback';
import type { CTAButtonProps } from 'components/CTAButton';

export interface FeedbackProps {
  onSubmit?: (feedback: string) => void;
  ctaButtonClassName?: string;
  dialogClassName?: string;
  position?: CTAButtonProps['position'];
  dialogDescription?: string;
  sendButtonText?: string;
}

export const Feedback = (props: FeedbackProps) => {
  const {
    ctaButtonClassName,
    dialogClassName,
    dialogDescription,
    onSubmit,
    position,
    sendButtonText = 'Send feedback'
  } = props;
  const [isOpen, setIsOpen] = useState(false);

  const { sendFeedback, isLoading, error } = useFeedback();

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (feedback: string) => {
    if (onSubmit) {
      onSubmit(feedback);
    } else {
      await sendFeedback(feedback);
    }
  };

  return (
    <>
      <CTAButton
        className={ctaButtonClassName}
        position={position}
        onClick={handleOpen}
      />
      <FeedbackDialog
        className={dialogClassName}
        isOpen={isOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        description={dialogDescription}
        sendButtonText={sendButtonText}
        isLoading={isLoading}
        error={error}
      />
    </>
  );
};
