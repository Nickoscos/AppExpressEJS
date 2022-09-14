let fs = require('fs');

//Fonction de lecture JSON STREAM READABLE
function streamReadFile(pathF){
    const stream = fs.createReadStream(pathF); //Lecture du contenu du JSON
    stream.setEncoding('utf8'); //On encode pour ne pas avoir les octets bruts
    stream.on("data", (data)=> {
        taux = JSON.parse(data); //On range le contenu dans taux
        console.log(taux);
    });
}

module.exports = {streamReadFile};