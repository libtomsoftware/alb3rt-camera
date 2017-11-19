const FILE_ID = 'state',
    core = require('alb3rt-core'),
    logger = core.logger;

module.exports = new class Alb3rtCameraHandlers {
    constructor() {}

    on() {
        logger.log(FILE_ID, 'camera on');
    }

    off() {
        logger.log(FILE_ID, 'camera off');
    }

    error() {
        logger.log(FILE_ID, 'camera error');
    }
};
