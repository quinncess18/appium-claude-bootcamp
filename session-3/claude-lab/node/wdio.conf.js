// Claude-lab authored test · LOCAL WebdriverIO config.
// Prereqs: emulator booted · `appium` on 4723 · demo APK installed.

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
      'appium:newCommandTimeout': 240,
    },
  ],

  logLevel: 'error',

  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 120000,
  },

  // Isolation: each test starts on a FRESH login screen. The demo app persists
  // login across sessions, so a plain reloadSession reopens straight to Home —
  // clear the app's data + relaunch to force the login screen. (WDIO has no
  // config-level beforeEach; the per-test hook is beforeTest.)
  beforeTest: async () => {
    await browser.execute('mobile: clearApp', { appId: 'com.taqelah.demo_app' })
    await browser.execute('mobile: activateApp', { appId: 'com.taqelah.demo_app' })
  },
}
