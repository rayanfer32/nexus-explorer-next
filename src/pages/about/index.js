import styles from './about.module.css';

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

export default about;
