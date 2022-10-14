import { ImageResponse } from '@vercel/og';
import Logger from 'utils/customLog';
import { OgImage } from 'components/Header/PageHeader/OgImage';

export const config = {
  runtime: 'experimental-edge',
};

const properties = {
  width: 1200,
  height: 630,
};

async function handler(req) {
  try {
    const { searchParams } = new URL(req.url);

    // ?title=<title>
    const hasTitle = searchParams.has('block');
    const block = hasTitle ? searchParams.get('block')?.slice(0, 100) : '';

    return new ImageResponse(<OgImage block={block} />, properties);
  } catch (e) {
    Logger.error(`${e.message}`);

    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}

export default handler;
