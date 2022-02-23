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
import keyboard_arrow from './icons/keyboard_arrow.svg';
import nexusBlue from './icons/nexus_blue64.png';
import nexusWhite from './icons/nexus_white64.png';
// IMAGES
import error from './images/error.svg';
import blob_type_one from './images/blob_type_one.svg';
import blob_type_two from './images/blob_type_two.svg';
import blob_type_three from './images/blob_type_three.svg';
import under_development from './images/under_development.svg';

export const ASSESTS = {
  BRAND: {
    DEFAULT: { BLUE: NexusLogoBlue1250x225, WHITE: NexusLogoWhite1250x225 },
    PRIMARY: { BLUE: NexusLogoBlue1000x225, WHITE: NexusLogoWhite1000x225 },
    SECONDARY: { BLUE: GlobeBlue1200x1000, WHITE: GlobeWhite1200x1000 },
    TERTIARY: { BLUE: GlobeBlue1000x1000, WHITE: GlobeWhite1000x1000 },
  },
  ICON: {
    ARROW: {
      KEYBOARD: keyboard_arrow,
    },
    NEXUS: { BLUE: nexusBlue, WHITE: nexusWhite },
  },
  IMAGE: {
    GENRAL_ERROR: error,
    BLOB: { ONE: blob_type_one, TWO: blob_type_two, THREE: blob_type_three },
    DEVELOPMENT: { ONE: under_development },
  },
};

export default ASSESTS;
