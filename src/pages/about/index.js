import Image from 'next/image';
import styles from './about.module.scss';
import ASSESTS from 'assets';
import TYPES from 'types';
import { VscGithub, VscGithubInverted } from 'react-icons/vsc';
import { useAppContext } from 'contexts/AppContext';
import { LinksTypes } from 'types/LinksTypes';
import PageHeader from 'components/Header/PageHeader';
import { cls } from 'utils';

export const getStaticProps = async () => {
  const res = await fetch(LinksTypes.LINKS.CONTRIBUTORS_API);
  const data = await res.json();

  return {
    props: { data: data },
  };
};

const About = ({ data }) => {
  const {
    sharedState: { theme },
  } = useAppContext();

  let ThemedVscLogo = () => {
    return theme == TYPES.THEME.DARK ? (
      <VscGithub
        style={{
          color: 'white',
        }}
      />
    ) : (
      <VscGithubInverted
        style={{
          color: 'black',
        }}
      />
    );
  };

  return (
    <>
      <PageHeader page="about" />
      <main className={styles.main}>
        <article>
          <div>
            <h1>Nexus Explorer V2</h1>
            <p>A Redesigned Explorer for the nexus blockchain.</p>
          </div>
          <p>
            Nexus Explorer V2 aims to be visually modern by design, and present
            the user with realtime statistics with graphically illustrated data
            to inspect the nexus blockchain as deeply as possible.
          </p>
          <p>
            After many iterations over the design, we came up with the new look
            for the explorer, We made sure the project is built with the all the
            latest tech in the the web development space, The frontend is
            crafted with next.js and for the backend we have used python. For
            contributions and suggestions please feel free to reach out to us on
            our github page.
          </p>
          <div>
            <p className={styles.contributer}>Made with ❤️ in India, by</p>
            <p className={styles.contributer}>
              {Array.isArray(data) &&
                data?.map((item) => {
                  if (item.author.type === 'Bot') {
                    return;
                  }
                  return (
                    <span key={item.author.login} className={styles.links}>
                      <a
                        href={item.author.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.link}>
                        <ThemedVscLogo />
                        {item.author.login}
                      </a>
                    </span>
                  );
                })}
            </p>
          </div>
        </article>
        <aside>
          <span>
            <Image
              src={ASSESTS.IMAGE.BLOB.THREE}
              alt="blob_three"
              layout="fill"
              className={cls(styles.blob, styles.three)}
            />
          </span>
          <span>
            <Image
              src={ASSESTS.IMAGE.BLOB.TWO}
              alt="blob_two"
              layout="fill"
              className={cls(styles.blob, styles.two)}
            />
          </span>
          <span>
            <Image
              src={ASSESTS.IMAGE.BLOB.ONE}
              alt="blob_one"
              layout="fill"
              className={cls(styles.blob, styles.one)}
            />
          </span>
          <span className={styles.developImg}>
            <Image
              src={ASSESTS.IMAGE.DEVELOPMENT.ONE}
              alt="blob_one"
              layout="fill"
            />
          </span>
        </aside>
      </main>
    </>
  );
};

export default About;
