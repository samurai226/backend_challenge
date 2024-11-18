const express = require('express');
const { scrapeWithPuppeteer } = require('../services/scrapingService');
const router = express.Router();

router.get('/rates', async (req, res) => {
  try {
    const taptapSendUrl = process.env.TAPTAPSEND_URL;
    const transfertchapchapUrl = process.env.TRANSFERTCHAPCHAP_URL;

    if (!taptapSendUrl || !transfertchapchapUrl) {
      return res.status(400).json({ error: "TAPTAPSEND_URL et TRANSFERTCHAPCHAP_URL doivent être définis dans le fichier .env" });
    }

    // Sélecteurs pour chaque site
    const taptapSendSelectors = {
      sourceText: '.fxrate-text',
      destText: '#fxRateText',
    };
    const transfertChapChapSelectors = {
      title: '.fxrate-text',
      rates: '#fxRateText', // Exemple : ajustez selon votre besoin
    };

    // Scraping pour les deux sites
    const [taptapSendData, transfertChapChapData] = await Promise.all([
      scrapeWithPuppeteer(taptapSendUrl, taptapSendSelectors),
      scrapeWithPuppeteer(transfertchapchapUrl, transfertChapChapSelectors),
    ]);

    res.status(200).json({
      tapTapSend: `${taptapSendData.sourceText} ${taptapSendData.destText}`,
      transfertChapChap: `${transfertChapChapData.title} ${transfertChapChapData.rates}`,
    });
  } catch (error) {
    console.error("Erreur lors du scraping :", error.message);
    res.status(500).json({ error: "Erreur lors de la récupération des taux" });
  }
});

module.exports = router;
