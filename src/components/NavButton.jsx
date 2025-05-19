import React, { useState } from 'react';

export default function NavButton({ label }) {
    const [count, setCount] = useState(0);

    return (
        <button
            onClick={() => setCount(c => c + 1)}
            style={{
                display: 'inline-block',
                padding: '0.5em 1em',
                background: count % 2 === 0 ? '#0070f3' : '#e00',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
            }}
        >
            {label}: {count}
        </button>
    );
}
