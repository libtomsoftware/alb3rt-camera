const FILE_ID = 'state',
    fs = require('fs-extra'),
    core = require('alb3rt-core'),
    python = core.python,
    http = core.http,
    logger = core.logger;

module.exports = new class Alb3rtCameraHandlers {
    constructor() {
        this.pyshell = null;

        this.on = this.on.bind(this);
        this.off = this.off.bind(this);
    }

    on() {
        logger.log(FILE_ID, 'camera on');

        if (!this.pyshell) {
            console.log(FILE_ID, 'No camera running, turning on...');

            fs.ensureDir('./videos/temp')
                .catch((videosFolderError) => {
                    console.log(FILE_ID, 'Error while creating directory ./videos/temp', videosFolderError);
                });

            python.run('camera', pyshell => {
                this.pyshell = pyshell;
            });
        } else {
            console.log(FILE_ID, 'An attempt to turn on camera, but it is already running, aborting...');
        }
    }

    off(filename) {
        if (this.pyshell) {
            console.log(FILE_ID, 'Camera running, turning off...');

            this.pyshell.childProcess.kill('SIGINT');
            this.pyshell = null;
            python.stop('camera');

        } else {
            console.log(FILE_ID, 'An attempt to turn off camera, but no camera running, aborting...');
        }

        if (filename) {
            fs.pathExists('./videos/' + filename + '.mp4', (videoFileError, exists) => {
                if (!videoFileError && exists) {
                    console.log(FILE_ID, 'Notifying filemaster about', filename);

                    const body = {
                        created: (new Date()).getTime(),
                        filepath: '/videos/',
                        extension: '.mp4',
                        type: 'movie',
                        address: CONFIG.APP.ADDRESS
                    };

                    fs.pathExists('./videos/' + filename + '.jpg', (thumbnailFileError, thumbnailExists) => {
                        if (!thumbnailFileError && thumbnailExists) {
                            body.thumbnail = filename + '.jpg';
                        }

                        this.notify(filename, body);
                    });
                }
            });
        }
    }

    notify(filename, body) {
        http.put({
            url: CONFIG.URL.FILEMASTER + '/api/downloads/' + filename,
            body
        }, (downloadRequestError, res) => {
            if (downloadRequestError || res.statusCode !== 200) {
                console.log(FILE_ID, 'Error when notifying master about video', filename + ':', res.statusCode);
            }
        });
    }

    error() {
        logger.log(FILE_ID, 'Camera script error, aborting...');
    }
};
