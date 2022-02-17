import Card from 'components/atoms/NE_Card';
import DropdownMenu from 'components/TestComponents/DropdownMenu';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Components/DropdownMenu',
  component: DropdownMenu,
};

const Template = (args) => <DropdownMenu {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Blockchain',
  children: [
    <a href="/blocks">Blocks</a>,
    <a href="/transactions">Transactions</a>,
    <a href="/transactions">Transactions</a>,
    <a href="/transactions">Transactions</a>,
    <a href="/transactions">Transactions</a>,
    <a href="/transactions">Transactions</a>,

  ],
};

