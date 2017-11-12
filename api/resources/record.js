const core = require('alb3rt-core'),
    record = require('../../record'),
    CONFIG = core.config,
    STATUS_CODE = CONFIG.CONSTANTS.HTTP_CODE;

module.exports = new class Alb3rtCameraResourcesRecord {
    constructor() {}

    post(request, response) {
        record.trigger(request.body);

        core.api.responder.send(response, {
            status: STATUS_CODE.OK,
            data: {}
        });
    }
};
