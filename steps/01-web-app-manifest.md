# Web app manifest

The web app manifest is a JSON file that contains important information about your application. If your application provides a manifest, browsers will prompt your users to install it to their devices' homescreens. You can also use the manifest to control whether your application is displayed in portrait or landscape and choose a theme colour for the browser's UI (or even hide it altogether).

## Create a manifest file

Create the file `assets/manifest.json` and insert the code below:

```json
{
    "short_name": "Zeitbook",
    "name": "Zeitbook: A Social Network",
    "icons": [
    ],
    "theme_color": "#0098fa",
    "background_color": "#ffffff",
    "start_url": "/",
    "display": "standalone",
}
```

Your web app manifest now contains the following properties:

| Key | Description |
|-|-|
| `short_name` | Display name of the application on mobile devices when added to the homescreen |
| `name` | Name used by browsers when they display install banners to your users |
| `theme_color` | Colour of the toolbar when your application is running in a browser |
| `background_color` | Colour of your application's splash screen, which is displayed after a user opens your application from their homescreen |
| `start_url` | The page that is displayed when a user opens your application from their homescreen |
| `display` | Set this property to `"browser"` to display the browser's UI or to `"standalone"` to hide it |

## Create and reference icons

If you want browsers to prompt your users to install your application, you must provide

First, download [the ZIP file containing the icons](./icons.zip). Extract the contents of this file into a new folder `assets/icons`.

Next, add references to the icons in your manifest, under the `icons` key:

```json
    "icons": [
        {
            "src": "/icons/192x192.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "/icons/256x256.png",
            "sizes": "256x256",
            "type": "image/png"
        },
        {
            "src": "/icons/512x512.png",
            "sizes": "512x512",
            "type": "image/png"
        }
    ],
```

## Reference the manifest in your application's HTML files

Add the following line within the `<head>` tags of `assets/pages/index.html` and `assets/pages/post.html`:

```html
<link rel="manifest" href="/manifest.json">
```

## Test the manifest

Open your application at [localhost:3000](localhost:3000) using Google Chrome, then open Chrome DevTools (`F12` on Windows or `cmd + option + j` on macOS). In the Application tab of the DevTools, click on the Manifest menu item. You should see all the data from your application's manifest, including the icons that you just added.

## Next step

[Add a service worker to your application.](./02-service-worker.md)
