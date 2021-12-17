import ASSEST from 'assets';
import Button from 'components/atoms/NE_Button';
import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import styles from './error.module.scss';
import TYPES from 'types';
import { errorCode } from './errorCode';

export const CustomError = ({ statusCode }) => {
  const errInfo = errorCode(statusCode);
  return (
    <article className={styles.container}>
      <section className={styles.errorText}>
        {!!statusCode && (
          <p>
            {`ERROR`} <strong>{statusCode}</strong>
          </p>
        )}
        <h1>{errInfo.msg}</h1>
        <div className={styles['cta']}>
          {/* back to prevo=ious page */}
          <Button
            type={TYPES.buttonType.primary}
            className={styles['cta-back']}
            onClick={() => Router.back()}>
            <h3>{TYPES.fallback.GO_BACK}</h3>
          </Button>
          {/* back to home page option */}
          <Link href="/" replace={true}>
            <Button
              type={TYPES.buttonType.secondary}
              className={styles['cta-home']}>
              <h3>{TYPES.fallback.BACK_TO_HOME}</h3>
            </Button>
          </Link>
        </div>
        {/* provide err detail */}
        <p className={styles.detail}>{errInfo.detail}</p>
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
