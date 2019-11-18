/* script.js */
// Quotes from http://goodreads.com/quotes
const QUOTES = [
  {
    quote: 'The way to get things done is not to mind who gets the credit for doing them.',
    author: 'Benjamit Jowett'
  },
  {
    quote: 'It is better to rust out than wear out.',
    author: 'Edwin Markham'
  },
  {
    quote: 'There must be quite a few things that a hot bath won\'t cure, but I don\'t know many of them.',
    author: 'Sylvia Plath'
  },
  {
    quote: 'I\'m selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can\'t handle me at my worst, then you sure as hell don\'t deserve me at my best.',
    author: 'Marilyn Monroe'
  },
  {
    quote: 'Two things are infinite: the universe and human stupidity; and I\'m not sure about the universe.',
    author: 'Albert Einstein',
  },
  {
    quote: 'Be who you are and say what you feel, because those who mind don\'t matter, and those who matter don\'t mind.',
    author: 'Bernard M. Baruch'
  },
  {
    quote: 'You know you\'re in love when you can\'t fall asleep because reality is finally better than your dreams.',
    author: 'Dr. Seuss'
  },
  {
    quote: 'In three words I can sum up everything I\'ve learned about life: it goes on.',
    author: 'Robert Frost'
  },
  {
    quote: 'I\'ve learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.',
    author: 'Maya Angelou'
  },
  {
    quote: 'Darkness cannot drive out darkness: only light can do that. Hate cannot drive out hate: only love can do that.',
    author: 'Martin Luther King Jr.',
  },
  {
    quote: 'To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.',
    author: 'Ralph Waldo Emerson'
  },
  {
    quote: 'I am so clever that sometimes I don\'t understand a single word of what I am saying.',
    author: 'Oscar Wilde'
  },
  {
    quote: 'Live as if you were to die tomorrow. Learn as if you were to live forever.',
    author: 'Mahatma Gandhi'
  },
  {
    quote: 'Twenty years from now you will be more disappointed by the things that you didn\'t do than by the ones you did do. So throw off the bowlines. Sail away from the safe harbor. Catch the trade winds in your sails. Explore. Dream. Discover.',
    author: 'H. Jackson Brown Jr.'
  },
  {
    quote: 'It is better to be hated for what you are than to be loved for what you are not.',
    author: 'Andre Gide'
  },
  {
    quote: 'All that is gold does not glitter, Not all those who wander are lost; The old that is strong does not wither, Deep roots are not reached by the frost.',
    author: 'J.R.R. Tolkien'
  },
  {
    quote: 'The person, be it gentleman or lady, who has not pleasure in a good novel, must be intolerably stupid.',
    author: 'Jane Austen'
  },
  {
    quote: 'It does not do to dwell on dreams and forget to live.',
    author: 'J.K. Rowling'
  },
  {
    quote: 'As he read, I fell in love with the way you fall asleep: slowly, and then all at once.',
    author: 'John Green'
  },
  {
    quote: 'Good friends, good books, and a sleepy conscience: this is the ideal life.',
    author: 'Mark Twain'
  },
  {
    quote: 'It is better to remain silent at the risk of being thought a fool, than to talk and remove all doubt of it.',
    author: 'Maurice Switzer'
  },
  {
    quote: 'The fool doth think he is wise, but the wise man knows himself to be a fool.',
    author: 'William Shakespeare'
  },
  {
    quote: 'We are all in the gutter, but some of us are looking at the stars.',
    author: 'Oscar Wilde'
  },
  {
    quote: 'Fairy tales are more than true: not because they tell us that dragons exist, but because they tell us that dragons can be beaten.',
    author: 'Neil Gaiman'
  },
  {
    quote: 'I have not failed. I\'ve just found 10,000 ways that won\'t work.',
    author: 'Thomas Edison'
  },
  {
    quote: 'It is not a lack of love, but a lack of friendship that makes unhappy marriages.',
    author: 'Friedrich Nietzsche'
  },
  {
    quote: 'If you don\'t stand for something you will fall for anything.',
    author: 'Gordon A. Eadie'
  },
  {
    quote: 'Outside of a dog, a book is man\'s best friend. Inside of a dog it\'s too dark to read.',
    author: 'Groucho Marx'
  }
];


