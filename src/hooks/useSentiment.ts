/**
 * @file useSentiment.ts
 * @description Custom React hook to manage the state and side-effects of the sentiment analysis request.
 */

import { useState, useCallback } from 'react';
import type { SentimentRequest, SentimentResponse } from '../types';
import { fetchSentimentAnalysis } from '../services/api';

interface UseSentimentResult {
  data: SentimentResponse | null;
  isLoading: boolean;
  error: Error | null;
  executeAnalysis: (payload: SentimentRequest) => Promise<void>;
  resetAnalysis: () => void;
}

/**
 * Manages loading state, error handling, and data storage for the sentiment analysis process.
 * @returns {UseSentimentResult} An object containing the current operation state, execution, and reset triggers.
 */
export const useSentiment = (): UseSentimentResult => {
  const [data, setData] = useState<SentimentResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Triggers the API call to fetch the sentiment data, updating the state accordingly.
   * @param {SentimentRequest} payload - The request data required by the backend.
   * @returns {Promise<void>}
   */
  const executeAnalysis = useCallback(async (payload: SentimentRequest): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await fetchSentimentAnalysis(payload);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred.'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Clears the current analysis data and any existing errors, resetting to the initial state.
   * @returns {void}
   */
  const resetAnalysis = useCallback((): void => {
    setData(null);
    setError(null);
  }, []);

  return { data, isLoading, error, executeAnalysis, resetAnalysis };
};