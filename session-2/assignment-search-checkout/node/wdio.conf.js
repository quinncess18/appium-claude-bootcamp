// Session 2 · Assignment — search → checkout · WebdriverIO config (Mocha + Appium)
// ---------------------------------------------------------------------------------
// One end-to-end purchase flow on the taqelah/demo-app (Flutter), built from
// today's lessons: explicit waits (no sleep), shared locators, splash handling.
//
// Prereqs (see ./README.md):
//   1. An Android emulator is booted    →  `adb devices` shows it as "device"
//   2. The Appium server is running      →  `appium` (port 4723)
//   3. The demo app is installed          →  `adb install -r DemoApp-v1.0.0.apk`
//
// Run:   npm install   &&   npm test

export const config = {
  runner: 'local',

  hostname: process.env.APPIUM_HOST || '127.0.0.1',
  port: Number(process.env.APPIUM_PORT) || 4723,

  specs: ['./test/specs/**/*.e2e.js'],
  maxInstances: 1,

  // Global ceiling for waitForDisplayed/waitUntil when no explicit timeout is given.
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
    timeout: 180000, // the whole purchase journey runs in one `it`
  },
}
