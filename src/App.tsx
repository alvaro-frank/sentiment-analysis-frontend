/**
 * @file App.tsx
 * @description Main application component demonstrating state management for the Sentiment Analysis.
 */

import React from 'react';
import { useSentiment } from './hooks/useSentiment';
import { SentimentForm } from './components/SentimentForm';
import { SentimentResult } from './components/SentimentResult';
import type { SentimentRequest } from './types';

const cardStyle = { backgroundColor: '#111111', padding: '24px', borderRadius: '12px', border: '1px solid #222' };

/**
 * The root component of the Single Page Application.
 * @returns {JSX.Element} The rendered application layout.
 */
const App: React.FC = () => {
  const { data, isLoading, error, executeAnalysis, resetAnalysis } = useSentiment();

  /**
   * Handles the form submission by invoking the custom hook's execute function.
   * @param {SentimentRequest} payload - The request data collected from the form.
   */
  const handleFormSubmit = (payload: SentimentRequest): void => {
    executeAnalysis(payload);
  };

  /**
   * Clears the fetched data and the form.
   */
  const handleClear = (): void => {
    resetAnalysis();
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#000000', padding: '40px 20px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <main style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        <header style={{ marginBottom: '40px', textAlign: 'center' }}>
          <h1 style={{ margin: 0, color: '#ffffff', fontSize: '32px', letterSpacing: '-0.5px' }}>Sentiment Analysis AI</h1>
          <p style={{ color: '#888', marginTop: '12px', fontSize: '16px' }}>Understand the emotion behind your text in real-time.</p>
        </header>
        
        <section style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 1.2fr)', gap: '24px', alignItems: 'stretch' }}>
          
          <aside style={cardStyle}>
            <SentimentForm onSubmit={handleFormSubmit} onClear={handleClear} isLoading={isLoading} />
            {error && (
              <div style={{ marginTop: '20px', padding: '12px', backgroundColor: '#3a0000', color: '#ff8888', borderRadius: '6px', fontSize: '14px', border: '1px solid #ff0000' }}>
                <strong>Error:</strong> {error.message}
              </div>
            )}
          </aside>

          <article style={{ ...cardStyle, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ margin: '0 0 16px 0', fontSize: '18px', color: '#ffffff' }}>Analysis Results</h2>
            
            {data ? (
              <SentimentResult data={data} />
            ) : (
              <div style={{ flex: 1, minHeight: '250px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0a0a0a', borderRadius: '8px', border: '2px dashed #333' }}>
                <span style={{ fontSize: '48px', marginBottom: '16px' }}>🧠</span>
                <p style={{ margin: 0, color: '#666', fontSize: '15px', fontWeight: 500 }}>Enter text and analyze to see the results here.</p>
              </div>
            )}
          </article>
          
        </section>
      </main>
    </div>
  );
};

export default App;