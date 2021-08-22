const fs = require('fs');

const { promisify } = require('util');

module.exports = {
    writeFilePromise: promisify(fs.writeFile)
};
