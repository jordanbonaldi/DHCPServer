const worker = require('./worker');
const requestPromise = require('request-promise');

module.exports = class HeartbeetWorker extends worker {

    constructor(uuid) {
        super(`Heartbeet Worker with ${uuid}`, 120);
        this.uuid = uuid;
    }

    /**
     *
     * @param params
     */
    run(params) {
        return requestPromise.post({
            method: 'POST',
            uri: `http://panel.mall-e-robots.com/admin/heartbeet/${this.uuid}`,
            body: {
                name: 'Robot-1'
            },
            json: true
        }).then(() => console.log('HeartBeet sent !'));
    }
}