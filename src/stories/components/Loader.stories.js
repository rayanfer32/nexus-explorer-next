import Loader from 'components/atoms/NE_Loader';
import TYPES from 'types';

export default {
  title: 'Components/Loader',
  component: Loader,
};

const Template = (args) => <Loader {...args} />;

export const Circular = Template.bind({});
Circular.args = {
  type: TYPES.loaderType.circle,
};

export const Dot = Template.bind({});
Dot.args = {
  type: TYPES.loaderType.dot,
};
