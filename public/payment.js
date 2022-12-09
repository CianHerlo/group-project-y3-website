
firebaseConfig = {

 apiKey: "AIzaSyDo2rpRZv9SlKaSINJwpN5Znf0684sccW4",
 authDomain: "year-3-group-project.firebaseapp.com",
 databaseURL: "https://year-3-group-project-default-rtdb.europe-west1.firebasedatabase.app",
 projectId: "year-3-group-project",
 storageBucket: "year-3-group-project.appspot.com",
 messagingSenderId: "345845091768",
 appId: "1:345845091768:web:08424889bff275e341934d",
 measurementId: "G-E53ZGGY217"

};

firebase.initializeApp(firebaseConfig);

const checkoutButton = document.getElementById("checkout-button")
const createStripeCheckout = firebase.functions().httpsCallable('createStripeCheckout')
const stripe = Stripe('pk_test_51M80bcJbAKN8jab6YNa6nXbXj1WMrDAGfBucJEcbFbRZInIEgEAjRinQoeGYKhERkHB4k17DMkPwX0fLBdHAUPPL00Aq80Hv7H')


checkoutButton.addEventListener('click', () => {
  createStripeCheckout()
    .then(response => {
      const sessionId = response.data.id
      stripe.redirectToCheckout({ sessionId: sessionId })
    })
})