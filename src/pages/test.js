import TestComponents from 'components/TestComponents';

export default function test() {
  // make use of single test component to avoid page reload while testing
  return <TestComponents />;
}
