import { ImageResponse } from '@vercel/og';
import { OGBotImage } from 'components/Header/PageHeader/Og-Bot';
import { fetchBlock } from 'utils/common/fetch';

export const config = {
  runtime: 'experimental-edge',
};
const properties = {
  width: 1200,
  height: 630,
};
const emojis = {
  blue_whale: '🐳',
  whale: '🐋',
  shark: '🦈',
  dolphin: '🐬',
  tuna: '🐟',
  blowfish: '🐡',
  sardine: '🐠',
  octopus1: '🦑',
  octopus2: '🐙',
  lobster: '🦞',
  crab: '🦀',
  shrimp: '🦐',
};

const fish_map = {
  blue_whale: 'Blue Whale',
  sperm_whale: 'Sperm Whale',
  humpack_whale: 'Humpback Whale',
  whale_shark: 'Whale Shark',
  tiger_shark: 'Tiger Shark',
  blue_white_shark: 'Blue White Shark',
  great_white_shark: 'Great White Shark',
  dolphin: 'Dolphin',
  tuna: 'Tuna',
  sardine: 'Sardine',
  shrimp: 'Shrimp',
};

function getFishnameAndEmoji(amount) {
  // 'get emoji based on amount';
  if (amount >= 500000) {
    return [emojis.blue_whale.repeat(6), fish_map.blue_whale];
  } else if (amount >= 250000) {
    return [emojis.blue_whale.repeat(6), fish_map.sperm_whale];
  } else if (amount >= 100000) {
    return [emojis.whale.repeat(3), fish_map.humpack_whale];
  } else if (amount >= 80000) {
    return [emojis.shark.repeat(6), fish_map.whale_shark];
  } else if (amount >= 60000) {
    return [emojis.shark.repeat(4), fish_map.tiger_shark];
  } else if (amount >= 30000) {
    return [emojis.shark.repeat(2), fish_map.great_white_shark];
  } else if (amount >= 10000) {
    return [emojis.dolphin.repeat(2), fish_map.dolphin];
  } else if (amount >= 5000) {
    return [emojis.tuna.repeat(2), fish_map.tuna];
  } else if (amount >= 1000) {
    return [emojis.sardine.repeat(2), fish_map.sardine];
  } else {
    return [emojis.shrimp.repeat(2), fish_map.shrimp];
  }
}

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const block = await fetchBlock(searchParams.get('block'));
  const tidx = searchParams.get('tidx') ?? 0;
  const cidx = searchParams.get('cidx') ?? 0; // contract id
  const contract = block.tx[tidx].contracts[cidx];

  const [fishEmoji, fishName] = getFishnameAndEmoji(contract.amount);

  return new ImageResponse(
    (
      <OGBotImage
        contract={contract}
        fishEmoji={fishEmoji}
        fishName={fishName}
      />
    ),
    properties
  );
}
