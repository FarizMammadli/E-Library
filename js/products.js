const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const results = document.getElementById('results');


const initialBooks = [
  {
    title: 'The Godfather',
    authors: 'Mario Puzo',
    image: 'http://books.google.com/books/content?id=FDdbAAAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
    price: 50
  },
  {
    title: 'Oliver Twist',
    authors: 'Charles Dickens',
    image: 'http://books.google.com/books/content?id=1ljDbiIRP8sC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    price: 60
  },
  {
    title: 'The Idiot',
    authors: 'Fedor Mikhailovitch Dostoïevski',
    image: 'http://books.google.com/books/content?id=b74n6Bus22YC&printsec=frontcover&img=1&zoom=1&source=gbs_api',
    price: 60
  },
  {
    title: 'Satranç',
    authors: 'Stefan Zweig',
    image: 'http://books.google.com/books/content?id=FZrsDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    price: 60
  },
  {
    title: 'The Philosophy Of Friedrich Nietzsche',
    authors: 'H. Mencken',
    image: 'http://books.google.com/books/content?id=IX0bzwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
    price: 60
  },
  {
    title: 'Of Mice And Men',
    authors: 'John Steinbeck',
    image: 'http://books.google.com/books/content?id=XyIZnwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
    price: 60
  },
  {
    title: '1984',
    authors: 'George Orwell',
    image: 'http://books.google.com/books/content?id=aPlAtgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
    price: 60
  },
  {
    title: 'Cesur Yeni Dünya',
    authors: 'Aldous Huxley',
    image: 'http://books.google.com/books/content?id=uoEF6w6Gk_wC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    price: 60
  },
  {
    title: 'Island',
    authors: 'Aldous Huxley',
    image: 'http://books.google.com/books/content?id=n_FGzwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
    price: 60
  },
  {
    title: 'I Am Not A Man, I Am Dynamite!',
    authors: 'John Moore',
    image: 'http://books.google.com/books/content?id=SWn4K85vWbMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    price: 60
  },
  {
    title: 'On Love',
    authors: 'Charles Bukowski',
    image: 'http://books.google.com/books/content?id=AlSOrgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
    price: 60
  },
  {
    title: 'Dönüsüm',
    authors: 'Franz Kafka',
    image: 'http://books.google.com/books/content?id=V6FxoAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
    price: 60
  }
];

const books = initialBooks.map(book => {
  const title = book.title || '';
  const author = book.authors ? book.authors : 'Yazıçı bilgisi tapılmadı';
  const image = book.image ? book.image : 'Şəkil tapılmadı';
  const price = getRandomPrice();


  return {
    title,
    author,
    image,
    price
  };
});

displayResults(books);


const randomBooks = generateRandomBooks(20);

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const searchTerm = input.value;

  fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`)
    .then(response => response.json())
    .then(data => {
      const searchResults = data.items || [];
      const filteredBooks = searchResults.map(book => {
        const title = book.volumeInfo.title || '';
        const author = book.volumeInfo.authors ? book.volumeInfo.authors[0] : 'Yazıçı bilgisi tapılmadı';
        const image = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'Şəkil tapılmadı';
        const price = getRandomPrice();


        return {
          title,
          author,
          image,
          price
        };
      });

      const books = searchTerm ? filteredBooks : initialBooks.concat(randomBooks);
      displayResults(books);
      basketControl()
    });
});

function displayResults(books) {
  results.innerHTML = '';

  books.forEach(book => {
    const { title, author, image, price } = book;

    const bookElement = document.createElement('div');
    bookElement.classList.add('div-element')
    bookElement.innerHTML = `
      <h3 class="title-h3">${title}</h3>
      <p class="author-p">Yazıçı: ${author}</p>
      <img src="${image}" alt="Kitab şəkli">
      <p class="price-p">Satış Qiyməti: ${price} AZN</p>
      <button class="cart-btn">Add to Cart</button>
    `;

    results.appendChild(bookElement);
  });
}

function generateRandomBooks(count) {
  const randomBooks = [];

  for (let i = 0; i < count; i++) {
    const title = `Kitab ${i + 1}`;
    const author = `Yazıçı ${i + 1}`;
    const image = 'https://example.com/book-placeholder.jpg';
    const price = getRandomPrice();

    randomBooks.push({
      title,
      author,
      image,
      price
    });
  }

  return randomBooks;
}

function getRandomPrice() {
  const min = 10;
  const max = 100;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function basketControl() {
  const boxes = [...document.querySelectorAll('.div-element')]
  const liked = JSON.parse(localStorage.getItem('liked')) || []


  document.querySelectorAll('.cart-btn').forEach(btn => {
    btn.addEventListener('click', x => {
      const div = x.target.parentElement;
      const t = {}
      t.h3 = div.children[0].innerText
      t.p1 = div.children[1].innerText
      t.img = div.children[2].src
      t.p2 = div.children[3].innerText
      let find = false
      for (let i = 0; i < liked.length; i++) {
        if (liked[i].h3 === t.h3) {
          find = true;
          break
        }
      }
      if (!find) {
        liked.push(t)
        localStorage.setItem('liked', JSON.stringify(liked))
      }
    })
  })
}

basketControl()