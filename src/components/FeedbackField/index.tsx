import { CharacterLimit } from 'components/CharacterLimit';

interface FeedbackFieldProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  label?: string;
}

export const FeedbackField = ({
  value,
  onChange,
  label,
  placeholder = 'You can type your feedback here...',
  maxLength = 2000,
  ...props
}: FeedbackFieldProps) => {
  return (
    <div className="flex flex-col my-4">
      {label && (
        <label htmlFor="feedback-input" className="text-sm font-semibold">
          {label}
        </label>
      )}
      <textarea
        id="feedback-input"
        className="py-2 px-4 w-full h-32 min-h-0 max-h-64 rounded-lg border border-gray-300"
        placeholder={placeholder}
        onChange={onChange}
        maxLength={maxLength}
        {...props}
      />
      <CharacterLimit
        className={
          value.length / maxLength >= 0.65
            ? 'h-auto opacity-100'
            : 'h-0 opacity-0'
        }
        length={value.length}
        maxLength={maxLength}
      />
    </div>
  );
};
