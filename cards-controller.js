function CardsController() {


  var dataStore = new MarvelService()


  dataStore.getCharacters(ready)

  function ready(data) {

    draw(data, [])

  }
  this.onAdd = function (e) {
    //this function will take the player that was clicked and add them to your team through the dataStore.
    var id = e.id
    console.log(id)
    dataStore.addToMyCharacters(id)
    draw(dataStore.getMarvelCharacters(), dataStore.getMyCharacters())
  }

  this.onRemove = function (e) {
    //this will remove the character from your team
    var id = e.id
    dataStore.removeMyCharacter(id)
    draw(dataStore.getMarvelCharacters(), dataStore.getMyCharacters())
  }


    function draw(marvelList, myList) {
      //target is the id of the element where the list will be rendered
      var marvelElem = document.getElementById('marvel-characters')
      var myElem = document.getElementById('my-characters')
      marvelElem.innerHTML = ''
      myElem.innerHTML = ''

      var marvelTemplate = ''
      var myTemplate = ''

      for (var i in marvelList) {
        var character = marvelList[i];
       // console.log(character);
        marvelTemplate += `
      <div class="card">
        <img src="${character.thumbnail.path}.${character.thumbnail.extension}" width="100">
        <h3>${character.name}</h3>
        <div>
          <button class="btn-success" id="${character.id}" onClick="cardsCtrl.onAdd(this)">Add to Team</button>
        </div>
      <div>
      `
      }
      for (var i in myList) {
        var character = myList[i];
        console.log(character);
        myTemplate += `
      <div class="card">
        <img src="${character.thumbnail.path}.${character.thumbnail.extension}" width="100">
        <h3>${character.name}</h3>
        <div>
          <button class="btn-danger" id="${character.id}" onClick="cardsCtrl.onRemove(this)">DESTROY FOREVER</button>
        </div>
      <div>
      `
      }

      marvelElem.innerHTML = marvelTemplate
      myElem.innerHTML = myTemplate;

    }

  }