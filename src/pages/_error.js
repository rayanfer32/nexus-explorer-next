import ErrorScreen from './error';

function Error({ statusCode }) {
  return (
    <ErrorScreen
      statusCode={statusCode}
      msg={`${
        statusCode
          ? `An error occurred on server`
          : 'An error occurred on client'
      }`}
    />
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
