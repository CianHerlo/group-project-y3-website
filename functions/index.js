const functions = require("firebase-functions");

exports.createStripeCheckout = functions.https.onCall(async (data, context) => {
    // stripe init
    const stripe = require("stripe")(functions.config().stripe.secret_key);
    const session = await stripe.checkout.sessions.create({
        parment_method_types: ["card"],
        mode: "payment",
        success_url: "http://localhost:5500/",
        cancel_url: "https://localhost:5500/",
        line_items: [
            {
                quantity: 1,
                price_data: {
                    currency: "usd",
                    unit_amount: (100) * 100, // 10000 = 100 USD
                    product_data: {
                        name: "New Camera",
                    },
                },
            },
        ],
    });
    return {
        id: session.id,
    };
});