Array.prototype.contains = function(obj) {
  for (var i=0;i<this.length;i++) {
    if (this[i] === obj)
      return true;
  }
  return false;
}

String.prototype.insertAt = function(index, string) {
  let substr1 = this.substring(0, index);
  let substr2 = this.substring(index, this.length);
  let str = substr1 + string + substr2;
  return str;
}

String.prototype.toCharCodeArray = function() {
  let ary = [];
  for (let i=0;i<this.length;i++) {
    ary[i] = this.charCodeAt(i);
  }
  return ary;
}

String.prototype.replaceCharCode = function(searchCode, replaceCode) {
  let codeAry = this.toCharCodeArray();
  for (let i=0;i<codeAry.length;i++) {
    if (codeAry[i] == searchCode) {
      codeAry[i] = replaceCode;
    }
  }
  return codeAry;
}

function stringFromCodeArray(codeArray) {
  let str = "";
  for (let i=0;i<codeArray.length;i++) {
    str += String.fromCharCode(codeArray[i]);
  }
  return str;
}

let crypto = {
  symbolsRegex: /[\W|\d]/g,
  generateCipher: function() {
    let usedIndicies = [];
    let cipher = [];
    for (let i=0;i<26;i++) {
      let randomIndex = Math.floor((Math.random() * 26));
      while (usedIndicies.contains(randomIndex))
        randomIndex = Math.floor((Math.random() * 26));
      usedIndicies.push(randomIndex);
      cipher[randomIndex] = String.fromCharCode(i+97);
    }
    return cipher;
  },
  encode: function(plaintext, cipher) {
    let ciphertext = "";
    plaintext = plaintext.toLowerCase();
    for (let i=0;i<plaintext.length;i++) {
      ciphertext += this.encodeLetter(plaintext.charAt(i), cipher);
    }
    return ciphertext;
  },
  encodeLetter: function(letterPlaintext, cipher) {
    return cipher[letterPlaintext.charAt(0).charCodeAt(0)-97];
  },
  decode: function(ciphertext, cipher) {
    let plaintext = "";
    ciphertext = ciphertext.toLowerCase();
    for (let i=0;i<ciphertext.length;i++) {
      plaintext += this.decodeLetter(ciphertext.charAt(i), cipher);
    }
    return plaintext;
  },
  decodeLetter: function(letterCiphertext, cipher) {
    return String.fromCharCode(cipher.indexOf(letterCiphertext.charAt(0))+97);
  },
  encodeWithSymbols: function(plaintext, cipher) {
    let symbolsDict = this.createSymbolsDict(plaintext);
    let processedText = this.createProcessedText(plaintext, symbolsDict);
    let encodedText = this.encode(processedText, cipher);
    encodedText = this.createFinalText(encodedText, symbolsDict);
    return encodedText;
  },
  createSymbolsDict: function(text) {
    let matches = [];
    let match = [];
    while ((match = this.symbolsRegex.exec(text)) !== null) {
      delete match["input"];
      matches.push(match);
    }
    return matches;
  },
  createProcessedText: function(text, symbolsDict) {
    let processedText = text;
    for (let i=0;i<symbolsDict.length;i++) {
      processedText = processedText.replace(symbolsDict[i][0], "");
    }
    return processedText;
  },
  createFinalText: function(text, symbolsDict) {
    let finalText = text;
    for (let i=0;i<symbolsDict.length;i++) {
      finalText = finalText.insertAt(symbolsDict[i]["index"], symbolsDict[i][0]);
    }
    return finalText;
  }
}

