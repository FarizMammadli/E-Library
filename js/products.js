const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const results = document.getElementById('results');


const initialBooks = [
  {
    title: 'The Godfather',
    author: 'Mario Puzo',
    image: 'https://example.com/the-godfather.jpg',
    price: 50
  },
  {
    title: 'The Godfather Returns',
    author: 'Mark Winegardner',
    image: 'https://example.com/the-godfather-returns.jpg',
    price: 60
  }
];


const randomBooks = generateRandomBooks(20);

form.addEventListener('submit', function(event) {
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
