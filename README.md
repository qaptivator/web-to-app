# web-to-app

A Capacitor-based library that turns any website into a mobile or desktop app, automatically updating as the website deploys.<br>
This serves as an API gateway between native Capacitor JS APIs and your website.<br>
This library also makes it so you don't have to recompile the app on every webstie deployment, it reloads automatically.<br>
You don't need to wait several days until the distribution service verifies your app. _(But other changes such as app title or icon will require recompilation)_<br>
This library is also easier to setup than Capacitor: you just take the native app, configure a few things and you are good to go. Everything is ready for compilation.<br>
This library will also support cross-platformness of Capacitor, because it's built on top of Capacitor.<br>
Currently supported platforms:
- [x] Android
- [ ] iOS
- [ ] Windows
- [ ] MacOS
- [ ] Linux

**This library is still work in progress, and it would need a total overhaul. It is very early in the development.**

# FAQ

- What is the difference between this and Capacitor JS?
  - Capacitor JS is great but there is still an issue which is apparent in all native apps: when you update something, **you have to recompile it and then deploy it to whatever distribution service you use**, where it will take even more time to validate. But this library solves that issue. It shows your website **inside of an iframe**, which basically means that instead of showing the website from local files, it gets the page from provided URL link. That means you **don't have to recompile the app** whenever you deploy your website. It will automaitcally get refreshed when opening the app, because it's tied to the website, not to the local installation. But be aware that **to change the app's title, icon or include additional APIs, you will have to recompile the app**. But it happens way less frequently than website deployment. I will also mention that **if there is no internet, the app won't work**, internet connection is required.
- How will you interact with native Capacitor JS APIs from the website?
  - This library is split into two parts: first is located inside the app, and the other one is on the website. From the website, **it will send requests from the iframe to the native app, the app will run the corresponding API and return the result**. You can think of it as the website having GraphQL queries which describe API endpoints, and the native app as the one who processes them. Native app APIs are included within the package so if you want to include additional APIs to the app, you will have to recompile it.
- Why would I use this library?
  - If you have a website which is tied to the web, like a SaaS, this library fits the best for you. If you are making a calculator app or an offline game, this is a terrible choice. This is due to the fact that **if there is no internet, the app won't work**, internet connection is required. For most websites internet is crucial, because without it you wont be able to login. But for other apps, specifically designed for local use, this is a bad choice.
- Can I integrate my own Capacitor JS APIs?
  - Yes, definitely! In the future, you will be able to integrate any Capacitor native library you want, such as community ones.

## Build Setup

Clone the repository
`git clone https://github.com/qaptivator/web-to-app.git`

Configure the aplication in `config.json`

```json
{
  "url": "https://yourdomain.com",
  "name": "exampleapp",
  "title": "My Example App",
  "appId": "com.yourdomain.exampleapp"
}
```

Build the application

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# generate android application
$ npm run compile
```
