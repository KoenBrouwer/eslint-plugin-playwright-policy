# TODO

## Rules only check `.locator(...)` calls — other selector-accepting APIs slip through

Every rule in this plugin gates on `node.callee?.property?.name === "locator"`. That
misses several Playwright APIs that accept the exact same CSS/XPath selector strings
but are called under a different method name, so a selector considered "bad" by every
rule here goes completely undetected when passed to one of these instead:

- `page.$(selector)`
- `page.$$(selector)`
- `page.$eval(selector, fn)`
- `page.$$eval(selector, fn)`
- `page.waitForSelector(selector)`
- `elementHandle.$(selector)` / `elementHandle.$$(selector)` / `elementHandle.waitForSelector(selector)`
- `page.frameLocator(selector)` (the frame-selecting argument itself — a chained
  `.locator(...)` call after it *is* caught today)

Discovered 2026-08-13 while auditing `examples.spec.js` against the actual rule
output: the file's "DEPRECATED/DISCOURAGED METHODS" section and the
`page.frameLocator(".iframe-container")` example were labeled `❌ BAD` but produced
zero warnings from any rule.

### To do

- Widen the method-name check in each rule (or factor it into a shared helper) to
  also match `$`, `$$`, `$eval`, `$$eval`, `waitForSelector`, and `frameLocator`.
- Once fixed, restore regression coverage for these cases in
  `tests/plugin.test.mjs` (they were deliberately left out of the real-world
  stress-test corpus there until the rules actually catch them — see the
  "real-world regression corpus" tests).
