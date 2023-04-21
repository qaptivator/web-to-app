
<template>
  <div>
    <div class="w-full bg-red-500 p-2 flex">
      <div class="flex-auto">
         SMS Gateway
      </div>
      <!--<div>
        <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>-->
    </div>
    <div class="m-auto p-5 mt-10">
      <div v-if="!isConnected" >
        <input v-model="url" type="text" placeholder="API URL" class="w-full border p-1 shadow-md" />
        <div class="w-full text-center">
          <button class="border rounded-lg mt-5 py-2 px-10 bg-cyan-300 shadow-md" spellcheck="false" @click="setUrl">Connect</button>
        </div>
      </div>
      <div v-else>
        <div class="w-full text-center">
          <button class="border rounded-lg mt-5 py-2 px-10 bg-red-500 shadow-md" @click="disconnect">Disconnect</button>
        </div>
      </div>
    </div>
    <div v-for="(log, ind) in logs" :key="'log'+ind" class="p-5">
      <div class="flex" :class="bindStatus(log.type)">
        <div class="pr-1 my-auto">
          <svg v-if="log.type === 'info'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
          <svg v-else-if="log.type === 'warn'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          <svg v-else-if="log.type === 'error'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
          </svg>
        </div>
        <div>
          {{log.message}}
          <div class="text-gray-500/75 text-xs">
            {{log.time}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  name: "IndexPage",
  data() {
    return {
      url: "",
      logs: [],
      isConnected: false
    }
  },
  mounted() {
    //this.url = this.$store.dispatch('fetchURL');
    //this.logs = this.$store.dispatch('fetchLogs');
  },
  methods: {
    setUrl() {
      if (this.url && this.isConnected == false) {
        this.isConnected = true
        //this.$store.dispatch('setURL', this.url);
        this.throwLog("successfully connected to " + this.url, "info")
      }
    },
    disconnect() {
      if (this.isConnected == true) {
        this.isConnected = false
        this.throwLog("disconnected from " + this.url, "warn")
      }
    },
    throwLog(message, type) {
      // Types of logs
      // info
      // warn
      // error
      const MAX_LOGS = 25;

      if (!message || !type) return false;

      let log = {message, type, time: moment().format("YYYY/MM/DD h:mm:ss A")};

      if(this.logs.length > MAX_LOGS) this.logs.length = MAX_LOGS;

      this.logs.unshift(log);
      //this.$store.dispatch('setLogs', this.logs);
    },
    bindStatus(type) {
      switch(type) {
        case "warn":
          return "text-yellow-500";
        case "error":
          return "text-red-500";
        default:
          break;
      }
    }
  }
}
</script>
