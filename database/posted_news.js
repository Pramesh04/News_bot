const { DATABASE, postedE, postedH } = require("./db")

module.exports.postedEsanaNews = async (esanaNews) => {
    await DATABASE.sync();

    var data = await postedE.findAll({ where: { id: 1 } });

    if (data.length < 1) {
        return await postedE.create({ id: 1, esanaNews: esanaNews.news_id, newsData: JSON.stringify(esanaNews) });
    } else {
        return await data[0].update({ esanaNews: esanaNews.news_id, newsData: JSON.stringify(esanaNews) });
    }
}

module.exports.get_EsanaPosted = async () => {
    await DATABASE.sync();
    var result = await postedE.findAll({ where: { id: 1 } });

    if (result.length < 1) {
        return false;
    } else {
        return result[0].dataValues;
    }
}

module.exports.postedHiruNews = async (hiruNews) => {
    await DATABASE.sync();

    var data = await postedH.findAll({ where: { id: 1 } });

    if (data.length < 1) {
        return await postedH.create({ id: 1, hiruNews: hiruNews.link, newsData: JSON.stringify(hiruNews) });
    } else {
        return await data[0].update({ hiruNews: hiruNews.link, newsData: JSON.stringify(hiruNews) });
    }
}

module.exports.get_HiruPosted = async () => {
    await DATABASE.sync();
    var result = await postedH.findAll({ where: { id: 1 } });

    if (result.length < 1) {
        return false;
    } else {
        return result[0].dataValues;
    }
}