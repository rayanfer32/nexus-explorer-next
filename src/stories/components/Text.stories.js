import Text from 'components/common/NE_Text';
import TYPES from 'types';

export default {
  title: 'Components/Text',
  component: Text,
};

const Template = (args) => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Nexus Explorer',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Nexus Explorer',
  type: TYPES.TEXT.SECONDARY,
};
