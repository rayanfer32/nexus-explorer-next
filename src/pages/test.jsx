import TestComponents from 'components/TestComponents';
import { isDev } from 'utils';
import CustomError from './error';

export default function test() {
  // make use of single test component to avoid page reload while testing
  if (isDev) return <TestComponents />;
  return <CustomError statusCode={404} />;
}
