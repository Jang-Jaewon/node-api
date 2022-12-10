const app = require('../index.js')
const syncDb = require('./sync-db.js')
const port = 3000

syncDb().then(_ => {
    console.log('Sync database!');
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
})
