/* Add the image/icon in respective line (follow alphabetical order) */

// BRAND IMAGES
import NexusLogoBlue1000x225 from './branding/NexusLogoBlue1000x225.png';
import NexusLogoWhite1000x225 from './branding/NexusLogoWhite1000x225.png';
// ICONS
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
    PRIMARY: { BLUE: NexusLogoBlue1000x225, WHITE: NexusLogoWhite1000x225 },
  },
  ICON: {
    ARROW: {},
    NEXUS: { BLUE: nexusBlue, WHITE: nexusWhite },
  },
  IMAGE: {
    GENRAL_ERROR: error,
    BLOB: { ONE: blob_type_one, TWO: blob_type_two, THREE: blob_type_three },
    DEVELOPMENT: { ONE: under_development },
  },
};

export default ASSESTS;
