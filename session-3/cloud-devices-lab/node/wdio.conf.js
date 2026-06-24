// Session 3 · Cloud Devices lab (SCAFFOLD) · LOCAL WebdriverIO config.
// This is the baseline you already know — same tests, local emulator.
// The cloud version is wdio.bstack.conf.js (only caps + endpoint change).
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
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 120000,
  },

  beforeEach: async () => {
    await browser.reloadSession()
  },
}
