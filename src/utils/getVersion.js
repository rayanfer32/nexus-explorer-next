// get current package version from package.json
export const getVersion = () => {
  const packageJson = require('../../package.json');
  return packageJson.version;
};
