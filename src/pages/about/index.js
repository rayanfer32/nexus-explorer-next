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
  console.log(theme);
  return (
    <main className={styles.main}>
      <article>
        <div>
          <h1>Nexus Explorer V2</h1>
          <p>A Redesigned Explorer for the nexus blockchain.</p>
        </div>
        <p>
          The main motive of the new explorer is to be visually modern by design
          and present the user with realtime statistics with graphically
          illustrated data to inspect the nexus blockchain as deeply as
          possible.
        </p>
        <p>
          After many weekends spent by me and my friend to come up with the
          design from scratch , the projects outcome is a result of the
          dedication to learning design standards and coding it in react+next.js
          completely, along with pieces of backend stiched together.
        </p>
        <div>
          <p className={styles.contributer}>Made with ❤️ in India, by</p>
          <p className={styles.contributer}>
            {ObjectToArray(TYPES.links.github).map((ele) => (
              <span key={ele.id} className={styles.links}>
                <a href={ele.url} target={ele.target} className={styles.link}>
                  {theme == TYPES.theme.dark ? (
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
                  )}

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
// export default about;
export default About;
