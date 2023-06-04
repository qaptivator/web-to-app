import appConfig from "./config.json";
export default {
  appId: appConfig.appId,
  appName: appConfig.title,
  bundledWebRuntime: false,
  npmClient: "npm",
  webDir: "dist",
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
      splashImmersive: true,
    },
  },
  cordova: {},
};
