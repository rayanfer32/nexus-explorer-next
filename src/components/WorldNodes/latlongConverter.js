// The network map uses a Robinson projection map image with slight cropping at the top and bottom of the map - https://simplemaps.com/resources/svg-world
// co-ordinates are calculated with the following formulas:
// x = 0.8474 RX (lng - lng0)
// y = 1.3520 RY
// - R is radius of globe at scale of the map, where equator length is 0.8487 of map width
// - X and Y are coefficient values determined by Robinson at known latitudes, with intermediate values calculated by interpolation
// (I have used linear interpolation for simplicity, at slight cost of accuracy)
// the formula and coefficients can be found here: https://en.wikipedia.org/wiki/Robinson_projection#Formulation

// known X and Y coefficients for latitudes at 5 degree intervals
const latArray = [
  0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90,
];
const XValues = [
  1, 0.9986, 0.9954, 0.99, 0.9822, 0.973, 0.96, 0.9427, 0.9212, 0.8962, 0.8679,
  0.835, 0.7986, 0.7597, 0.7186, 0.6732, 0.6213, 0.5722, 0.5322,
];
const YValues = [
  0, 0.062, 0.124, 0.186, 0.248, 0.31, 0.372, 0.434, 0.4958, 0.5571, 0.6176,
  0.6769, 0.7346, 0.7903, 0.8435, 0.8936, 0.9394, 0.9761, 1,
];

export class RobinsonProjector {
  convertLatLngToXy(
    lat,
    lng,
    mapWidth,
    topOffset = 0,
    leftOffset = 0,
    lngOffset = -3
  ) {
    // disallow invalid latitude or longitude
    if (Math.abs(lat) > 90 || Math.abs(lng) > 180) return;

    // h and w are full height and width of the Robinson map without any cropping - the correct ratio is 1.97125551906973
    const w = mapWidth;
    const h = w / 1.97125551906973;

    const { X, Y } = this.getXYCoefficients(lat);

    // R = radius of the globe at scale of map
    const R = mapWidth / 2 / Math.PI / 0.8487;

    // longitude of central point of map in radians
    const lngRad = ((lng + lngOffset) * Math.PI) / 180;

    // x and y co-ordinates ((0,0) at the top-left corner / (mapWidth,mapHeight) at bottom right corner)
    // xFudge" is a "fudge" value worked out by trial and error to get the markers into the correct position
    const xFudge = 1.02;
    const x = w / 2 + 0.8487 * R * X * lngRad * xFudge + leftOffset;
    const y = h / 2 - 1.352 * R * Y - topOffset;

    return { x, y };
  }

  countType(type) {
    return this.points.filter((p) => p.type === type).length;
  }

  getXYCoefficients(lat) {
    const absoluteLat = Math.abs(lat);
    // determine if latitude is positive or negative
    const sign = lat < 0 ? -1 : 1;

    // disallow invalid latitude
    if (absoluteLat > 90) return;

    // if x is multiple of 5, return known X and Y values
    const i = latArray.indexOf(absoluteLat);
    if (i >= 0) {
      const X = XValues[i];
      let Y = YValues[i] * sign;
      return { X, Y };
    }

    // if x is not multiple of 5, perform linear interpolation between two closest known points
    const lowerLat = Math.floor(absoluteLat / 5) * 5;
    const upperLat = lowerLat + 5;
    const iLower = lowerLat / 5;
    const iUpper = iLower + 1;
    const X = this.linearInterpolation(
      absoluteLat,
      lowerLat,
      upperLat,
      XValues[iLower],
      XValues[iUpper]
    );
    let Y =
      this.linearInterpolation(
        absoluteLat,
        lowerLat,
        upperLat,
        YValues[iLower],
        YValues[iUpper]
      ) * sign;

    return { X, Y };
  }

  linearInterpolation(x, x0, x1, y0, y1) {
    return y0 + (y1 - y0) * ((x - x0) / (x1 - x0));
  }
}
