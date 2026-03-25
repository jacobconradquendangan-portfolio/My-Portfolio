const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

async function runJakeTests() {
  let driver = await new Builder().forBrowser("MicrosoftEdge").build();
  try {
    console.log("Tester (JAKE): INVENTORY & CART");
    await driver.get("https://www.saucedemo.com/");
    await driver
      .findElement(By.id("user-name"))
      .sendKeys("performance_glitch_user");
    await driver.findElement(By.id("password")).sendKeys("secret_sauce");
    await driver.findElement(By.id("login-button")).click();

    // TC08: Add Item to Cart (Backpack)
    await driver.findElement(By.id("add-to-cart-sauce-labs-backpack")).click();
    console.log("TC08 Passed: Item Added");

    // TC09: Cart Badge Increment
    let badge = await driver
      .findElement(By.className("shopping_cart_badge"))
      .getText();
    assert.strictEqual(badge, "1");
    console.log("TC09 Passed: Cart Badge Verified");

    // TC10: Remove Item from Cart
    await driver.findElement(By.id("remove-sauce-labs-backpack")).click();
    let badges = await driver.findElements(By.className("shopping_cart_badge"));
    assert.strictEqual(badges.length, 0);
    console.log("TC10 Passed: Item Removal Verified");

    // TC11: Multiple Items Addition
    await driver
      .findElement(By.id("add-to-cart-sauce-labs-bike-light"))
      .click();
    await driver
      .findElement(By.id("add-to-cart-sauce-labs-bolt-t-shirt"))
      .click();
    let newBadge = await driver
      .findElement(By.className("shopping_cart_badge"))
      .getText();
    assert.strictEqual(newBadge, "2");
    console.log("TC11 Passed: Multi-item Add Verified");

    // TC12: Sorting Price (Low to High)
    let sortBox = await driver.findElement(
      By.className("product_sort_container"),
    );
    await sortBox.click();
    await driver.findElement(By.css("option[value='lohi']")).click();
    let firstPrice = await driver
      .findElement(By.className("inventory_item_price"))
      .getText();
    assert.strictEqual(firstPrice, "$7.99");
    console.log("TC12 Passed: Price Sorting Verified");

    // TC13: Click Cart Icon Navigation
    await driver.findElement(By.className("shopping_cart_link")).click();
    assert.ok((await driver.getCurrentUrl()).includes("cart.html"));
    console.log("TC13 Passed: Cart Page Navigation Verified");

    // TC14: Continue Shopping Button
    await driver.findElement(By.id("continue-shopping")).click();
    assert.ok((await driver.getCurrentUrl()).includes("inventory.html"));
    console.log("TC14 Passed: Back-to-Products Verified");
  } finally {
    await driver.quit();
  }
}
runJakeTests();
