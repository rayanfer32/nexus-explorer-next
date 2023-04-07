import React, { useEffect, useRef } from 'react';
import worldBgSvg from './world-robinson.svg';
import styles from './WorldNodes.module.scss';
import geolocData from './geolocData.json';
import { RobinsonProjector } from './latlongConverter';
import useWindowSize from 'hooks/useWindowSize/useWindowSize';
import TYPES from '../../types';
import { useDarkMode } from 'hooks';

export default function WorldNodes() {
  const worldRef = React.useRef(null);
  const [mapXYarr, setMapXYarr] = React.useState([]);
  const windowSize = useWindowSize();
  const [, , isGlobalDarkMode] = useDarkMode();
  const opacityControlRef = useRef();

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
    const { width, height } = worldRef.current;

    // * reference from edge explorer
    const robinsonProjector = new RobinsonProjector();
    // * radius of the marker - set at 5px when map at full width (at 1180px width)
    // * const markerRadius = (5 / 1180) * width;
    // * topOffset is number of pixels cropped from top of map when map, calculated as being 5 pixels when map at full height of 515
    const topOffset = (5 / 515) * height;

    const _mapXYarr = geolocData.map((item) => {
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

    setMapXYarr(_mapXYarr);
  }, [windowSize]);

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <div>Connected Nodes: {mapXYarr.length}</div>
        <div>
          Nodes Shown: {mapXYarr.filter((item) => item.opacity > 0).length}
        </div>
        <label>
          Last seen
          <input
            style={{ width: '3rem' }}
            type="number"
            ref={opacityControlRef}
            onChange={updateOpacities}
            defaultValue={24}></input>
          Hours ago
        </label>
      </div>
      <div className={styles.worldContainer}>
        <img
          ref={worldRef}
          src={worldBgSvg.src}
          className={styles.worldSvg}
          alt="World"
        />

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
      </div>
    </div>
  );
}
