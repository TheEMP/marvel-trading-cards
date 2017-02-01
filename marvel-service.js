function MarvelService() {
  var key = '?apikey=e44062bbc76b37176b08325d5265a0f3';
  var baseUrl = 'http://gateway.marvel.com/v1/public/'

  var marvelCharacters = [];
  var myCharacters = [];

  var idLookUp = {}
  this.getMarvelCharacters = function () {
    //what should this function return
    return marvelCharacters.filter((v) => {
      if (idLookUp[v.id]) {
        return false
      }
      return true
    })
  }

  this.getMyCharacters = function () {
    //what should this function return
    return myCharacters.slice(0, myCharacters.length)
  }


  this.addToMyCharacters = function (id) {
    //in order to add a character to your list you will first need to find 
    //the character by its id in the marvelCharacters array
    if (idLookUp[id]) {
      return
    }
    for (var char of marvelCharacters) {
      if (char.id == id) {
        console.log(char)
        idLookUp[id] = true
        myCharacters.push(char)
        break
      }
    }
  }

  this.removeMyCharacter = function (id) {
    //you need to find the character that you want to remove by its id
    //and remove it.
    //debugger
    for (var i in myCharacters) {
      var char = myCharacters[i]
      if (char.id == id) {
        myCharacters.splice(i, 1)
        delete idLookUp[id]
        break
      }
    }
  }


  this.getCharacters = function (callWhenDone) {
    var data = localStorage.getItem('MarvelData')
    if (data) {
      marvelCharacters = JSON.parse(data);
      return callWhenDone(marvelCharacters)
    }
    $.get(baseUrl + 'characters' + key, function (response) {
      localStorage.setItem('MarvelData', JSON.stringify(response.data.results))
      marvelCharacters = response.data.results;
      callWhenDone(marvelCharacters)
    })
  }


}