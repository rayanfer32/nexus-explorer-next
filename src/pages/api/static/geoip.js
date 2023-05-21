const path = require('path');
const Reader = require('@maxmind/geoip2-node').Reader;

let reader;
let isLoadingReader = false;
let readerPromise;

function loadReader() {
  if (isLoadingReader) {
    return readerPromise;
  }

  isLoadingReader = true;
  readerPromise = new Promise((resolve, reject) => {
    Reader.open(path.join('src/assets/GeoLite2-City.mmdb'))
      .then((r) => {
        reader = r;
        isLoadingReader = false;
        resolve();
      })
      .catch((err) => {
        isLoadingReader = false;
        reject(err);
      });
  });

  return readerPromise;
}

export const getGeoIp = async (ip) => {
  if (!reader) {
    await loadReader();
  }
  return reader.city(ip);
};

export default async function handler(req, res) {
  const ip = req.query.ip;
  try {
    const response = await getGeoIp(ip);
    return res.json(response);
  } catch (err) {
    return res.status(400).json(err);
  }
}
