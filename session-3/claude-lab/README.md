# Claude Lab — author & maintain Appium tests with Claude Code 🤖

This is where **Claude enters the workflow**. You'll set up a real Claude Code project, wire an
**Appium MCP server** so Claude can drive the emulator, then use it to **author**, **refactor**,
and **debug** the same demo-app tests you've been writing by hand.

> **The app:** [`taqelah/demo-app`](https://github.com/taqelah/demo-app/releases/tag/v1.0.0) —
> the same Flutter app from Sessions 1 & 2. Credentials: `emma@demoapp.com` / `10203040`.

```
claude-lab/
├── CLAUDE.md            project context Claude loads at session start
├── .mcp.json            Appium MCP server — lets Claude drive the emulator
├── .claude/
│   ├── settings.json    permissions: what Claude may do without asking
│   ├── rules/
│   │   └── test-style.md   locators, waits, page objects, isolation — the house style
│   ├── commands/
│   │   └── new-test.md     /new-test — author a spec from a described flow
│   └── agents/
│       └── flaky-hunter.md a sub-agent that reruns a test and diagnoses flakiness
├── prompts.md           copy-paste prompts for the live demo
└── refactor-example/    before (flat spec) → after (Page Object), both stacks
```

That tree **is** the lesson — it mirrors the "Claude Code Project Structure" we cover in the slides.

---

## 0 · Prerequisites

```bash
node -v                            # v20+
python3 --version                  # 3.10+   (Windows: python --version)
appium -v                          # 3.x
adb devices                        # your emulator, "device" not offline
claude --version                   # Claude Code installed
```

> New to Claude Code? Install it from the docs, then run `claude` once in any folder to sign in.
> If you set up **Claude Code Router (CCR)** before today (Session 2 homework), use that — the
> project files in this lab work the same regardless of the model behind Claude Code.

## 1 · Get the app onto your emulator

```bash
# download DemoApp-v1.0.0.apk from the Session 1 GitHub release, then:
adb install -r DemoApp-v1.0.0.apk
```

---

## 2 · The Claude Code project, layer by layer

| File / folder | What it does |
|---|---|
| **`CLAUDE.md`** | Loaded at session start. Tells Claude what the project is, the app facts, conventions & commands. |
| **`.mcp.json`** | MCP servers for this project. Here: an **Appium** server so Claude can launch/tap the app and read real locators. |
| **`.claude/settings.json`** | Permissions & tool access — what runs without asking, what to ask first, what's denied. |
| **`.claude/rules/`** | House style by topic. `test-style.md` = locators, explicit waits, page objects, isolation. |
| **`.claude/commands/`** | Custom slash commands. `/new-test` = author a spec from a described flow. |
| **`.claude/agents/`** | Specialised sub-agents. `flaky-hunter` reruns a test and reports why it flakes. |
| **`.claude/skills/`** | Packaged expertise. `appium-test-author/` = the test-authoring playbook + a locator/gesture `reference.md`, auto-loaded when you write a test. |
| **`.claude/hooks/`** | Event-driven scripts. `check-no-sleep.sh` runs after every edit and blocks any `sleep`/`pause` that sneaks into a test. |

> 💡 Open Claude Code **from this folder** (`cd claude-lab && claude`) so all of the above loads.

## 3 · Wire up the Appium MCP server

`.mcp.json` already declares an `appium` server via `npx -y appium-mcp@latest`. Two things to do:

1. **Set your SDK path** — edit `ANDROID_HOME` in `.mcp.json` to your Android SDK
   (macOS default `~/Library/Android/sdk`).
2. **Make sure `npx` is on your PATH** — the server is launched with `npx`, so Node must be
   visible to Claude Code. Verify **before** starting `claude`:
   ```bash
   npx -v        # must print a version. If "command not found", fix Node first (see below).
   ```
   > Using **nvm**? Set a default so every terminal has Node: `nvm alias default node`
   > (otherwise `node`/`npx` only exist after a manual `nvm use`, and Claude can't spawn the server).
3. **Approve it** — Claude Code asks to trust project MCP servers the first time; approve `appium`.
   Check it loaded with `/mcp` (you should see the `appium` tools). If it shows **✗ failed**,
   it's almost always the PATH issue above — fix Node, then **fully quit and restart** `claude`
   from a **new** terminal. (An in-session `/mcp` reconnect keeps the old PATH and still fails
   with `ENOENT` — the running process can't pick up the new Node.)

```bash
# alternative one-liner instead of editing .mcp.json by hand:
claude mcp add appium -- npx -y appium-mcp@latest

# alternative server (the README's "mobile-mcp/appium-mcp" pairing):
#   npx -y @mobilenext/mobile-mcp@latest
```

> **What MCP gives you:** Claude can *look before it scripts* — launch the app, walk a flow,
> and read the **actual** accessibility ids instead of guessing. That's the difference between a
> test that works first try and one that needs five rounds of fixing.

## 4 · Start the emulator + Appium server

```bash
emulator -avd Pixel_10_Pro_XL      # boot your AVD (use YOUR name); leave running
appium                             # in its own terminal — http://127.0.0.1:4723
```

## 5 · Run the demo — author, refactor, debug

Open [`prompts.md`](prompts.md) and work through it with Claude (run `claude` in this folder):

1. **Warm-up** — ask Claude what the project is (proves `CLAUDE.md` loaded).
2. **MCP** — have Claude launch the app and list the login screen's real locators.
3. **Author** — `/new-test search for "black dress" and add it to the cart`.
4. **Refactor** — point Claude at `refactor-example/before/` → it produces page objects
   (compare to `refactor-example/after/`).
5. **Debug** — the `flaky-hunter` agent reruns a test 10× and names the root cause.

---

## 6 · Expected result ✅

- `/mcp` lists the **appium** server's tools; Claude can launch the app and report real locators.
- The refactor turns the flat specs into a `LoginPage` + thin specs that **still pass**
  (`refactor-example/after/` is the answer key — run it: `npm test` / `pytest`).
- `flaky-hunter` reports a **pass rate (n/10)** and a named root cause.

## 7 · Make it yours

- Add a `rules/locators.md` capturing your app's locator conventions and watch Claude honour it.
- Extend `/new-test` to also open a PR, or add a `/review-test` command.
- Write a `HomePage` page object and have Claude port the assignment flow (search → checkout) to it.
- Point `.mcp.json` at a real device (`adb devices` → set the udid) instead of the emulator.

---

## 🆘 Troubleshooting

| Symptom | Fix |
|---------|-----|
| `appium` shows **✗ failed** in `/mcp` (log: `Executable not found in $PATH: "npx"`) | Node isn't on the PATH Claude Code uses to spawn the server (common with **nvm**). Set a default: `nvm alias default node`, confirm `npx -v` works in a **new** terminal, then **fully quit & restart** `claude` — `/mcp` reconnect alone keeps the old PATH (`ENOENT`). |
| MCP can't find the device | Emulator booted (`adb devices` = `device`), and `ANDROID_HOME` in `.mcp.json` points at your real SDK path. |
| Claude ignores conventions | You opened Claude **outside** `claude-lab/` — `CLAUDE.md`/`.claude/` only load from the project root. `cd` in first. |
| Claude invents a locator | Tell it to inspect via the appium MCP server first; that's the rule in `.claude/rules/test-style.md`. |
| `refactor-example` test fails | Use the **v1.0.0** APK, emulator booted, `appium` on `:4723`. Same prereqs as the Session 2 labs. |
| Permission prompts every command | Add the command to `allow` in `.claude/settings.json` (team) or `settings.local.json` (just you). |

> 🔐 **Always review AI-written tests by running them.** A test that can't fail is worse than no
> test — `flaky-hunter` and a real negative case are how you keep Claude honest.
