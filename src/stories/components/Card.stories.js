import Card from 'components/atoms/NE_Card';

export default {
  title: 'Components/Card',
  component: Card,
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
  onClick: () => {},
  onClickLabel: () => {},
};

/** Detail cards */
// Type 1 - Basic
export const BasicCard = Template.bind({});
BasicCard.args = {
  type: 'basic',
  label: 'Label',
  sublabel: 'Sub-Label',
  title: '999999999999',
  unit: 'unit',
  ticker: '60s',
};

// Type - 2 Detail
export const DetailCard = Template.bind({});
DetailCard.args = {
  type: 'detail',
  label: 'Label',
  sublabel: 'Sub-Label',
  title: '99999999999',
  unit: 'unit',
  ticker: '60s',
  footerLabel: 'label',
  footerValue: '65465465654654',
  footerLabel1: 'label',
  footerValue1: '65465465654654',
  footerLabel2: 'label',
  footerValue2: '65465465654654',
};

// Type - 3 Market
export const MarketCard = Template.bind({});
MarketCard.args = {
  type: 'market',
  label: 'Label',
  sublabel: 'Sub-Label',
  title: '999999999999',
  unit: 'unit',
  ticker: '60s',
  rate: { status: 'inc', value: '1.6', unit: '%' },
  footerLabel1: 'label',
  footerValue1: '65465465654654',
  footerLabel2: 'label',
  footerValue2: '65465465654654',
};
