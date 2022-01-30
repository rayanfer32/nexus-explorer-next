import Button from 'components/atoms/NE_Button';
import TYPES from 'types';

export default {
  title: 'Components/Button',
  component: Button,
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  type: TYPES.buttonType.primary,
  children: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  type: TYPES.buttonType.secondary,
  children: 'Button',
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  type: TYPES.buttonType.tertiary,
  children: 'Button',
};
