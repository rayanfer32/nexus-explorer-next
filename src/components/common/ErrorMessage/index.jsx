import React from 'react';

export default function ErrorMessage({ error }) {
  return (
    <div
      style={{
        background: 'var(--theme-tab-bg)',
        padding: '1rem',
        borderRadius: '0.5rem',
        boxShadow: 'var(--card-shadow)',
      }}>
      <pre
        style={{
          color: 'var(--theme-tab-text)',
          fontSize: '1rem',
        }}>
        {JSON.stringify(error, null, 2)}
      </pre>
    </div>
  );
}
