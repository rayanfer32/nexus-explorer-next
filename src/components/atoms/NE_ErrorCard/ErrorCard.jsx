import React from 'react';
import { BiError } from 'react-icons/bi';

export default function ErrorCard() {
  return (
    <div className="container">
      <BiError/>
      <style jsx>
        {`
          .container {
            display: flex;
            min-height: 10rem;
            justify-content: center;
            align-items: center;
            background-color: inherit;
            box-shadow: var(--card-shadow-border);
            border-radius: 0.25rem;
          }
        `}
      </style>
    </div>
  );
}
