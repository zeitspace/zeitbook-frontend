The manifest is a JSON file that contains important information about the app. It contains information that will personalize your app and define how it works based on the target device. It is useful to show your app correctly on a mobile device or to add it to the home screen.

It will contain important information about:

- App name
- Background color, theme color, icons, etc.
- Display characteristics

## Create a manifest file

- Create a new file inside the assets folder called `manifest.json`
- Insert the code below:
```json
{
    "short_name": "Zeitbook",
    "name": "Zeitbook: A Social Network",
    "icons": [
    ],
    "theme_color": "#0098fa",
    "background_color": "#ffffff",
    "start_url": "index.html",
    "display": "standalone"
}
```
- short_name is the display name of the app on mobile devices when added to the home screen
- name is the full name of your app
- theme_color is the toolbar color when your app is running over a browser
- background_color is the background color of your app splash screen
- start_url is the main page of your app
- display defines if your app will hide the browser UI or not

## Create icon files

- Download the ZIP file containing the icons [here].
- Unzip the file and move the contents to the assets/icons folder
- Add references to them in the `manifest.json` file, inside the icons list. For example:
```json
{
    "src": "/android-chrome-192x192.png",
    "sizes": "192x192",
    "type": "image/png"
},
{
    "src": "/android-chrome-256x256.png",
    "sizes": "256x256",
    "type": "image/png"
}
```

## Add manifest to index

- Open `index.html`
- Add the following line within the `<head>` tags:
```html
<link rel="manifest" href="/manifest.json">
```

## Test

- Open it using Google Chrome
- Open Chrome DevTools (`F12` on Windows or `cmd + option + j` on macOS)
- Go to the Application tab
- Click on Manifest on the left side bar and see the manifest data. You should see the icons that you just added.

- You can generate a report for your app using [Lighthouse](https://developers.google.com/web/tools/lighthouse/), a tool developed by Google. It has audits for performance, accessibility, and progressive web apps.


[Move on to the next step: Create Service Worker](./02-service-worker.md)
