import ToastMessage from 'components/atoms/ToastMessage';
import {
  BsCheckLg,
  BsXLg,
  BsClipboardCheck,
  BsShieldExclamation,
} from 'react-icons/bs';
import TYPES from 'types';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Components/ToastMessage',
  component: ToastMessage,
};

const Template = (args) => <ToastMessage {...args} />;

export const Default = Template.bind({});
Default.args = {
  type: TYPES.toastType.default,
  title: 'Default',
  message: 'Message',
  style: { animationPlayState: 'paused', position: 'relative', opacity: 1 },
};

export const Success = Template.bind({});
Success.args = {
  type: TYPES.toastType.success,
  children: 'Message',
  icon: <BsCheckLg />,
  style: { animationPlayState: 'paused', position: 'relative', opacity: 1 },
};

export const Error = Template.bind({});
Error.args = {
  type: TYPES.toastType.error,
  children: 'Message',
  icon: <BsXLg />,
  style: { animationPlayState: 'paused', position: 'relative', opacity: 1 },
};

export const Warning = Template.bind({});
Warning.args = {
  type: TYPES.toastType.warning,
  title: 'Warning',
  icon: <BsShieldExclamation />,
  style: { animationPlayState: 'paused', position: 'relative', opacity: 1 },
};

export const Animate = Template.bind({});
Animate.args = {
  icon: <BsClipboardCheck />,
  type: TYPES.toastType.default,
  children: 'Copied to clipboard',
  duration: 3300,
};
