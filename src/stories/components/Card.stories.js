/* eslint-disable no-empty-function */
import Card from 'components/atoms/NE_Card';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Components/Card',
  component: Card,
  argTypes: {
    onClick: { action: 'clicked' },
    onClickLabel: { action: 'clicked' },
  },
};

const Template = (args) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: '',
};

/** Default card with children */
export const WithChildren = Template.bind({});
WithChildren.args = {
  children: <h1>Nexus Explorer</h1>,
};

export const SmallCard = Template.bind({});
SmallCard.args = {
  type: 'small',
  label: 'Chain Height',
  sublabel: 'Blocks',
  text: '',
  value: '4,816,265',
  unit: '^',
};

export const CompactCard = Template.bind({});
CompactCard.args = {
  type: 'compact',
  label: 'Chain Height',
  sublabel: '',
  text: '',
  value: '4,816,265',
  unit: '^',
};
