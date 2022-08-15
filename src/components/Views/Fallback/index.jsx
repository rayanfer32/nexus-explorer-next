import Image from 'next/image';
import styles from './fallback.module.scss';

export const Fallback = () => {
  return (
    <section className={styles.fallback}>
      <Image
        src={'/wifi-strike.svg'}
        alt="No Internet"
        width={150}
        height={150}
      />
      <h1>Whoops!!</h1>
      <small>There seems to be problem with your network connection.</small>
    </section>
  );
};
