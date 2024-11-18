const puppeteer = require('puppeteer');

// Scraping avec Puppeteer pour sites statiques ou dynamiques
async function scrapeWithPuppeteer(url, selectors) {
  let browser;

  try {
    console.log(`Scraping avec Puppeteer pour URL: ${url}`);
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Aller à l'URL et attendre que la page soit chargée
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

    // Scraping des données avec plusieurs sélecteurs
    const data = await page.evaluate((selectors) => {
      const result = {};
      for (const [key, selector] of Object.entries(selectors)) {
        const element = document.querySelector(selector);
        result[key] = element ? element.innerText.trim() : 'Données non trouvées';
      }
      return result;
    }, selectors);

    return data;
  } catch (error) {
    console.error(`Erreur avec Puppeteer pour ${url} :`, error.message);
    throw new Error(`Échec du scraping avec Puppeteer : ${error.message}`);
  } finally {
    if (browser) await browser.close();
  }
}

module.exports = { scrapeWithPuppeteer };
