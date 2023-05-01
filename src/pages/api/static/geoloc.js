import axios from 'axios';
import { getGeoIp } from './geoip';

export default async function handler(req, res) {
  try {
    let baseUrl = `${process.env.NEXT_PUBLIC_NEXUS_BASE_URL}/network/list/nodes`;
    if (req.query.network == 'Testnet') {
      baseUrl = `${process.env.NEXT_PUBLIC_TESTNET_BASE_URL}/network/list/nodes`;
    }

    const nodesList = await axios.get(baseUrl, { params: req.query });

    let responsePromises = [];
    // .slice(0, 100)
    nodesList.data.result.forEach((node) => {
      responsePromises.push(
        getGeoIp(node.address).catch((err) => {
          // Handle error or rejection here, e.g. return a default value or a structured error response
          console.error(
            `Failed to get geolocation for node ${node.address}: ${err}`
          );
          return { location: { lat: 0, lng: 0 } };
        })
      );
    });

    Promise.allSettled(responsePromises).then((results) => {
      const packedData = results.map((result, index) => {
        const item =
          result.status === 'fulfilled'
            ? result.value
            : { location: { lat: 0, lng: 0 } };
        const nodeInfo = nodesList.data.result[index];
        return { ...item.location, ...nodeInfo };
      });
      res.json(packedData);
    });
  } catch (err) {
    console.error(`Failed to fetch nodes list: ${err}`);
    res.status(500).json({ error: 'Failed to fetch nodes list' });
  }
}
