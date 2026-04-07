import React, { useState } from 'react';
import type { SentimentRequest } from '../types';

interface SentimentFormProps {
  onSubmit: (payload: SentimentRequest) => void;
  onClear: () => void;
  isLoading: boolean;
}

export const SentimentForm: React.FC<SentimentFormProps> = ({ onSubmit, onClear, isLoading }) => {
  const [text, setText] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit({ text });
    }
  };

  const handleClear = () => {
    setText('');
    onClear();
  };

  const inputStyle = { width: '100%', padding: '12px', backgroundColor: '#222', color: '#fff', border: '1px solid #333', borderRadius: '6px', minHeight: '150px', marginBottom: '16px', boxSizing: 'border-box' as const, fontFamily: 'inherit', resize: 'vertical' as const };
  const buttonStyle = { padding: '12px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: 600, transition: 'background-color 0.2s' };

  return (
    <form onSubmit={handleSubmit}>
      <h2 style={{ margin: '0 0 16px 0', fontSize: '18px', color: '#ffffff' }}>Input Text</h2>
      
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste the text you want to analyze here..."
        style={inputStyle}
        disabled={isLoading}
      />
      
      <div style={{ display: 'flex', gap: '12px' }}>
        <button 
          type="submit" 
          disabled={isLoading || !text.trim()} 
          style={{ ...buttonStyle, backgroundColor: isLoading || !text.trim() ? '#444' : '#3b82f6', color: '#fff', flex: 1 }}
        >
          {isLoading ? 'Analyzing...' : 'Analyze Sentiment'}
        </button>
        <button 
          type="button" 
          onClick={handleClear} 
          disabled={isLoading} 
          style={{ ...buttonStyle, backgroundColor: '#333', color: '#fff' }}
        >
          Clear
        </button>
      </div>
    </form>
  );
};