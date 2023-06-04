import { EventEmitter } from "https://cdn.jsdelivr.net/npm/events@3.3.0/+esm";
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

  async queryAction(action, data) {
    let thisListener = null;
    return new Promise(resolve => {
      this.sendData({ action, data });
      emitter.on(
        "messageReceived",
        (thisListener = event => {
          if (event.data.action === action) {
            emitter.removeListener("messageReceived", thisListener);
            resolve(event.data.data);
          }
        })
      );
    });
  }

  // exmaple of function to communicate between iframe and application
  async deviceId() {
    // iteration 1
    /*this.queryAction("deviceId").then(receivedData => {
      return receivedData.data;
    });*/

    // iteration 2
    //const receivedData = await this.queryAction("deviceId");
    //return receivedData.data;

    // iteration 3
    /*return await this.queryAction("deviceId").then(function (receivedData) {
      return receivedData.data;
    });*/

    // iteration 4
    return await this.queryAction("deviceId");
  }

  // example of function with arguments
  async sendSMS(message) {
    return await this.queryAction("sendSMS", { message });
  }
}

let web2app = new _WEBTOAPP();
let id = await web2app.deviceId();
console.log(id);

let success = await web2app.sendSMS("hello world");
console.log(success);

export default _WEBTOAPP;
