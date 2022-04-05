import { createProxyMiddleware } from 'http-proxy-middleware';
import { API_URLS } from 'types/ConstantsTypes';

// Create proxy instance outside of request handler function to avoid unnecessary re-creation
const apiProxy = createProxyMiddleware({
  target: process.env.NEXT_PUBLIC_TESTNET_BASE_URL,
  changeOrigin: true,
  pathRewrite: { [`^${API_URLS.TESTNET}`]: '' },
  secure: false,
});

export default function handler(req, res) {
  apiProxy(req, res, (result) => {
    if (result instanceof Error) {
      throw result;
    }

    throw new Error(
      `Request '${req.url}' is not proxied! We should never reach here!`
    );
  });
}

export const config = { api: { externalResolver: true, bodyParser: false } };
