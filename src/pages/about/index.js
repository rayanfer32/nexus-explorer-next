import Image from 'next/image';
import styles from './about.module.scss';
import ASSESTS from 'assets';
import TYPES from 'types';
import { ObjectToArray } from 'utils/helper';
import { VscGithub, VscGithubInverted } from 'react-icons/vsc';
import { useAppContext } from 'contexts/AppContext';

const About = () => {
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
    <main className={styles.main}>
      <article>
        <div>
          <h1>Nexus Explorer V2</h1>
          <p>A Redesigned Explorer for the nexus blockchain.</p>
        </div>
        <p>
          Nexus Explorer V2 aims to be visually modern by design, and present
          the user with realtime statistics with graphically illustrated data to
          inspect the nexus blockchain as deeply as possible.
        </p>
        <p>
          After many iterations over the design, we came up with the new look
          for the explorer, We made sure the project is built with the all the
          latest tech in the the web development space, The frontend is crafted
          with next.js and for the backend we have used python. For
          contributions and suggestions please feel free to reach out to us on
          our github page.
        </p>
        <div>
          <p className={styles.contributer}>Made with ❤️ in India, by</p>
          <p className={styles.contributer}>
            {ObjectToArray(TYPES.LINKS.github).map((ele) => (
              <span key={ele.id} className={styles.links}>
                <a href={ele.url} target={ele.target} className={styles.link}>
                  <ThemedVscLogo />
                  {ele.label}
                </a>
              </span>
            ))}
          </p>
        </div>
      </article>
      <aside>
        <span>
          <Image
            src={ASSESTS.IMAGE.BLOB.THREE}
            alt="blob_three"
            layout="fill"
            className={[styles.blob, styles.three].join(' ')}
          />
        </span>
        <span>
          <Image
            src={ASSESTS.IMAGE.BLOB.TWO}
            alt="blob_two"
            layout="fill"
            className={[styles.blob, styles.two].join(' ')}
          />
        </span>
        <span>
          <Image
            src={ASSESTS.IMAGE.BLOB.ONE}
            alt="blob_one"
            layout="fill"
            className={[styles.blob, styles.one].join(' ')}
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
  );
};

export default About;
