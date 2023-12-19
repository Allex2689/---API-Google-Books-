const slides = document.querySelectorAll('.banner-container img');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.style.transform = `translateX(-${index * 119}%)`;
      });

      dots.forEach((dot, i) => {
        dot.classList.remove('activeDot');
      });

      dots[index].classList.add('activeDot');
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }

    function changeSlide(index) {
      currentSlide = index;
      showSlide(currentSlide);
    }

    setInterval(nextSlide, 7000);

    document.addEventListener("DOMContentLoaded", function () {
      const navLinks = document.querySelectorAll(".main-list a");
  
      navLinks.forEach(function (link) {
          link.addEventListener("click", function () {
             
              navLinks.forEach(function (el) {
                  el.classList.remove("active");
              });
  
             
              link.classList.add("active");
          });
      });
  });

// Замените этот блок кода на ваш собственный код для получения данных с Google Books API
const apiKey = 'AIzaSyBWoUj-c-JHmMcc8pXsXzSQadgSrkurnxI';
let currentCategory = 'Architecture'; // Начальная категория

function createBookElement(book) {
  console.log(book);

  const bookElement = document.createElement('div');
  bookElement.classList.add('book');

  const imgElement = document.createElement('img');
  imgElement.src = book.volumeInfo.imageLinks.thumbnail;
  imgElement.alt = 'book';
  imgElement.classList.add('book-img');

  const infoElement = document.createElement('div');
  infoElement.classList.add('info-book');

  const authorElement = document.createElement('p');
  authorElement.textContent = book.volumeInfo.authors.join(', ');

  const titleElement = document.createElement('h2');
  titleElement.innerHTML = `<strong>${book.volumeInfo.title}</strong>`;

  const reviewElement = document.createElement('span');
reviewElement.classList.add('review');

// Проверяем наличие информации о рейтинге и отзывах
if (book.volumeInfo && book.volumeInfo.averageRating && book.volumeInfo.ratingsCount) {
  const rating = book.volumeInfo.averageRating;
  const ratingsCount = book.volumeInfo.ratingsCount;

  const starsContainer = document.createElement('span');
  starsContainer.classList.add('stars-container');

  // Добавляем 5 серых звезд
  for (let i = 0; i < 5; i++) {
    const star = document.createElement('span');
    star.classList.add('gray-star');
    star.innerHTML = '&#9734;'; 
    starsContainer.appendChild(star);
  }

  // Заполняем нужное количество звезд жёлтым цветом
  const filledStars = Math.round(rating);
  for (let i = 0; i < filledStars; i++) {
    starsContainer.children[i].classList.replace('gray-star', 'yellow-star');
  }

  // Добавляем количество отзывов
  starsContainer.innerHTML += ` (${ratingsCount} reviews)`;

  reviewElement.appendChild(starsContainer);
} else {
  reviewElement.innerHTML = '<span class="stars">&#9734; No reviews</span>';
}


  const descriptionElement = document.createElement('p');
  // Ограничиваем описание до 200 символов
  const limitedDescription = book.volumeInfo.description ? book.volumeInfo.description.slice(0, 200) : '';
  descriptionElement.innerHTML = limitedDescription || '';

  const priceElement = document.createElement('span');
priceElement.classList.add('price');

// Проверяем наличие информации о цене и выводим её
if (book.saleInfo && (book.saleInfo.listPrice || book.saleInfo.retailPrice)) {
  const amountRub = book.saleInfo.listPrice ? book.saleInfo.listPrice.amount : book.saleInfo.retailPrice.amount;
  
  // Конвертируем цену из рублей в доллары (предполагаем, что 1 USD = 75 RUB)
  const exchangeRate = 75; 
  const amountUsd = (amountRub / exchangeRate).toFixed(2);

  priceElement.innerHTML = `<strong>$${amountUsd}</strong>`;
} else {
  priceElement.innerHTML = '<strong>Цена не указана</strong>';
}

  const buttonElement = document.createElement('button');
  buttonElement.classList.add('button-settings');
  buttonElement.innerHTML = '<strong>BUY NOW</strong>';


    // Добавляем обработчик клика на кнопку "BUY NOW"
    document.addEventListener('click', (event) => {
      if (event.target.classList.contains('button-settings') && !isButtonClickHandled) {
        // Увеличиваем счетчик корзины
        cartCount++;
        // Обновляем отображение счетчика в корзине
        updateCartCounter(cartCount);
    
        // Показываем элемент с анимацией
        const cartCounter = document.querySelector('.cart-counter');
        cartCounter.style.display = 'inline-block';
        cartCounter.style.backgroundColor = 'red';
        cartCounter.style.borderRadius = '50%';
    
        // Устанавливаем флаг, чтобы предотвратить множественные обработки клика
        isButtonClickHandled = true;
    
        // Ждем некоторое время и сбрасываем флаг
        setTimeout(() => {
          isButtonClickHandled = false;
        }, 1); // Вы можете установить другое значение времени задержки (в миллисекундах), если это не подходит
      }
    });
    
    // Функция для обновления счетчика в корзине
    function updateCartCounter(count) {
      const cartCounter = document.querySelector('.cart-counter');
      if (cartCounter) {
        cartCounter.textContent = count;
      }
    }

  infoElement.appendChild(authorElement);
  infoElement.appendChild(titleElement);
  infoElement.appendChild(reviewElement);
  infoElement.appendChild(descriptionElement);
  infoElement.appendChild(priceElement);
  infoElement.appendChild(buttonElement);

  bookElement.appendChild(imgElement);
  bookElement.appendChild(infoElement);

  return bookElement;
}
// Объявляем счетчик для отслеживания загруженных книг
let cartCount = 0;
let isButtonClickHandled = false;
let loadedBooksCount = 0;

