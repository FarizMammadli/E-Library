const firebaseConfig = {
    apiKey: "AIzaSyCya4t7CwZ6XX8sA2DHKlOEwkIAx18JZm8",
    authDomain: "e-library-database-8272f.firebaseapp.com",
    projectId: "e-library-database-8272f",
    storageBucket: "e-library-database-8272f.appspot.com",
    messagingSenderId: "305786620819",
    appId: "1:305786620819:web:b58e27064a7ae075b1f666"
  };


  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

const auth = firebase.auth()
const database = firebase.database()


function register () {
email = document.getElementById('email').value
password = document.getElementById('password').value
full_name = document.getElementById('full_name').value
location = document.getElementById('location').value
age = document.getElementById('age').value

auth.createUserWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      email : email,
      full_name : full_name,
      location : location,
      age : age,
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).set(user_data)

    // DOne
    alert('User Created!!')
  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })

}