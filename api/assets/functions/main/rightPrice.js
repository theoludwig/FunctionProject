const { randomNumber } = require('./randomNumber');

const subjectList = [
    "smartphone",
    "pc+gamer",
    "pc+portable",
    "TV",
    "casque",
    "clavier",
    "souris",
    "ecran",
    "jeux+vidéos"
];

function getRandomArrayElement(array) {
    return array[randomNumber(0, array.length - 1)];
}

async function getAmazonProductList(url) {
    const Nightmare = require('nightmare')();
    return await Nightmare.goto(url)
        .wait('.s-result-item')
        .evaluate(() => {
            const amazonProductList = document.querySelectorAll('.s-result-item');
            const productsList = [];
            for (let indexProduct in amazonProductList) {
                try {   
                    const elementProduct = amazonProductList[indexProduct];
                    const productImage = elementProduct.querySelector('.s-image');
                    productsList.push({
                        name: productImage["alt"],
                        image: productImage["src"],
                        price: elementProduct.querySelector(".a-price-whole").innerHTML
                    });
                } catch (error) {
                    continue;
                }
            }
            return productsList;
        })
        .end();
}

module.exports = rightPriceOutput = async ({ res }, _argsObject) => {
    const subject       = getRandomArrayElement(subjectList);
    const productsList  = await getAmazonProductList(`https://www.amazon.fr/s?k=${subject}`);
    const randomProduct = getRandomArrayElement(productsList);
    return res.status(200).json({ subject, ...randomProduct });
}