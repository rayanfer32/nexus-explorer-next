import Card from 'components/atoms/NE_Card/index';

export default {
  title: 'Components/Card',
  component: Card,
};

const Template = (args) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: '',
};

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
  title: '4,816,265',
  unit: '^',
  onClick: () => {},
  onClickLabel: () => {},
};
