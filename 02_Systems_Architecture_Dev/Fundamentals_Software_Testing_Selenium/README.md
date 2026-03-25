# Fundamentals of Software Testing: Selenium Automation

This project demonstrates a hybrid Quality Engineering approach, combining a comprehensive manual test suite with an automated regression suite. The project validates 20 distinct test cases across authentication, inventory management, and the checkout lifecycle.

## 🛠️ Technical Stack
* **Testing Framework:** Selenium WebDriver
* **Language:** JavaScript (Node.js)
* **Assertion Library:** Built-in Node.js `assert`
* **Browser Driver:** Microsoft Edge Driver
* **Target Application:** [Sauce Demo (Swag Labs)](https://www.saucedemo.com/)

## Manual Testing
The manual testing phase covers the initial discovery of system behavior, edge case identification, and UI/UX validation.
* **Documentation:** [View Manual Test Cases & Results (Google Drive)](https://docs.google.com/spreadsheets/d/17xXVWAGvPkwALW1Y3LP3g42OpcvaTbbwESbFGXgI5O0/edit?usp=sharing)

## Automated Test Suite
The automation suite is modularized into three core scripts to ensure maintainable reporting:

### 1. Authentication & Headers (`auth_ken_test.js`)
Validates the security gate and basic UI integrity:
* **TC01 - TC02:** Valid login and logout functionality.
* **TC03 - TC05:** Error handling for invalid passwords, locked users, and empty fields.
* **TC06 - TC07:** Verification of page titles and primary branding assets.

### 2. Inventory & Cart (`cart_jake_test.js`)
Focuses on the user's interaction with the product catalog:
* **TC08 - TC11:** Adding/removing items and real-time cart badge updates.
* **TC12:** Product sorting logic (Price: Low to High).
* **TC13 - TC14:** Navigation between the inventory and the cart interface.

### 3. Checkout Flow (`admin_ian_test.js`)
Ensures the business logic for transactions is functional:
* **TC15 - TC16:** Product detail view accessibility and secondary "Add to Cart" entry points.
* **TC17 - TC18:** Checkout form data entry and order summary verification.
* **TC19 - TC20:** Final order submission and success message validation.

## Configuration Files
To ensure a consistent testing environment, the following configuration files are included in the repository:
* **`package.json`**: Defines the project metadata and manages the `selenium-webdriver` dependency.
* **`.gitignore`**: Prevents the upload of the local `node_modules` folder to keep the repository clean.

## Installation & Running

### Prerequisites
1. **Node.js**: Ensure you have [Node.js](https://nodejs.org/) installed.
2. **Browser**: Ensure the **Microsoft Edge** browser is installed.

### Installation
1. Clone the repository to your local machine.
2. Open your terminal in the project folder and install the required dependencies:
```bash
npm install