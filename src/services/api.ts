/**
 * @file api.ts
 * @description Service layer for handling HTTP communication with the FastAPI backend.
 */

import type { SentimentRequest, SentimentResponse } from '../types';

/**
 * Sends text to the backend to calculate the sentiment analysis.
 * @param {SentimentRequest} payload - The text string to be analyzed.
 * @returns {Promise<SentimentResponse>} The calculated sentiment label and score.
 * @throws {Error} When the HTTP response indicates a failure or the network request aborts.
 */
export const fetchSentimentAnalysis = async (payload: SentimentRequest): Promise<SentimentResponse> => {
  const response = await fetch('/predict', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch sentiment analysis from the server.');
  }

  return response.json();
};