const {spawn} = require('child_process');

/**
 *
 * @param execution
 */
const handleEvents = (execution) => {
    execution.stdout.on('data', data =>
        console.log(`${data}`)
    );

    execution.on('close', () =>
        console.log(`Program closed`)
    );
}

const launchRobot = () => handleEvents(spawn('ls', []));

const stopRobot = () => handleEvents(spawn('ls', []));

module.exports = {launchRobot, stopRobot};
