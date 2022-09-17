const copy = document.querySelector(".copy");
const quote = document.querySelector(".quote");
const card = document.querySelector(".card-body");

const getQuote = (url) => {
  return fetch(url)
    .then((response) => response.json())
    .then((response) => response.quotes);
};

const showLoading = () => {
  quote.textContent = "";
  card.classList.add("placeholder-glow");
  quote.classList.add("placeholder");
  quote.classList.add("col-7");
};

const hideLoading = () => {
  card.classList.remove("placeholder-glow");
  quote.classList.remove("placeholder");
  quote.classList.remove("col-7");
};

const copyClipboard = () => {
  navigator.clipboard.writeText(quote.textContent);
  copy.classList.remove("bi-clipboard");
  copy.classList.add("bi-clipboard-check-fill");
};

const author = (nameAuthor) => {
  const span = document.createElement("span");
  span.classList.add("author");
  span.textContent = nameAuthor;
  quote.appendChild(span);
};

const refresh = async () => {
  copy.classList.remove("bi-clipboard-check-fill");
  copy.classList.add("bi-clipboard");
  try {
    showLoading();
    const quoteText = await getQuote("https://goquotes-api.herokuapp.com/api/v1/random?count=1");
    quote.textContent = quoteText[0].text;
    author(quoteText[0].author);
  } catch (err) {
    console.log(err);
  } finally {
    hideLoading();
  }
};
