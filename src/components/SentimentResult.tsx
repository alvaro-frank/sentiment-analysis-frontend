import React from 'react';
import type { SentimentResponse } from '../types';

interface SentimentResultProps {
  data: SentimentResponse;
}

export const SentimentResult: React.FC<SentimentResultProps> = ({ data }) => {
  const getLabelColor = (label: string) => {
    const lowerLabel = label.toLowerCase();
    if (lowerLabel.includes('pos')) return '#4ade80';
    if (lowerLabel.includes('neg')) return '#f87171'; 
    return '#fb923c'; 
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%' }}>
      <div style={{ padding: '24px', backgroundColor: '#1a1a1a', borderRadius: '8px', border: '1px solid #333', textAlign: 'center' }}>
        <div style={{ fontSize: '13px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
          Detected Sentiment
        </div>
        <div style={{ fontSize: '36px', fontWeight: 'bold', color: getLabelColor(data.label) }}>
          {data.label.toUpperCase()}
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div style={{ backgroundColor: '#1a1a1a', padding: '16px', borderRadius: '8px', border: '1px solid #333' }}>
          <div style={{ fontSize: '13px', color: '#888', marginBottom: '8px' }}>Confidence Score</div>
          <div style={{ fontSize: '28px', color: '#fff', fontWeight: '500' }}>
            {(data.sentiment_score * 100).toFixed(1)}%
          </div>
        </div>
        <div style={{ backgroundColor: '#1a1a1a', padding: '16px', borderRadius: '8px', border: '1px solid #333' }}>
          <div style={{ fontSize: '13px', color: '#888', marginBottom: '8px' }}>Text Snippet</div>
          <div style={{ fontSize: '14px', color: '#ccc', fontStyle: 'italic', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            "{data.text}"
          </div>
        </div>
      </div>
    </div>
  );
};