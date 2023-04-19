const API_URL = 'http://localhost:1717';

const editBookForm = document.querySelector('.edit-book');

editBookForm.addEventListener('submit', async (event) => {
  event.preventDefault()

  const bookData = {
    name: document.querySelector('#name').value,
    author: document.querySelector('#author').value,
    publishYear: Number(document.querySelector('#publishYear').value),
    publishHouse: document.querySelector('#publishHouse').value,
    pagesNumber: Number(document.querySelector('#pagesNumber').value),
    genres: document.querySelector('#genres').value.split(','),
    originalLanguage: document.querySelector('#originalLanguage').value,
  };

  const bookId = new URLSearchParams(window.location.search).get('id');
  const response = await fetch(`${API_URL}/books/${bookId}`);
  const data = await response.json();
  
  const editResponse = await fetch(`${API_URL}/books/${bookId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bookData)
  });

  if (editResponse.ok) {
    window.location.href = `/detail.html?id=${bookId}`;
  } else {
    const error = await editResponse.json()
    console.error(error)
  }
});