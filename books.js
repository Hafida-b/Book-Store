'use strict';

// Quelques livres pour l'exemple...
const books = [
  {
    "title": "Unlocking Android",
    "isbn": "1933988673",
    "pageCount": 416,
    "publishedDate": "2009-04-01" ,
    "thumbnailUrl": "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/ableson.jpg",
    "shortDescription": "Unlocking Android: A Developer's Guide provides concise, hands-on instruction for the Android operating system and development tools. This book teaches important architectural concepts in a straightforward writing style and builds on this with practical and useful examples throughout.",
    "status": "PUBLISH",
    "authors": ["W. Frank Ableson", "Charlie Collins", "Robi Sen"],
    "categories": ["Open Source", "Mobile"]
  },
  {
    "title": "Android in Action, Second Edition",
    "isbn": "1935182722",
    "pageCount": 592,
    "publishedDate": "2011-01-14" ,
    "thumbnailUrl": "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/ableson2.jpg",
    "shortDescription": "Android in Action, Second Edition is a comprehensive tutorial for Android developers. Taking you far beyond \"Hello Android,\" this fast-paced book puts you in the driver's seat as you learn important architectural concepts and implementation strategies. You'll master the SDK, build WebKit apps using HTML 5, and even learn to extend or replace Android's built-in features by building useful and intriguing examples. ",
    "status": "PUBLISH",
    "authors": ["W. Frank Ableson", "Robi Sen"],
    "categories": ["Java"]
  },
  {
    "title": "Specification by Example",
    "isbn": "1617290084",
    "pageCount": 0,
    "publishedDate": "2011-06-03" ,
    "thumbnailUrl": "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/adzic.jpg",
    "status": "PUBLISH",
    "authors": ["Gojko Adzic"],
    "categories": ["Software Engineering"]
  },
  {
    "title": "Flex 3 in Action",
    "isbn": "1933988746",
    "pageCount": 576,
    "publishedDate": "2009-02-02" ,
    "thumbnailUrl": "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/ahmed.jpg",
    "longDescription": "New web applications require engaging user-friendly interfaces   and the cooler, the better. With Flex 3, web developers at any skill level can create high-quality, effective, and interactive Rich Internet Applications (RIAs) quickly and easily. Flex removes the complexity barrier from RIA development by offering sophisticated tools and a straightforward programming language so you can focus on what you want to do instead of how to do it. And now that the major components of Flex are free and open-source, the cost barrier is gone, as well!    Flex 3 in Action is an easy-to-follow, hands-on Flex tutorial. Chock-full of examples, this book goes beyond feature coverage and helps you put Flex to work in real day-to-day tasks. You'll quickly master the Flex API and learn to apply the techniques that make your Flex applications stand out from the crowd.    Interesting themes, styles, and skins  It's in there.  Working with databases  You got it.  Interactive forms and validation  You bet.  Charting techniques to help you visualize data  Bam!  The expert authors of Flex 3 in Action have one goal   to help you get down to business with Flex 3. Fast.    Many Flex books are overwhelming to new users   focusing on the complexities of the language and the super-specialized subjects in the Flex eco-system; Flex 3 in Action filters out the noise and dives into the core topics you need every day. Using numerous easy-to-understand examples, Flex 3 in Action gives you a strong foundation that you can build on as the complexity of your projects increases.",
    "status": "PUBLISH",
    "authors": ["Tariq Ahmed with Jon Hirschi", "Faisal Abid"],
    "categories": ["Internet"]
  }
]

function bookToDOM(book) {
	console.log(book);
	const fragment = document.createDocumentFragment();
	const div = document.createElement('div');
	div.appendChild(document.createTextNode(book.title));
	div.classList.add('title');
	fragment.appendChild(div)
	const dl = propertiesToDL(book);
	fragment.appendChild(dl);
	return fragment;
}

/** Produire un DOM pour représenter un tableau de livres,
 * ajoutés comme dernier de l'élément body.
 */
  function display(books) {
    console.info("Constuire le DOM...");
    //Créer un élément html 
    const ol = document.createElement('ol')
    document.body.appendChild(ol);

    for(const book of books) {
      const li = document.createElement('li');
      const h2 = document.createElement('h2');
      h2.textContent = book.title;
      li.setAttribute("id",book.isbn);
      ol.appendChild(li);
      li.appendChild(h2);

      const dl = document.createElement('dl');
      li.appendChild(dl);
      for (const [cle,valeur] of Object.entries(book)){
        const dt = document.createElement("dt");
        dt.append(cle);
        dt.className = cle; //attribut classe sera la valeur de la clé
        dl.appendChild(dt);
        
        const dd = document.createElement("dd");
        dd.append(valeur);
        dl.appendChild(dd);
      }
    }
  }




/** Récupérer une liste de livres depuis le document précédents.
  * Les livres n'auront que les champs : title, pageCount, categories et authors.
  * @return un tableau de livre, chaque livre a les attributs ci-dessus.
  */

function domBooksToJSON() {
  const tableau =[];
	const all_li = document.getElementsByTagName("li");
  for (const li of all_li) {
    console.log(li)
    const book = {};
    book.title = li.firstChild.wholeText;
    const all_dt = li.getElementsByTagName("dt");
    for (const dt of all_dt) {
      const cle = dt.innerText;
      const dd = dt.nextSibling
      const valeur= dd.innerText;
      book[cle] = valeur
    }
    tableau.push(book);
  }
 return tableau ;
}

/** Produit un élément table qui contient les informations sur books,
 * un tableau de books avec les attributs précisés.
 */
function booksToTable(books, attributs = ['title', 'pageCount', 'categories', 'authors']) {
	const table = document.createElement("Table");

  const thead = document.createElement("thead");
  table.appendChild(thead); 
  const tr = document.createElement("tr");
  thead.appendChild(tr);
  for (const cle of attributs) {
    const th = document.createElement("th");
    th.append(cle);
    tr.append(th);
  }


  const tbody = document.createElement("tbody");
  table.appendChild(tbody); 

  for (const book of books) {
    const tr = document.createElement("tr");
    tbody.appendChild(tr);

    for (const cle of attributs) {
      const td = document.createElement("td");
      td.innerText = book[cle];
      tr.appendChild(td);
    }

  }
    return table;
}
const all_short_description = document.getElementsByClassName('shortDescription');
function show_hide() {
  const cacher = document.getElementById('cacher');
  const afficher = document.getElementById('afficher');
  cacher.addEventListener('click',hide);
  afficher.addEventListener('click',show);
}

function hide(){
    for (const short_description of all_short_description) {
      short_description.classList.add("cache");
      short_description.nextSibling.classList.add("cache")
    }
}
  
function show() {
    for (const short_description of all_short_description) {
      short_description.classList.remove("cache");
      short_description.nextSibling.classList.remove("cache")
    }
}

function click_hide_show() {
  const all_h2 = document.getElementsByTagName('h2'); 
  for (const h2 of all_h2) {
    const dl = h2.nextSibling ;
    h2.addEventListener('dblclick', function() {
      dl.classList.toggle("cache");
    });
  }
}


window.addEventListener('load', () => {
	display(books);
	books.length = 0;
	console.log("books:", books);
	const booksFromDom = domBooksToJSON();
	console.log("booksFromDom:", booksFromDom);
	// Insérer dans body le résultat de booksToTable(booksFromDom)
  document.body.insertAdjacentElement("afterbegin" , booksToTable(booksFromDom));
  show_hide();
  click_hide_show();
});

