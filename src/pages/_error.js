import Layout from 'components/Layout';
import CustomError from 'components/Views/error';

const ErrorScreen = (props) => {
  return (
    <Layout>
      <CustomError {...props} />
    </Layout>
  );
};

ErrorScreen.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorScreen;
