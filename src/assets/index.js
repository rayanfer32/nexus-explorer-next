/* Add the image/icon in respective line (follow alphabetical order) */

// BRAND IMAGES
import GlobeBlue1000x1000 from './branding/GlobeBlue1000x1000.png';
import GlobeWhite1000x1000 from './branding/GlobeWhite1000x1000.png';
import GlobeBlue1200x1000 from './branding/GlobeBlue1200x1000.png';
import GlobeWhite1200x1000 from './branding/GlobeWhite1200x1000.png';
import NexusLogoBlue1000x225 from './branding/NexusLogoBlue1000x225.png';
import NexusLogoWhite1000x225 from './branding/NexusLogoWhite1000x225.png';
import NexusLogoBlue1250x225 from './branding/NexusLogoBlue1250x225.png';
import NexusLogoWhite1250x225 from './branding/NexusLogoWhite1250x225.png';
// ICONS
import applceIcon from './icons/apple.png';
import walletIcon from './icons/wallet.png';
import playstoreIcon from './icons/playstore.png';
// IMAGES

export const ASSESTS = {
  BRAND: {
    DEFAULT: { WHITE: NexusLogoWhite1250x225, BLUE: NexusLogoBlue1250x225 },
    PRIMARY: { WHITE: NexusLogoWhite1000x225, BLUE: NexusLogoBlue1000x225 },
    SECONDARY: { WHITE: GlobeWhite1200x1000, BLUE: GlobeBlue1200x1000 },
    TERTIARY: { WHITE: GlobeWhite1000x1000, BLUE: GlobeBlue1000x1000 },
  },
  ICON: { APPLE: applceIcon, WALLET: walletIcon, PLAY_STORE: playstoreIcon },
  IMAGE: {},
};

export default ASSESTS;
