import ASSEST from 'assets';
import Button from 'components/common/NE_Button';
import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import styles from './error.module.scss';
import TYPES from 'types';

const CustomError = ({ statusCode }) => {
  return (
    <article className={styles.container}>
      <section className={styles.errorText}>
        {!!statusCode && (
          <p>
            {`ERROR`} <strong>{statusCode}</strong>
          </p>
        )}
        <h1>
          {statusCode == 404 ? 'Page not Found' : 'Something went Wrong!!'}
        </h1>
        <div className={styles['cta']}>
          {/* back to prevo=ious page */}
          <Button
            type={TYPES.BUTTON.PRIMARY}
            className={styles['cta-back']}
            onClick={() => Router.back()}>
            <h3>{TYPES.FALLBACK.GO_BACK}</h3>
          </Button>
          {/* back to home page option */}
          <Link href="/" replace={true} passHref>
            <Button
              type={TYPES.BUTTON.SECONDARY}
              className={styles['cta-home']}>
              <h3>{TYPES.FALLBACK.BACK_TO_HOME}</h3>
            </Button>
          </Link>
        </div>
        {/* provide err detail */}
        <p className={styles.detail}>
          {
            'Request contains bad syntax or the server cannot fulfill the request'
          }
        </p>
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
};

export default CustomError;
