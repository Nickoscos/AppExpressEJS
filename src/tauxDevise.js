let fs = require('fs');

let taux = [];

//Fonction de lecture JSON STREAM READABLE
function streamReadFile(pathF){
    taux.splice(0, taux.length);
    const stream = fs.createReadStream(pathF); //Lecture du contenu du JSON
    stream.setEncoding('utf8'); //On encode pour ne pas avoir les octets bruts
    stream.on("data", (data)=> {
        taux.push(JSON.parse(data)); //On range le contenu dans taux
        console.log(taux);
    });

}


module.exports = {streamReadFile, taux};
