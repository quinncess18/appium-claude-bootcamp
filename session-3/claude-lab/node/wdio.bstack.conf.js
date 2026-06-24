// Claude-lab authored login test · BrowserStack (CLOUD) config.
// Same LoginPage + spec as local — only endpoint + capabilities change.
//   export BROWSERSTACK_USERNAME / BROWSERSTACK_ACCESS_KEY / BROWSERSTACK_APP
//   npm run test:cloud

export const config = {
  runner: 'local',

  hostname: 'hub.browserstack.com',
  port: 443,
  protocol: 'https',
  path: '/wd/hub',

  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,

  specs: ['./test/specs/**/*.e2e.js'],
  maxInstances: 2,

  waitforTimeout: 20000,
  connectionRetryTimeout: 300000,

  capabilities: [
    {
      platformName: 'Android',
      'appium:automationName': 'UiAutomator2',
      'appium:deviceName': 'Xiaomi Redmi Note 11',
      'appium:platformVersion': '11.0',
      'appium:app': process.env.BROWSERSTACK_APP,
      'bstack:options': {
        projectName: 'Appium Bootcamp',
        buildName: 'session-3-claude-lab',
        sessionName: 'login · Redmi Note 11',
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
        buildName: 'session-3-claude-lab',
        sessionName: 'login · Pixel 7',
      },
    },
  ],

  logLevel: 'error',

  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 180000,
  },

  // No beforeTest reset: BrowserStack reinstalls a fresh app per session and
  // auto-launches it on the login screen (and its UiAutomator2 build doesn't
  // support `mobile: activateApp`). The negative test runs first and leaves the
  // app on the login screen for the positive — no reset needed.
}
