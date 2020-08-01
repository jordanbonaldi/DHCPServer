const publicIp = require('public-ip');
const requestPromise = require('request-promise');
const {setUUID, getUUID} = require('../src/utils/AuthorisationUtils');
const heartbeetWorker = require('../src/worker/HeartbeetWorker');

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
    })
    .then(() => console.log(`Changed DNS to ${ip}`))
    .then(() =>
        requestPromise.post({
            method: 'POST',
            uri: 'http://panel.mall-e-robots.com/login',
            body: {
                step: "robot",
                value: {
                    username: "Robot-1",
                    password: "test"
                }
            },
            json: true
        }).then((response) => {
            if (response.err)
                return console.log('Error on processing auth token');

            console.log(`Received authorisation token ${response.authorisation.id}`)

            return setUUID(response.authorisation.id);
        })
    )
).then(() => Promise.all([
    require('./www'),
    new heartbeetWorker(getUUID()).load()
]));
