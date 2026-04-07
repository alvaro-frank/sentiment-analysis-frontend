/**
 * @file index.ts
 * @description Type definitions mapping the backend Data Transfer Objects (DTOs) for the frontend application.
 */

export interface SentimentRequest {
  text: string;
}

export interface SentimentResponse {
  text: string;
  sentiment_score: number;
  label: string;
}