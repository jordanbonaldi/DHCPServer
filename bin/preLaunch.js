const publicIp = require('public-ip');
const requestPromise = require('request-promise');

return publicIp.v4().then((ip) =>
    requestPromise.post({
        method: 'POST',
        uri: 'http://panel.mall-e-robots.com/dnsRecord',
        body: {
            password: "test",
            name: "Robot-1",
            ip: ip
        },
        json: true
    }).then(() => console.log(`Changed DNS to ${ip}`))
).then(() => require('./www'));
