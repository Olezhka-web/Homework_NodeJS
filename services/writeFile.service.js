const fs = require('fs');

module.exports = {
    writeFile: (dbPath, data) => {
        fs.writeFile(dbPath, data, (err) => {
            if (err) {
                console.log(err);
            }
        });
    }
};
