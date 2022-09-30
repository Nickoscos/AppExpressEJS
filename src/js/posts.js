const EventEmitter = require('events');
let fs = require('fs');
const event = new EventEmitter;


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

    let id = null;
    
    if (data.love!==undefined){ //Détection d'un appui sur love it
        id=data.love
        listPosts[id].loveit++;
    }  
    if (data.dontlove!==undefined) { //Détection d'un appui sur don't love it
        id=data.dontlove
        listPosts[id].loveit--;
    }

    
}

//Fonction ajout post
function addPost(data){

    let date = new Date();

    //Rangement des paramètres saisies dans l'objet à ajouter
    let post = new Post(
        data.titre,
        data.content,
        date
    );
    
    //Ajout de l'objet dans la liste
    listPosts.push(post);

}

//Fonction appréciation posts
function deletePost(data){

    let id = null

    if (data.delete!==undefined){ //Détection d'un appui sur love it
        id=data.delete;
        console.log(id);
        listPosts.splice(id,1);
    } 

    
}

//Fonction mise à jour post
function updatePost(data, id){

    let date = new Date();

    //Rangement des paramètres saisies dans l'objet à ajouter
    let post = new Post(
        data.titre,
        data.content,
        date
    );
    
    //Modification de l'objet dans la liste
    listPosts[id]=post;

}

module.exports = {listPosts, lovePost, addPost, deletePost, updatePost}