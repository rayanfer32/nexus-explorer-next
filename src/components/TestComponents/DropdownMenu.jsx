import React from 'react';
import { FiChevronDown } from 'react-icons/fi';

export default function DropdownMenu({ title = 'Dropdown', children }) {
  return (
    <div className="dropdown">
      <button className="dropbtn">
        {title}
        <FiChevronDown size="1rem" />
      </button>
      <div className="dropdown-content">
        {Array.isArray(children) && children?.flat()?.map((child, idx) => {
          return (
            <div key={idx} className="dropdown-item">
              {child}
            </div>
          );
        })}
      </div>

      <style jsx>{`
        /* Dropdown Button */
        .dropbtn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: max-content;
          gap: 0.5rem;
          background-color: var(--theme-tab-background);
          color: var(--theme-page-text);
          padding: 0.5rem;
          font-family: inherit;
          xborder: 0.1rem solid var(--theme-page-border);
          border: none;
          border-radius: 0.5rem;
          margin-bottom: 0.25rem;
        }

        /* The container <div> - needed to position the dropdown content */
        .dropdown {
          position: relative;
          display: inline-block;
          transition: all 0.5s ease;
        }

        /* Dropdown Content (Hidden by Default) */
        .dropdown-content {
          xdisplay: none;
          max-height: 0;
          opacity: 0;
          position: absolute;
          background-color: var(--theme-page-background);
          min-width: 8rem;
          box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
          z-index: 20;
          border-radius: 0.5rem;
          transition: all 0.5s ease;
        }

        /* Links inside the dropdown */
        .dropdown-item {
          color: var(--theme-page-text);
          padding: 0.5rem 0.5rem;
          font-size: var(--font-normal);
          display: block;
        }

        /* Change color of dropdown links on hover */
        .dropdown-item:hover {
          color: var(--theme-hover-bg);
          background-color: var(--theme-hover-text);
          border-radius: 0.5rem;
        }

        /* Show the dropdown menu on hover */
        .dropdown:hover .dropdown-content {
          display: block;
          opacity: 1;
          max-height: 14rem;
          overflow: auto;
        }

        /* Change the background color of the dropdown button when the dropdown content is shown */
        .dropdown:hover .dropbtn {
          background-color: var(--theme-tab-bg);
        }
      `}</style>
    </div>
  );
}
