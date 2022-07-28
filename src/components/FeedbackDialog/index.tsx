import { useState } from 'react';
import { IoIosClose } from 'react-icons/io';

import { Button } from 'components/Button';
import { Dialog } from 'components/Dialog';
import { FeedbackField } from 'components/FeedbackField';
import type { DialogProps } from 'components/Dialog';
import type { CTAButtonProps } from 'components/CTAButton';
import { FeedbackError } from 'utils/types/errors';

export interface FeedbackDialogProps extends DialogProps {
  onSubmit: (feedback: string) => void;
  onClose: () => void;
  ctaButtonClassName?: string;
  dialogClassName?: string;
  position?: CTAButtonProps['position'];
  dialogDescription?: string;
  textFieldLabel?: string;
  sendButtonText?: string;
  isLoading: boolean;
  error?: FeedbackError;
}

export const FeedbackDialog = (props: FeedbackDialogProps) => {
  const {
    isOpen,
    onClose,
    onSubmit,
    description,
    textFieldLabel,
    sendButtonText,
    isLoading,
    error
  } = props;

  const [text, setText] = useState('');

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <Dialog
      title="Please let us know how we can improve your experience."
      isOpen={isOpen}
      actions={
        <>
          <Button
            className="py-2 px-4 text-red-600 hover:bg-red-100 rounded-lg transition-all duration-150"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            name="submit"
            role="button"
            className="py-2 px-4 font-bold text-white bg-orange-500 hover:bg-orange-600 disabled:hover:bg-orange-500 rounded-lg disabled:opacity-50
            transition-all duration-150"
            onClick={() => onSubmit(text)}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : sendButtonText}
          </Button>
        </>
      }
    >
      <Button
        className="absolute top-2 right-2 text-2xl hover:bg-gray-100 rounded-full transition-all duration-150"
        onClick={onClose}
      >
        <IoIosClose />
      </Button>
      {description && (
        <div className="mt-2">
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      )}
      <FeedbackField
        value={text}
        onChange={handleTextFieldChange}
        label={textFieldLabel}
      />
      {error && (
        <div className="mt-2">
          <p className="text-sm text-red-600">{error.title}</p>
          <p className="text-sm font-bold text-red-600">{error.message}</p>
        </div>
      )}
    </Dialog>
  );
};
