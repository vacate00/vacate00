const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const websiteUrl =
  "https://www.strava.com/athletes/119323843/activity-summary/15338ddb96e172ac63a9b54d3394dcf3c5ab360e";

const screenshotPath = path.join(__dirname, `snapshot.png`);
const previousScreenshotPath = path.join(screenshotPath, "snapshot.png");

if (fs.existsSync(previousScreenshotPath)) {
  fs.unlinkSync(previousScreenshotPath);
  console.log("Previous screenshot deleted.");
}

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  await page.setViewport({ width: 480, height: 160 });
  await page.goto(websiteUrl);

  const screenshotPath = path.join(__dirname, `snapshot.png`);
  await page.screenshot({
    path: screenshotPath,
    // clip: { x: 0, y: 0, width: 480, height: 160 },
  });

  await browser.close();

  console.log(`Screenshot saved: ${screenshotPath}`);
})();
