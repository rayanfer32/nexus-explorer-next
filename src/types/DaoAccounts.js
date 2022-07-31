import Logger from 'utils/customLog';

// todo: rename these to DAO keys
export const DAO_KEYS = [
  'US:Interactions',
  'US:Impressions',
  'US:Relationships',
  'US:Media',
  'US:Communications',
  'US:Miners',
  'US:Interface',
  'US:Logical',
  'US:TAO',
];

// * done: first try to load this info from the env
let DAO_AMBASSADORS = {
  interactions: {
    chair: 'Arun Pais',
    social: '@aeonwise',
    desc: 'Wallet Support, Developer support, Social Media, and Promotions',
    audit: 'US:Interactions',
  },
  impressions: {
    chair: 'Mike Trick',
    social: '@MikeTrick',
    desc: 'Website, Landing Pages, and Ads',
    audit: 'US:Impressions',
  },
  relationships: {
    chair: 'Guidi',
    social: '@guidisix',
    desc: 'Outreach, Use-Cases, and Exchanges',
    audit: 'US:Relationships',
  },
  media: {
    chair: 'LeventeKovacs',
    social: '@themadblacksmith',
    desc: 'Graphics, Videos, and Animations',
    audit: 'US:Media',
  },
  communications: {
    chair: 'Independence Henry',
    social: '@IndependenceHenry',
    desc: 'Content, Translations',
    audit: 'US:Communications',
  },
};

let DAO_DEVELOPERS = {
  miners: {
    chair: '',
    social: '@LHefe',
    desc: 'Mining Pools, Miners, Ledger Level Adjustments',
    audit: 'US:Miners',
  },
  interface: {
    chair: 'Krysto',
    social: '@kwyiz',
    desc: 'Mobile Wallet, Desktop Wallet, and Modules',
    audit: 'US:Interface',
  },
  logical: {
    chair: 'Kendal Cormany',
    social: '@KendalCormany_nexusio',
    desc: 'Mobile Wallet Backend, Desktop Wallet Backend, Developer Operations (Builds), Modules',
    audit: 'US:Logical',
  },
  tao: {
    chair: 'Colin Cantrell',
    social: '@Videlicet',
    desc: 'TAO Framework, LX-OS, and LLL',
    audit: 'US:TAO',
  },
};

try {
  DAO_DEVELOPERS = JSON.parse(process.env.NEXT_PUBLIC_DAO_DEVELOPERS);
  Logger.error('Using DAO DEVELOPERS from .env.local');
} catch (err) {
  Logger.error(err, 'Using DAO DEVELOPERS from Types/DaoAccounts.js');
}

try {
  DAO_AMBASSADORS = JSON.parse(process.env.NEXT_PUBLIC_DAO_AMBASSADORS);
  Logger.error('Using DAO AMBASSADORS from .env.local');
} catch (error) {
  Logger.error(error, 'Using DAO AMBASSADORS from Types/DaoAccounts.js');
}

export { DAO_DEVELOPERS, DAO_AMBASSADORS };
