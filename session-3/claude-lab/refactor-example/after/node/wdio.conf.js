// Session 3 · Claude lab — Page Object refactor (AFTER) · WebdriverIO config.
// Same Appium caps as the Session 2 labs; the only new idea is the Page Object layer
// under test/pages/. Prereqs: emulator booted · `appium` running · demo APK installed.

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
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 120000,
  },

  // Fresh app state per test so each case starts on a clean login screen.
  // NB: the per-test hook is `beforeTest` — WDIO has no config-level `beforeEach`.
  // The demo app persists the logged-in session, and these caps launch an
  // already-installed package (no APK to fullReset), so a relaunch alone lands
  // on Home. Clearing the app's data then re-activating it deterministically
  // cold-starts onto the login screen.
  beforeTest: async () => {
    await browser.execute('mobile: clearApp', { appId: 'com.taqelah.demo_app' })
    await browser.execute('mobile: activateApp', { appId: 'com.taqelah.demo_app' })
  },
}
