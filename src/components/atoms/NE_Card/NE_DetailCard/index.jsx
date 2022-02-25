import { Basic } from './Basic';
import { Detail } from './Detail';
import { Market } from './Market';

const NE_DetailCard = ({ type, ...props }) => {
  if (type === 'detail') return <Detail {...props} />;
  if (type === 'market') return <Market {...props} />;
  if (type === 'basic') return <Basic {...props} />;
  return <Basic {...props} />;
};

export { NE_DetailCard, Basic, Detail, Market };
