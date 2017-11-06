
The manifest is a JSON file that contains important information about the app. It contains information that will personalize your app and define how it works based on the execution device. It is usefull to show your app correctly on a mobile device or to add it to the homescreen.

It will contains important information about:

- App name
- Background color, theme color, icons, etc.
- Display characteristics

# Create a manifest file

- Create a new file inside the assets folder called `manifest.json`
- Insert the code above:
```
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
- short_name is the display name on mobile devices when added to the home screen
- name is the full name of you app
- theme_color is the toolbar color when your app is running over a browser
- background_color is the background color of your app splash screen
- start_url is the main page of your app
- display define if you app will hide the browser UI or not

# Create icon files

- Create new icons inside the assets/icons
- Add a reference for them on the `manifest.json` inside the icon list, like:
```
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

# Add manifest to index

- Open the index.html
- Create a referrence to the manifest file inside the head section, like:
`<link rel="manifest" href="/manifest.json">`

# Test

- Open it using the Chrome DevTools
- Go to the Application tab
- Click on Manifest on the left side bar

- You can also test your app using the [Lighthouse](https://developers.google.com/web/tools/lighthouse/) an external tool to audits performance, accessibility, progressive web apps, and more.

[Move on to the next step: Create Service Worker](./02-service-worker.md)