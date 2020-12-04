const fs = require('fs');

// This is only for prod
fs.writeFile(process.env.CRED, process.env.CRED_NAME, (err) => {});
