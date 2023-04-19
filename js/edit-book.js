const API_URL = "http://localhost:1717"
let link = document.createElement("a")
let ll = ""
const booksId = new URLSearchParams(window.location.search).get('id')
const inputs = document.querySelectorAll('input')
inputs.forEach((value) => {
  ll = value.value.length
  link.href = `http://127.0.0.1:5500/detail.html?id=${booksId}`

  const saveBtn = document.querySelector("#save-edit-btn")

  saveBtn.addEventListener("click", async () => {
    try {
      if (ll < 40) {
        const bookData = {
          name: document.querySelector("#name").value,
          author: document.querySelector("#author").value,
          publishYear: Number(document.querySelector("#publishYear").value),
          publishHouse: document.querySelector("#publishHouse").value,
          pagesNumber: Number(document.querySelector("#pagesNumber").value),
          genres: Array(document.querySelector("#genres").value),
          originalLanguage: document.querySelector("#originalLanguage").value,
        }
        const updateResponse = await fetch(`${API_URL}/books/update/${booksId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookData),
        })

        console.log(updateResponse);

        if (!updateResponse.ok) {
          throw new Error(`Failed to update book: ${updateResponse.status}`)
        }

        const updatedBook = await updateResponse.json();
        console.log("Updated book:", updatedBook)

        link.click()
      }

    } catch (error) {
      console.error(error)
    }
  })
})