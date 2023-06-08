const liked = JSON.parse(localStorage.getItem('liked')) || []
const div = document.querySelector('.basket-div')
const orders = document.querySelector('.orders')
orders.innerHTML = ''
div.innerHTML = ''

liked.forEach(data => {
    const box = `<div class="div-element">
        <h3 class="title-h3">${data.h3}</h3>
        <p class="author-p"> ${data.p1}</p>
        <img src="${data.img}" alt="Kitab şəkli">
        <p class="price-p">${data.p2} </p>
        <button class="cart-btn">Remove from Cart</button>
    </div>`
    div.innerHTML += box
    orders.innerHTML += `<p>${data.h3}<br>${data.p1}<br>${data.p2}</p>`
})

document.querySelectorAll('.cart-btn').forEach(btn => {
    btn.addEventListener('click', x => {
        const div = x.target.parentElement;
        t = div.children[0].innerText
        let id = -1
        for(let i=0; i<liked.length; i++) {
            if(liked[i].h3 === t) {
                id = i;
                break
            }
        }
        if(id >=0 ) {
            liked.splice(id, 1)
            localStorage.setItem('liked',JSON.stringify(liked))
            window.location.reload()
        }
    })
})






function acilirBlok() {
    var blok = document.getElementById("acilirBlok");
    blok.classList.toggle("acik");
}



function exitPage() {
    
    var blok = document.getElementById("acilirBlok");
    blok.classList.remove("acik");
  }




const firebaseConfig = {
    apiKey: "AIzaSyDGjGl3CyZ8aZ9stV-KNTL9hnZdJ4e9ZFg",
    authDomain: "cart-form-bb4f9.firebaseapp.com",
    databaseURL: "https://cart-form-bb4f9-default-rtdb.firebaseio.com",
    projectId: "cart-form-bb4f9",
    storageBucket: "cart-form-bb4f9.appspot.com",
    messagingSenderId: "347341379237",
    appId: "1:347341379237:web:44cd5ea7a8099000439f4c"
  };

  firebase.initializeApp(firebaseConfig);

  var cartFormDB = firebase.database().ref("cartForm");

  document.getElementById("cartForm").addEventListener("submit", submitForm);


  function submitForm(e) {
    e.preventDefault();
  
    let name = getElementVal("input1");
    let surname = getElementVal("input2");
    let loc = getElementVal("input3");
    

    let kitablar = {}
    liked.forEach((data, id) => {
        kitablar[`Sifaris ${id+1}`]  = `Kitabin adi: ${data.h3}\n${data.p1}\n${data.p2}`
    })
    
    
    saveMessages(name, surname, loc, kitablar);
  
   
  
    //   reset the form
    document.getElementById("cartForm").reset();
    alert('Sifariş Uğurla Qeydə Alındı');
  }


  const saveMessages = (name, surname, loc , kitablar) => {
    var newCartForm = cartFormDB.push();
  
    newCartForm.set({
      Ad: name,
      Soyad: surname,
      Unvan: loc,
      ...kitablar
      
     
    });
  };
  
  const getElementVal = (id) => {
    return document.getElementById(id).value;
  };