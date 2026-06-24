// Session 3 · Claude lab — flat login (BEFORE) · WebdriverIO config.
// Identical caps to the AFTER version — only the test code differs, which is the point:
// the refactor changes structure, not behaviour. Both runs go green.

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

  // Fresh app per test so each case starts on a clean login screen.
  // NB: the per-test hook is `beforeTest` — WDIO has no config-level `beforeEach`.
  // The demo app persists login, so clear its data + relaunch (a plain session
  // reload reopens straight to Home).
  beforeTest: async () => {
    await browser.execute('mobile: clearApp', { appId: 'com.taqelah.demo_app' })
    await browser.execute('mobile: activateApp', { appId: 'com.taqelah.demo_app' })
  },
}
