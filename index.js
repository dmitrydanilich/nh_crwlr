const cheerio = require("cheerio");
var rp = require("request-promise");

let mangasList = [];

function getTopMangas() {
  for (var i = 1; i < 50; i++) {
    var url = `https://nhentai.net/g/${i}/`;
    setTimeout(function(i) {
      rp(url)
        .then(function(pageData) {
          const $ = cheerio.load(pageData);
          $(".buttons").each(function(index, element) {
            mangasList[index] = {};
            var rating = $(element)
              .find("span")
              .find("span")
              .html();
            rating = rating.replace(/[{()}]/g, "");
            if (rating > 500) {
              mangasList[i]["url"] = url;
              mangasList[i]["rating"] = rating;
            } else {
              console.log(url + " rating is under 500");
            }
          });
        })
        .catch(function(err) {
          console.log(err, "ERROR");
        });
    }, 10000);
  }
}

getTopMangas();
console.log(mangasList);
