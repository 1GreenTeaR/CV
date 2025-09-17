const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

async function generatePDF() {
  try {
    // Create output directory if it doesn't exist
    const outputDir = path.join(__dirname, "output");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    // Launch browser
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Load HTML file
    await page.goto(`file:${path.join(__dirname, "resume.html")}`, {
      waitUntil: "networkidle0",
    });

    // Generate PDF
    await page.pdf({
      path: path.join(outputDir, "resume.pdf"),
      format: "A4",
      margin: {
        top: "20px",
        right: "20px",
        bottom: "20px",
        left: "20px",
      },
      printBackground: true,
    });

    await browser.close();
    console.log("PDF generated successfully!");
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
}

generatePDF();
