export interface DialogProps {
  title?: string;
  hideTitle?: boolean;
  description?: string;
  isOpen?: boolean;
  className?: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

const DialogOverlay = () => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
  );
};

const DialogTitle = ({
  icon,
  children
}: {
  icon?: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex gap-2 items-center">
      {icon && (
        <div className="flex justify-center items-center p-2 text-xl bg-red-100 rounded-full sm:mx-0 sm:mr-4 sm:w-10 sm:h-10 ">
          {icon}
        </div>
      )}
      <div className="text-center sm:mt-0 sm:text-left">
        <h3
          className="text-lg font-medium leading-6 text-gray-900"
          id="dialog-title"
        >
          {children}
        </h3>
      </div>
    </div>
  );
};

const DialogBody = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="overflow-y-auto fixed inset-0 ">
      <div className="flex z-20 justify-center items-center p-4 min-h-full text-center sm:items-center sm:p-0">
        <div className="overflow-hidden relative text-left bg-white rounded-lg shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          {children}
        </div>
      </div>
    </div>
  );
};

const DialogActions = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="divider" />
      <div className="flex flex-col-reverse gap-2 justify-end p-4 transition-all duration-200 sm:flex-row sm:px-6 bg-grey-50">
        {children}
      </div>
    </>
  );
};

export const Dialog = ({
  title = 'Send your feedback',
  hideTitle = false,
  icon,
  actions,
  className,
  isOpen = true,
  children
}: DialogProps) => {
  if (!isOpen) {
    return null;
  }
  return (
    <div
      className={className ?? 'relative z-10'}
      role="feedback-dialog"
      aria-modal="true"
    >
      <DialogOverlay />
      <DialogBody>
        <div className="flex flex-col items-start px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
          {!hideTitle && <DialogTitle icon={icon}>{title}</DialogTitle>}
          <div className="flex flex-col w-full">{children}</div>
        </div>
        {actions && <DialogActions>{actions}</DialogActions>}
      </DialogBody>
    </div>
  );
};
