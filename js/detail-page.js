import { getBook } from "./api.js"

const API_URL = 'http://localhost:1717'

async function getBooksItem(id) {
  const response = await fetch(`${API_URL}/books/detail/${id}`)
  const data = await response.json()
  return data
}

const createTableRow = (key, value) => {
  if (['id', 'name'].includes(key)) return

  const tr = document.createElement('tr')
  const td1 = document.createElement('td')
  const td2 = document.createElement('td')
  if (key == 'author') {
    td1.textContent = 'Автор'
    td2.textContent = value
  } else if (key == 'publishYear') {
    td1.textContent = 'Год издания'
    td2.textContent = value
  } else if (key == 'publishHouse') {
    td1.textContent = 'Издательство'
    td2.textContent = value
  } else if (key == 'pagesNumber') {
    td1.textContent = 'Количество страниц'
    td2.textContent = value
  } else if (key == 'genres') {
    td1.textContent = 'Жанры'
    td2.textContent = value
  } else if (key == 'originalLanguage') {
    td1.textContent = 'Язык оригинала'
    td2.textContent = value
  }

  tr.append(td1, td2)
  return tr
}

async function renderBooksItem() {
  const booksId = new URLSearchParams(window.location.search).get('id')
  const data = await getBooksItem(booksId)

  document.querySelector('.book-detail h1').textContent = data.name
  const tbody = document.querySelector('.book-detail__table tbody')
  const bookDetailLink = document.querySelector('#book-detail');
  console.log(bookDetailLink);
  bookDetailLink.setAttribute('href', '/edit.html?id=' + data.id);


  for (let key in data) {
    const tr = createTableRow(key, data[key])
    if (tr) {
      tbody.append(tr)
    }

  }
}

renderBooksItem()




