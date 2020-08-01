module.exports = class Worker {
    /**
     *
     * @param name
     * @param delay
     * @param params
     */
    constructor(name, delay, params = {}) {
        this.name = name;
        this.delay = delay;
        this.params = params;

        console.log(this.name + " running");
    }

    run(params) {

    }

    load(params, perm = true){
        if (params !== {})
            this.params = params;
        if (!perm)
            return this.run(this.params);

        return this.run(this.params).then(() => {
            return new Promise((res) => setTimeout(res, this.delay * 1000))
                .then(() => this.load(this.params))
                .catch((e) => {
                    console.log("Trying to handle error and rebuild " + this.name + `: ${e}`);
                    return new Promise((res) => setTimeout(res, 240 * 1000))
                        .then(() => {
                            console.log("Error handled with success and system rebuilt");
                            return this.load(this.params)
                        })
                });
        });
    }

}