// Функция для загрузки книг по категории
function loadBooksByCategory(category, append = false) {
  // Рассчитываем индекс начала загрузки книг
  const startIndex = append ? loadedBooksCount : 0;

  fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${category}&key=${apiKey}&startIndex=${startIndex}&maxResults=6`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Ошибка при запросе к API:', response.statusText);
      }
      return response.json();
    })
    .then(data => {
      if (data && data.items && data.items.length > 0) {
        const booksData = data.items;
        // Увеличиваем счетчик загруженных книг только при первой загрузке (не при добавлении)
        if (!append) {
          loadedBooksCount += booksData.length;
        }
        displayBooks(booksData, append);
      } else {
        console.error('Отсутствуют данные о книгах или массив пуст.');
      }
    })
    .catch(error => console.error(error));
}

// Функция для отображения книг
function displayBooks(books, append = false) {
  const bookGrid = document.querySelector('.books-grid-first');

  // Если append равен true и нет грида, создаем новый
  if (append && !bookGrid) {
    const newGrid = document.createElement('div');
    newGrid.classList.add('books-grid-first');
    document.querySelector('.books-container').appendChild(newGrid);
  }

  // Если append равен true и грид все еще не определен, выходим из функции
  if (append && !bookGrid) {
    return;
  }

  // Если append равен true, добавляем новые книги, иначе очищаем грид
  if (!append) {
    bookGrid.innerHTML = '';
  }
  books.forEach(book => {
    const bookElement = createBookElement(book);
    bookGrid.appendChild(bookElement);
  });
}

// Обработчик клика на категории
document.querySelector('.main-list').addEventListener('click', (event) => {
  if (event.target.tagName === 'A') {
    const selectedCategory = event.target.textContent;
    if (selectedCategory !== currentCategory) {
      currentCategory = selectedCategory;
      event.preventDefault();
      document.querySelectorAll('.main-list a').forEach(link => link.classList.remove('active'));
      event.target.classList.add('active');
      // При смене категории сбрасываем счетчик
      loadedBooksCount = 0;
      loadBooksByCategory(currentCategory);
    }
  }
});

// Обработчик клика на кнопку "Load more"
document.querySelector('.button2-settings').addEventListener('click', () => {
  // Вызываем функцию загрузки книг с флагом append = true
  loadBooksByCategory(currentCategory, true);
});

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  // Убираем изначальные книги из HTML
  const initialBookGrids = document.querySelectorAll('.books-grid-first, .books-grid-second');
  initialBookGrids.forEach(grid => grid.innerHTML = '');

  // Загружаем книги для начальной категории
  loadBooksByCategory(currentCategory);
});   