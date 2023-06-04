import { EventEmitter } from "https://cdn.jsdelivr.net/npm/events@3.3.0/events.min.js";
let emitter = new EventEmitter();

// event data format
/*
{
    action: "get",
    data: {
        "property": 5
    }
}
*/

class _WEBTOAPP {
  "use-strict";

  config = {};

  constructor(config) {
    this.config = config;
    window.addEventListener("message", this.receiveData);
    this.queryAction("ready");
  }

  sendData(data) {
    window.parent.postMessage(data, "*");
  }

  receiveData(event) {
    if (!event) return;
    emitter.emit("messageReceived", event);
  }

  /*async queryAction(action, ...args) {
    this.sendData({ action: actionName, data: args });

    for await (const event of on(emitter, "dataReceived")) {
      let data = event.data;

      if (data.action === action) {
        return data;
      }
    }
  }*/

  async queryAction(action, ...args) {
    return new Promise(resolve, reject => {
      this.sendData({ action: actionName, data: args });

      emitter.on("messageReceived", event => {
        if (event.data.action === action) {
          emitter.removeListener("messageReceived", this);
          resolve(event.data);
        }
      });
    });
  }

  async deviceId() {
    return await queryAction("deviceId");
  }
}

let web2app = new _WEBTOAPP();
let id = await web2app.deviceId();
console.log(id);
