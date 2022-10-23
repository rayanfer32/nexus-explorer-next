import TestComponents from 'components/TestComponents';
import { isDev } from 'utils';
import CustomError from 'components/Views/error';
import Layout from 'components/Layout';

export default function test() {
  // make use of single test component to avoid page reload while testing
  let Render = <CustomError statusCode={404} />;
  if (isDev) Render = <TestComponents />;
  return <Layout>{Render}</Layout>;
}
