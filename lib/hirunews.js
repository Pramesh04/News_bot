const axios = require('axios');
const cheerio = require('cheerio');

async function latestHiru() {
    return new Promise(async (resolve, reject) => {
        axios.get(`https://www.hirunews.lk/local-news.php?pageID=1`).then((scrape) => {
            const $g = cheerio.load(scrape.data)
            const link = $g('body > div:nth-child(14) > div.row > div.col-sm-12.col-md-9.col-lg-9.section > div > div:nth-child(2) > div.column.middle > a:nth-child(1)').attr('href')
            const img = $g('body > div:nth-child(14) > div.row > div.col-sm-12.col-md-9.col-lg-9.section > div > div:nth-child(2) > div.column.left > div > a > img').attr('src')
            
            axios.get(link).then((scrape2) => {
                const $ = cheerio.load(scrape2.data)
                const desc2 = $('#article-phara').text()
                let [desc] = desc2.split`window.`;
                const title = $('body > div:nth-child(14) > center > h1').text()
                resolve({
                    link,
                    img,
                    title,
                    desc
                })
            })
            .catch((e) => {
                reject(e);
            })
        })
        .catch((e) => {
            reject(e);
        });
    })
}

module.exports.latestHiru = latestHiru