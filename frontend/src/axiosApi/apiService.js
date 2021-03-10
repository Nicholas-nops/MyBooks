import axios from "axios";

const apiUrl = "http://localhost:3002";

async function insertBook(bookData) {
  const response = await axios.post(apiUrl + "/api/insert", bookData);
}
async function getBooks(bookFilter) {
  const response = await axios
    .get("http://localhost:3002/api/get")
    .then((res) => {
      return res.data.filter((data) => bookFilter === data.bookStatus);
    });
  return response.value;
}

export { insertBook, getBooks };
