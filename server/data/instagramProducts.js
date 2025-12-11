const localProducts = [
    { src: "/Richa Products/Bouquet 1.jpg", caption: "Handmade Bouquet" },
    { src: "/Richa Products/Bouquet 10.jpg", caption: "Handmade Bouquet" },
    { src: "/Richa Products/Bouquet 11.jpg", caption: "Handmade Bouquet" },
    { src: "/Richa Products/Bouquet 2.jpg", caption: "Handmade Bouquet" },
    { src: "/Richa Products/Bouquet 3.jpg", caption: "Handmade Bouquet" },
    { src: "/Richa Products/Bouquet 4.jpg", caption: "Handmade Bouquet" },
    { src: "/Richa Products/Bouquet 5.jpg", caption: "Handmade Bouquet" },
    { src: "/Richa Products/Bouquet 6.jpg", caption: "Handmade Bouquet" },
    { src: "/Richa Products/Bouquet 7.jpg", caption: "Handmade Bouquet" },
    { src: "/Richa Products/Bouquet 8.jpg", caption: "Handmade Bouquet" },
    { src: "/Richa Products/Bouquet 9.jpg", caption: "Handmade Bouquet" },
    { src: "/Richa Products/Clawclip 1.jpg", caption: "Handmade Claw Clip" },
    { src: "/Richa Products/Clawclip 2.jpg", caption: "Handmade Claw Clip" },
    { src: "/Richa Products/Clawclip 3.jpg", caption: "Handmade Claw Clip" },
    { src: "/Richa Products/Clawclip 4.jpg", caption: "Handmade Claw Clip" },
    { src: "/Richa Products/Clawclip 5.jpg", caption: "Handmade Claw Clip" },
    { src: "/Richa Products/Clawclip 6.jpg", caption: "Handmade Claw Clip" },
    { src: "/Richa Products/Clawclip 7.jpg", caption: "Handmade Claw Clip" },
    { src: "/Richa Products/Flower 1.jpg", caption: "Handmade Flower" },
    { src: "/Richa Products/Flower 2.jpg", caption: "Handmade Flower" },
    { src: "/Richa Products/Flower 3.jpg", caption: "Handmade Flower" },
    { src: "/Richa Products/Flower 4.jpg", caption: "Handmade Flower" },
    { src: "/Richa Products/Flower 5.jpg", caption: "Handmade Flower" },
    { src: "/Richa Products/Flower 6.jpg", caption: "Handmade Flower" },
    { src: "/Richa Products/KeyChain 1.jpg", caption: "Handmade Keychain" },
    { src: "/Richa Products/KeyChain 10.jpg", caption: "Handmade Keychain" },
    { src: "/Richa Products/KeyChain 11.jpg", caption: "Handmade Keychain" },
    { src: "/Richa Products/KeyChain 12.jpg", caption: "Handmade Keychain" },
    { src: "/Richa Products/KeyChain 13.jpg", caption: "Handmade Keychain" },
    { src: "/Richa Products/KeyChain 14.jpg", caption: "Handmade Keychain" },
    { src: "/Richa Products/KeyChain 15.jpg", caption: "Handmade Keychain" },
    { src: "/Richa Products/KeyChain 16.jpg", caption: "Handmade Keychain" },
    { src: "/Richa Products/KeyChain 17.jpg", caption: "Handmade Keychain" },
    { src: "/Richa Products/KeyChain 18.jpg", caption: "Handmade Keychain" },
    { src: "/Richa Products/KeyChain 2.jpg", caption: "Handmade Keychain" },
    { src: "/Richa Products/KeyChain 3.jpg", caption: "Handmade Keychain" },
    { src: "/Richa Products/KeyChain 4.jpg", caption: "Handmade Keychain" },
    { src: "/Richa Products/KeyChain 5.jpg", caption: "Handmade Keychain" },
    { src: "/Richa Products/KeyChain 6.jpg", caption: "Handmade Keychain" },
    { src: "/Richa Products/KeyChain 7.jpg", caption: "Handmade Keychain" },
    { src: "/Richa Products/KeyChain 8.jpg", caption: "Handmade Keychain" },
    { src: "/Richa Products/KeyChain 9.jpg", caption: "Handmade Keychain" },
    { src: "/Richa Products/Muffler 1.jpg", caption: "Handmade Muffler" },
    { src: "/Richa Products/Muffler 2.jpg", caption: "Handmade Muffler" }
];

const processProducts = () => {
    return localProducts.map((item, index) => {
        let category = "Flowers";
        const fname = item.src.split('/').pop().toLowerCase();

        let title = "Handmade Item";
        if (fname.includes("bouquet")) {
            category = "Bouquets";
            title = "Crochet Bouquet";
        } else if (fname.includes("clawclip")) {
            category = "Claw Clips";
            title = "Cute Claw Clip";
        } else if (fname.includes("flower")) {
            category = "Flowers";
            title = "Crochet Flower";
        } else if (fname.includes("keychain")) {
            category = "Keychains";
            title = "Handmade Keychain";
        } else if (fname.includes("muffler")) {
            category = "Muffler";
            title = "Cozy Muffler";
        }

        // Fixed pricing based on category
        let price = 499;
        if (category === "Bouquets") price = 1200;
        if (category === "Claw Clips") price = 299;
        if (category === "Keychains") price = 199;
        if (category === "Muffler") price = 899;

        return {
            _id: (index + 1).toString(),
            name: title,
            price: price,
            image: item.src,
            category: category,
            description: item.caption
        };
    });
};

module.exports = processProducts();
