import Loader from 'components/common/NE_Loader';
import TYPES from 'types';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Components/Loader',
  component: Loader,
};

const Template = (args) => <Loader {...args} />;

export const Circular = Template.bind({});
Circular.args = {
  type: TYPES.LOADER.CIRCLE,
};

export const Dot = Template.bind({});
Dot.args = {
  type: TYPES.LOADER.DOT,
};
