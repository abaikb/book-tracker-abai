const API_URL = "http://localhost:1717"

let dd = document.createElement("a")
console.log(dd);
dd.href = "http://localhost:1717/index.html"
const link = document.querySelector("a")
const saveBtn = document.querySelector("#save-create-btn")

saveBtn.addEventListener("click", async () => {
  try {
    const bookData = {
      name: document.querySelector("#name").value,
      author: document.querySelector("#author").value,
      publishYear: Number(document.querySelector("#publishYear").value),
      publishHouse: document.querySelector("#publishHouse").value,
      pagesNumber: Number(document.querySelector("#pagesNumber").value),
      genres: Array(document.querySelector("#genres").value),
      originalLanguage: document.querySelector("#originalLanguage").value,
    }

    const createResponse = await fetch(`${API_URL}/books/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    })

    console.log(createResponse);

    if (!createResponse.ok) {
      throw new Error(`Failed to create book: ${createResponse.status}`)
    }

    const createdBook = await createResponse.json();
    console.log("Created book:", createdBook)

    link.click() 

  } catch (error) {
    console.error(error)
  }
})