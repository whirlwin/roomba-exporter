const http = require("http");
const dorita980 = require("dorita980");
const promClient = require("prom-client");

const irobotStatusGuage = new promClient.Gauge({
    name: "roomba_state",
    help: "The current state of the Roomba",
    labelNames: ["ip"]
});

const roombaStatus = {
    charging: 1
};

function isCharging(data) {
    return data && data["cleanMissionStatus"] && data["cleanMissionStatus"]["phase"] === "charge";
}

const robot = new dorita980.Local(process.env.USERNAME, process.env.PASSWORD, process.env.ROOMBA_IP_ADDRESS);
robot.on("connect", () => {
    console.log(`Connected to Roomba with IP: ${process.env.ROOMBA_IP_ADDRESS}`);
});

robot.on("mission", (data) => {
    if (isCharging(data)) {
        irobotStatusGuage.labels(process.env.ROOMBA_IP_ADDRESS).set(roombaStatus.charging);
    }
});

robot.on("close", () => {
    console.log("connection to robot closed");
});

const server = http.createServer((req, res) => {
    res.end(promClient.register.metrics());
});

server.listen(process.env.PORT || 7000);
