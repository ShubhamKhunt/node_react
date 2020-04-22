var jwt = require('jsonwebtoken');

const fs = require('fs');

var publicKey = fs.readFileSync(process.cwd() + '/lib/JWT/key/public.pem');
var privateKey = fs.readFileSync(process.cwd() + '/lib/JWT/key/private.pem');

exports.getToken = () => {
	var token = jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS512' });

	return token;
}