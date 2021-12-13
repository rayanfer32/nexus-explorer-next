import Loader from 'components/atoms/NE_Loader';
import TYPES from 'types';

export default {
  title: 'Components/Loader',
  component: Loader,
};

export const Circular = () => <Loader />;
export const Dot = () => <Loader type={TYPES.loaderType.dot} />;
