# web-to-app

Website to mobile app converter. Currently supports only Android.

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
