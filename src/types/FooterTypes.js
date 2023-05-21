import NE_Version from 'components/common/NE_Version/NE_Version';
import {
  BsApple,
  BsBook,
  BsChatLeftText,
  BsDiscord,
  BsGithub,
  BsGlobe2,
  BsMedium,
  BsPeople,
  BsReddit,
  BsTelegram,
  BsTwitter,
  BsWallet2,
  BsYoutube,
} from 'react-icons/bs';
import { CgNotes } from 'react-icons/cg';
import { IoLogoGooglePlaystore } from 'react-icons/io5';

const currentYear = new Date().getFullYear() || 2023;

export const FooterTypes = {
  FOOTER_ITEMS: {
    PRIMARY: {
      ABOUT_NEXUS: {
        title: 'About Nexus',
        items: [
          {
            href: 'https://nexus.io',
            label: 'Go to Nexus.io',
            target: '_blank',
            icon: (props) => <BsGlobe2 {...props} />,
          },
          {
            href: 'https://wiki.nexus.io',
            label: 'Nexus Wiki',
            target: '_blank',
            icon: (props) => <CgNotes {...props} />,
          },
          {
            href: 'https://wiki.nexus.io/en/tritium++',
            label: 'Nexus API Docs',
            target: '_blank',
            icon: (props) => <BsBook {...props} />,
          },
        ],
      },
      SOCIAL_MEDIA: {
        title: 'Social Media',
        items: [
          {
            href: 'https://t.me/NexusOfficial',
            target: '_blank',
            label: 'Telegram',
            icon: (props) => <BsTelegram {...props} />,
          },
          {
            href: 'https://medium.com/@NexusOfficial',
            target: '_blank',
            label: 'Blog',
            icon: (props) => <BsMedium {...props} />,
          },
          {
            href: 'https://www.youtube.com/channel/UCDi2stU5yj71_iPgxMZF79w',
            target: '_blank',
            label: 'YouTube',
            icon: (props) => <BsYoutube {...props} />,
          },
          {
            href: 'https://t.me/nexusprice',
            target: '_blank',
            label: 'Price Talk',
            icon: (props) => <BsChatLeftText {...props} />,
          },
          {
            href: 'https://discord.gg/KNvxWh7t4E',
            target: '_blank',
            label: 'Discord',
            icon: (props) => <BsDiscord {...props} />,
          },
          {
            href: 'https://twitter.com/NexusOfficial',
            target: '_blank',
            label: 'Twitter',
            icon: (props) => <BsTwitter {...props} />,
          },
          {
            href: 'https://www.reddit.com/r/nexus_community/',
            target: '_blank',
            label: 'Reddit',
            icon: (props) => <BsReddit {...props} />,
          },
        ],
      },
      WALLET_LINKS: {
        title: 'Download Wallet',
        items: [
          {
            href: 'https://nexus.io/wallets',
            target: '_blank',
            label: 'Desktop Wallet',
            icon: (props) => <BsWallet2 {...props} />,
          },
          {
            href: 'https://play.google.com/store/apps/details?id=io.nexus.wallet',
            target: '_blank',
            label: 'Get it on Playstore',
            icon: (props) => <IoLogoGooglePlaystore {...props} />,
          },
          {
            href: 'https://testflight.apple.com/join/dJLBiKzt',
            target: '_blank',
            label: 'Download from IOS store',
            icon: (props) => <BsApple {...props} />,
          },
        ],
      },
    },
    SECONDARY: {
      SUPPORT: {
        title: undefined,
        items: [
          {
            href: '#',
            label: <NE_Version />,
            target: '_self',
            icon: undefined,
          },
          {
            href: '/about',
            label: 'About Nexplorer',
            target: '_self',
            icon: (props) => <BsPeople {...props} />,
          },
          {
            href: 'https://github.com/rayanfer32/nexus-explorer-next',
            label: 'Github Repository',
            target: '_blank',
            icon: (props) => <BsGithub {...props} />,
          },
        ],
      },
      LEGAL_RIGHTS: {
        title: undefined,
        items: [
          {
            href: 'https://nexus.io/privacy',
            target: '_blank',
            label: 'Privacy Policy',
            icon: undefined,
          },
          {
            href: 'https://nexus.io/terms',
            target: '_blank',
            label: 'Terms of Use',
            icon: undefined,
          },
          {
            href: null,
            target: '_blank',
            label: `Copyright © 2014-${currentYear} www.nexus.io`,
            icon: undefined,
          },
        ],
      },
    },
  },
};
