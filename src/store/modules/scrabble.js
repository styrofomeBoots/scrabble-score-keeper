// TODO: switch to axios instead of jquery

// ==============================
// ---------- IMPORTS -----------
// ==============================

import $ from 'jquery';

// ===========================
// ---------- STATE ----------
// ===========================

const state = {
  // PLAYER LIST
  //   array of player names as strings
  //   ex: ['Tom', 'Jerry']
  playerList: [],

  // PLAYER SCORES
  //   object of players and their score
  //   ex: { Tom: { totalWords: 1, totalScore: 6, highestScore: 6, averageScore: 6, longestWord: 3, averageWord: 3 } }
  playerScores: {},

  // WORD ID
  //   identification number to be assigned to a word that is played
  //   increments +1
  wordId: 0,

  // WORD LIST
  //   obect holding the player and the
  //   ex: { TOM: [1, 3, 7], JERRY: [2, 4, 6] }
  wordList: {},

  // WORDS
  //   object to hold letters and their multiplier
  //     multis: letter multipliers, wordMulti: word multiplier
  //     the multis object holds the index value and the letter as the key
  //       helps in working with listing order and more than one of the same letter
  //   ex: { 1: { word: 'CAT', multis: { 0-C: 1, 1-A: 2, 2-T: 1 }, wordMulti: 1, score: 6 } }
  words: {},

  // SCRABBLE LETTERS
  //   all letters along with their value and appearance count
  scrabbleLetters: {
    A: { value: 1, count: 9 },
    B: { value: 3, count: 2 },
    C: { value: 3, count: 2 },
    D: { value: 2, count: 4 },
    E: { value: 1, count: 12 },
    F: { value: 4, count: 2 },
    G: { value: 2, count: 3 },
    H: { value: 4, count: 2 },
    I: { value: 1, count: 9 },
    J: { value: 8, count: 1 },
    K: { value: 5, count: 1 },
    L: { value: 1, count: 4 },
    M: { value: 3, count: 2 },
    N: { value: 1, count: 6 },
    O: { value: 1, count: 8 },
    P: { value: 3, count: 2 },
    Q: { value: 10, count: 1 },
    R: { value: 1, count: 6 },
    S: { value: 1, count: 4 },
    T: { value: 1, count: 6 },
    U: { value: 1, count: 4 },
    V: { value: 4, count: 2 },
    W: { value: 4, count: 2 },
    X: { value: 8, count: 1 },
    Y: { value: 4, count: 2 },
    Z: { value: 10, count: 1 },
    BLANK: { value: 0, count: 2 }
  }
};



// =========================================
// ---------- STATE FUNCTIONALITY ----------
// =========================================

// ========== GETTERS ==========
const getters = {
  allPlayers: state => state.playerList,
  playerWords: state => state.wordList,
  playerScore: state => state.playerScores,
  words: state => state.words,
  letters: state => state.scrabbleLetters,
};

// ========== ACTIONS ==========
const actions = {
  // ADD PLAYER
  //   adds a player to the game board
  addPlayer({ commit }, playerName) {
    commit('createPlayer', playerName);
  },

  // ADD WORD
  //   checks to see if the word is allowed in scrabble
  //   if the word is allowed, creates the object for it
  //   and commits it to the wordList object and returns true
  //   if it isn't allowed, returns false
  //    the returned boolean is for front end display logic use
  async addWord({ commit }, data) {
    let isWord = await checkWord(data.word);
    if (isWord) {
      let currentId = state.wordId;                                            // the word's id
      let multis = {};                                                         // letter multiplier object
      let wordMulti = 1;                                                       // word multiplier (defaults to 1)
      let score = 0;                                                           // score integer
      Array.from(data.word).forEach((el, index) => {                           // loop over the letters in the word
        multis[`${index}-${el}`] = 1;                                          // multis object is given the index and letter along with a default multi of 1
        score += state.scrabbleLetters[el].value;                              // looks up the value for the letter and adds it to the score
      });
      let wordScore = {                                                        // creates an object with necessary info to add to the player
        word: data.word,
        multis,
        wordMulti,
        score,
      };
      commit('addWord', { player: data.player, currentId, wordScore });        // adds word to word object and player word list
      commit('incrementWordId');                                               // increments the word id by 1
      return true
    } else {
      return false
    }
  }
};

// ========== MUTATIONS ===========
const mutations = {
  // CREATE PLAYER
  //   adds a player name to the player list
  //   adds a playerScore object for the player
  //   adds a wordList object for the player
  createPlayer: (state, player) => {
    state.playerList.push(player);
    state.playerScores[player] = {
      totalWords: 0, totalScore: 0, highestScore: 0,
      averageScore: 0, longestWord: 0, averageWord: 0
    };
    state.wordList[player] = [];
  },

  // INCREMENT WORD ID
  //   the word id is a counter that gives a played word a unique id
  //   this should be called whenever a word is played 
  incrementWordId: (state) => state.wordId += 1,

  // ADD WORD
  //   adds a word ID to the players word list
  //   adds the word score object to the words object
  addWord: (state, data) => {
    state.wordList[data.player].push(data.currentId);
    state.words[data.currentId] = data.wordScore;
  }
};

// ======================================
// ---------- HELPER FUNCTIONS ----------
// ======================================

// makes a get request to scrabblewordfinder.org with the submitted word
// the request returns a JSON object of the pages html
// there is a div in the html that is green if the word is accepted and red if not
// based on the color being red or green the function returns true or false
const checkWord = (word) => {
  console.log(word);
  return new Promise(resolve => {
    $.getJSON('http://www.whateverorigin.org/get?url='
      + encodeURIComponent(`https://scrabblewordfinder.org/dictionary/${word}`)
      + '&callback=?',
      function (data) {
        let checkPortion = data.contents.split(`check_dict_page`)[1];  // split the html near the pertinent div and take 2nd half
        let necessaryPortion = checkPortion.substring(0, 90)           // starts a formatting chain for a small portion of the half
          .split(' ').join('')                                         // remove blank spaces - probably not necessary
          .split(/\r?\n/).join('');                                    // remove line breaks  - probably not necessary
        if (necessaryPortion.includes('green')) {
          resolve(true)
        } else {
          resolve(false)
        }
      }
    )
  })
};

// export the state to be used in the store
export default {
  state,
  getters,
  actions,
  mutations
}