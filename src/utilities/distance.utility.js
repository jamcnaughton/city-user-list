/**
 * The Earth's radius in kilometres.
 */
const earthsRadiusInKm = 6378;

/**
 * The ratio between kilometres and miles.
 */
const kilometresToMiles = 0.62137;

/**
 * Get the distance between a supplied user and city co-ordinates in miles.
 *
 * @param {*} userLatitude The user's latitude co-ordinate.
 * @param {*} userLongitude  The user's longitude co-ordinate.
 * @param {*} cityLatitude  The city's latitude co-ordinate.
 * @param {*} cityLongitude  The city's longitude co-ordinate.
 */
export function distanceBetweenPointsInMiles (
  userLatitude,
  userLongitude,
  cityLatitude,
  cityLongitude
) {

  // Calculate differences accordingly in radians.
  const latitudeDifference = toRadians(userLatitude - cityLatitude);
  const longitudeDifference = toRadians(userLongitude - cityLongitude);

  // Apply the Haversine formula.
  const a =
    Math.pow(Math.sin(latitudeDifference / 2), 2) +
    (
      Math.cos(toRadians(cityLatitude)) * 
      Math.cos(toRadians(userLatitude)) * 
      Math.pow(Math.sin(longitudeDifference / 2), 2)
    );
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Get the distance in kilometres.
  const distanceInKilometres = earthsRadiusInKm * c;

  // Get the distance in miles.
  const distanceInMiles = Math.floor(distanceInKilometres * kilometresToMiles);

  // Return the resulting distance.
  return distanceInMiles;

};

/**
 * Convert a longitude/latitude to radians.
 *
 * @param {number} value The longitude/latitude to convert. 
 * @returns {number} The longitude/latitude in radians. 
 */
function toRadians (value) {
  return value * Math.PI / 180;
}
