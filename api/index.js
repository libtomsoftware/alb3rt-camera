const core = require('alb3rt-core'),
    record = require('./resources/record');

module.exports = new class Alb3rtCameraApi {
    constructor() {
        core.api.extend('record', record);
    }
};
