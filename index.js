const core = require('alb3rt-core'),
    logger = core.logger,
    FILE_ID = 'index';

module.exports = new class Alb3rtSecuritySlave {
    constructor() {
        require('./api');
    }
};
