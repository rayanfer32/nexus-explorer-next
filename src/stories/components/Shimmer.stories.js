import Shimmer from 'components/common/NE_Shimmer';

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

export const SmallCardText = Template.bind({});

SmallCardText.args = {
  type: 'small-card',
  width: '50rem',
  height: '10rem',
  animate: '1s',
  animateWidth: '100vw',
};
