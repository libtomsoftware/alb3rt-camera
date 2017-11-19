const core = require('alb3rt-core'),
    on = require('./resources/on');

module.exports = new class Alb3rtCameraApi {
    constructor() {
        core.api.extend('on', on);
    }
};
