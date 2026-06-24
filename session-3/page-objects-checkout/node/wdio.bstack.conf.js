// Session 3 · Page Objects search -> checkout · BrowserStack (CLOUD) config.
// Same page objects + spec as the local run — ONLY the endpoint + capabilities
// change. Verifies the POM refactor end-to-end on real devices, in parallel.
//
// Setup:
//   export BROWSERSTACK_USERNAME=... BROWSERSTACK_ACCESS_KEY=...
//   export BROWSERSTACK_APP=bs://<hash>   (the uploaded DemoApp build)
//   npm run test:cloud

export const config = {
  runner: 'local',

  hostname: 'hub.browserstack.com',
  port: 443,
  protocol: 'https',
  path: '/wd/hub',

  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,

  specs: ['./test/specs/**/*.e2e.js'],   // SAME spec as local
  maxInstances: 2,                        // both devices run the flow in parallel

  waitforTimeout: 20000,
  // Give the cloud time to allocate a device before the client gives up.
  connectionRetryTimeout: 300000,

  capabilities: [
    {
      platformName: 'Android',
      'appium:automationName': 'UiAutomator2',
      // Lower-demand mid-range device → allocates fast, no flagship queue.
      'appium:deviceName': 'Xiaomi Redmi Note 11',
      'appium:platformVersion': '11.0',
      'appium:app': process.env.BROWSERSTACK_APP,
      'bstack:options': {
        projectName: 'Appium Bootcamp',
        buildName: 'session-3-page-objects',
        sessionName: 'checkout · Redmi Note 11',
      },
    },
    {
      platformName: 'Android',
      'appium:automationName': 'UiAutomator2',
      'appium:deviceName': 'Google Pixel 7',
      'appium:platformVersion': '13.0',
      'appium:app': process.env.BROWSERSTACK_APP,
      'bstack:options': {
        projectName: 'Appium Bootcamp',
        buildName: 'session-3-page-objects',
        sessionName: 'checkout · Pixel 7',
      },
    },
  ],

  logLevel: 'error',

  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 240000,
  },

  // No beforeTest reset here (unlike the local config): BrowserStack installs a
  // FRESH copy of the uploaded app per session and auto-launches it on the login
  // screen, so each run already starts clean. (Note: BrowserStack's UiAutomator2
  // doesn't support `mobile: activateApp` anyway.)
}
