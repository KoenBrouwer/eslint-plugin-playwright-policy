import { test, expect } from "@playwright/test";

test("comprehensive class selector examples - all bad practices", async ({
  page,
}) => {
  await page.goto("https://playwright.dev/");

  await expect(page).toHaveTitle(/Playwright/);

  // ========================================
  // 1. PAGE.LOCATOR() - Basic class selectors
  // ========================================

  // ❌ BAD: Single class
  await page.locator(".navbar").click();

  // ❌ BAD: Multiple classes
  await page.locator(".btn.btn-primary").click();

  // ❌ BAD: Class with descendant
  await page.locator(".header .logo").click();

  // ❌ BAD: Class with child selector
  await page.locator(".container > .item").click();

  // ❌ BAD: Class in template literal
  await page.locator(`.sidebar`).click();

  // ❌ BAD: Class with variable
  const className = "menu-item";
  await page.locator(`.${className}`).click();

  // ❌ BAD: Class with attribute
  await page.locator('.button[type="submit"]').click();

  // ❌ BAD: Class with pseudo-selector
  await page.locator(".list-item:first-child").click();

  // ❌ BAD: Class with :nth-child
  await page.locator(".item:nth-child(2)").click();

  // ❌ BAD: Complex nested classes
  await page.locator("div.container .row .col-md-6").click();

  // ❌ BAD: Element with class
  await page.locator("button.submit-btn").click();

  // ========================================
  // 2. REAL SELECTORS FROM YOUR PROJECT
  // ========================================

  // ❌ BAD: From PreviewPage.ts
  await page.locator(".live-link a").click();
  await page.locator('[class*="Intro_m-intro"] p').isVisible();
  await page.locator('[class*="PreviewAlert_o-preview-alert__"]').click();
  await page
    .locator('[class*="PreviewAlert_o-preview-alert__"] button')
    .click();

  // ❌ BAD: From SearchPage.ts
  await page.locator('[class*="SearchBlock_o-search-block-button"]').click();
  await page.locator(".utrecht-textbox--lg").fill("test");
  await page.locator('[class*="rvo-filter-"] [type="text"]').fill("search");

  // ❌ BAD: From Homepage.ts
  await page.locator(".rvo-menubar__item").nth(5).click();
  await page.locator('[class*="rvo-hero__content"] h1').isVisible();
  await page.locator('[class*="rvo-hero__image"]').isVisible();
  await page.locator('[class*="MostRead_m-mostread__"]').click();
  await page.locator('[class*="MostRead_m-mostread-label__"]').isVisible();
  await page.locator('[class*="Pill_a-pill"] a').click();
  await page
    .locator('[class*="ContentElements_o-content-element_"]')
    .isVisible();
  await page.locator('[class*="rvo-content-item"]').count();
  await page
    .locator('[class*="Recent_o-recent_"] [class*="Pill_a-pill__"] a')
    .click();
  await page.locator("[class*=Recent_suffix__]").isVisible();

  // ❌ BAD: From EventPage.ts
  await page.locator('[class*="EventDetails"] [class*="Image_m"]').isVisible();
  await page.locator('[class*="EventDetails_o-event-map"]').isVisible();
  await page.locator('[class*="leaflet-control-zoom "] a').click();
  await page.locator('[class*="leaflet-pane leaflet-marker"]').isVisible();
  await page.locator('[class*="Address_a-address"]').textContent();

  // ❌ BAD: From ProductPage.ts
  await page.locator('[class*="Sidebar_o-sidebar-list"]').isVisible();
  await page.locator('[class*="Sidebar_o-sidebar-value"]').click();
  await page.locator('[class*="Sidebar_o-sidebar-label"]').textContent();

  // ❌ BAD: From RegisterOverviewPage.ts
  await page.locator('[class*="Product_m-product"] h3').textContent();
  await page.locator('[class*="Products_o-products__"] strong').isVisible();
  await page.locator('[class*="Intro"] p').textContent();
  await page.locator('[class*="Products_o-products__"]').count();
  await page.locator('[class*="Product_m-product__"]').all();

  // ❌ BAD: From SubsidyPage.ts
  await page.locator('[class*="Flag_a-flag__"]').isVisible();
  await page.locator('[class*="SubsidyInformation_o"]').click();
  await page.locator(".calendar-subsidy").isVisible();
  await page.locator('[class*="SubsidyDates_date-title"]').textContent();
  await page.locator('[class*="SubsidyDates_date-date"]').textContent();
  await page.locator(".coins-stack").isVisible();
  await page.locator('[class*="SubsidyTile_tile-title"]').textContent();
  await page.locator('[class*="SubsidyTile_tile-amount"]').textContent();
  await page.locator(".coins-bag").isVisible();
  await page.locator('[class*="SubsidyBudget_budget-progress_"]').isVisible();
  await page
    .locator('[class*="SubsidyPieChart_m-subsidy"] strong')
    .textContent();
  await page.locator('[class*="SubsidyGuide_o-subsidy-guide-items-"]').count();

  // ❌ BAD: From NewsPage.ts
  await page.locator('[class*="column main"]').isVisible();
  await page.locator('[class*="column main"] a').click();
  await page
    .locator('[class*="OverviewItem_m-overview-item-date"]')
    .textContent();

  // ❌ BAD: From BlogPage.ts
  await page.locator('[class*="Sidebar_o-sidebar-belongs-to"]').isVisible();
  await page.locator('[class*="Sidebar_o-sidebar-label"]').textContent();

  // ❌ BAD: From FeedbackPage.ts
  await page.locator('[class*="utrecht-button--rvo-sm"]').click();

  // ========================================
  // 3. LOCATOR METHODS WITH CLASS SELECTORS
  // ========================================

  // ❌ BAD: waitFor with class
  await page.locator(".loading-spinner").waitFor({ state: "hidden" });
  await page.locator(".modal-backdrop").waitFor({ state: "visible" });
  await page.locator(".dynamic-content").waitFor({ state: "attached" });
  await page.locator(".lazy-image").waitFor({ state: "detached" });

  // ❌ BAD: Actions with class selectors
  await page.locator(".tooltip-trigger").hover();
  await page.locator(".editable").dblclick();
  await page.locator(".input-field").fill("text");
  await page.locator(".input").press("Enter");
  await page.locator(".dropdown").selectOption("value");
  await page.locator(".checkbox").check();
  await page.locator(".checkbox").uncheck();
  await page.locator(".checkbox").setChecked(true);
  await page.locator(".input").focus();
  await page.locator(".input").blur();
  await page.locator(".draggable").dragTo(page.locator(".drop-zone"));
  await page.locator(".text-area").selectText();
  await page.locator(".file-input").setInputFiles("file.pdf");
  await page.locator(".mobile-button").tap();

  // ❌ BAD: Queries with class selectors
  const text = await page.locator(".title").textContent();
  const inner = await page.locator(".content").innerText();
  const html = await page.locator(".content").innerHTML();
  const attr = await page.locator(".link").getAttribute("href");
  const visible = await page.locator(".modal").isVisible();
  const hidden = await page.locator(".tooltip").isHidden();
  const enabled = await page.locator(".button").isEnabled();
  const disabled = await page.locator(".button").isDisabled();
  const checked = await page.locator(".checkbox").isChecked();
  const box = await page.locator(".element").boundingBox();

  // ❌ BAD: Collection methods with class
  const count = await page.locator(".list-item").count();
  const elements = await page.locator(".item").all();
  const texts = await page.locator(".item").allTextContents();
  const innerTexts = await page.locator(".item").allInnerTexts();

  // ❌ BAD: Filtering with class
  await page.locator(".item").filter({ hasText: "Active" }).click();
  await page
    .locator(".card")
    .filter({ has: page.locator(".badge") })
    .click();
  await page
    .locator(".item")
    .filter({ hasNot: page.locator(".disabled") })
    .click();

  // ❌ BAD: nth, first, last with class
  await page.locator(".card").nth(0).click();
  await page.locator(".item").first().click();
  await page.locator(".item").last().click();

  // ❌ BAD: Chaining locators with classes
  await page.locator(".parent").locator(".child").click();
  await page.locator(".container").locator(".section").locator(".item").click();

  // ❌ BAD: Screenshot with class
  await page.locator(".chart").screenshot({ path: "chart.png" });

  // ❌ BAD: scrollIntoViewIfNeeded with class
  await page.locator(".footer").scrollIntoViewIfNeeded();

  // ========================================
  // 4. EXPECT ASSERTIONS WITH CLASS SELECTORS
  // ========================================

  // ❌ BAD: Visibility assertions
  await expect(page.locator(".error-message")).toBeVisible();
  await expect(page.locator(".success-banner")).toBeHidden();
  await expect(page.locator(".loading")).not.toBeVisible();

  // ❌ BAD: Text assertions
  await expect(page.locator(".title")).toHaveText("Welcome");
  await expect(page.locator(".description")).toContainText("description");
  await expect(page.locator(".heading")).not.toHaveText("");

  // ❌ BAD: Attribute assertions
  await expect(page.locator(".btn")).toHaveClass("btn-active");
  await expect(page.locator(".btn")).toHaveClass(/btn-/);
  await expect(page.locator(".link")).toHaveAttribute("href");
  await expect(page.locator(".link")).toHaveAttribute("href", /example/);

  // ❌ BAD: State assertions
  await expect(page.locator(".button")).toBeEnabled();
  await expect(page.locator(".button")).toBeDisabled();
  await expect(page.locator(".checkbox")).toBeChecked();
  await expect(page.locator(".input")).toBeEditable();
  await expect(page.locator(".input")).toBeFocused();

  // ❌ BAD: Count assertions
  await expect(page.locator(".list-item")).toHaveCount(5);
  await expect(page.locator(".item")).not.toHaveCount(0);

  // ❌ BAD: Value assertions
  await expect(page.locator(".input")).toHaveValue("test");
  await expect(page.locator(".input")).toHaveValue(/test/);

  // ❌ BAD: CSS assertions
  await expect(page.locator(".box")).toHaveCSS(
    "background-color",
    "rgb(255, 0, 0)",
  );
  await expect(page.locator(".text")).toHaveCSS("font-weight", "700");

  // ========================================
  // 5. PLAYWRIGHT-SPECIFIC PSEUDO-CLASSES
  // ========================================

  // ❌ BAD: :has-text() with class
  await page.locator('.card:has-text("Active")').click();
  await page.locator('article.post:has-text("Playwright")').click();

  // ❌ BAD: :has() with class
  await page.locator(".container:has(.badge)").click();
  await page.locator("div.panel:has(button.close)").isVisible();

  // ❌ BAD: :visible with class
  await page.locator(".item:visible").click();
  await page.locator("button.submit:visible").count();

  // ❌ BAD: :nth-match() with class
  await page.locator(".item:nth-match(2)").click();
  await page.locator("div.card:nth-match(3)").isVisible();

  // ========================================
  // 6. FRAME LOCATORS WITH CLASS SELECTORS
  // ========================================

  // ❌ BAD: frameLocator with class
  const frame = page.frameLocator(".iframe-container");
  await frame.locator(".inner-button").click();

  // ❌ BAD: contentFrame with class
  const elementHandle = await page.locator(".iframe").elementHandle();
  if (elementHandle) {
    const frameElement = await elementHandle.contentFrame();
    await frameElement?.locator(".frame-content").click();
  }

  // ========================================
  // 7. OR/AND COMBINATORS WITH CLASS
  // ========================================

  // ❌ BAD: or() with classes
  await page.locator(".button").or(page.locator(".link")).click();
  await page
    .locator(".primary-btn")
    .or(page.locator(".secondary-btn"))
    .first()
    .click();

  // ❌ BAD: and() with classes
  await page.locator(".active").and(page.locator(".enabled")).click();

  // ========================================
  // 8. DEPRECATED/DISCOURAGED METHODS
  // ========================================

  // ❌ BAD: page.$() - discouraged
  const el1 = await page.$(".some-class");
  if (el1) await el1.click();

  // ❌ BAD: page.$$() - discouraged
  const els = await page.$$(".list-items");

  // ❌ BAD: page.$eval() - discouraged
  const text1 = await page.$eval(".title", (el) => el.textContent);

  // ❌ BAD: page.$$eval() - discouraged
  const texts1 = await page.$$eval(".items", (els) =>
    els.map((e) => e.textContent),
  );

  // ❌ BAD: page.waitForSelector() - still available but locator preferred
  await page.waitForSelector(".modal-backdrop");
  await page.waitForSelector(".loading", { state: "hidden" });
  await page.waitForSelector(".slow-element", { timeout: 60000 });
  await page.waitForSelector(".element", { state: "attached" });
  await page.waitForSelector(".element", { state: "detached" });

  // ❌ BAD: ElementHandle methods
  const container1 = await page.$(".container");
  if (container1) {
    const nested = await container1.$(".nested-item");
    const nestedAll = await container1.$$(".nested-items");
    await container1.waitForSelector(".child");
  }

  // ========================================
  // 9. SPECIAL STYLING CONVENTIONS
  // ========================================

  // ❌ BAD: BEM notation
  await page.locator(".block__element--modifier").click();
  await page.locator(".nav__item--active").isVisible();
  await page.locator(".card__header--large").textContent();

  // ❌ BAD: Utility classes (Tailwind-style)
  await page.locator(".flex.items-center.justify-between").click();
  await page.locator(".p-4.bg-blue-500.text-white").isVisible();

  // ❌ BAD: CSS modules (with hash)
  await page.locator(".button_abc123").click();
  await page.locator(".container_xyz789").isVisible();

  // ❌ BAD: Dynamically generated classes
  await page.locator('[class^="MuiButton-"]').click();
  await page.locator('[class*="css-"]').isVisible();
  await page.locator('[class$="-primary"]').click();

  // ========================================
  // 10. COMPLEX REAL-WORLD PATTERNS
  // ========================================

  // ❌ BAD: From SearchFilters.ts - complex selectors
  await page
    .locator('[class^="Dropdown_m-dropdown-select__"] > .icon')
    .click({ force: true });
  await page.locator('[class*="rvo-tag--with-icon"]').isVisible();
  await page.locator(".rvo-checkbox__group").count();
  await page.locator('[class*="rvo-tag"]').all();
  await page.locator(".rvo-filter-").isVisible();
  await page.locator(".rvo-tag").textContent();
  await page.locator('[class*="Filters_o-filters-filters"]').isVisible();
  await page.locator('[class*="Filters_o-filters-extra-"]').count();
  await page.locator('[class*="Filter_m-filter-option"]').all();
  await page.locator(".rvo-filter").isVisible();

  // ❌ BAD: From MobileElements.ts
  await page.locator('[class*="rvo-mobile-menu__toggle"]').click();
  await page.locator(".icon.search-blue").click();
  await page.locator('[class*="rvo-icon-kruis"]').isVisible();
  await page
    .locator('[class*="SearchBlock_o-search-block-fields"]')
    .fill("test");
  await page.locator('[class*="Filters_mobile-filters"]').isVisible();
  await page.locator('[class*="rvo-mobile-menu__list"]').count();
  await page
    .locator('[class*="MainMenu_m-main__mobile-search-button"]')
    .click();

  // ❌ BAD: From NotificationElement.ts
  await page
    .locator('[class*="PageEmailNotification_o-page-email"]')
    .isVisible();
  await page.locator(".icon.mail-blue").click();
  await page.locator(".icon.chevron-down-blue").click();
  await page.locator(".icon.chevron-up-blue").isVisible();
  await page
    .locator('[class*="EmailNotification_m-email-notification__content__"]')
    .fill("email");
  await page
    .locator('[class*="EmailNotification_m-email-notification__success"]')
    .isVisible();
  await page
    .locator('[class*="EmailNotification_m-email-notification__error-message"]')
    .textContent();
  await page
    .locator('[class*="EmailNotification_m-email-notification__title"]')
    .textContent();

  // ❌ BAD: From ContentElement.ts - many complex patterns
  await page.locator('[class*="Blocks_block-wrapper__"] a').click();
  await page.locator('[class*="Intro_m-intro"]').textContent();
  await page.locator('[class*="HeaderImage_m-header-"]').isVisible();
  await page.locator('[class*="ContentElements_o-content-elements"]').count();
  await page
    .locator(
      '[class*="TextWrap_o-textwrap-text"] > [class*="HtmlText_a-html-text"] > p',
    )
    .textContent();
  await page.locator('[class*="Frame_o-frame_"]').isVisible();
  await page.locator('[class*="Sidebar_o-sidebar__"]').click();
  await page.locator('[class*="Partners_o-partners_"] > div').count();
  await page.locator('[class*="Partner_m-partner-title"]').textContent();
  await page.locator(".rvo-breadcrumbs").isVisible();
  await page.locator('[class*="ShareBlock_o-share-block_"] a').click();
  await page.locator('[class*="Moment_m-moment-decoration"]').count();
  await page.locator('[class*="Banner_o-banner__"]').isVisible();
  await page.locator('[class*="Quote_o-quote__body"]').textContent();
  await page.locator('[class*="Author_m-credentials-quote"]').isVisible();
  await page.locator('[class*="Author_m-avatar__"]').screenshot();
  await page.locator(".icon.information").hover();
  await page.locator(".icon.close").click();
  await page
    .locator('[class*="Copyright_m-copyright-wrapper__"]')
    .textContent();
  await page.locator('[class*="Blocks_block-wrapper"]').all();
  await page.locator('[class*="Block_o-block-image"]').isVisible();
  await page.locator('[class*="SplitContainer_o-splitcontainer"]').count();
  await page.locator('[class*="List_o-files_"]').click();
  await page.locator(".icon.pdf").isVisible();
  await page.locator('[class*="Video_o-video_"]').isVisible();
  await page.locator('[class*="marking-notice"]').textContent();
  await page.locator(".marking-notice").isVisible();
  await page.locator(".marking-warning").isVisible();
  await page.locator(".marking-error").textContent();
  await page.locator(".marking-confirmation").isVisible();

  // ❌ BAD: From SearchPager.ts
  await page.locator(".rvo-pagination__next").click();
  await page.locator('[class*="Pager_o-pager__"] ul li span').first().click();
  await page.locator(".rvo-pagination").isVisible();
  await page.locator(".rvo-pagination__item").nth(2).click();
  await page.locator('[class*="Pager_active"] .sr-only').nth(1).textContent();
  await page
    .locator('[class*="Pager_o-pager-information"] strong')
    .last()
    .textContent();
  await page.locator(".rvo-pagination__list").count();

  // ❌ BAD: From EventElement.ts
  await page.locator('[class*="EventDates_m-event-date__"]').count();
  await page.locator('[class*="DateTime_a-day"]').textContent();
  await page.locator('[class*="DateTime_a-date"]').textContent();
  await page.locator('[class*="DateTime_a-range"]').textContent();
  await page
    .locator('[class*="OverviewItem_m-overview-item-body"]')
    .isVisible();
  await page.locator('[class*="rvo-layout-column rvo-layout"] > div').count();
  await page.locator('[class*="rvo-layout-row rvo-layout-align"] a').click();
  await page.locator(".icon.calendar").isVisible();

  // ❌ BAD: From AccordionElement.ts
  await page
    .locator('[class*="ContentAccordion_o-content-accordion-wrapper_"]')
    .isVisible();
  await page.locator('[class*="accordion "]').count();
  await page.locator(".accordion-body").textContent();
  await page.locator(".accordion-button").click();
  await page.locator('[class*="Favorite_m-favorite__"] button').click();
  await page.locator(".accordion-item").all();
  await page.locator(".accordion-item h3").textContent();

  // ❌ BAD: From SearchResults.ts
  await page.locator('[class*="SearchResults_o-search-results"] li').count();
  await page
    .locator('[class*="SearchResults_o-search-results"] h2 strong')
    .textContent();
  await page.locator('[data-testid="search-result"] h3 a').click();
  await page
    .locator(".MetaDescription_a-meta-description__YWAz4 > div")
    .textContent();
  await page.locator("#rvo-autocomplete-listbox").isVisible();
  await page.locator('[class*="SearchFeatured_m-search-featured__"]').count();
  await page.locator('[class*="Flag_a-flag-flag"]').isVisible();

  // ❌ BAD: From Page.ts - general selectors
  await page.locator('[class*="HtmlText_a-html"]').textContent();
  await page.locator('[class*="Publication_m-publication-wrap"]').isVisible();
  await page
    .locator('[class*="FeedbackFormBlock_o-feedback-form-block-wrapper"]')
    .click();
  await page.locator(".icon.belangenbehartiging").isVisible();
  await page.locator('[class*="rvo-footer__container--"]').isVisible();
  await page
    .locator('[class*="rvo-footer__column-title"]')
    .first()
    .textContent();
  await page.locator('[class*="rvo-footer__menu rvo-footer__"] li').count();
  await page.locator("[class*=Messages_o-messages_]").isVisible();
  await page.locator(".rvo-alert").textContent();

  // ========================================
  // 11. XPATH SELECTORS
  // ========================================

  // ❌ BAD: Relative XPath
  await page.locator('//div[@class="login"]').click();

  // ❌ BAD: Explicit xpath= prefix
  await page.locator('xpath=//button[text()="Submit"]').click();

  // ❌ BAD: Absolute XPath from document root
  await page.locator("/html/body/div/main/button").click();

  // ❌ BAD: XPath in template literal
  await page.locator(`//input[@name="email"]`).fill("test@example.com");

  // ❌ BAD: XPath with variable
  const fieldName = "email";
  await page.locator(`//input[@name="${fieldName}"]`).fill("test@example.com");
});

