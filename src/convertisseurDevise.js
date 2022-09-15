console.log("conversion de devise");

function changeDevise(data, body){
    body += data
    console.log('Partial body: ' + body)
}

module.exports = { changeDevise };