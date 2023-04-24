import { editBook, getBook } from "./api.js"

const API_URL = 'http://localhost:1717'

async function getBooksItem(id) {
  const response = await fetch(`${API_URL}/books/detail/${id}`)
  const data = await response.json()
  return data
}

async function deleteBook(id) {
  const response = await fetch(`${API_URL}/books/delete/${id}`, {
    method: 'DELETE'
  })
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

  const deleteButton = document.querySelector('.delete-btn')
  deleteButton.addEventListener('click', async () => {
    await deleteBook(data.id)
    window.location.href = '/'
  })
  document.querySelector('.book-detail').appendChild(deleteButton)

  for (let key in data) {
    const tr = createTableRow(key, data[key])
    if (tr) {
      tbody.append(tr)
    }

  }
}

renderBooksItem()


let like = null

  if (data.isFavorite) {
    like = `
    <svg class="svg" width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M19.3762 2.5401C18.5386 0.825205 16.1258 -0.577889 13.3191 0.239024C11.9779 0.625491 10.8078 1.45428 9.99986 2.58999C9.19192 1.45428 8.02178 0.625491 6.68062 0.239024C3.86771 -0.565417 1.46111 0.825205 0.623483 2.5401C-0.55169 4.94095 -0.0641182 7.64113 2.0737 10.5658C3.74894 12.8544 6.14304 15.1742 9.61856 17.8681C9.72839 17.9536 9.86369 18 10.003 18C10.1423 18 10.2776 17.9536 10.3874 17.8681C13.8567 15.1804 16.257 12.8793 17.9323 10.5658C20.0638 7.64113 20.5514 4.94095 19.3762 2.5401Z"
        fill="red" 
      />
    </svg>`
  }
  else{
    like = `
    <svg class="svg" width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M19.3762 2.5401C18.5386 0.825205 16.1258 -0.577889 13.3191 0.239024C11.9779 0.625491 10.8078 1.45428 9.99986 2.58999C9.19192 1.45428 8.02178 0.625491 6.68062 0.239024C3.86771 -0.565417 1.46111 0.825205 0.623483 2.5401C-0.55169 4.94095 -0.0641182 7.64113 2.0737 10.5658C3.74894 12.8544 6.14304 15.1742 9.61856 17.8681C9.72839 17.9536 9.86369 18 10.003 18C10.1423 18 10.2776 17.9536 10.3874 17.8681C13.8567 15.1804 16.257 12.8793 17.9323 10.5658C20.0638 7.64113 20.5514 4.94095 19.3762 2.5401Z"
        fill="#B1B1B1" 
      />
    </svg>`
  }

  const likeBtn = document.querySelector('.like-btn')

  likeBtn.addEventListener('click', () => {
    let favoritValue = null

    if (data.isFavorite === true) favoritValue = false
    else favoritValue = true


    let newData = {
      isFavorite: favoritValue
    }
    editBook(newData, data.id)
    location.reload()
  })

