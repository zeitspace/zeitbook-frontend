# Zeitbook

The starter application for Zeitspace's workshop on Progressive Web Apps.

## Arriving late?

Complete the instructions under [Prerequisites](#prerequisites) and [Setup](#setup), then go to [the instructions for the current step](#steps).

## Prerequisites

Make sure you have the following software installed:

1. A recent version of Google Chrome.
1. A text editor or an IDE. If you don’t have one installed, we recommend [Atom](https://atom.io).
1. [Git](https://git-scm.com). After installing Git, clone the this repository by running `git clone https://github.com/zeitspace/zeitbook-frontend.git`. If you don't want to install Git, you can [download the starter application as a ZIP file](https://github.com/zeitspace/zeitbook-frontend/archive/master.zip).
1. [Node.js and NPM](https://nodejs.org/en/download/).

Optionally, you can install the following software to improve your development experience:

- The [LiveReload Chrome extension](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en). This extension will automatically refresh the browser after you make a change to a JavaScript source file. Even cooler, it will update changed CSS files without reloading the page.

## Setup

1. In your command line, navigate to the directory containing the source code for this starter application.
1. Create a new file `src/username.js` with the contents `export default '[NAME]';`, replacing `[NAME]` with a username of your choice.
1. Run `npm install`, then `npm start`.
1. Open [localhost:3000](localhost:3000) in Google Chrome.
1. If you have installed the LiveReload Chrome extension, click on its icon in the Chrome toolbar. This should change the icon so that the small circle in the center is filled in, indicating that LiveReload has been activated.

## Steps

### Step 1: [Web app manifest](./steps/01-web-app-manifest.md)

You'll add a manifest file that tells browsers how to display your application and lets them prompt your users to install it to their homescreens.

### Step 2: [Service worker](./steps/02-service-worker.md)

A service worker is a script that browsers run in the background and that can communicate with your application. You'll create a service worker that caches API requests and the application's own resources.

### Step 3: [Push notifications](./steps/03-push-notifications.md)

Using the service worker you created in Step 2, you'll set up your application to display push notifications when someone replies to your posts or comments.

## Resources

If you're looking for a refresher on what Progressive Web Apps are and why they're important, we recommend [this article](https://blog.ionic.io/what-is-a-progressive-web-app/).

### Concepts

- [Overview of Progressive Web Apps](https://developers.google.com/web/progressive-web-apps/)
- [Progressive Web App checklist](https://developers.google.com/web/progressive-web-apps/checklist) (contains descriptions of the audits used by Lighthouse)
- [Google Chrome Developers Youtube Channel](https://www.youtube.com/user/ChromeDevelopers/videos) (many videos covering the latest web development trends and technologies, including progressive web apps)
- [App Shell model](https://developers.google.com/web/fundamentals/architecture/app-shell) (using a service worker to cache the minimal amount of static assets required to render a page, with the goal of very fast page loads)
- [RAIL performance model](https://developers.google.com/web/fundamentals/performance/rail) (a user-centric performance model for web applications)
- [Web app install banners](https://developers.google.com/web/fundamentals/app-install-banners/)

### Features and APIs

#### Web app manifest

- [Google article](https://developers.google.com/web/fundamentals/web-app-manifest/)
- [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/Manifest)

#### Service workers

- [Google article](https://developers.google.com/web/fundamentals/primers/service-workers/)
- [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)

#### Push notifications

- [Google article](https://developers.google.com/web/fundamentals/push-notifications/)
- [MDN documentation for the Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API)
- [MDN documentation for the Notifications API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API)

#### Background Sync

- [Google article](https://developers.google.com/web/updates/2015/12/background-sync)
- [WICG explainer](https://github.com/WICG/BackgroundSync/blob/master/explainer.md)
- [WICG specification](https://wicg.github.io/BackgroundSync/spec/)

### Developer tooling

- [Workbox](https://developers.google.com/web/tools/workbox/) (tools for writing and automatically generating service workers)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse/) (automated testing of PWA criteria and other web page quality metrics)
- [Debugging PWAs using Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/progressive-web-apps)
