let _nbChrono = 0;
export default function chrono(duree, delai, runEachDelai) {
    _nbChrono++;
    runEachDelai = runEachDelai || 'Chrono ' + _nbChrono;
    if (typeof runEachDelai === 'string') {
        const name = runEachDelai;
        runEachDelai = (x, d) => console.log(name + ' ' + x);
    }
    function chaqueDelai() {
        const now = new Date().getTime();
        const ellapsed = now - start;
        runEachDelai(ellapsed, duree);
    }
    const start = new Date().getTime();
    const id = setInterval(chaqueDelai, delai)
    setTimeout(() => clearInterval(id), duree);
}
chrono(1000, 300)
chrono(1000, 200, (x, d) => console.log('Mon chrono : ' + (100 * x / d).toFixed(2)))
chrono(1000, 500, (x, d) => console.log('Secondes : ' + (x / 1000).toFixed(2))) 
