#!/usr/bin/env node
const { incrementVersion,splitVersion } = require("./incrementVersion");
incrementVersion(splitVersion(0));
