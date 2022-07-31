import { useRouter } from 'next/router';
import React from 'react';

const PushLink = ({ children, href = '', ...props }) => {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    href && router.push(href);
  };

  return (
    <a href={href} {...props} onClick={handleClick}>
      {children}
      <style jsx>{`
        span {
          cursor: pointer;
        }
      `}</style>
    </a>
  );
};

export default PushLink;
