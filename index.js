const puppeteer = require('puppeteer');

async function scrape() {
  let mangasList = [];

  for(var i = 16000;i<16010;i++) {
    const browser = await puppeteer.launch({args: ['--disable-setuid-sandbox', '--no-sandbox']});
    const page = await browser.newPage();
    await page.setJavaScriptEnabled(false);
    let url = `https://nhentai.net/g/${i}/`;
    await page.goto(url);
  
    const result = await page.evaluate(() => {
      try {
        let title = document.querySelector('h1').innerText;
        let rating = +document.querySelector('.nobold').innerText.replace(/[{()}]/g, "");
        if (+rating > 2000) {
          return {title, rating};
        }
      } catch (e) {
        console.log('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack);
      }

    });
    
    await browser.close();
    if(typeof result !== 'undefined') {
      result.url = url;
      mangasList.push(result);
    }
  }
  return mangasList;
}

scrape().then((value) => {
  console.log(value);
});
