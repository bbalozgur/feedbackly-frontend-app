import { useState, useRef } from 'react';

import { FeedbackError } from 'utils/types/errors';

export const useFeedback = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<undefined | FeedbackError>();
  const [feedback, setFeedback] = useState<null | string>(null);

  const controllerRef = useRef<AbortController | null>();

  const sendFeedback = async (feedback: string) => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    const controller = new AbortController();
    controllerRef.current = controller;
    setIsLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_FEEDBACK_SERVICE}/v1/feedback`,
        {
          method: 'POST',
          signal: controllerRef.current?.signal,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            feedback
          })
        }
      );
      const feedbackResponse = await res.json();
      setFeedback(feedbackResponse);

      controllerRef.current = null;
    } catch (e: any) {
      setError({
        message: e.message,
        title: `Failed to send feedback:`
      });
    }

    setIsLoading(false);
  };

  return {
    feedback,
    isLoading,
    error,
    sendFeedback
  };
};
