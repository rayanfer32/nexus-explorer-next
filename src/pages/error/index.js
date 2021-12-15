import ASSEST from 'assets';
import Button from 'components/atoms/NE_Button';
import Image from 'next/image';
import Link from 'next/link';
import styles from './error.module.scss';
import TYPES from 'types';

export default function CustomError({ statusCode, msg }) {
  return (
    <article className={styles.container}>
      <section className={styles.errorText}>
        {!!statusCode && (
          <p>
            ERROR <strong>{statusCode}</strong>
          </p>
        )}
        <h1>{!!msg && statusCode != 404 ? msg : 'Something went Wrong!!'}</h1>
        <Link href="/">
          <Button type={TYPES.buttonType.primary} className={styles.cta}>
            <h3>Back to Home</h3>
          </Button>
        </Link>
      </section>
      <aside className={styles.errorImage}>
        <Image
          alt={'error-image'}
          src={ASSEST.IMAGE.GENRAL_ERROR}
          width={768}
          height={512}
        />
      </aside>
    </article>
  );
}
