import styles from './Navlinks.module.scss';
import TYPES from 'types';
import { NavDropdown } from 'components/Header/NavDropdown';
import Link from 'next/link';
import { Fragment, useId } from 'react';
import { cls } from 'utils';

const isRouteEqual = (r1, r2) => r1 === r2;

const shouldHideNavOnSomeNetwork = ({ disabledNets, network }) => {
  return disabledNets.includes(network);
};

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
  isMobile = false,
  onClick = () => null,
}) => {
  const isActivePath = isRouteEqual(activePathname, pathname);

  if (isMobile) {
    return (
      <span className={cls(isActivePath && styles.mactive)} onClick={onClick}>
        <Link href={pathname}>{label}</Link>
      </span>
    );
  }

  return (
    <>
      <Link href={pathname} passHref>
        <span className={cls(isActivePath && styles.active)}>{label}</span>
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
  isMobile = false,
  onClick = () => null,
}) => {
  if (isMobile) {
    return (
      <Fragment>
        {options.map((item, index) => {
          return (
            <Link key={item.path + index} href={item.path} passHref>
              <span
                className={cls(
                  isRouteEqual(activePathname, item.path) && styles.mactive
                )}
                onClick={onClick}>
                {item.title}
              </span>
            </Link>
          );
        })}
      </Fragment>
    );
  }

  return (
    <NavDropdown
      title={title}
      selected={options.some((item) => activePathname === item.path)}>
      {options.map((item, index) => (
        <Link key={item.path + index} href={item.path} passHref>
          <span
            className={cls(
              isRouteEqual(activePathname, item.path) &&
                styles.dropDown__active,
              styles.dropDown__item
            )}>
            {item.title}
          </span>
        </Link>
      ))}
    </NavDropdown>
  );
};

/**
 * Navigation link component
 */
const NavLinks = ({ activePathname, isMobile, onClick, network }) => {
  const id = useId();

  return (
    <nav className={cls(isMobile ? styles.mlinks : styles.links)}>
      {TYPES.NAVBAR.NAVLIST.map((navItem, index) => {
        if (
          shouldHideNavOnSomeNetwork({
            network,
            disabledNets: navItem?.disabledNets ?? [],
          })
        ) {
          return null;
        }

        if (navItem.children) {
          return (
            <NestedNavLinks
              key={navItem.title + id + index}
              activePathname={activePathname}
              title={navItem.title}
              options={navItem.children}
              onClick={onClick}
              isMobile={isMobile}
            />
          );
        }

        return (
          <StaticNavLinks
            key={navItem.path + id + index}
            activePathname={activePathname}
            pathname={navItem.path}
            label={navItem.title}
            onClick={onClick}
            isMobile={isMobile}
          />
        );
      })}
    </nav>
  );
};

export default NavLinks;
