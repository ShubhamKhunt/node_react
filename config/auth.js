const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const privateKeyPath = path.join(__dirname, './key/private.pem');
const publicKeyPath = path.join(__dirname, './key/public.pem');

// const privateKeyPath = "./key/private.pem";
// const publicKeyPath = "./key/public.pem";

const privateKey = fs.readFileSync(privateKeyPath);
const publicKey = fs.readFileSync(publicKeyPath);

console.log(publicKey)

class Auth {

    constructor(){
        this.configuration = {
            algorithm: 'HS512',
            passPhrase: 'Backend@123',
            privateKey: privateKey,
            publicKey: publicKey
        }
    }

    getToken = (payLoad) => {
        const token = jwt.sign(payLoad, this.configuration.privateKey, 
            { algorithm: this.configuration.algorithm },
            { expiresIn: '1h' },
            function(err, res){
                if(err) throw err
                return res
            }
        );

        // const token = jwt.sign({ foo: 'bar' }, 'shhhhh');

        return token;
    }

    getPayload = (token) => {
        var payLoad = jwt.verify(token, privateKey, { algorithms: ['HS512'] }, function (err, payload) {
            console.log('payload err :: ', err)
            return payload;
        });

        return payLoad;
    }
}

module.exports = new Auth();

// var payLoad = {
//     'username': 'test.js@gmail.com',
//     'name': 'Test Js'
// };

// const token = jwt.sign(payLoad, { 
//         key: configuration.privateKey, 
//         passphrase: configuration.passPhrase 
//     }, 
//     { algorithm: configuration.algorithm  },
//     { expiresIn: '1h' },
//     function(err, res){
//         if(err) throw err
//         return res
//     }
// );

// // var token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE1ODQwOTE2MzR9.gPQcyywMtTEXLUpb77d3ZtHN2_OLerfAiwj28b8jFtvJz2mpMKlNglngleYu8vS9nlqrRQz732oO4PU9KUnnkcFyF3JoDcwtgVam6g_CuR4RIlEQZdQ2Y2B8Ys8ZPYjdtpfbysZHi-RxvIrd4XgSVBzg1wI4cYw8oL5Em6B2czGxXRMzxRDhzsq-kNurPxib292FenuXOzPrpDsh65RYZ0c5_r3H3qoR9OjChklUHv4dgbzvokzR-5Gj5cJ3TYTxWRmzXjU26BuaGbXqeBmsF6mYX__w_DpMG7GUgMMPpN21KmMi8TWrNpdaERyXOY0CmM3_nJHiaciq0uBfhXlYjV9XPYHjT0PFZ10iTz1f7v1kxTZgH-8aJjskou3rRzDtSwS0hxDInj3zjhP_cDkGgU68bgOOKsq0iGxQDQkC2eJ0KUznB8NgJ5FF6xd4IkfLDCg6fag0HyUppMRs2F9oxbvdmxzdL_3EfkbsB68t-whsvxN-OMC6GhCCz0qfDi-2k-_kAvLSFMG9JfFG6WSV5FAHMixLmHARFx41yEdbiwaCjvvI72u7PA0hdBlIGL7z5RvXmKnrI0oo-Lx6G5gqJMQEvbaK16Dk62N-ykplBM2mw7IfjwhnYCEztgruac2F30vEsqpum6vcE_AMI8TyO5uOhnBXehIM76SUSHPfoUY';

// var payLoad = jwt.verify(token, configuration.publicKey, { algorithms: [configuration.algorithm] }, function (err, payload) {
//     // console.log(payload);
//     return payload;
// });

// console.log(token);
// console.log(payLoad);