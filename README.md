<h1>🎭 Playwright Automation Framework</h1>

<h2>🌐 Automation Exercise</h2>
<image src="./Screenshot_AutomationExercise.png" />

<h2>📌 Overview</h2>
<p>
This project is a complete test automation framework built using Playwright and TypeScript with a clean Page Object Model (POM) architecture.
It covers end-to-end UI and REST API tests for a full-featured demo site designed for automation practice. <br />
Website URL: https://automationexercise.com/
</p>

<h2>🧪 Test Coverage</h2>
<h3>✅ 26 UI Test Cases</h3>
<p>
All scenarios listed here have been automated: https://automationexercise.com/test_cases <br />
Test cases includes: 
<ul>
  <li>🔐 User Registration & Login</li>
  <li>🛒 Cart & Checkout Flow</li>
  <li>💳 Payment & Invoice Download</li>
  <li>🔎 Product Search & Filters</li>
  <li>🧾 Recommended Items & Carousel Handling</li>
  <li>🎯 Verifying product details in cart</li>
  <li>➕ Many more realistic e-commerce flows</li>
</ul>
</p>
<h3>✅ 14 API Test Cases</h3>
<p>
All scenarios listed here have been automated: https://automationexercise.com/api_list <br />
Covered endpoints include: 
<ul>
  <li>📦 Get Products List</li>
  <li>🛍 Get All Brands</li>
  <li>👤 Create User</li>
  <li>🗑 Delete User</li>
  <li>🔐 Login with Valid / Invalid Credentials</li>
  <li>🔄 Update Account</li>
  <li>➕ …and more</li>
</ul>
</p>

<h2>📊 Report</h2>
<image src="./Screenshot_AllureReport.png" />

<h2>🛠️ Technologies</h2>
<p> 
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=for-the-badge" /> 
  <img src="https://img.shields.io/badge/Playwright-2EAD33?logo=playwright&logoColor=white&style=for-the-badge" /> 
  <img src="https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white&style=for-the-badge" />
  <img src="https://img.shields.io/badge/Allure%20Reports-8A2BE2?logo=allure&logoColor=white&style=for-the-badge" /> 
</p>

<h2>⚙️ Get Started</h2>
<p>
This is an example of how you may give instructions on setting up your project locally. To get a local copy up and running follow these simple example steps.
</p>
<h3>📦 Prerequisites</h3>
<p>
Before you begin, ensure you have the following installed:
</p>
<b>Node.js</b>
<pre>
<code>
node -v
</code>
</pre>
<p>If missing, download from: https://nodejs.org</p>
<b>npm</b>
<p>(npm is installed automatically with Node.js)</p>
<pre>
<code>
npm -v
</code>
</pre>
<b>Git</b>
<pre>
<code>
git --version
</code>
</pre>
<b>Allure Report</b>
<p>You must install Allure CLI globally:</p>
<b>Windows (Scoop)</b>
<pre>
<code>
brew install allure
</code>
</pre>
<b>macOS (Homebrew)</b>
<pre>
<code>
scoop install allure
</code>
</pre>
<b>Linux</b>
<pre>
<code>
sudo apt-add-repository ppa:qameta/allure
sudo apt update
sudo apt install allure
</code>
</pre>

<h3>📥 Installation</h3>
<b>1. Clone the repository</b>
<pre>
<code>
git clone https://github.com/thotrai/automation_exercise.git
</code>
</pre>
<b>2. Navigate into the project</b>
<pre>
<code>
cd automation_exercise
</code>
</pre>
<b>3. Install project dependencies</b>
<pre>
<code>
npm install
</code>
</pre>
<b>4. Install Playwright browsers</b>
<pre>
<code>
npx playwright install
</code>
</pre>
<p>(Optional but recommended — install OS dependencies)</p>
<pre>
<code>
npx playwright install-deps
</code>
</pre>

<h3>▶️ Execution</h3>
<b>Run all tests (default config)</b>
<pre>
<code>
npx playwright test
</code>
</pre>
<b>Run all UI tests</b>
<pre>
<code>
npx playwright test tests/ui
</code>
</pre>
<b>Run all API tests</b>
<pre>
<code>
npx playwright test tests/api
</code>
</pre>
<b>Run a single test</b>
<pre>
<code>
npx playwright test tests/ui/testcase16.test.ts
</code>
</pre>
<h3>📊 Reporting</h3>
<p>
Generate Allure Results (already done automatically during test run)
Your 'allure-results/' folder is created after test execution.
</p>
<b>Generate the Allure report</b>
<pre>
<code>
allure generate allure-results -o allure-report --clean
</code>
</pre>
<b>Open Allure report</b>
<pre>
<code>
allure open allure-report
</code>
</pre>
