import styles from './Navlinks.module.scss';
import TYPES from 'types';
import Dropdown from 'components/atoms/NE_Dropdown';
import Link from 'next/link';

/**
 * Static link structure component
 * @param {string} activePathname active pathname
 * @param {string} pathname current link path
 * @param {string} label label of the link
 * @returns
 */
export const StaticNavLinks = ({
  activePathname = '',
  pathname = '',
  label = '',
}) => {
  return (
    <>
      <Link href={pathname} passHref>
        <span
          className={activePathname === pathname ? styles.active : undefined}>
          {label}
        </span>
      </Link>
      <style jsx>{`
        span {
          justify-content: center;
          padding: 0.5rem 1rem;
          padding: var(--space-xxs);
        }
      `}</style>
    </>
  );
};

/**
 * Nested navlinks are flattend
 * @param {string} activePathname active pathname
 * @param {string} title label the link
 * @param {Array} options nested links with title and path
 * @returns {JSX.Element}
 */
export const NestedNavLinks = ({
  activePathname = '',
  title = '',
  options = { title: '', path: '' },
}) => {
  return (
    <Dropdown
      title={title}
      selected={options.some((item) => activePathname === item.path)}>
      {options.map((item, index) => (
        <Link key={title + index} href={item.path} passHref>
          <span
            className={
              activePathname === item.path ? styles.dropDown__active : undefined
            }>
            {item.title}
          </span>
        </Link>
      ))}
    </Dropdown>
  );
};

/**
 * Desktop navigation links
 * @param {string} param0 current pathname of page
 * @returns {JSX.Element}
 */
export const DesktopNavLinks = ({ pathname }) => {
  return (
    <nav className={styles.links}>
      {TYPES.NAVBAR.NAVLIST.map((navItem, index) => {
        return (
          <StaticNavLinks
            activePathname={pathname}
            pathname={navItem.path}
            label={navItem.title}
            key={index}
          />
        );
      })}

      {/* Nested navigation options */}
      {Object.entries(TYPES.NAVBAR.NAVDROPDOWN).map(([key, value]) => {
        return (
          <NestedNavLinks
            activePathname={pathname}
            title={key}
            options={value}
            key={key}
          />
        );
      })}
    </nav>
  );
};

/**
 *
 * @param {string} pathname active pathname of page
 * @param {Function} setToggle toggle function on option-click/close
 * @returns {JSX.Element}
 */
export const MobileNavLinks = ({ pathname, setToggle = () => null }) => {
  const Toggle = () => setToggle((prev) => !prev);
  return (
    <nav className={styles.mlinks}>
      {TYPES.NAVBAR.NAVLIST.map((navItem) => {
        return (
          <span
            key={navItem.id}
            className={pathname === navItem.path ? styles.mactive : undefined}
            onClick={Toggle}>
            <Link href={navItem.path}>{navItem.title}</Link>
          </span>
        );
      })}

      {Object.entries(TYPES.NAVBAR.NAVDROPDOWN).map(([key, value]) => {
        return (
          <>
            {value.map((item, index) => (
              <Link key={key + index} href={item.path} passHref>
                <span
                  className={
                    pathname === item.path ? styles.mactive : undefined
                  }
                  onClick={Toggle}>
                  {item.title}
                </span>
              </Link>
            ))}
          </>
        );
      })}
    </nav>
  );
};

/**
 * Navigation link component
 */
const NavLinks = ({ activePathname = '', isMobile = false, ...props }) => {
  if (isMobile) return <MobileNavLinks {...props} pathname={activePathname} />;
  return <DesktopNavLinks {...props} pathname={activePathname} />;
};

export default NavLinks;
