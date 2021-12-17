import { CustomError as ErrorScreen } from './error';

ErrorScreen.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorScreen;
