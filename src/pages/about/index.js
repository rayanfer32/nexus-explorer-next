import { LinksTypes } from 'types/LinksTypes';
import PageHeader from 'components/Header/PageHeader';
import AboutView from 'components/Views/About';

export const getStaticProps = async () => {
  const res = await fetch(LinksTypes.LINKS.CONTRIBUTORS_API);
  const data = await res.json();

  return {
    props: { data: data },
  };
};

const About = ({ data }) => {
  return (
    <>
      <PageHeader page="about" />
      <AboutView data={data} />
    </>
  );
};

export default About;
