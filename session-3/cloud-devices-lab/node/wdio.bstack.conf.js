// Session 3 · Cloud Devices lab (SCAFFOLD) · BrowserStack WebdriverIO config.
// Same specs as wdio.conf.js — ONLY the endpoint + capabilities change. That's the whole point.
//
// Setup:
//   1. export BROWSERSTACK_USERNAME=... and BROWSERSTACK_ACCESS_KEY=...
//   2. Upload the APK once to BrowserStack; it returns an app id like bs://<hash>.
//      Set it as BROWSERSTACK_APP (BrowserStack runs YOUR uploaded build, not a local package).
//   3. npm run test:cloud

export const config = {
  runner: 'local',

  // The grid endpoint replaces your local Appium server.
  hostname: 'hub.browserstack.com',
  port: 443,
  protocol: 'https',
  path: '/wd/hub',

  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,

  specs: ['./test/specs/**/*.e2e.js'],   // SAME tests as local
  maxInstances: 2,                        // the grid runs many devices in parallel

  waitforTimeout: 20000,
  // Give the cloud time to ALLOCATE a real device before the client gives up.
  // On the free tier a popular device can queue past the 120s default → false failure.
  connectionRetryTimeout: 300000,

  capabilities: [
    {
      platformName: 'Android',
      'appium:automationName': 'UiAutomator2',
      'appium:deviceName': 'Samsung Galaxy S23',
      'appium:platformVersion': '13.0',
      // BrowserStack runs the build you uploaded (bs://...), not a local appPackage.
      'appium:app': process.env.BROWSERSTACK_APP,
      'bstack:options': {
        projectName: 'Appium Bootcamp',
        buildName: 'session-3-cloud',
        sessionName: 'login · Galaxy S23',
      },
    },
    // Second real device — same spec, runs IN PARALLEL with the S23 (maxInstances: 2).
    // Only the caps change; the test file is untouched. That's the whole point of the grid.
    {
      platformName: 'Android',
      'appium:automationName': 'UiAutomator2',
      'appium:deviceName': 'Google Pixel 7',
      'appium:platformVersion': '13.0',
      'appium:app': process.env.BROWSERSTACK_APP,
      'bstack:options': {
        projectName: 'Appium Bootcamp',
        buildName: 'session-3-cloud',
        sessionName: 'login · Pixel 7',
      },
    },
  ],

  logLevel: 'error',

  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 120000,
  },
}
