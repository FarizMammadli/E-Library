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