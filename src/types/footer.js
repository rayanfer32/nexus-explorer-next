import ASSESTS from 'assets';

export const FooterTypes = {
  footerItems: {
    nexus: {
      href: 'https://nexus.io/',
      target: '_blank',
      label: 'Nexus.io',
      src: ASSESTS.BRAND.DEFAULT.WHITE,
      brand: ASSESTS.BRAND.DEFAULT,
    },
    desktopWallet: {
      href: 'https://nexus.io/wallets',
      target: '_blank',
      label: 'Desktop Wallet',
      src: ASSESTS.ICON.WALLET,
    },
    playstore: {
      href: 'https://play.google.com/store/apps/details?id=io.nexus.wallet',
      target: '_blank',
      label: 'Get it on Playstore',
      src: ASSESTS.ICON.PLAY_STORE,
    },
    appStore: {
      href: 'https://testflight.apple.com/join/dJLBiKzt',
      target: '_blank',
      label: 'Download from IOS store',
      src: ASSESTS.ICON.APPLE,
    },
    repoUrl: {
      href: 'https://github.com/rayanfer32/nexus-explorer-next',
      target: '_self',
      label: 'Github',
      src: '',
    },
    nexusSite: {
      href: 'https://nexus.io',
    },
  },
};