let game = {
  quote:"Glory is fleeting, but obscurity is forever.",
  attrib:"Napoleon Bonaparte (1769-1821)",
  cipher: [],
  currentChar: '',
  givenChars: [],
  setup: function() {
    this.nextQuote();
    if (!storage.checkKey('instructions')) {
      game.toggleInstructions();
      storage.setKey('instructions');
    }
  },
  nextQuote: function() {
    game.cipher = crypto.generateCipher();
    network.getQuote().then(response => {
      game.quote = response.quote;
      game.attrib = response.author;
    }).then(function() {
      interface.unmarkCorrect();
      interface.clearQuote();
      game.encodedQuote = crypto.encodeWithSymbols(game.quote, game.cipher).toUpperCase();
      game.displayQuote(game.encodedQuote, game.attrib);
      game.makeGivens();
      game.showGivens();
      game.attachHandlers();
      game.currentChar = '';
    });
  },
  resetQuote: function() {
    interface.unmarkCorrect();
    interface.clearQuote();
    this.encodedQuote = crypto.encodeWithSymbols(this.quote, this.cipher).toUpperCase();
    this.displayQuote(this.encodedQuote, this.attrib);
    this.attachHandlers();
    this.showGivens();
    this.currentChar = '';
  },
  hint: function() {
    if (this.currentChar != '')
      this.hintLetter(this.currentChar.toLowerCase());
  },
  hintLetter: function(cipherchar) {
    let plaintextChar = crypto.decodeLetter(cipherchar, this.cipher);
    this.makeGuess(cipherchar, plaintextChar, true);
  },
  giveLetter: function(cipherchar) {
    let plaintextChar = crypto.decodeLetter(cipherchar, this.cipher);
    this.makeGuess(cipherchar, plaintextChar, false, true);
  },
  makeGivens: function() {
    this.givenChars = [];
    let numGivens = Math.floor(Math.random() * 7) + 1;
    for (let i=0;i<numGivens;i++) {
      let randChar = String.fromCharCode(Math.ceil(Math.random() * 26)+96);
      if (!this.givenChars.contains(randChar)) {
        this.givenChars.push(randChar);
      }
    }
  },
  showGivens: function() {
    for (let i=0;i<this.givenChars.length;i++) {
      this.giveLetter(this.givenChars[i]);
    }
  },
  displayQuote: function(quote, attribution) {
    let words = quote.split(" ");
    let quotebox = document.getElementsByTagName('blockquote')[0];
    let attribox = document.getElementsByTagName('cite')[0];
    for (let i=0;i<words.length;i++) {
      let word = words[i];
      let wordElement = interface.createWordWrapper();
      let characters = word.split("");
      for (let j=0;j<characters.length;j++) {
        let char = characters[j];
        let characterElement;
        if (/[\W|\d]/.test(char)) {
          characterElement = interface.createSymbolElement(char);
        } else {
          characterElement = interface.createLetterElement(char);
        }
        wordElement.appendChild(characterElement);
      }
      //create an extra space character because we split on the spaces
      let spaceElement = interface.createSymbolElement(' ');
      wordElement.appendChild(spaceElement);
      quotebox.appendChild(wordElement);
    }
    attribox.textContent = attribution;
  },
  attachHandlers: function() {
    let letters = document.getElementsByClassName('letter');
    for (let i=0;i<letters.length;i++) {
      letters[i].addEventListener('click', function(e) {
        e.target.childNodes[1].focus();
        interface.clearSelectedLetters();
        this.classList.add('selected');
        let cipherchar = this.getAttribute('cipherchar');
        interface.showSelectedLetters(cipherchar);
        game.currentChar = cipherchar;
      });
      document.onkeyup = function(e) {
        if ((e.keyCode > 64 && e.keyCode < 91) && game.currentChar != '') {
          game.makeGuess(game.currentChar, e.key);
        } else if (e.keyCode == 8 && game.currentChar != '') {
          interface.clearGuess(game.currentChar);
        }
      }
      let letterInputs = document.getElementsByClassName('letter-input');
      // for (let i=0;i<letterInputs.length;i++) {
      //   letterInputs[i].addEventListener('keyup', function(e) {
      //     if ((e.keyCode > 64 && e.keyCode < 91) && game.currentChar != '') {
      //       game.makeGuess(game.currentChar, e.key);
      //       this.blur();
      //     } else if (e.keyCode == 8 && game.currentChar != '') {
      //       interface.clearGuess(game.currentChar);
      //     }
      //   })
      // }
    }
  },
  makeGuess: function(cipherchar, guess, hinted, given) {
    interface.showGuess(cipherchar, guess, hinted, given);
    interface.clearSelectedLetters();
    game.currentChar = '';
    setTimeout(game.checkSolution, 300);
  },
  checkSolution: function() {
    let solution = game.quote.toUpperCase();
    let chars = document.getElementsByClassName('character');
    let str = "";
    for (let i=0;i<chars.length;i++) {
      str += chars[i].textContent;
    }
    str = stringFromCodeArray(str.replaceCharCode(160, 32)).trim();
    if (solution.localeCompare(str) == 0) {
      alert("Correct!");
      interface.clearLetterStyles();
      interface.markCorrect();
      setTimeout(game.nextQuote, 1000);
    }
  },
  toggleInstructions: function() {
    document.getElementsByTagName('aside')[0].classList.toggle('hidden');
    document.getElementsByTagName('shadow')[0].classList.toggle('hidden');
  }
}

