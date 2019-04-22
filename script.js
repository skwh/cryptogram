/* script.js */
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
    let numGivens = Math.ceil(Math.random() * 10);
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
  baseUrl: "https://talaikis.com/api/quotes/random/",
  getQuote: function() {
    return fetch(this.baseUrl).then(response => response.json());
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
