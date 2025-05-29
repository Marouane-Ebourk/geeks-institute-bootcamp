const quotes = [
    {
        id: 0,
        author: "Albert Einstein",
        quote: "Life is like riding a bicycle. To keep your balance you must keep moving.",
        likes: 0,
    },
    {
        id: 1,
        author: "Oscar Wilde",
        quote: "Be yourself; everyone else is already taken.",
        likes: 0,
    },
    {
        id: 2,
        author: "Maya Angelou",
        quote: "You will face many defeats in life, but never let yourself be defeated.",
        likes: 0,
    },
    {
        id: 3,
        author: "Monty Python",
        quote: "for life is quite absurd, and death is the final word. You must always face the curtain with a bow. Forget about your sin, give the audience a grin, enjoy it, it's your last chance anyhow.",
        likes: 0,
    },
];

const quoteSection = document.getElementById("quote-section");
const generateQuoteBtn = document.getElementById("generate-quote-btn");
const toggleFormBtn = document.getElementById("toggle-form-btn");
const addQuoteForm = document.getElementById("add-quote-form");
const quoteInput = document.getElementById("quote-input");
const authorInput = document.getElementById("author-input");

// stat buttons
const statButtonsContainer = document.querySelector(".stats-buttons");
const charsInclBtn = document.getElementById("chars-incl-btn");
const charsExclBtn = document.getElementById("chars-excl-btn");
const wordsBtn = document.getElementById("words-btn");
const likeBtn = document.getElementById("like-btn");

const filterForm = document.getElementById("filter-form");
const filterAuthorInput = document.getElementById("filter-author-input");
const filterNav = document.getElementById("filter-nav");
const prevFilterBtn = document.getElementById("prev-filter-btn");
const nextFilterBtn = document.getElementById("next-filter-btn");

let prevQuoteId = null;
let filteredQuotes = [];
let filteredIndex = 0;

function renderQuote(quoteObj) {
    quoteSection.innerHTML = "";
    const quoteParagraph = document.createElement("p");
    quoteParagraph.textContent = quoteObj.quote;

    const authorSpan = document.createElement("span");
    authorSpan.textContent = quoteObj.author;

    quoteSection.appendChild(quoteParagraph);
    quoteSection.appendChild(authorSpan);

    // Like count
    const likeCount = document.createElement("div");
    likeCount.id = "like-count";
    likeCount.textContent = `Likes: ${quoteObj.likes}`;
    quoteSection.appendChild(likeCount);
}

function renderFilteredQuote() {
    if (filteredQuotes.length === 0) {
        quoteSection.innerHTML = "<p>No quotes found for this author.</p>";
        filterNav.style.display = "none";
        return;
    }
    renderQuote(filteredQuotes[filteredIndex]);
    filterNav.style.display = filteredQuotes.length > 1 ? "flex" : "none";
}

generateQuoteBtn.onclick = () => {
    statButtonsContainer.classList.add("show-buttons");
    while (true) {
        const randomId = Math.floor(Math.random() * quotes.length);

        if (
            prevQuoteId === null ||
            (prevQuoteId != null && randomId != prevQuoteId)
        ) {
            prevQuoteId = randomId;
            renderQuote(quotes[randomId]);
            break;
        }
    }
};

// Stats buttons logic
function getCurrentQuote() {
    if (prevQuoteId === null) return null;
    return quotes[prevQuoteId];
}

charsInclBtn.onclick = function () {
    const q = getCurrentQuote();
    if (q) alert(`Characters (with spaces): ${q.quote.length}`);
};

charsExclBtn.onclick = function () {
    const q = getCurrentQuote();
    if (q)
        alert(`Characters (no spaces): ${q.quote.replace(/\s/g, "").length}`);
};

wordsBtn.onclick = function () {
    const q = getCurrentQuote();
    if (q) alert(`Words: ${q.quote.trim().split(/\s+/).length}`);
};
likeBtn.onclick = function () {
    const q = getCurrentQuote();
    if (q) {
        q.likes++;
        renderQuote(q);
    }
};

toggleFormBtn.onclick = function () {
    addQuoteForm.classList.toggle("show-form");
};

addQuoteForm.onsubmit = function (e) {
    e.preventDefault();
    const newQuote = {
        id: quotes.length,
        author: authorInput.value,
        quote: quoteInput.value,
        likes: 0,
    };
    quotes.push(newQuote);
    // clear inputs
    quoteInput.value = "";
    authorInput.value = "";
};

filterForm.onsubmit = function (e) {
    e.preventDefault();
    statButtonsContainer.classList.add("show-buttons");
    const author = filterAuthorInput.value.trim().toLowerCase();
    filteredQuotes = quotes.filter((q) => q.author.toLowerCase() === author);
    filteredIndex = 0;
    renderFilteredQuote();
};

prevFilterBtn.onclick = function () {
    if (filteredQuotes.length > 0) {
        filteredIndex =
            (filteredIndex - 1 + filteredQuotes.length) % filteredQuotes.length;
        renderFilteredQuote();
    }
};

nextFilterBtn.onclick = function () {
    if (filteredQuotes.length > 0) {
        filteredIndex = (filteredIndex + 1) % filteredQuotes.length;
        renderFilteredQuote();
    }
};
