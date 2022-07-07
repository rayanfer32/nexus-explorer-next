import Button from 'components/common/NE_Button';
import TYPES from 'types';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Components/Button',
  component: Button,
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  type: TYPES.BUTTON.PRIMARY,
  children: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  type: TYPES.BUTTON.SECONDARY,
  children: 'Button',
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  type: TYPES.BUTTON.TERTIARY,
  children: 'Button',
};
