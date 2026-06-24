# Cloud Devices Lab — real devices, on demand ☁️

> **Scaffold:** the configs are wired up and the tests are stubbed (`it.skip` / `@pytest.mark.skip`). You implement the login during the session — the point of this lab is the *grid*, not the test.

Local emulators are great, but they don't cover real hardware quirks, the long tail of OS versions, or running dozens of devices at once. A **device cloud** (BrowserStack, Sauce Labs, LambdaTest) gives you all three on demand. The best part: the **SAME tests** run there — only the **capabilities + endpoint** change. Think of this as the parallel runs from Session 2, scaled out onto real hardware you don't have to own.

```
cloud-devices-lab/
├── node/
│   ├── package.json
│   ├── .npmrc
│   ├── wdio.conf.js            # LOCAL   — emulator + local appium
│   ├── wdio.bstack.conf.js     # CLOUD   — BrowserStack grid (only caps + endpoint differ)
│   └── test/specs/
│       └── cloud.e2e.js        # same spec, runs in both
├── python/
│   ├── requirements.txt
│   ├── conftest.py             # driver fixture switches on TARGET (local|cloud)
│   └── test_cloud.py           # same test, runs in both
└── README.md
```

## 0 · Prerequisites 🧰

- A **free BrowserStack account** (this was your Session 2 homework). Free tier ≈ **100 device-minutes**.
- Node 18+ **or** Python 3.10+ (whichever stack you're using).
- For **local** runs only: a booted Android emulator + `appium` running on `4723` + the demo APK installed.

## 1 · Upload the app 📦

BrowserStack runs a build **you upload** to them — not a local `appPackage`. So upload once and reference the returned id.

1. Upload `DemoApp-v1.0.0.apk` via the **BrowserStack dashboard** (App Automate → Upload) or the **REST API**:
   ```bash
   curl -u "$BROWSERSTACK_USERNAME:$BROWSERSTACK_ACCESS_KEY" \
     -X POST "https://api-cloud.browserstack.com/app-automate/upload" \
     -F "file=@./DemoApp-v1.0.0.apk"
   ```
2. The response gives an app id like `bs://<hash>`.
3. Export everything the configs read:
   ```bash
   export BROWSERSTACK_USERNAME=your_username
   export BROWSERSTACK_ACCESS_KEY=your_access_key
   export BROWSERSTACK_APP=bs://<hash>
   ```

## 2 · What changes vs local 🔁

Only the plumbing — the **specs do not change**.

| Thing      | Local                          | Cloud (BrowserStack)                  |
|------------|--------------------------------|---------------------------------------|
| Endpoint   | `127.0.0.1:4723`               | `hub.browserstack.com` (443, https)   |
| Auth       | none                           | `user` / `key` (username + access key)|
| Device     | emulator                       | real-device caps (`deviceName`, `platformVersion`) |
| App        | `appPackage` (installed APK)   | `appium:app` = `bs://<hash>`          |
| **Specs**  | **same**                       | **same**                              |

## 3 · Run it ▶️

> The tests are **skipped** until you implement the login — so a green run with 0 executed tests is expected for now.

**Node**
```bash
cd node && npm install
npm run test:local      # emulator via wdio.conf.js
npm run test:cloud      # BrowserStack via wdio.bstack.conf.js
```

**Python**
```bash
cd python && pip install -r requirements.txt
pytest                  # local (TARGET defaults to local)
TARGET=cloud pytest     # BrowserStack
```

## 4 · Make it yours 🚀

- **Add more devices** to the `capabilities` array (Node) to run a real-device **matrix in parallel** — e.g. a Pixel on Android 14 alongside the Galaxy S23. This is Session 2's parallelism, on real hardware.
- **Watch the live session video** on the BrowserStack dashboard while it runs — logs, screenshots, and network are all captured.
- **Mind the quota**: the free tier is ~100 device-minutes. Keep test runs short and don't leave sessions hanging.

## 🆘 Troubleshooting

| Symptom                          | Fix                                                                 |
|----------------------------------|---------------------------------------------------------------------|
| `401` / auth error               | Check `BROWSERSTACK_USERNAME` and `BROWSERSTACK_ACCESS_KEY`.         |
| App not found                    | Upload the APK and set `BROWSERSTACK_APP` to the returned `bs://` id.|
| Out of minutes                   | Free tier is ~100 device-minutes — you've used your quota.           |
| Device unavailable / not found   | Pick another `deviceName` / `platformVersion` from BrowserStack's device list. |
