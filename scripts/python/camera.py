import requests

modulesAvailable = False

try:
        from time import sleep
        from datetime import datetime
        from gpiozero import MotionSensor
        from gpiozero import LED
        from picamera import PiCamera
        import subprocess
        import shlex

        modulesAvailable = True

except ImportError:
        print('[alb3rt-camera-event] Error')
        error = {"type": "import"}
        requests.post('http://127.0.0.1:4004/api/error', json=error)

if modulesAvailable == True:
    camera = PiCamera()
    camera.resolution = (640, 480)
    timestamp = int(datetime.now().strftime('%s')) * 1000
    filename = 'video-%s' % timestamp

    camera.start_preview()
    sleep(1)
    camera.capture('./videos/%s.jpg' % filename)
    camera.stop_preview()

    camera.start_recording('./videos/temp/%s.h264' % filename)
    camera.wait_recording(10)
    camera.stop_recording()

    convertCommand = './scripts/bash/convert.sh ' + filename
    subprocess.call(shlex.split(convertCommand))

    requestUrl = 'http://127.0.0.1:4004/api/off
    data = {"filename": filename}
    response = requests.post(requestUrl, json=data)