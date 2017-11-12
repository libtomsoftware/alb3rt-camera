const FILE_ID = 'state',
    core = require('alb3rt-core'),
    logger = core.logger;

module.exports = new class Alb3rtSecuritySlaveRecord {
    constructor() {}

    trigger(data) {
        logger.log(FILE_ID, 'recording triggered');
    }
};
