import styles from './Navlinks.module.scss';
import TYPES from 'types';
import Dropdown from 'components/common/NE_Dropdown';
import Link from 'next/link';
import { Fragment } from 'react';
import { cls } from 'utils';
import { NETWORKS } from 'types/ConstantsTypes';
import { useNetwork } from 'hooks/useNetwork/useNetwork';

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
            className={cls(
              activePathname === item.path && styles.dropDown__active,
              styles.dropDown__item
            )}>
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
export const DesktopNavLinks = ({ pathname, network }) => {
  return (
    <nav className={styles.links}>
      {TYPES.NAVBAR.NAVLIST.map((navItem, index) => {
        return (
          <StaticNavLinks
            key={index}
            activePathname={pathname}
            pathname={navItem.path}
            label={navItem.title}
          />
        );
      })}

      {/* Nested navigation options */}
      {Object.entries(TYPES.NAVBAR.NAVDROPDOWN).map(([key, value]) => {
        if (network === NETWORKS.TESTNET.name && TYPES.OPTNAV.includes(key)) {
          return <></>;
        }

        return (
          <NestedNavLinks
            key={key}
            activePathname={pathname}
            title={key}
            options={value}
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
export const MobileNavLinks = ({
  pathname,
  setToggle = () => null,
  network,
}) => {
  const Toggle = () => setToggle((prev) => !prev);
  return (
    <nav className={styles.mlinks}>
      {TYPES.NAVBAR.NAVLIST.map((navItem, index) => {
        return (
          <span
            key={`${navItem.id}${index}`}
            className={pathname === navItem.path ? styles.mactive : undefined}
            onClick={Toggle}>
            <Link href={navItem.path}>{navItem.title}</Link>
          </span>
        );
      })}

      {Object.entries(TYPES.NAVBAR.NAVDROPDOWN).map(([key, value], index) => {
        if (network === NETWORKS.TESTNET.name && TYPES.OPTNAV.includes(key)) {
          return <></>;
        }
        return (
          <Fragment key={`${key}${index}`}>
            {value.map((item, index) => {
              return (
                <Link key={key + index} href={item.path} passHref>
                  <span
                    className={
                      pathname === item.path ? styles.mactive : undefined
                    }
                    onClick={Toggle}>
                    {item.title}
                  </span>
                </Link>
              );
            })}
          </Fragment>
        );
      })}
    </nav>
  );
};

/**
 * Navigation link component
 */
const NavLinks = ({ activePathname = '', isMobile = false, ...props }) => {
  const { network: { name = '' } = '' } = useNetwork();

  if (isMobile)
    return (
      <MobileNavLinks {...props} pathname={activePathname} network={name} />
    );
  return (
    <DesktopNavLinks {...props} pathname={activePathname} network={name} />
  );
};

export default NavLinks;
