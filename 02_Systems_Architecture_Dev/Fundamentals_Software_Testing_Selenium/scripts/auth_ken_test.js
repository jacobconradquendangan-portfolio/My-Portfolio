const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

async function runKenTests() {
  let driver = await new Builder().forBrowser("MicrosoftEdge").build();
  const url = "https://www.saucedemo.com/";

  try {
    console.log("KEN ESCOLAR: AUTHENTICATION & HEADERS");
    await driver.get(url);

    // TC01: Valid Login Verification
    await driver.findElement(By.id("user-name")).sendKeys("standard_user");
    await driver.findElement(By.id("password")).sendKeys("secret_sauce");
    await driver.findElement(By.id("login-button")).click();
    let inventoryTitle = await driver
      .wait(until.elementLocated(By.className("title")), 5000)
      .getText();
    assert.strictEqual(inventoryTitle, "Products");
    console.log("TC01 Passed: Valid Login Verified");

    // TC02: Logout Functionality
    console.log("Opening sidebar for logout...");
    await driver.findElement(By.id("react-burger-menu-btn")).click();
    let logoutLink = await driver.wait(
      until.elementIsVisible(driver.findElement(By.id("logout_sidebar_link"))),
      5000,
    );
    await logoutLink.click();
    await driver.wait(until.elementLocated(By.id("login-button")), 5000);
    console.log("TC02 Passed: Logout Successful");

    // TC03: Invalid Password Error
    await driver.findElement(By.id("user-name")).sendKeys("standard_user");
    await driver.findElement(By.id("password")).sendKeys("wrong_sauce");
    await driver.findElement(By.id("login-button")).click();
    let errorBox = await driver.wait(
      until.elementLocated(By.css("h3[data-test='error']")),
      5000,
    );
    let errorMsg = await errorBox.getText();
    assert.ok(errorMsg.includes("do not match any user"));
    console.log("TC03 Passed: Invalid Password Alert Verified");

    // TC04: Locked Out User Error
    await driver.navigate().refresh();
    await driver.findElement(By.id("user-name")).sendKeys("locked_out_user");
    await driver.findElement(By.id("password")).sendKeys("secret_sauce");
    await driver.findElement(By.id("login-button")).click();
    let lockedMsg = await driver
      .wait(until.elementLocated(By.css("h3[data-test='error']")), 5000)
      .getText();
    assert.ok(lockedMsg.includes("locked out"));
    console.log("TC04 Passed: Locked User Exception Verified");

    // TC05: Empty Username Field
    await driver.navigate().refresh();
    await driver.findElement(By.id("password")).sendKeys("secret_sauce");
    await driver.findElement(By.id("login-button")).click();
    let emptyUser = await driver
      .findElement(By.css("h3[data-test='error']"))
      .getText();
    assert.ok(emptyUser.includes("Username is required"));
    console.log("TC05 Passed: Empty Username Validation Verified");

    // TC06: Site Title Integrity
    assert.strictEqual(await driver.getTitle(), "Swag Labs");
    console.log("TC06 Passed: Browser Title Verified");

    // TC07: Home UI Component Verified
    await driver.get(url);
    let loginLogo = await driver.findElement(By.className("login_logo"));
    assert.ok(await loginLogo.isDisplayed());
    console.log("TC07 Passed: Home UI Component Verified");

    console.log("\n--- KEN'S MODULE COMPLETED SUCCESSFULLY ---");
  } catch (error) {
    console.error("\n--- TEST FAILED ---");
    console.error("Message:", error.message);
  } finally {
    await driver.sleep(2000);
    await driver.quit();
  }
}

runKenTests();
