# Roomba exporter

Prometheus exporter for iRobot Roomba robot vacuum cleaners

## Configuration

1. Connect to the same network as the Roomba 📶
2. Find the Roomba IP, e.g. by running an arp scan `arp -a`
3. Obtain the Roomba details
```bash
# Get required dependency
npm install

# Follow in-terminal instructions
npx get-roomba-password
```

## Running

1. Start the Roomba exporter, setting the following environment variables
````bash
# Required environment variables
ROOMBA_IP_ADDRESS=<ip from configuration step 2>
USERNAME=<blid from configuration step 3>
PASSWORD=<password from configuration step 3>

# Optional environment variables
PORT=<Port for endpoint exposing metrics> # Defaults to 7000
````

2. Run as a standalone container or a sidecar in Kubernetes
TODO quay
```
docker run \
    -p 7000:7000 \
    --env=ROOMBA_IP_ADDRESS=192.168.87.120 \
    --env=USERNAME=3192801C39119775 \
    --env=PASSWORD=foobarbaz123 \
    quay.io/whirlwin/roomba-exporter:latest
```

## Compatability

Tested with:
- iRobot Roomba 980 ✅
- iRobot Roomba 895 ✅
