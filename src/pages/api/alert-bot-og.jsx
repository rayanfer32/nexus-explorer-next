import { ImageResponse } from '@vercel/og';
import { intlNum, Log } from 'utils';
import { fetchTransaction } from 'utils/common/fetch';

export const config = {
  runtime: 'experimental-edge',
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
  const txid = searchParams.get('txid') ?? '';
  const cid = searchParams.get('cid') ?? 0; // contract id

  // ledger/get/transaction
  const resp = await fetchTransaction(txid);
  const contract = resp.contracts[cid];
  Log('[OG Contract Data:]', contract);

  const [fishEmoji, fishName] = getFishnameAndEmoji(contract.amount);

  return new ImageResponse(
    (
      // Modified based on https://tailwindui.com/components/marketing/sections/cta-sections

      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'hsla(202, 97%, 52%, 1)',
        }}>
        <div tw="bg-slate-900 flex">
          <div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8">
            <h2 tw="flex flex-col text-3xl sm:text-4xl font-bold tracking-tight text-gray-100 text-left">
              {contract.from && (
                <span tw="text-gray-400 text-sm">From - {contract.from}</span>
              )}
              {contract.proof && (
                <span tw="text-gray-400 text-sm">Proof - {contract.proof}</span>
              )}
              {contract.to && (
                <span tw="text-gray-400 text-sm">To - {contract.to}</span>
              )}
              <span tw="text-indigo-500">{fishName}</span>
              <span tw="text-indigo-200 text-5xl">{fishEmoji}</span>
              <span>
                {intlNum(contract.amount)} {contract.ticker}
              </span>
            </h2>
            <div tw="mt-8 flex md:mt-0">
              <div tw="flex rounded-md shadow">
                <a
                  href="#"
                  tw="flex items-center justify-center rounded-md border border-transparent bg-green-600 px-5 py-3 text-base font-medium text-white">
                  {contract.OP}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
