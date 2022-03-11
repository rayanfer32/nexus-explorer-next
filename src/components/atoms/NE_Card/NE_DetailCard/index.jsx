import { Basic } from './Basic';
import { Market } from './Market';

const NE_DetailCard = ({ type, ...props }) => {
  if (type === 'market') return <Market {...props} />;
  if (type === 'basic') return <Basic {...props} />;
  return <Basic {...props} />;
};

export { NE_DetailCard, Basic, Market };
