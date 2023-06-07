const firebaseConfig = {
    apiKey: "AIzaSyCya4t7CwZ6XX8sA2DHKlOEwkIAx18JZm8",
    authDomain: "e-library-database-8272f.firebaseapp.com",
    databaseURL: "https://e-library-database-8272f-default-rtdb.firebaseio.com",
    projectId: "e-library-database-8272f",
    storageBucket: "e-library-database-8272f.appspot.com",
    messagingSenderId: "305786620819",
    appId: "1:305786620819:web:58764c688001d3feb1f666"
  };

  firebase.initializeApp(firebaseConfig);

  var contactFormDB = firebase.database().ref("contactForm");

  document.getElementById("contactForm").addEventListener("submit", submitForm);


  function submitForm(e) {
    e.preventDefault();
  
    var help = getElementVal("q-type");
    var device = getElementVal("d-type");
    var publisher = getElementVal("c-type");
    var inputA = getElementVal("e-input");
    var inputW = getElementVal("w-input");
    var txt = getElementVal("txt-area");
  
    saveMessages(help, device, publisher, inputA, inputW, txt);
  
   
  
    //   reset the form
    document.getElementById("contactForm").reset();
    alert('Sorğu uğurla göndərildi');
  }


  const saveMessages = (help, device, publisher, inputA, inputW, txt) => {
    var newContactForm = contactFormDB.push();
  
    newContactForm.set({
      help: help,
      device: device,
      publisher: publisher,
      Email_address: inputA,
      Relate: inputW,
      Text: txt,
    });
  };
  
  const getElementVal = (id) => {
    return document.getElementById(id).value;
  };