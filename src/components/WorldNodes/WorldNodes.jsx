import React, { useEffect, useRef, useState } from 'react';
import worldBgSvg from './world-robinson.svg';
import styles from './WorldNodes.module.scss';
import geolocData from './geolocData.json';
import { RobinsonProjector } from './latlongConverter';
import useWindowSize from 'hooks/useWindowSize/useWindowSize';
import TYPES from '../../types';
import { useDarkMode, useDebounce, useNetwork } from 'hooks';
import axios from 'axios';
import { useQuery } from 'react-query';
import { NETWORKS } from 'types/ConstantsTypes';

function SvgMarkers({ worldRef, mapXYarr }) {
  return (
    <svg
      className={styles.mapMarkers}
      style={{
        width: worldRef?.current?.width || 800,
        height: worldRef?.current?.height || 600,
      }}>
      {mapXYarr.map((item, index) => (
        <circle
          key={index}
          cx={item.x}
          cy={item.y}
          data-hover={item.latency}
          className={styles.marker}
          opacity={item.opacity}
          style={{
            fill: item.latency < 250 ? TYPES.COLORS.NEXUS_BLUE : '',
          }}
          r={(5 / 1180) * worldRef?.current?.width}></circle>
      ))}
    </svg>
  );
}

function LegendCirle({ color, size }) {
  return (
    <svg width={size} height={size}>
      <circle
        cx={size / 2}
        cy={size / 2}
        className={styles.marker}
        opacity={1}
        style={{
          fill: color,
        }}
        r={4}></circle>
    </svg>
  );
}

export default function WorldNodes() {
  const worldRef = React.useRef(null);
  const canvasRef = useRef(null);
  const [mapXYarr, setMapXYarr] = React.useState([]);
  const windowSize = useWindowSize();
  const [, , isGlobalDarkMode] = useDarkMode();
  const opacityControlRef = useRef();
  const [hours, setHours] = useState(1);
  const [limit, setLimit] = useState('none');

  const debouncedHours = useDebounce(hours, 500);

  const { network, getNetworkListNodes, getNetworkCountNodes } = useNetwork();
  const isMainnet = network.name === NETWORKS.MAINNET.name;

  const networkListNodesRQ = useQuery(
    ['networkListNodes', network.name, limit, debouncedHours],
    () =>
      getNetworkListNodes('/api/static/geoloc', limit, debouncedHours, {
        network: network.name,
      })
  );

  const networkCountNodesRQ = useQuery(
    ['networkCountNodes', network.name],
    getNetworkCountNodes
  );

  function getOpacity(lastSeen, currentTime, hoursThreshold = 24) {
    const timeDiff = (currentTime - lastSeen) / 1000; // convert to seconds
    const cutoffThreshold = hoursThreshold * 60 * 60; // seconds in one day
    if (timeDiff >= cutoffThreshold) {
      return 0;
    } else {
      // * Calculate opacity based on time difference
      const opacity = 1 - timeDiff / cutoffThreshold;
      return opacity;
    }
  }

  function updateOpacities() {
    setMapXYarr((prevState) =>
      prevState.map((item) => {
        return {
          ...item,
          opacity: getOpacity(
            item.lastseen * 1000,
            Date.now(),
            opacityControlRef.current.value
          ),
        };
      })
    );
  }

  //  * effect that updates the plot points when window size changes
  useEffect(() => {
    // return; // * disable as we are not using svg markers
    const { width, height } = worldRef.current;

    // * reference from edge explorer
    const robinsonProjector = new RobinsonProjector();
    // * radius of the marker - set at 5px when map at full width (at 1180px width)
    // * const markerRadius = (5 / 1180) * width;
    // * topOffset is number of pixels cropped from top of map when map, calculated as being 5 pixels when map at full height of 515
    const topOffset = (5 / 515) * height;

    const _mapXYarr = networkListNodesRQ.data?.data.map((item) => {
      const xyCordinates = robinsonProjector.convertLatLngToXy(
        item.latitude,
        item.longitude,
        width,
        topOffset
      );
      return {
        ...xyCordinates,
        ...item,
        opacity: getOpacity(item.lastseen * 1000, Date.now()),
      };
    });

    setMapXYarr(_mapXYarr || []);
  }, [windowSize, networkListNodesRQ.data]);

  useEffect(() => {
    return; // * disable canvas
    const { width, height } = worldRef.current;

    // * reference from edge explorer
    const robinsonProjector = new RobinsonProjector();
    // * radius of the marker - set at 5px when map at full width (at 1180px width)
    // * const markerRadius = (5 / 1180) * width;
    // * topOffset is number of pixels cropped from top of map when map, calculated as being 5 pixels when map at full height of 515
    const topOffset = (5 / 515) * height;

    const _mapXYarr = networkListNodesRQ.data?.data.map((item) => {
      const xyCordinates = robinsonProjector.convertLatLngToXy(
        item.latitude,
        item.longitude,
        width,
        topOffset
      );
      return {
        ...xyCordinates,
        ...item,
        opacity: getOpacity(item.lastseen * 1000, Date.now()),
      };
    });

    setMapXYarr(_mapXYarr || []);

    // * canvas creator
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    // ctx.drawImage(worldImg, 0, 0, canvas.width, canvas.height);
    mapXYarr.forEach((item) => {
      ctx.beginPath();
      ctx.arc(item.x, item.y, (4 / 1180) * canvas.width, 0, 2 * Math.PI);
      ctx.fillStyle =
        item.latency < 250 ? TYPES.COLORS.NEXUS_BLUE : TYPES.COLORS.OCEAN_BLUE;
      ctx.fill();
      ctx.closePath();
    });
  }, [windowSize, networkListNodesRQ.data, opacityControlRef?.current?.value]);

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <div className={styles.left}>
          {/* <div>Connected Nodes: {mapXYarr?.length}</div> */}
          <div>
            Nodes Discovered: {networkCountNodesRQ.data?.data?.result?.count}
          </div>

          {/* // * disable as we are not loading the live markers */}
          {true && (
            <>
              <div>
                Nodes Shown:{' '}
                {mapXYarr.filter((item) => item.opacity > 0).length}
              </div>
              <label>
                Last seen
                <input
                  style={{ width: '3rem' }}
                  type="number"
                  ref={opacityControlRef}
                  onChange={(e) => {
                    updateOpacities(e);
                    setHours(e.target.value);
                  }}
                  defaultValue={hours}></input>
                Hours ago
              </label>
            </>
          )}
        </div>

        <div className={styles.right}>
          <div>
            Latency: &lt; 250ms{' '}
            <LegendCirle color={TYPES.COLORS.NEXUS_BLUE} size={10} />
          </div>
          <div>
            &gt; 250ms{' '}
            <LegendCirle color={'rgba(77, 145, 201, 0.383)'} size={10} />
          </div>
        </div>
      </div>
      <div className={styles.worldContainer}>
        <img
          ref={worldRef}
          src={worldBgSvg.src}
          className={styles.worldSvg}
          alt="World"
        />
        {/* <canvas
          ref={canvasRef}
          className={styles.mapMarkers}
          width={worldRef?.current?.width || 800}
          height={worldRef?.current?.height || 600}
        /> */}

        <SvgMarkers worldRef={worldRef} mapXYarr={mapXYarr} />
      </div>
    </div>
  );
}
