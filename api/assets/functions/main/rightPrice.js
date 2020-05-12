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

async function getAmazonProductList(subject) {
    const url       = `https://www.amazon.fr/s?k=${subject}`;
    const Nightmare = require('nightmare')();
    return await Nightmare.goto(url)
        .wait('.s-result-item')
        .evaluate(() => {
            const amazonProductList = document.querySelectorAll('.s-result-item');
            const productsList = [];
            for (let indexProduct in amazonProductList) {
                try {   
                    const elementProduct = amazonProductList[indexProduct];
                    const productImage   = elementProduct.querySelector('.s-image');
                    const originalPrice  = elementProduct.querySelector(".a-price-whole").innerHTML;
                    productsList.push({
                        name: productImage["alt"],
                        image: productImage["src"],
                        price: Number(originalPrice.replace(",", ".").replace(" ", ""))
                    });
                } catch (_error) {
                    continue;
                }
            }
            return productsList;
        })
        .end();
}

module.exports = rightPriceOutput = async ({ res }, _argsObject) => {
    const subject       = getRandomArrayElement(subjectList);
    const productsList  = await getAmazonProductList(subject);
    const randomProduct = getRandomArrayElement(productsList);
    return res.status(200).json({ subject, ...randomProduct });
}