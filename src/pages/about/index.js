import Image from 'next/image';
import styles from './about.module.scss';
import ASSESTS from 'assets';
import TYPES from 'types';
import { ObjectMapf } from 'utils/helper';

function about() {
  return (
    <div className={styles.container}>
      <div>
        <h1>Nexus Explorer V2</h1>
        <p>A Redesigned Explorer for the nexus blockchain.</p>
      </div>
      <p>
        The main motive of the new explorer is to be visually modern by design
        and present the user with realtime statistics with graphically
        illustrated data to inspect the nexus blockchain as deeply as possible.
      </p>
      <p>
        After many weekends spent by me and my friend to come up with the design
        from scratch , the projects outcome is a result of the dedication to
        learning design standards and coding it in react+next.js completely,
        along with pieces of backend stiched together.
      </p>
      <p>Made with ❤️ in India, by @rayanfer32 and @shrivatsabhat</p>
    </div>
  );
}

const About = () => {
  console.log(
    ObjectMapf(TYPES.links.github)((val) => ObjectMapf(val)((x) => x))
  );
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
          <p>Made with ❤️ in India, by</p>
          <p>
            <span>
              <a href="">@rayanfer32</a>
            </span>
            <span>
              <a>@shrivatsabhat</a>
            </span>
          </p>
        </div>
      </article>
      <aside>
        <span>
          <Image src={ASSESTS.IMAGE.BLOB.THREE} alt="blob_one" />
        </span>
        <span>
          <Image src={ASSESTS.IMAGE.BLOB.TWO} alt="blob_one" />
        </span>
        <span>
          <Image src={ASSESTS.IMAGE.BLOB.ONE} alt="blob_one" />
        </span>
      </aside>
    </main>
  );
};
// export default about;
export default About;
