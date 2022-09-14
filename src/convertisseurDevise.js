console.log("conversion de devise");

//vérifie que le document soit prêt
let stateCheck = setInterval(() => 
{
    if(document.readyState ==='complete')       // attendre que le document soit COMPLET
    {
        document.querySelector('#convDeviseForm').addEventListener('submit', conversionDevise);
        clearInterval(stateCheck);
    }
}, 100);

function conversionDevise(taux){

}
