<template>
  <div class="bg-white" style="height: calc(100vh - 100px)">
    <div v-show="loading"></div>
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
  name: "IndexPage", // IndexPage, appConfig.namee
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
      if (!event) return;

      const data = event.data;
      if (!data.action) return;

      switch (data.action) {
        case "ready":
          this.ready();
          break;
        case "deviceId":
          this.sendData("ti13-jk8l-pwhn-291k");
          break;
      }
    },
    ready() {
      this.loading = false;
    },
  },
};
</script>
