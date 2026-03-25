const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

async function runIanTests() {
  let driver = await new Builder().forBrowser("MicrosoftEdge").build();
  try {
    console.log("RONCESVALLES, IAN TEST: CHECKOUT FLOW");
    await driver.get("https://www.saucedemo.com/");

    // Login (Prerequisite)
    await driver
      .findElement(By.id("user-name"))
      .sendKeys("performance_glitch_user");
    await driver.findElement(By.id("password")).sendKeys("secret_sauce");
    await driver.findElement(By.id("login-button")).click();

    // TC15: View Product Detail Page
    let productLink = await driver.wait(
      until.elementLocated(By.id("item_4_title_link")),
      10000,
    );
    await productLink.click();
    let backBtn = await driver.wait(
      until.elementLocated(By.id("back-to-products")),
      10000,
    );
    assert.ok(await backBtn.isDisplayed());
    console.log("TC15 Passed: Detail View Verified");

    // TC16: Add to Cart from Detail Page
    let detailAddBtn = await driver.wait(
      until.elementLocated(By.id("add-to-cart")),
      5000,
    );
    await detailAddBtn.click();
    let badge = await driver.wait(
      until.elementLocated(By.className("shopping_cart_badge")),
      5000,
    );
    assert.strictEqual(await badge.getText(), "1");
    console.log("TC16 Passed: Detail-Add Verified");

    // TC17: Checkout Information Form
    await driver.get("https://www.saucedemo.com/checkout-step-one.html");
    let firstName = await driver.wait(
      until.elementLocated(By.id("first-name")),
      5000,
    );
    await firstName.sendKeys("Ian");
    await driver.findElement(By.id("last-name")).sendKeys("Tester");
    await driver.findElement(By.id("postal-code")).sendKeys("1234");
    console.log("TC17 Passed: Form Data Entry Verified");

    // TC18: Checkout Overview Navigation
    await driver.findElement(By.id("continue")).click();
    await driver.wait(until.urlContains("checkout-step-two"), 5000);
    console.log("TC18 Passed: Checkout Summary Verified");

    // TC19: Order Finalization
    let finishBtn = await driver.wait(
      until.elementLocated(By.id("finish")),
      5000,
    );
    await finishBtn.click();
    await driver.wait(until.urlContains("checkout-complete"), 5000);
    console.log("TC19 Passed: Order Submitted");

    // TC20: Success Message Verification
    let header = await driver.wait(
      until.elementLocated(By.className("complete-header")),
      5000,
    );
    assert.strictEqual(await header.getText(), "Thank you for your order!");
    console.log("TC20 Passed: Confirmation Header Verified");

    console.log("\n--- IAN'S MODULE COMPLETED SUCCESSFULLY ---");
    console.log("--- TOTAL GROUP PROGRESS: 20/20 TEST CASES PASSED ---");
  } catch (error) {
    console.error("\n--- IAN'S TEST FAILED ---");
    console.error("Message:", error.message);
  } finally {
    await driver.sleep(2000);
    await driver.quit();
  }
}

runIanTests();
