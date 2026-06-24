// Session 3 · Reporting lab (SCAFFOLD) · WebdriverIO config.
// Adds the Allure reporter and a screenshot-on-failure hook on top of the standard caps.
// Prereqs: emulator booted · `appium` running · demo APK installed.

export const config = {
  runner: 'local',

  hostname: process.env.APPIUM_HOST || '127.0.0.1',
  port: Number(process.env.APPIUM_PORT) || 4723,

  specs: ['./test/specs/**/*.e2e.js'],
  maxInstances: 1,

  waitforTimeout: 20000,

  capabilities: [
    {
      platformName: 'Android',
      'appium:automationName': 'UiAutomator2',
      'appium:appPackage': 'com.taqelah.demo_app',
      'appium:appActivity': '.MainActivity',
      'appium:newCommandTimeout': 180,
    },
  ],

  logLevel: 'error',

  framework: 'mocha',
  // 'spec' for live output + 'allure' for a rich, shareable HTML report.
  reporters: [
    'spec',
    ['allure', { outputDir: 'allure-results', disableWebdriverStepsReporting: true }],
  ],
  mochaOpts: {
    ui: 'bdd',
    timeout: 120000,
  },

  // Fresh app per test so each case starts on a clean login screen.
  // NB: the per-test hook is `beforeTest` — WDIO has no config-level `beforeEach`.
  // The demo app persists login, so clear its data + relaunch.
  beforeTest: async () => {
    await browser.execute('mobile: clearApp', { appId: 'com.taqelah.demo_app' })
    await browser.execute('mobile: activateApp', { appId: 'com.taqelah.demo_app' })
  },

  // Attach a screenshot to the report whenever a test fails — the first thing anyone wants.
  afterTest: async function (test, context, { passed }) {
    if (!passed) {
      await browser.takeScreenshot()   // WDIO auto-attaches to the Allure step
    }
  },
}
