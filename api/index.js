const core = require('alb3rt-core'),
    on = require('./resources/on'),
    off = require('./resources/off'),
    error = require('./resources/error');

module.exports = new class Alb3rtCameraApi {
    constructor() {
        core.api.extend('on', on);
        core.api.extend('off', off);
        core.api.extend('error', error);
    }
};
