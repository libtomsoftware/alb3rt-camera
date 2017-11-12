import requests
from time import sleep
from datetime import datetime

def getTimestamp():
        return int(datetime.now().strftime('%s'))

timestamp = getTimestamp()
ip = "127.0.0.1"
port = "4005"
data = {"ip": ip, "port": port}

while True:
        time = getTimestamp()
        timeDiff = time - timestamp
        if timeDiff > 5:
                timestamp = time
                print('[alb3rt-sensor] Motion-detected at timestamp-%s, reporting...') % timestamp
                try:
                        response = requests.post('http://127.0.0.1:4003/api/motion', json=data)
                        if response.status_code == 200:
                                print('[alb3rt-sensor] Motion reported successfully.')
                except requests.exceptions.RequestException as error:
                        print('[alb3rt-sensor] Request error - motion not reported!')
                        print('[alb3rt-sensor] %s') % error