/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/***/ (() => {

eval("var slides = document.querySelectorAll('.banner-container img');\nvar dots = document.querySelectorAll('.dot');\nvar currentSlide = 0;\nfunction showSlide(index) {\n  slides.forEach(function (slide, i) {\n    slide.style.transform = \"translateX(-\".concat(index * 119, \"%)\");\n  });\n  dots.forEach(function (dot, i) {\n    dot.classList.remove('activeDot');\n  });\n  dots[index].classList.add('activeDot');\n}\nfunction nextSlide() {\n  currentSlide = (currentSlide + 1) % slides.length;\n  showSlide(currentSlide);\n}\nfunction changeSlide(index) {\n  currentSlide = index;\n  showSlide(currentSlide);\n}\nsetInterval(nextSlide, 7000);\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n  var navLinks = document.querySelectorAll(\".main-list a\");\n  navLinks.forEach(function (link) {\n    link.addEventListener(\"click\", function () {\n      navLinks.forEach(function (el) {\n        el.classList.remove(\"active\");\n      });\n      link.classList.add(\"active\");\n    });\n  });\n});\n\n// Замените этот блок кода на ваш собственный код для получения данных с Google Books API\nvar apiKey = 'AIzaSyBWoUj-c-JHmMcc8pXsXzSQadgSrkurnxI';\nvar currentCategory = 'Architecture'; // Начальная категория\n\nfunction createBookElement(book) {\n  console.log(book);\n  var bookElement = document.createElement('div');\n  bookElement.classList.add('book');\n  var imgElement = document.createElement('img');\n  imgElement.src = book.volumeInfo.imageLinks.thumbnail;\n  imgElement.alt = 'book';\n  imgElement.classList.add('book-img');\n  var infoElement = document.createElement('div');\n  infoElement.classList.add('info-book');\n  var authorElement = document.createElement('p');\n  authorElement.textContent = book.volumeInfo.authors.join(', ');\n  var titleElement = document.createElement('h2');\n  titleElement.innerHTML = \"<strong>\".concat(book.volumeInfo.title, \"</strong>\");\n  var reviewElement = document.createElement('span');\n  reviewElement.classList.add('review');\n\n  // Проверяем наличие информации о рейтинге и отзывах\n  if (book.volumeInfo && book.volumeInfo.averageRating && book.volumeInfo.ratingsCount) {\n    var rating = book.volumeInfo.averageRating;\n    var ratingsCount = book.volumeInfo.ratingsCount;\n    var starsContainer = document.createElement('span');\n    starsContainer.classList.add('stars-container');\n\n    // Добавляем 5 серых звезд\n    for (var i = 0; i < 5; i++) {\n      var star = document.createElement('span');\n      star.classList.add('gray-star');\n      star.innerHTML = '&#9734;';\n      starsContainer.appendChild(star);\n    }\n\n    // Заполняем нужное количество звезд жёлтым цветом\n    var filledStars = Math.round(rating);\n    for (var _i = 0; _i < filledStars; _i++) {\n      starsContainer.children[_i].classList.replace('gray-star', 'yellow-star');\n    }\n\n    // Добавляем количество отзывов\n    starsContainer.innerHTML += \" (\".concat(ratingsCount, \" reviews)\");\n    reviewElement.appendChild(starsContainer);\n  } else {\n    reviewElement.innerHTML = '<span class=\"stars\">&#9734; No reviews</span>';\n  }\n  var descriptionElement = document.createElement('p');\n  // Ограничиваем описание до 200 символов\n  var limitedDescription = book.volumeInfo.description ? book.volumeInfo.description.slice(0, 200) : '';\n  descriptionElement.innerHTML = limitedDescription || '';\n  var priceElement = document.createElement('span');\n  priceElement.classList.add('price');\n\n  // Проверяем наличие информации о цене и выводим её\n  if (book.saleInfo && (book.saleInfo.listPrice || book.saleInfo.retailPrice)) {\n    var amountRub = book.saleInfo.listPrice ? book.saleInfo.listPrice.amount : book.saleInfo.retailPrice.amount;\n\n    // Конвертируем цену из рублей в доллары (предполагаем, что 1 USD = 75 RUB)\n    var exchangeRate = 75;\n    var amountUsd = (amountRub / exchangeRate).toFixed(2);\n    priceElement.innerHTML = \"<strong>$\".concat(amountUsd, \"</strong>\");\n  } else {\n    priceElement.innerHTML = '<strong>Цена не указана</strong>';\n  }\n  var buttonElement = document.createElement('button');\n  buttonElement.classList.add('button-settings');\n  buttonElement.innerHTML = '<strong>BUY NOW</strong>';\n\n  // Добавляем обработчик клика на кнопку \"BUY NOW\"\n  document.addEventListener('click', function (event) {\n    if (event.target.classList.contains('button-settings') && !isButtonClickHandled) {\n      // Увеличиваем счетчик корзины\n      cartCount++;\n      // Обновляем отображение счетчика в корзине\n      updateCartCounter(cartCount);\n\n      // Показываем элемент с анимацией\n      var cartCounter = document.querySelector('.cart-counter');\n      cartCounter.style.display = 'inline-block';\n      cartCounter.style.backgroundColor = 'red';\n      cartCounter.style.borderRadius = '50%';\n\n      // Устанавливаем флаг, чтобы предотвратить множественные обработки клика\n      isButtonClickHandled = true;\n\n      // Ждем некоторое время и сбрасываем флаг\n      setTimeout(function () {\n        isButtonClickHandled = false;\n      }, 1); // Вы можете установить другое значение времени задержки (в миллисекундах), если это не подходит\n    }\n  });\n\n  // Функция для обновления счетчика в корзине\n  function updateCartCounter(count) {\n    var cartCounter = document.querySelector('.cart-counter');\n    if (cartCounter) {\n      cartCounter.textContent = count;\n    }\n  }\n  infoElement.appendChild(authorElement);\n  infoElement.appendChild(titleElement);\n  infoElement.appendChild(reviewElement);\n  infoElement.appendChild(descriptionElement);\n  infoElement.appendChild(priceElement);\n  infoElement.appendChild(buttonElement);\n  bookElement.appendChild(imgElement);\n  bookElement.appendChild(infoElement);\n  return bookElement;\n}\n// Объявляем счетчик для отслеживания загруженных книг\nvar cartCount = 0;\nvar isButtonClickHandled = false;\nvar loadedBooksCount = 0;\n\n// Функция для загрузки книг по категории\nfunction loadBooksByCategory(category) {\n  var append = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;\n  // Рассчитываем индекс начала загрузки книг\n  var startIndex = append ? loadedBooksCount : 0;\n  fetch(\"https://www.googleapis.com/books/v1/volumes?q=subject:\".concat(category, \"&key=\").concat(apiKey, \"&startIndex=\").concat(startIndex, \"&maxResults=6\")).then(function (response) {\n    if (!response.ok) {\n      throw new Error('Ошибка при запросе к API:', response.statusText);\n    }\n    return response.json();\n  }).then(function (data) {\n    if (data && data.items && data.items.length > 0) {\n      var booksData = data.items;\n      // Увеличиваем счетчик загруженных книг только при первой загрузке (не при добавлении)\n      if (!append) {\n        loadedBooksCount += booksData.length;\n      }\n      displayBooks(booksData, append);\n    } else {\n      console.error('Отсутствуют данные о книгах или массив пуст.');\n    }\n  })[\"catch\"](function (error) {\n    return console.error(error);\n  });\n}\n\n// Функция для отображения книг\nfunction displayBooks(books) {\n  var append = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;\n  var bookGrid = document.querySelector('.books-grid-first');\n\n  // Если append равен true и нет грида, создаем новый\n  if (append && !bookGrid) {\n    var newGrid = document.createElement('div');\n    newGrid.classList.add('books-grid-first');\n    document.querySelector('.books-container').appendChild(newGrid);\n  }\n\n  // Если append равен true и грид все еще не определен, выходим из функции\n  if (append && !bookGrid) {\n    return;\n  }\n\n  // Если append равен true, добавляем новые книги, иначе очищаем грид\n  if (!append) {\n    bookGrid.innerHTML = '';\n  }\n  books.forEach(function (book) {\n    var bookElement = createBookElement(book);\n    bookGrid.appendChild(bookElement);\n  });\n}\n\n// Обработчик клика на категории\ndocument.querySelector('.main-list').addEventListener('click', function (event) {\n  if (event.target.tagName === 'A') {\n    var selectedCategory = event.target.textContent;\n    if (selectedCategory !== currentCategory) {\n      currentCategory = selectedCategory;\n      event.preventDefault();\n      document.querySelectorAll('.main-list a').forEach(function (link) {\n        return link.classList.remove('active');\n      });\n      event.target.classList.add('active');\n      // При смене категории сбрасываем счетчик\n      loadedBooksCount = 0;\n      loadBooksByCategory(currentCategory);\n    }\n  }\n});\n\n// Обработчик клика на кнопку \"Load more\"\ndocument.querySelector('.button2-settings').addEventListener('click', function () {\n  // Вызываем функцию загрузки книг с флагом append = true\n  loadBooksByCategory(currentCategory, true);\n});\n\n// Инициализация при загрузке страницы\ndocument.addEventListener('DOMContentLoaded', function () {\n  // Убираем изначальные книги из HTML\n  var initialBookGrids = document.querySelectorAll('.books-grid-first, .books-grid-second');\n  initialBookGrids.forEach(function (grid) {\n    return grid.innerHTML = '';\n  });\n\n  // Загружаем книги для начальной категории\n  loadBooksByCategory(currentCategory);\n});\n\n//# sourceURL=webpack://book-store/./main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./main.js"]();
/******/ 	
/******/ })()
;