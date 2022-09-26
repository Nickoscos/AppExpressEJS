const EventEmitter = require('events');
let fs = require('fs');
const event = new EventEmitter;


date = new Date();

let listPosts = [
    {
        titre : "test 1",
        content: "Ceci est le contenu 1",
        date: date.toUTCString(),
        loveit: 0,
    },
    {
        titre : "test 2",
        content: "Ceci est le contenu 2",
        date: date.toUTCString(),
        loveit: 0,
    }
]

//Fonction appréciation posts
function lovePost(data){

    //Récupération des paramètres URL
    let paramsString = String(data) //transforme les data URL en string pour la class URLSearchParams
    let searchParams = new URLSearchParams(paramsString); //Déclare la classe searchParams qui contient les input du formulaire

    let id = null

    if (searchParams.get("love")!==null){ //Détection d'un appui sur love it
        id=searchParams.get("love");
        listPosts[id].loveit++;
    } else if (searchParams.get("dontlove")!==null) { //Détection d'un appui sur don't love it
        id=searchParams.get("dontlove");
        listPosts[id].loveit--;
    }

    
}

module.exports = {listPosts, lovePost}