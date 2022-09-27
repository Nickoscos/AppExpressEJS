const EventEmitter = require('events');
let fs = require('fs');
const event = new EventEmitter;


// let listPosts = [
//     {
//         titre : "test 1",
//         content: "Ceci est le contenu 1",
//         date: date.toUTCString(),
//         loveit: 0,
//     },
//     {
//         titre : "test 2",
//         content: "Ceci est le contenu 2",
//         date: date.toUTCString(),
//         loveit: 0,
//     }
// ]

let listPosts = []

class Post {
    constructor(titre, content, date) {
        this.titre = titre;
        this.content = content;
        this.date = date.toUTCString();
        this.loveit = 0;
    }
}

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

//Fonction ajout post
function addPost(data){

    //Récupération des paramètres URL
    let paramsString = String(data) //transforme les data URL en string pour la class URLSearchParams
    let searchParams = new URLSearchParams(paramsString); //Déclare la classe searchParams qui contient les input du formulaire

    let date = new Date();

    //Rangement des paramètres saisies dans l'objet à ajouter
    let post = new Post(
        searchParams.get("titre"),
        searchParams.get("content"),
        date
    );
    
    //Ajout de l'objet dans la liste
    listPosts.push(post);

}

//Fonction appréciation posts
function deletePost(data){

    //Récupération des paramètres URL
    let paramsString = String(data) //transforme les data URL en string pour la class URLSearchParams
    let searchParams = new URLSearchParams(paramsString); //Déclare la classe searchParams qui contient les input du formulaire

    let id = null
    console.log(searchParams);
    // console.log(searchParams.get("delete"));

    if (searchParams.get("delete")!==null){ //Détection d'un appui sur love it
        id=searchParams.get("delete");
        console.log(id);
        listPosts.splice(id);
    } 

    
}

module.exports = {listPosts, lovePost, addPost, deletePost}