const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');



let apiQuotes = [] ;
// Show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//hide loading
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// SHOW new quotes 

function newQuote(){
    loading();
    // Pick a random quote from apiQuotes 
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    if(!quote.author){
        authorText.textContent = 'Unknown author';

    }else{
        authorText.textContent = quote.author;
    }
    // check the quote length to determine styling
    if(quote.text.length > 50){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    complete();
}



// Get Quotes From API

async function getQuotes() {
    loading();
    const apiURL ='https://type.fit/api/quotes';

    try {
        const request = await fetch(apiURL);
        apiQuotes = await request.json();
        console.log(apiQuotes);
        newQuote();   
 
    } catch (error) {
        // catch error here

    } 
}

// Tweet Quote 
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl,'_blank');
}


newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);


getQuotes();