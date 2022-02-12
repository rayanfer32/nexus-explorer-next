import {
  BsApple,
  BsBook,
  BsChatLeftText,
  BsDiscord,
  BsFileEarmarkText,
  BsGithub,
  BsGlobe2,
  BsMedium,
  BsPeople,
  BsTelegram,
  BsWallet2,
  BsYoutube,
} from 'react-icons/bs';
import { IoLogoGooglePlaystore } from 'react-icons/io5';

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
            href: 'https://devdocs.nexus-interactions.io/',
            label: 'API Documentation',
            target: '_blank',
            icon: (props) => <BsFileEarmarkText {...props} />,
          },
          {
            href: 'https://nexus.io/ResourceHub/',
            label: 'Resource Hub',
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
            href: 'https://discord.gg/CtSrw26Y',
            target: '_blank',
            label: 'Discord',
            icon: (props) => <BsDiscord {...props} />,
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
            label: 'Copyright (c) 2014-2022 www.nexus.io',
            icon: undefined,
          },
        ],
      },
    },
  },
};
