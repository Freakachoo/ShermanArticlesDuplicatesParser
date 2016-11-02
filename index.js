/**
 * Parser for articles was given by '' Chrome Plugin
 *
 * To Run it - install node js, and just run in terminal in the folder: node index.js
 */

const fs = require('fs')

let contents = fs.readFileSync("./lib_files/source.json")
let jsonContent = JSON.parse(contents)
let ouputFilePath = 'articles.txt'

// All not duplicated by fields
let fields = {
	// ISSN: [],
	title: []
}

// Duplicates by fields
let duplicates = {
	// ISSN: [],
	title: []
}

// Filtered instances of articles
let originals = []


console.log('Hey! Let\'s go! Make this shit!')
console.log('Total amount of articles: ', jsonContent.length);

// Let's filter out duplicates by title + first-page
// Sometimes there is page like 234-986, so compare only by first one (234 for the example).
for(let i = 0; i < jsonContent.length; i++) {
	let val = jsonContent[i].title.toLowerCase() + (typeof jsonContent[i].page != 'undefined' ? jsonContent[i].page.split('-')[0] : '')
	if (fields.title.find((el) => el == val)) {
		duplicates.title.push(val)
	} else {
		fields.title.push(val)
		originals.push(jsonContent[i])
	}
}

// console.log(duplicates)
console.log('Amount of duplicates: ', duplicates.title.length);
console.log('Amount of articles without duplicates: ', jsonContent.length - duplicates.title.length);

fs.unlinkSync(ouputFilePath)
console.log('Start write to output file.')
for (let i = 0; i < originals.length; i++) {
	let authors = typeof originals[i].author != 'undefined' ? originals[i].author.map( (author, index) => author.literal ? author.literal : `${author.given} ${author.family}` ) : []
	let article = `Title: ${i+1} -- ${originals[i].title}\nAbstract: ${originals[i].abstract}\nAuthors: ${authors.join(', ')}`
	fs.appendFileSync(ouputFilePath, article + "\n\n\n\n");
}
console.log('Output file is ready.', ouputFilePath)


// Ouput file format
// # + title
// Authors split by ,
// Abstract
//
//
//
//