let interface = {
  createLetterElement: function(char) {
    let elm = this.createCharacterWrapper();
    let input = document.createElement('input');
    input.classList.add('offscreen');
    input.classList.add('letter-input');
    elm.classList.add('letter');
    elm.setAttribute('cipherchar', char);
    elm.innerHTML = "&nbsp;";
    elm.appendChild(input);
    return elm;
  },
  createSymbolElement: function(char) {
    let elm = this.createCharacterWrapper();
    elm.classList.add('symbol');
    if (char.charCodeAt(0) == 32)
      elm.innerHTML = "&nbsp;"
    else
      elm.innerText = char;
    return elm;
  },
  createCharacterWrapper: function() {
    let element = document.createElement('crypto-char');
    element.classList.add("character");
    return element;
  },
  createWordWrapper: function() {
    let element = document.createElement('crypto-word');
    return element;
  },
  showSelectedLetters: function(cipherchar) {
    let siblings = document.querySelectorAll('[cipherchar=' + cipherchar + ']');
    for (let j=0;j<siblings.length;j++) {
      siblings[j].classList.add('selected');
    }
  },
  clearSelectedLetters: function() {
    let selectedLetters = document.getElementsByClassName('selected');
    while (selectedLetters.length != 0) {
      selectedLetters[0].classList.remove('selected');
    }
  },
  showGuess: function(cipherchar, guesschar, hinted, given) {
    let siblings = document.querySelectorAll('[cipherchar='+cipherchar.toUpperCase()+']');
    for (let i=0;i<siblings.length;i++) {
      siblings[i].childNodes[0].textContent = guesschar.toUpperCase();
      if (hinted)
        siblings[i].classList.add('hinted');
      else if (given)
        siblings[i].classList.add('given');
    }
  },
  clearGuess: function(guesschar) {
    let guessCharElements = document.querySelectorAll('[cipherchar='+guesschar.toUpperCase()+']');
    for (let i=0;i<guessCharElements.length;i++) {
      guessCharElements[i].replaceWith(interface.createLetterElement(guesschar));
    }
  },
  clearQuote: function() {
    document.getElementsByTagName('blockquote')[0].innerHTML = "";
  },
  clearLetterStyles: function() {
    let hinted = document.getElementsByClassName('hinted');
    let given = document.getElementsByClassName('given');
    while (hinted.length != 0)
      hinted[0].classList.remove('hinted');
    while (given.length != 0)
      given[0].classList.remove('given');
  },
  markCorrect: function() {
    document.getElementsByTagName('blockquote')[0].classList.add('correct');
  },
  unmarkCorrect: function() {
    document.getElementsByTagName('blockquote')[0].classList.remove('correct');
  }
}

let network = {
  /* This api is no longer active. Modified to use the "quotes" array at the top
   * of this file. */
  //baseUrl: "https://talaikis.com/api/quotes/random/",
  getQuote: function() {
    //return fetch(this.baseUrl).then(response => response.json());
    return new Promise(resolve => {
      resolve(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
    });
  },
}

let storage = {
  checkKey: function(key) {
    if (localStorage.getItem(key) != null)
      return true;
    return false;
  },
  setKey: function(key) {
    localStorage.setItem(key, '1');
  }
}

window.onload = function(e) {
  game.setup();
}
