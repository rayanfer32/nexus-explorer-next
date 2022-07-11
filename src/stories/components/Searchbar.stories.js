import SearchBar from '../../components/common/NE_SearchBar';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Components/SearchBar',
  component: SearchBar,
  argTypes: {
    onkeydown: { action: 'clicked' },
  },
};

export const Default = () => <SearchBar />;
