
function f1() { console.log("Je suis f1."); }
function f2(x) { console.log(`Je suis f2, x = ${x}.`); }
function main() {
    console.log("main: début");
        setTimeout(f1, 1000);
        setTimeout(f2, 500, 5);
        setTimeout(f2, 0, 7);
    console.log("main: fin");
}
main(); //while(true);