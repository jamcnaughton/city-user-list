/**
 * Display a logging message if appropriate.
 *
 * @param {string} message The message to log.
 */
export function log (
  message
) {
  const env = process.env.NODE_ENV || 'development';
  if (env === 'development') {
    console.log(message);
  }
}
