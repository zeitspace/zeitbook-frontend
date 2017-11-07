# Zeitbook

The starter application for Zeitspace's workshop on Progressive Web Apps.

## Prerequisites

Make sure you have the following software installed:

1. A recent version of Google Chrome.
1. A text editor or an IDE. If you don’t have one installed, we recommend [Atom](https://atom.io).
1. [Git](https://git-scm.com). After installing Git, clone the this repository by running `git clone https://github.com/zeitspace/zeitbook-frontend.git`. If you don't want to install Git, you can [download the starter application as a ZIP file](https://github.com/zeitspace/zeitbook-frontend/archive/master.zip).
1. [Node.js and NPM](https://nodejs.org/en/download/).

Optionally, you can install the following software to improve your development experience:

1. The [LiveReload Chrome extension](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en). This extension will automatically refresh the browser after you make a change to a JavaScript source file. Even cooler, it will update changed CSS files without reloading the page.

## Setup

1. In your command line, navigate to the directory containing the source code for this starter application.
1. Open the username.js
1. Change the `[replace this string with a username of your choosing]` to your name
1. Run `npm install`, then `npm start`.
1. Open [localhost:3000](localhost:3000) in Google Chrome.
1. If you have installed the LiveReload Chrome extension, click on its icon in the Chrome toolbar. This should change the icon so that the small circle in the center is filled in, indicating that LiveReload has been activated.

# Steps

## Step 1: [Web app manifest](./steps/01-web-app-manifest.md)

You'll add a manifest file that tells browsers how to display your application and lets them prompt your users to install it to their homescreens.

## Step 2: [Service worker](./steps/02-service-worker.md)

A service worker is a script that browsers run in the background and that can communicate with your application. You'll create a service worker that caches API requests and the application's own resources.

## Step 3: [Push notifications](./steps/03-push-notifications.md)

Using the service worker you created in Step 2, you'll set up your application to receive push notifications when someone replies to your posts or comments.
