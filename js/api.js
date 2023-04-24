const API_URL = 'http://localhost:1717'

const createApiRoute = (route) => {
  return `${API_URL}${route}`
}

export const getBooks = async () => {
  const response = await fetch(createApiRoute('/books'))
  const books = await response.json()
  return books
}

export const getBook = async (id) => {
  const response = await fetch(createApiRoute(`/books/${id}`))
  const book = await response.json()
  return book
}

export const editBook = async (newData, id) => {
  const response = await fetch(createApiRoute(`/books/update/${id}`), {
    method: 'PUT',
    body: JSON.stringify(newData),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.json()
}
