let books = [];

fetch("books.json")
  .then((response) => response.json())
  .then((data) => {
    books = data;
    displayBooks(books);
  })
  .catch((error) => console.error("Error fetching books:", error));

function displayBooks(booksToDisplay) {
  const container = document.getElementById("booksContainer");
  container.innerHTML = "";

  booksToDisplay.forEach((book) => {
    const bookCard = `
          <div class="col-md-4 col-lg-3">
            <div class="book-card">
              <img src="${book.imageLink}" alt="${
      book.title
    }" class="book-image">
              <div class="book-body">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">By ${book.author}</p>
                <div class="book-meta">
                  <span>${book.country}</span>
                  <span>${
                    book.year > 0 ? book.year : Math.abs(book.year) + " BCE"
                  }</span>
                </div>
                <div class="book-meta">
                  <span>${book.pages} pages</span>
                  <span>${book.language}</span>
                </div>
                <a href="${book.link.trim()}" target="_blank" class="book-link">Learn More</a>
              </div>
            </div>
          </div>
        `;
    container.innerHTML += bookCard;
  });
}

displayBooks(books);

$(".search-input").on("input", function () {
  const searchTerm = $(this).val().toLowerCase();
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm) ||
      book.country.toLowerCase().includes(searchTerm)
  );
  displayBooks(filteredBooks);
});

$(".filter-btn").click(function () {
  $(".filter-btn").removeClass("active");
  $(this).addClass("active");

  const filter = $(this).text();
  let filteredBooks = [];

  if (filter === "All") {
    filteredBooks = books;
  } else if (filter === "19th Century") {
    filteredBooks = books.filter(
      (book) => book.year >= 1800 && book.year < 1900
    );
  } else if (filter === "20th Century") {
    filteredBooks = books.filter(
      (book) => book.year >= 1900 && book.year < 2000
    );
  } else if (filter === "Ancient") {
    filteredBooks = books.filter((book) => book.year < 0);
  } else if (filter === "European") {
    filteredBooks = books.filter(
      (book) =>
        book.country.includes("Kingdom") ||
        book.country.includes("Denmark") ||
        book.country.includes("Italy") ||
        book.country.includes("France") ||
        book.country.includes("Ireland") ||
        book.country.includes("Iceland")
    );
  } else if (filter === "Asian") {
    filteredBooks = books.filter(
      (book) =>
        book.country.includes("India") ||
        book.country.includes("Iran") ||
        book.country.includes("Iraq") ||
        book.country.includes("Tajikistan")
    );
  } else if (filter === "African") {
    filteredBooks = books.filter(
      (book) =>
        book.country.includes("Nigeria") || book.country.includes("Egypt")
    );
  }

  displayBooks(filteredBooks);
});

function copyApiUrl() {
  const url = document.getElementById("apiUrl").textContent;
  navigator.clipboard.writeText(url);

  const toast = document.createElement("div");
  toast.className = "toast-alert";
  toast.textContent = "API endpoint copied to clipboard!";
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "1";
  }, 100);

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 500);
  }, 3000);
}

const style = document.createElement("style");
style.textContent = `
      .toast-alert {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #0061ff;
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        opacity: 0;
        transition: opacity 0.5s ease;
        z-index: 1000;
      }
    `;
document.head.appendChild(style);

$(document).ready(function () {
  $(".nav-link").hover(
    function () {
      $(this).css("text-shadow", "0 0 15px #ff6ec4");
    },
    function () {
      $(this).css("text-shadow", "none");
    }
  );
});
