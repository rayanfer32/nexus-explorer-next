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
import nexusBlue from './icons/nexus_blue64.png';
import nexusWhite from './icons/nexus_white64.png';
import playstoreIcon from './icons/playstore.png';
import walletIcon from './icons/wallet.png';
// IMAGES

export const ASSESTS = {
  BRAND: {
    DEFAULT: { BLUE: NexusLogoBlue1250x225, WHITE: NexusLogoWhite1250x225 },
    PRIMARY: { BLUE: NexusLogoBlue1000x225, WHITE: NexusLogoWhite1000x225 },
    SECONDARY: { BLUE: GlobeBlue1200x1000, WHITE: GlobeWhite1200x1000 },
    TERTIARY: { BLUE: GlobeBlue1000x1000, WHITE: GlobeWhite1000x1000 },
  },
  ICON: {
    APPLE: applceIcon,
    NEXUS: { BLUE: nexusBlue, WHITE: nexusWhite },
    PLAY_STORE: playstoreIcon,
    WALLET: walletIcon,
  },
  IMAGE: {},
};

export default ASSESTS;
