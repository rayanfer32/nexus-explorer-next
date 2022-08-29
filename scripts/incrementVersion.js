const fs = require("fs");
const { spawnSync } = require("child_process");

const gitAdd = () => spawnSync("git", ["add", "package.json"]);

const gitCommit = (message) => spawnSync("git", ["commit", `-m '${message}'`]);

function saveVersion(packageJson) {
  const { version } = packageJson;

  fs.writeFile(
    "./package.json",
    Buffer.from(JSON.stringify(packageJson, null, 2)),
    { encoding: "utf8" },
    (err) => {
      if (err) {
        return console.log("Error!", err);
      }

      gitAdd();
      gitCommit(`chore: bump up version: ${version}`);

      return console.log(
        `Successfully updated and committed package.json to version ${version}`
      );
    }
  );
}

const splitVersion =
  (position = 2) =>
  (version = "0.0.0") => {
    const versionArr = version.split(".");
    if (isNaN(Number(versionArr[position])))
      throw Error(`Version is not made up of numbers! "${version}"`);

    const newVersion = versionArr.map((ver, idx) => {
      if(position === 0) return idx === position ? String(Number(versionArr[position]) + 1) : 0;
      return idx === position ? String(Number(versionArr[position]) + 1) : ver;
    });
    return newVersion.join(".");
  };

function incrementVersion(incrementer) {
  // read and parse package.json
  const rawPackage = fs.readFileSync("./package.json");
  const parsedPackage = JSON.parse(rawPackage);

  // get latest published version
  const latestVersion = parsedPackage.version || "0.0.1";

  // update the version
  const nextVersion = incrementer(latestVersion);
  parsedPackage.version = nextVersion;

  // save and commit the package.json
  saveVersion(parsedPackage);
}

module.exports = { incrementVersion, splitVersion };
