const mongoose = require('mongoose');
// const MongoClient = require('mongodb').MongoClient
const uri = 'mongodb://localhost:27017/backend'

mongoose.connect(uri).then(
    () => { 
        // mongo connected
        console.log('mongodb connected');
    },
    err => { 
        console.log('mongodb connection failed');
        console.log(`Error : ${err}`);
    }
);

// let dbObj;

// const initConnection = () => {
//     return new Promise((resolve, reject) => {
        
//         MongoClient.connect(uri, function (err, client) {
//             if (err) throw reject(err)
        
//             var db = client.db('backend')
//             dbObj = db;
        
//             resolve(db);
//         })
//     });
// }

// const getObject = () => dbObj

// const closeConnection = () => dbObj.close()

// module.exports = { initConnection, getObject, closeConnection }