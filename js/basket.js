const liked = JSON.parse(localStorage.getItem('liked')) || []
const div = document.querySelector('.basket-div')
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

function degerleriGoster() {
    var deger1 = document.getElementById("input1").value;
    var deger2 = document.getElementById("input2").value;
    var deger3 = document.getElementById("input3").value;
    alert("Değer 1: " + deger1 + "\nDeğer 2: " + deger2 + "\nDeğer 3:" + deger3);

    var blok = document.getElementById("acilirBlok");
    blok.classList.remove("acik");
}