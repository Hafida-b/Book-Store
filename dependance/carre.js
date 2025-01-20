function carre(x, suite) { // Afficher le carré de x
    console.log();
    console.log(`carre ${x}: J'ai recu x =`, x);
    const x2 = x * x;
    console.log(`carre ${x}: Je l'affiche :`, x2);
    console.log(`=== Le carré de ${x} est ${x2}`);
    suite(x2)
    }

function afficher_les_carres(...valeurs) {
    for (const v of valeurs) {
    console.log();
    console.log(`main: appel de carre(${v})`);
    function afficher(leCarre) {
        console.log(`main: valeur reçue :`, leCarre);
        }
    //carre(v); //juste pour afficher 
    setTimeout(carre, 0,v, afficher);
    //setTimeout(() => carre(v), 0); //ça fonctionne pareil 
    console.log(`main: après appel à carre(${v})`);

    }
    console.log('main : FIN.')
}
afficher_les_carres(2, 3)
