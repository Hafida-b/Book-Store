let _nbChrono = 0;
export default function chrono(duree, delai, runEachDelai) {
    _nbChrono++;
    runEachDelai = runEachDelai || 'Chrono ' + _nbChrono;
    if (typeof runEachDelai === 'string') {
        const name = runEachDelai;
        runEachDelai = (x, d) => console.log(name + ' ' + x);
    }
    const start = new Date().getTime();
    let count = 0; // ellapsed delai count
    let ellapsed;
    do {
        const now = new Date().getTime();
        ellapsed = now - start;
        if (ellapsed / delai >= count) {
            runEachDelai(ellapsed, duree);
            count++;
        }
    }
    while (ellapsed < duree);
}
chrono(1000, 300)
chrono(1000, 200, (x, d) => console.log('Mon chrono : ' + (100 * x / d).toFixed(2)))
chrono(1000, 500, (x, d) => console.log('Secondes : ' + (x / 1000).toFixed(2)))
