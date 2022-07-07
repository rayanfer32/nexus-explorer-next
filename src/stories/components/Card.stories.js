/* eslint-disable no-empty-function */
import Card from 'components/common/NE_Card';

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

export const DetailCard = Template.bind({});
DetailCard.args = {
  type: 'basic',
  label: 'Price',
  sublabel: '0.00000603 BTC',
  text: '1 NXS = 0.93 $',
  reserveLabel: 'Change 24h',
  reserve: '249.50 NXS',
  rewardLabel: 'Total Volume',
  reward: '2.02 NXS',
  footerLabel: 'Market Cap ',
  footerValue: '17,225,284.74 $',
  delayTime: '12s',
};

export const MarketCard = Template.bind({});
MarketCard.args = {
  type: 'market',
  label: 'Price',
  sublabel: '0.00000603 BTC',
  text: '1 NXS = 0.93 $',
  reserveLabel: 'Change 24h',
  reserve: '49.50 %',
  rewardLabel: 'Total Volume',
  reward: '2.02 NXS',
  footerLabel: 'Market Cap ',
  footerValue: '17,225,284.74 $',
  delayTime: '12s',
};