test("GOOD practices - recommended approaches", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // ========================================
  // ✅ GOOD: User-facing locators
  // ========================================

  // ✅ GOOD: getByRole (most recommended)
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByRole("link", { name: "Learn more" }).click();
  await page.getByRole("heading", { name: "Welcome" }).isVisible();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Docs" })
    .click();

  // ✅ GOOD: getByTestId (stable identifiers)
  await page.getByTestId("login-button").click();
  await page.getByTestId("logo-information").isVisible();
  await page.getByTestId("found-result-information").textContent();
  await page.getByTestId("search-result").count();
  await page.getByTestId("event-location").textContent();
  await page.getByTestId("subsidy-start-date").textContent();
  await page.getByTestId("count-items").textContent();
  await page.getByTestId("email-input").fill("test@example.com");
  await page.getByTestId("search-checkbox-filter").isVisible();

  // ✅ GOOD: getByLabel (for forms)
  await page.getByLabel("Email").fill("test@example.com");
  await page.getByLabel("Password").fill("secret");
  await page.getByLabel("Remember me").check();

  // ✅ GOOD: getByText
  await page.getByText("Sign in").click();
  await page.getByText("Welcome back").isVisible();
  await page.getByText(/search results/i).textContent();

  // ✅ GOOD: getByPlaceholder
  await page.getByPlaceholder("Enter your name").fill("John");
  await page.getByPlaceholder("Search...").fill("playwright");

  // ✅ GOOD: getByAltText (for images)
  await page.getByAltText("Company logo").isVisible();
  await page.getByAltText("Profile picture").click();

  // ✅ GOOD: getByTitle
  await page.getByTitle("Close").click();
  await page.getByTitle("Settings").hover();

  // ✅ GOOD: Data attributes (stable)
  await page.locator('[data-action="submit"]').click();
  await page.locator('[data-component="header"]').isVisible();
  await page.locator('[data-state="active"]').count();

  // ✅ GOOD: ID selectors (stable)
  await page.locator("#submit-button").click();
  await page.locator("#edit-site").selectOption("option");
  await page.locator("#searchblock").fill("search");
  await page.locator("#drilldown_column").click();

  // ✅ GOOD: ARIA attributes
  await page.locator('[aria-label="Close dialog"]').click();
  await page.locator('[aria-expanded="true"]').isVisible();
  await page.locator('[aria-current="page"]').textContent();

  // ✅ GOOD: Semantic HTML + attributes
  await page.locator('button[type="submit"]').click();
  await page.locator('input[name="email"]').fill("test@example.com");
  await page.locator('a[href="/login"]').click();

  // ✅ GOOD: Chaining user-facing locators
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Products" })
    .click();

  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Confirm" })
    .click();

  // ✅ GOOD: Filtering with text content
  await page
    .getByRole("listitem")
    .filter({ hasText: "Active" })
    .getByRole("button")
    .click();

  // ========================================
  // ✅ GOOD: Instead of XPath
  // ========================================

  // ✅ GOOD: Use getByRole instead of //button[text()="..."]
  await page.getByRole("button", { name: "Log in" }).click();

  // ✅ GOOD: Use getByLabel instead of //input[@name="username"]
  await page.getByLabel("Username").fill("alice");

  // ✅ GOOD: Use getByText instead of //div[text()="..."]
  await page.getByText("Forgot password?").click();
});
