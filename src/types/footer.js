import nexusLogo from 'assets/branding/NexusLogoWhite1250x225.png';
import walletLogo from 'assets/icons/wallet.png';
import appleLogo from 'assets/icons/apple.png';
import playstoreLogo from 'assets/icons/playstore.png';

export const FooterTypes = {
  footerItems: {
    nexus: {
      href: 'https://nexus.io/',
      target: '_blank',
      label: 'Nexus.io',
      src: nexusLogo,
    },
    desktopWallet: {
      href: 'https://nexus.io/wallets',
      target: '_blank',
      label: 'Desktop Wallet',
      src: walletLogo,
    },
    playstore: {
      href: 'https://play.google.com/store/apps/details?id=io.nexus.wallet',
      target: '_blank',
      label: 'Get it on Playstore',
      src: playstoreLogo,
    },
    appStore: {
      href: 'https://testflight.apple.com/join/dJLBiKzt',
      target: '_blank',
      label: 'Download from IOS store',
      src: appleLogo,
    },
    supportEmail: {
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
