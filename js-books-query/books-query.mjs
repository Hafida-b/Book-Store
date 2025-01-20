import fs from 'fs';

const file = 'books.json';
    // @see https://github.com/bvaughn/infinite-list-reflow-examples/blob/master/books.json

const books = JSON.parse(fs.readFileSync(file, 'utf8'));

// console.log(books);

const puce = "\n - ";

console.log("Nb de livres = " + books.length);
console.log("Nb de livres de plus de 800 pages = "
    + books
	.filter( book => book.pageCount >= 800)
	.length);

console.log("Titre des livres de plus de 800 pages = " + puce
    + books
	.filter( book => book.pageCount >= 800)
	.map( book => book.title)
	.join(puce));

console.log("Nb de livres de 0 pages = "
    + books
	.filter( book => book.pageCount === 0)
	.length);

const internetBooks = books
    .filter( book =>
	book
	    .categories
	    .map( c => c.toLowerCase() )
	    .includes("internet")
    );

console.log("Nb de livres de la catégorie Internet = "
    + internetBooks.length);

console.log("Total des pages des livres de la catégorie Internet = "
    + internetBooks
	.map( book => book.pageCount)
	.reduce( (pp, book) => book + pp, 0));

console.log("Autre version : "
    + internetBooks.reduce( (total, book) => total + book.pageCount, 0))
console.log("Encore une version : "
    + internetBooks.reduce( (total, {pageCount: pp}) => total + pp, 0))
console.log("Et une version de plus : "
    + internetBooks
	.map( book => book.pageCount)
	.reduce( (total, pc) => total + pc))

const lesCategoriesFilter = books
	.map( book => book.categories )
	// .flat() // à la place du reduce qui suit...
	.reduce( (aplati, categories) => aplati.concat(categories), [] )
	.filter( c => c.length > 0 )
	.map( c => c.toLowerCase() )
	.filter( (c, i, toutes) => ! toutes.slice(0, i).includes(c) )
	;

console.log("Nb de catégories utilisées (filter) = "
    + lesCategoriesFilter.length);

const lesCategoriesReduce = books
	.map( book => book.categories )
	// .flat() // à la place du reduce qui suit...
	.reduce( (aplati, categories) => aplati.concat(categories), [] )
	.filter( c => c.length > 0 )
	.map( c => c.toLowerCase() )
	.reduce(
	    (uniques, category) => 
		uniques.includes(category)
		? uniques
		: uniques.concat(category)
	    ,
	    []
	)
	;

console.log("Nb de catégories utilisées (reduce) = "
    + lesCategoriesReduce.length);


function ajouterTous(tab, tous) {
    // on pourrait faire un reduce !
    for (const x of tous) {
	if (x && ! tab.includes(x)) {
	// if (x && ! tab.map( x => x.toLowerCase() ).includes(x.toLowerCase())) {
	    // console.log("Ajout de " + x);
	    tab.push(x);
	}
    }
    return tab;
}

const lesCategoriesDirect =
    books
	.reduce( (lesCategories, book) =>
		ajouterTous(lesCategories,
		    book
			.categories
			.map( c => c.toLowerCase())
		), []
	);

console.log("Nb de catégories utilisées (direct) = "
    + lesCategoriesDirect.length);

const lesCategoriesDirectOnly =
    books
	.reduce(
	    (lesCategories, book) =>
		// lesCategories augmentées de celles de book
		book
		    .categories
		    .map( c => c.toLowerCase())
		    .reduce(
			(toutes, c) =>
			    c.length == 0 || toutes.includes(c)
			    ? toutes
			    : toutes.concat(c)
			,
			lesCategories
		    )
	    ,
	    []
	);

console.log("Nb de catégories utilisées (directOnly) = "
    + lesCategoriesDirectOnly.length);


function ajouterAllSet(ensemble, tous) {
    tous
	.filter(c => c) 	// Supprimer les chaînes vides.
	.forEach( c => ensemble.add(c) );
    return ensemble;
}

const lesCategoriesAutre2 =
    books.reduce(
	(lesCategories, {categories}) =>
	    ajouterAllSet(lesCategories, categories.map( c => c.toLowerCase()))
	,
	new Set()
    );

console.log("Nb de catégories utilisées = "
    + lesCategoriesAutre2.size);


const lesCategoriesEncore = books.reduce(
    (lesCategories, {categories}) =>
	categories
	    .map( c => c.toLowerCase())
	    .reduce(
		(toutes, c) => c ? toutes.add(c) : toutes,
		lesCategories
	    ),
    new Set()
);

console.log("Nb de catégories utilisées = "
    + lesCategoriesEncore.size);


const motTitre = "JavaScript";
const internetTitles = books
	.filter(book => book.title.toLowerCase().includes(motTitre.toLowerCase()))
	.map(book => book.title);

console.log(`Titres contenant ${motTitre} :` + internetTitles.map(t => "\n - " + t).join(""))
// console.log("Les catégories utilisées = " + puce + lesCategories.join(puce));


function allAuthors(someBooks) {
   return  someBooks
    .map(book => book.authors)
    .flat()
    .filter(c => c.length > 0)
    .reduce(
	(auteurs, auteur) =>
	    auteurs.map(a => a.toLowerCase()).includes(auteur.toLowerCase())
	    ? auteurs
	    : auteurs.concat(auteur),
	[]
    );
}

const auteurs = allAuthors(books)

console.log("Auteurs :", auteurs);

const auteurLivres =
	auteurs.map( auteur =>
	    ({
		author: auteur,
		"books": 
		    books.filter(b => b
			.authors
			.map(a => a.toLowerCase())
			.includes(auteur.toLowerCase())
		    )
	    })
	);

console.log("auteurLivres : ", auteurLivres);

const authorBooksCount = auteurLivres
	    .map( ({author, books}) => ({author: author, booksCount: books.length }))
	    .filter( ({booksCount}) => booksCount >= 5);

console.log("Auteurs de plus de 3 livres", authorBooksCount)

const internetAuthors = allAuthors(internetBooks);
console.log("Nombre d'auteurs de la catégorie Internet :", internetAuthors.length, internetAuthors );


console.log("Nombre d'auteurs : ", auteurs.length);

fs.writeFileSync('internet--books.json', JSON.stringify(internetBooks, null, 4));

