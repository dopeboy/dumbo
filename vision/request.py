import base64
import sys
from googleapiclient import discovery
from oauth2client.client import GoogleCredentials
import json

def ocr(image):
    with open(image, "rb") as f:
        encoded = base64.b64encode(f.read()).decode("utf-8")

    DISCOVERY_URL='https://{api}.googleapis.com/$discovery/rest?version={apiVersion}'

    req = [{
        "image": { "content": encoded },
        "features": [{ "type": "TEXT_DETECTION" }]
    }]

    credentials = GoogleCredentials.get_application_default()
    service = discovery.build('vision', 'v1', credentials=credentials, discoveryServiceUrl=DISCOVERY_URL)
    request = service.images().annotate(body={
        'requests': req
    })
    responses = request.execute()
    response = responses['responses'][0]
    description = response['textAnnotations'][0]['description']
    print(description)
    return description

ocrs = []
for i in range(1, 20):
    image = "section3/q%d.png" % i
    description = ocr(image)
    ocrs.append({ "image": image, "text": description })

with open(sys.argv[1], "w") as f:
    json.dump(ocrs, f)
