import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, onAuthStateChanged, getRedirectResult } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {

    databaseURL: "https://year-3-group-project-default-rtdb.europe-west1.firebasedatabase.app",
    apiKey: "AIzaSyDo2rpRZv9SlKaSINJwpN5Znf0684sccW4",
    authDomain: "year-3-group-project.firebaseapp.com",
    databaseURL: "https://year-3-group-project-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "year-3-group-project",
    storageBucket: "year-3-group-project.appspot.com",
    messagingSenderId: "345845091768",
    appId: "1:345845091768:web:08424889bff275e341934d",
    measurementId: "G-E53ZGGY217"
};
// Set up our register function 
document.getElementById("loginBtn").onclick = function () { loginUser() };
document.getElementById("registerBtn").onclick = function () { registerUser() };


function registerUser() {
    console.log("Hi")
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value

    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Please check your input and try again!')
        return
        // Don't continue running the code
    }

    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
        .then(function () {
            // Declare user variable
            var user = auth.currentUser

            // Add this user to Firebase Database
            var database_ref = database.ref()

            // Create User data
            var user_data = {
                email: email,
                last_login: Date.now()
            }

            // Push to Firebase Database
            database_ref.child('users/' + user.uid).set(user_data)

            // Done
            alert('User Created!')
        })
        .catch(function (error) {
            // Firebase will use this to alert of its errors
            var errorCode = error.code
            var errorMessage = error.message

            alert(errorMessage)
        })
}

// Set up our login function
function loginUser() {
    console.log("HEAEASDSA")
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value

    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Check your inputs, something is wrong')
        return
        // Don't continue running the code
    }

    auth.signInWithEmailAndPassword(email, password)
        .then(function () {
            // Declare user variable
            var user = auth.currentUser

            // Add this user to Firebase Database
            var database_ref = database.ref()

            // Create User data
            var user_data = {
                last_login: Date.now()
            }

            // Push to Firebase Database
            database_ref.child('users/' + user.uid).update(user_data)

            // DOne
            alert('User Logged In!')

        })
        .catch(function (error) {
            // Firebase will use this to alert of its errors
            var error_code = error.code
            var error_message = error.message

            alert(error_message)
        })
}




// Validate Functions
function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
        // Email is good
        return true
    } else {
        // Email is not good
        return false
    }
}

function validate_password(password) {
    // Firebase only accepts lengths greater than 6
    if (password < 6) {
        return false
    } else {
        return true
    }
}

function validate_field(field) {
    if (field == null) {
        return false
    }

    if (field.length <= 0) {
        return false
    } else {
        return true
    }
}


const auth = getAuth(firebaseApp);
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

/*// authentication
// firebase will use this
auth.createUserWithEmailAndPassword(email, password)
    .then(function(){
        var user = auth.currentUser

        // add user to database

        var database_ref = database.ref()
        
        var user_data = {
            email: email,
            full_name : full_name,
            password: password,
            last_login : Date.now()
        }

        database_ref.child('users/' + user.uid).set(user_data)

        alert("User Created")
    })
    .catch(function(error){
        var error_code = error_code
        var error_message = error_message

        alert(error_message)
    })

//registration / login functions
function register () {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
    full_name = document.getElementById('full_name').value
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Please check your email or password input and try again')
      return 
      // Don't continue running the code
    }
    if (validate_field(full_name) == false) {
      alert('Please check your name input and try again')
      return
    }};
    
function login () {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or password incorrect.')
      return 
      // Don't continue running the code
    }
    
function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if(expression.test(email) == true){
        return true
    } else {
        return false
    }
}
function validate_password(password){
    if(password < 6){
        return false
    } else{
        return true
    }
}

function validate_field(field){
    if(field == null) {
        return false
    }
    if(field.length <=0){
        return false
    } else{
        return true
    }
    }
}

// Initialize Firebase
const auth = getAuth(app);
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
*/