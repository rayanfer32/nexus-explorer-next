// import {
//   BrowserView,
//   MobileView,
//   isBrowser,
//   isMobile,
// } from 'react-device-detect';

import TYPES from 'types';

/// PROGRESS: REVAMP HEADER
export const Header = () => {
  return (
    <>
      <header>
        <section>
          <nav>
            <ul>
              {TYPES.NAVBAR.NEW_NAVLIST.map((nav) => (
                <li key={nav.title}>{nav.title}</li>
              ))}
            </ul>
          </nav>
        </section>
        <section>search</section>
      </header>
    </>
  );
};
