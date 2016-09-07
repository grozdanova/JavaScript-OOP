function solve() {
    var module = (function () {
function validateNameTitleAuthor(ime) {
    if (typeof ime !== 'string') {
        throw new Error('Must be a string!');
    }
    if (typeof ime === undefined) {
        throw new Error('Must be a some string!');
    }
    if (!ime) {
        throw new Error('It must be a not empty string!');
    }
    if (ime.length < 3 || ime.length > 25) {
        throw new Error('Strings must be between 3 and 25 characters!');
    }
}
function validateNumber(num) {
            if (isNaN(num)) {
            throw new Error('Must be a number!');
        }
}
function validateLength(len) {
            if (len <= 0) {
            throw new Error('Number must be greater than 0!');
        }
}
function validateImdbRating(num) {
            if (num <= 1 || num >= 5) {
            throw new Error('ImdbRating must be between 1 and 5!')
        }
}
function validateIfUndefined(val, name) {
        if (typeof val === undefined) {
            throw new Error(name + ' must be not a undefined!');
        }
}
function indexOfElementWithIdInCollection(collection, id) {
        var i, len;
        for (i = 0, len = collection.length; i < len; i++) {
            if (collection[i].id == id) {
                return i;
            }
        }

        return -1;
}
var playableId = 0;
class Playable{
    constructor(title, author){
        this._title = title;
        this._author = author;
        this._id = ++playableId;
    }
    //define properties
    get id(){
        return this._id;
    }
    get title(){
        validateNameTitleAuthor(this._title);
        return this._title;
    }
    set title(value){
        validateNameTitleAuthor(value);    
        this._title = value;
    }
    get author(){
        validateNameTitleAuthor(this._author);
        return this._author;
    }
    set author(value){
        validateNameTitleAuthor(value);
        this._author = value;
    }
    play() {
        return this.id + '. ' + this.title + ' - ' + this.author;
    }
}
class Audio extends Playable {
    constructor(title, author, length){
        super(title, author);
        this._length = length;
    }
    get length() {
        validateNumber(this._length);
        validateLength(this._length);
        return this._length;
    }
    set length(value){
        validateNumber(value);
        validateLength(this._length);
        this._length = value;
//tuk ne vikame id, zastoto za vseki playable si suzdava. Preizpolzvame go ot konstruktura my!
    }
    play() {
        return super.play() + ' - ' + this.length;    
    }
}
class Video extends Playable {
    constructor(title, author, imdbRating){
        super(title, author);
        this._imdbRating = imdbRating;
    }
    get imdbRating() {
        validateNumber(this._imdbRating);
        validateImdbRating(this._imdbRating);
        return this._imdbRating;
    }
    set imdbRating(value){
        validateNumber(this._imdbRating);
        validateImdbRating(this._imdbRating); 
        this._imdbRating = value; 
    }
    play() {
        return super.play() + ' - ' + this.imdbRating;
    }
}
var playlistId = 0;
class PlayList{
    constructor(name){
        this._name = name;
        this._id = ++playlistId;
        this._playables = [];
    }
    get name(){
        validateNameTitleAuthor(this._name);
        return this._name;
    }
    set name(value){
        validateNameTitleAuthor(value);
        this._name = value;
    }
    get id(){
        return this._id;
    }
    addPlayable(playable){
        validateIfUndefined(playable, 'PlayList addPlayable');
        validateIfUndefined(playable.id, 'PlayList id in addPlayable');
        this._playables.push(playable);
        return this;
    }
    getPlayableById(id){
        validateIfUndefined(id, 'PlayList id in getPlayableById');
        validateNumber(id);
        for (var i = 0, len = this._playables.length; i < len; i+=1){
            var current = this._playables[i];
            if (current.id === id) {
                return current;
            }   
        }
        return null;
    }

    removePlayable(id) {
        validateIfUndefined(id, 'PlayList id in removePlayableById');
        validateNumber(id);
        var foundIndex = indexOfElementWithIdInCollection(this._playables, id);
        if (foundIndex < 0) {
        throw new Error('Playable with id ' + id + ' was not found in playlist');
        }
        this._playables.splice(foundIndex, 1);
        return this;
    }

    listPlayables(page, size) {
        validateIfUndefined(page);
        validateIfUndefined(size);
        validateNumber(page);
        validateNumber(size);
        if (page < 0) {
            throw new Error('Page must be greater than 0!');
        }
        if (size <= 0) {
            throw new Error('Size must be equal or greater than 0!');
        }
        var maxPlayables = this._playables.length;
        if (page * size > maxPlayables) {
            throw new Error('Page and size must not be greater than playables!');
        }
        //sus slice gi kopirame v nov masiv
        return this._playables.slice().sort(function (first, second) {
          if (first.title < second.title) {
              return -1;
          }  else if (first.title > second.title) {
              return 1;
          }
          if (first.id < second.id) {
              return -1;
          }else if (first.id > second.id) {
              return 1;
          }else{
              return 0;
          }
        }).splice(page * size, size);
    }
}
var playerId = 0;
class Player{
    constructor(name){
        this._name = name;
        this._id = ++playerId;
        this._playlist = [];
    }
    get id(){
        return this._id;
    }
    get name(){
        validateNameTitleAuthor(this._name);
        return this._name;
    }
    set name(value){
        validateNameTitleAuthor(value);
        this._name = value;
    }
    addPlaylist(playlistToAdd){
        if (typeof playlistToAdd !== PlayList) {
            throw new Error('playlistToAdd must be a PlayList instance!');
        }
        this._playlist.push(playlistToAdd);
        return this;
    }
    getPlaylistById(id){
        validateIfUndefined(id, 'PlayList id in getPlaylistById must be not undefined!');
        validateNumber(id);
        for (var i = 0, len = this._playlist.length; i < len; i+=1){
            var current = this._playlist[i];
            if (current.id === id) {
                return current;
            }   
        }
        return null;
    }
    removePlaylist(id){
        validateIfUndefined(id, 'In player playList id in removePlaylist!');
        validateNumber(id);
        var foundIndex = indexOfElementWithIdInCollection(this._playlist, id);
        if (foundIndex < 0) {
        throw new Error('Player playlist with id ' + id + ' was not found!');
        }
        this._playlist.splice(foundIndex, 1);
        return this;
    }
    listPlaylists(page, size){
                validateIfUndefined(page);
        validateIfUndefined(size);
        validateNumber(page);
        validateNumber(size);
        if (page < 0) {
            throw new Error('Page must be greater than 0!');
        }
        if (size <= 0) {
            throw new Error('Size must be equal or greater than 0!');
        }
        var maxPlayables = this._playlist.length;
        if (page * size > maxPlayables) {
            throw new Error('Page and size must not be greater than playlist!');
        }
        return this._playlist.slice().sort(function (first, second) {
          if (first.title < second.title) {
              return -1;
          }  else if (first.title > second.title) {
              return 1;
          }
          if (first.id < second.id) {
              return -1;
          }else if (first.id > second.id) {
              return 1;
          }else{
              return 0;
          }
        }).splice(page * size, size);
    }
    contains(playable, playlist){
        validateIfUndefined(playable);
        validateIfUndefined(playlist);
        var playableId = validator.validateId(playable.id);
        var playlistId = validator.validateId(playlist.id);

        var playlist = this.getPlaylistById(playlistId);
        if (playlist == null) {
                return false;
        }
        var playable = playlist.getPlayableById(playableId);
        if (playable == null) {
                return false;
        }

        return true;
    }
    search(pattern){
    if (typeof pattern !== 'string') {
        throw new Error('Pattern must be a some string!');
    }
    return this._playlist.filter(function (playlist) {

        return playlist.listPlayables().some(function (playable) {
            return playable.title.toLowerCase().indexOf(pattern.toLowerCase()) > 0;
        });
    }).map(function (playlist) {
        return {
            id: playlist.id,
            name: playlist.name
        };
    });
    }
}
        return {
    getPlayer: function (name){
        return new Player(name);
    },
    getPlaylist: function(name){
        return new PlayList(name);
    },
    getAudio: function(title, author, length){
        return new Audio(title, author, length);
    },
    getVideo: function(title, author, imdbRating){
        return new Video(title, author, imdbRating);
    }
};
    }()); 
    return module;
}

//Revealing Module Pattern: Example - ot prezentaciqta
// var controls = (function () {
//   function formatResult(name, value) {
//     return name + ' says the result is ' + value;
//   }
//   class Calculator {
//     constructor (name) { /* init code */ },
//     add (x) { /* code to add */ },
//     subtract (x) { /* code to subtract */ },
//     showResult () { /* code to show result */ }
//   };

//   var getCalculator = (name) => new Calculator(name);
//   return { getCalculator };
// } ());

//module.exports = solve;