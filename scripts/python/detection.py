import requests

modulesAvailable = False

try:
        from time import sleep
        from datetime import datetime
        from gpiozero import MotionSensor
        from gpiozero import LED

        modulesAvailable = True

except ImportError:
        print('[alb3rt-sensor-event] Error')
        requests.get('https://127.0.0.1:4001/api/sensors/motion?type=error', verify=False, headers={'x-system-access-key': '058cd7c17322'})

if modulesAvailable == True:
        pir = MotionSensor(4)
        led = LED(17)

        def getTimestamp():
                return int(datetime.now().strftime('%s'))

        timestamp = getTimestamp()

        while True:
                if pir.motion_detected:
                        time = getTimestamp()
                        timeDiff = time - timestamp
                        if timeDiff > 5:
                                timestamp = time
                                print('[alb3rt-sensor-event] Motion-detected, timestamp-%s') % timestamp
                                led.on()
                                response = requests.get('https://127.0.0.1:4001/api/sensors/motion?type=event', verify=False, headers={'x-system-access-key': '058cd7c17322'})
                                if response.status_code == 200:
                                        print('Motion reported!')
                                        print('Request success response - %s') % response.status_code
                                        sleep(1)
                                        led.off()