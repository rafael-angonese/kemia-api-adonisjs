"use strict";

const https = require("https");
const Env = use("Env");

const app_id = Env.get("ONESIGNAL_APP_ID");
const token = Env.get("ONESIGNAL_API_TOKEN");

class PushMessageService {
  constructor(message) {
    this.props = { message };
  }

  async call() {
    const { message } = this.props;

    const data = {
      app_id: app_id,
      contents: { en: message },
      included_segments: ["All"],
    };

    var headers = {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Basic ${token}`,
    };

    var options = {
      host: "onesignal.com",
      port: 443,
      path: "/api/v1/notifications",
      method: "POST",
      headers: headers,
    };

    var req = https.request(options, function (res) {
      res.on("data", function (data) {
        // console.log("Response:");
        // console.log(JSON.parse(data));
      });
    });

    req.on("error", function (e) {
      // console.log("ERROR:");
      // console.log(e);
    });

    req.write(JSON.stringify(data));
    req.end();
  }
}

module.exports = PushMessageService;
