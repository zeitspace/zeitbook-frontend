# Zeitbook

[ ![Codeship Status for zeitspace/zeitbook-frontend](https://app.codeship.com/projects/5656a700-a2f9-0135-15e6-76731562ca18/status?branch=master)](https://app.codeship.com/projects/254818)

The starter application for Zeitspace's workshop on Progressive Web Apps.

## Arriving late?

Complete the instructions under [Prerequisites](#prerequisites) and [Setup](#setup), with one difference. If you're cloning this repository using Git, check out either the `step-1`, `step-2`, `step-3`, or `step-4` branch based on the current step. If you're downloading this repository as a ZIP file, use one of the following links:

- [Step 1](https://github.com/zeitspace/zeitbook-frontend/archive/step-1.zip)
- [Step 2](https://github.com/zeitspace/zeitbook-frontend/archive/step-2.zip)
- [Step 3](https://github.com/zeitspace/zeitbook-frontend/archive/step-3.zip)
- [Step 4](https://github.com/zeitspace/zeitbook-frontend/archive/step-4.zip)

Next, go to [the instructions for the current step](#steps).

## Prerequisites

Make sure you have the following software installed:

1. A recent version of Google Chrome.
1. A text editor or an IDE. If you don’t have one installed, we recommend [Atom](https://atom.io).
1. [Git](https://git-scm.com). After installing Git, clone the this repository by running `git clone https://github.com/zeitspace/zeitbook-frontend.git`. If you don't want to install Git, you can [download the starter application as a ZIP file](https://github.com/zeitspace/zeitbook-frontend/archive/master.zip).
1. [Node.js and NPM](https://nodejs.org/en/download/).

## Setup

1. In your command line, navigate to the directory containing the source code for this starter application.
1. Change the contents of `src/username.js`, replacing `[NAME]` with a username of your choice. This is the name that will appear on your posts and comments on Zeitbook.
1. Run `npm install`, then `npm start`.
1. Open [localhost:3000](localhost:3000) in Google Chrome.

## Steps

### Step 1: [Web app manifest](./steps/01-web-app-manifest.md)

You'll add a manifest file that tells browsers how to display your application and lets them prompt your users to install it to their homescreens.

### Step 2: [Service worker](./steps/02-service-worker.md)

A service worker is a script that browsers run in the background and that can communicate with your application. You'll create a service worker that caches API requests and the application's own resources.

### Step 3: [Push notifications](./steps/03-push-notifications.md)

Using the service worker you created in Step 2, you'll set up your application to display push notifications when someone replies to your posts or comments.

### Step 4: [Background Sync](./steps/04-background-sync.md)

You'll use the Background Sync API to let users create posts and comments while offline.

## Extension
You can further enhance the user experience of ZeitBook by implementing several other common features of PWAs.

### RAIL Performance Model
The RAIL Performance Model is a user-centric performance model that has the following key ideas:
- Respond to users immediately; acknowledge user input in under 100ms
- When animating or scrolling, produce a frame in under 10ms
- Maximize main thread idle time
- Keep users engaged; deliver interactive content in under 1000ms

This model concentrates on making users the focal point of your app. The app doesn't necessarily have to be faster on any specific device, but the goal is to make users happy.

### App Shell
The App Shell is a technique for building the layout of a PWA. It involves aggressively caching minimal HTML, CSS and JS required for the user interface that loads almost instantly, whilst dynamic content is loaded after the shell is rendered using JavaScript. This can reduce the first meaningful load time and time until interactability, which makes the app feel smoother and faster.

## Resources

If you're looking for a refresher on what Progressive Web Apps are and why they're important, we recommend [this article](https://blog.ionic.io/what-is-a-progressive-web-app/).

[pwa.rocks](https://pwa.rocks/) is a collection of PWAs, and is itself a PWA!

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
