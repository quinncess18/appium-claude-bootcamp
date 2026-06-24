// Session 3 · Reporting lab · BrowserStack (CLOUD) config.
// Same spec + Allure reporter + screenshot-on-failure as local — only the
// endpoint, caps, and the per-test reset change.
//   export BROWSERSTACK_USERNAME / BROWSERSTACK_ACCESS_KEY / BROWSERSTACK_APP
//   npm run test:cloud   &&   npm run report

export const config = {
  runner: 'local',

  hostname: 'hub.browserstack.com',
  port: 443,
  protocol: 'https',
  path: '/wd/hub',

  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,

  specs: ['./test/specs/**/*.e2e.js'],
  maxInstances: 1,

  waitforTimeout: 20000,
  connectionRetryTimeout: 300000,

  capabilities: [
    {
      platformName: 'Android',
      'appium:automationName': 'UiAutomator2',
      'appium:deviceName': 'Google Pixel 7',
      'appium:platformVersion': '13.0',
      'appium:app': process.env.BROWSERSTACK_APP,
      'bstack:options': {
        projectName: 'Appium Bootcamp',
        buildName: 'session-3-reporting',
        sessionName: 'reporting demo',
      },
    },
  ],

  logLevel: 'error',

  framework: 'mocha',
  // 'spec' for live output + 'allure' for a shareable HTML report.
  reporters: [
    'spec',
    ['allure', { outputDir: 'allure-results', disableWebdriverStepsReporting: true }],
  ],
  mochaOpts: {
    ui: 'bdd',
    timeout: 120000,
  },

  // Isolation on cloud: a fresh BrowserStack session per test. BrowserStack
  // reinstalls the app and auto-launches it on the login screen, so each test
  // starts clean — no clearApp/activateApp (its UiAutomator2 lacks activateApp).
  beforeTest: async () => {
    await browser.reloadSession()
  },

  // Attach a screenshot to the report whenever a test fails.
  afterTest: async function (test, context, { passed }) {
    if (!passed) {
      await browser.takeScreenshot()   // WDIO auto-attaches to the Allure report
    }
  },
}
