const fs = require('fs');

module.exports = {
    readFile: (dbPath, func) => {
        fs.readFile(dbPath, (err, data) => {

            if(err){
                console.log(err);
            }

            func(data.toString());
        });
    }
}

