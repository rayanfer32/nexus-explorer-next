import axios from 'axios';
import { getGeoIp } from './geoip';

export default async function handler(req, res) {
  const nodesList = await axios.get(
    `${process.env.NEXT_PUBLIC_NEXUS_BASE_URL}/network/list/nodes`
  );

  let responsePromises = [];
  // .slice(0, 100)
  nodesList.data.result.forEach(async (node) => {
    responsePromises.push(getGeoIp(node.address));
  });

  Promise.all(responsePromises).then((resp) => {
    const packedData = resp.map((item, index) => {
      const nodeInfo = nodesList.data.result[index];
      return { ...item.location, ...nodeInfo };
    });
    res.json(packedData);
  });
}
