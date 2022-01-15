import Shimmer from 'components/atoms/NE_Shimmer';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Components/Shimmer',
  component: Shimmer,
};

const Template = (args) => <Shimmer {...args} />;

export const Card = Template.bind({});

Card.args = {
  width: '100%',
  height: '10rem',
  animate: '1s',
  animateWidth: '100vw',
};
