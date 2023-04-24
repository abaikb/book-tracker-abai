import { createEl } from './utils.js'
import { likeSvg, deleteSvg } from './svg-icons.js'
import { editBook, getBooks } from './api.js'

const API_URL = "http://localhost:1717"

export const renderBookItem = (data) => {

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


   

  const container = createEl({ tag: 'div', className: 'book' })
  const bookName = createEl({ tag: 'h2', text: data.name })
  const bookAuthor = createEl({ tag: 'p', text: data.author })
  const detailLink = createEl({ tag: 'a', className: 'detail-link', href: `/detail.html?id=${data.id}`, text: 'Подробнее...' })
  const likeBtn = createEl({ tag: 'button', className: 'like-btn icon-btn', innerHTML: like })
  const deleteBtn = createEl({ tag: 'button', className: 'delete-btn icon-btn', innerHTML: deleteSvg })
  container.append(bookName, bookAuthor, detailLink, likeBtn, deleteBtn)

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

  return container
}


const renderLoader = (parent) => {
  const loader = createEl({
    tag: 'div',
    className: 'loader',
    text: 'Загрузка...'
  })
  parent.append(loader)
}

const renderError = (parent) => {
  const error = createEl({
    tag: 'div',
    className: 'error',
    text: 'Произошла ошибка'
  })
  parent.append(error)
}

const removeLoader = () => {
  document.querySelector('.loader').remove()
}

const renderBooks = async () => {
  const container = document.querySelector('.catalog')
  renderLoader(container)



  try {
    const books = await getBooks()
    books.forEach((book) => {
      const bookElement = renderBookItem(book)
      container.append(bookElement)

      const deleteBtn = bookElement.querySelector('.delete-btn')
      deleteBtn.addEventListener('click', async () => {
          alert('Удалить книгу?')
          await deleteBook(book.id)
          window.location.href = '/'
      })
      
    })
  }
  catch {
    renderError(container)
  }
  finally {
    removeLoader()
  }
}

renderBooks()

async function deleteBook(id) {
  const response = await fetch(`${API_URL}/books/delete/${id}`, {
    method: 'DELETE'
  })
  const data = await response.json()
  return data
}
