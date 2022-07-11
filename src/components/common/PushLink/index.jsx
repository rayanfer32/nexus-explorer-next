import { useRouter } from 'next/router';
import React from 'react';

const PushLink = ({ children, href = '', ...props }) => {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    href && router.push(href);
  };

  return (
    <span {...props} onClick={handleClick}>
      {children}
      <style jsx>{`
        span {
          cursor: pointer;
        }
      `}</style>
    </span>
  );
};

export default PushLink;
