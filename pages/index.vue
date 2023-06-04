<template>
  <div class="bg-white" style="height: 100vh">
    <div v-show="loading">loading</div>
    <iframe
      :src="url"
      v-show="!loading"
      ref="iframe"
      class="w-full h-full"
      frameborder="0"></iframe>
  </div>
</template>

<script>
import appConfig from "../config.json";
export default {
  name: "IndexPage",
  data() {
    return {
      url: appConfig.url,
      config: appConfig,
      loading: true,
    };
  },
  mounted() {
    window.addEventListener("message", this.receiveData);
  },
  beforeDestroy() {
    window.removeEventListener("message", this.receiveData);
  },
  methods: {
    sendData(data) {
      this.$refs["iframe"].contentWindow.postMessage(data, "*");
    },
    receiveData(event) {
      if (!event || !event.data.action) return;

      const data = event.data.data;
      const action = event.data.action;

      switch (action) {
        case "ready":
          this.ready();
          break;
        case "deviceId":
          this.respondAction(action, "ti13-jk8l-pwhn-291k");
          break;
        case "sendSMS":
          this.respondAction(
            action,
            `the sms was sucesfully sent: ${data.message}`
          );
          break;
      }
    },
    ready() {
      this.loading = false;
    },
    respondAction(action, data) {
      this.sendData({ action, data });
    },
  },
};
</script>
