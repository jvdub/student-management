const OktaJwtVerifier = require('@okta/jwt-verifier');
const okta = require('@okta/okta-sdk-nodejs');

const oktaJwtVerifier = new OktaJwtVerifier({
    issuer: 'https://dev-512457.oktapreview.com/oauth2/default',
    assertClaims: {
        aud: 'api://default',
    },
});

const client = new okta.Client({
    orgUrl: 'https://dev-512457.oktapreview.com/',
    token: '007DWpoBpzhOjCvnkzqRffV8DCQMyFCTqxrkfNB1Yf'
});

function authenticationRequired(req, res, next) {
    const authHeader = req.headers.authorization || '';
    const match = authHeader.match(/Bearer (.+)/);

    if (!match) {
        return res.status(401).end();
    }

    const accessToken = match[1];

    return oktaJwtVerifier.verifyAccessToken(accessToken)
        .then((jwt) => {
            req.jwt = jwt;
            next();
        })
        .catch((err) => {
            res.status(401).send(err.message);
        });
}

module.exports = {
    authenticationRequired: authenticationRequired,
    getClient: () => {
        return client;
    }
};
