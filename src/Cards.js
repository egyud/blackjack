import spadePic from './images/spades.png';
import clubPic from './images/clubs.png';
import heartPic from './images/heart.png';
import diamondPic from './images/diamonds.png';

//This file contains a shuffle algorithm, as well as the code to create a deck of playing cards;

const shuffle = (arr) => {
  let len = arr.length,
    temp, rand;

  //While there are still elements to shuffle
  while (len) {
    //Pick a random remaining element
    rand = Math.floor(Math.random() * len--);

    //Swap random element with the current element
    temp = arr[len];
    arr[len] = arr[rand];
    arr[rand] = temp;
  }
  return arr;
}


class Card {
  constructor(type, value) {
    this.type = type;
    this.value = value;
  }
}

class Heart extends Card {
  constructor(type, value) {
    super(type, value);
    this.suit = 'heart';
    this.img = heartPic;
  }
}

class Spade extends Card {
  constructor(type, value) {
    super(type, value);
    this.suit = 'spade';
    this.img = spadePic;
  }
}

class Club extends Card {
  constructor(type, value) {
    super(type, value);
    this.suit = 'club';
    this.img = clubPic;
  }
}

class Diamond extends Card {
  constructor(type, value) {
    super(type, value);
    this.suit = 'diamond';
    this.img = diamondPic;
  }
}

let cardDeck = [];
for (let i = 1; i <= 13; i++) {
  if (i === 1) {
    cardDeck.push(new Heart('A', 11), new Diamond('A', 11), new Spade('A', 11), new Club('A', 11));
  } else if (i > 1 && i <= 10) {
    cardDeck.push(new Heart(i.toString(), i), new Diamond(i.toString(), i), new Spade(i.toString(), i), new Club(i.toString(), i));
  } else if (i === 11) {
    cardDeck.push(new Heart('J', 10), new Diamond('J', 10), new Spade('J', 10), new Club('J', 10));
  } else if (i === 12) {
    cardDeck.push(new Heart('Q', 10), new Diamond('Q', 10), new Spade('Q', 10), new Club('Q', 10));
  } else if (i === 13) {
    cardDeck.push(new Heart('K', 10), new Diamond('K', 10), new Spade('K', 10), new Club('K', 10));
  }
}

export {
  shuffle,
  cardDeck
};
