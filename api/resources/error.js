const core = require('alb3rt-core'),
    handlers = require('../../handlers'),
    CONFIG = core.config,
    STATUS_CODE = CONFIG.CONSTANTS.HTTP_CODE;

module.exports = new class Alb3rtCameraResourcesError {
    post(request, response) {
        handlers.error(request.body);

        core.api.responder.send(response, {
            status: STATUS_CODE.OK
        });
    }
};
