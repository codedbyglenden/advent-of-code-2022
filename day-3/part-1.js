import {asyncReadFile} from '../_lib/helpers.js';

/**
 * Init js class.
 */
class index {

	/**
	 * Class setu-up.
	 */
	constructor( fileName = 'test.txt' ) {
		this.rucksackArray = [];
		this.totalScore = 0;

		// Letters array
		this.letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

		this.initialise( fileName );
	}

	async initialise( fileName ) {
		this.rucksackArray = await asyncReadFile( fileName );
		this.totalScore = this.loopItems();
		this.outputMyScore();
	}

	loopItems() {
		let totalScore = 0;

		for (let index = 0; index < this.rucksackArray.length; index++) {
			const rucksack = this.rucksackArray[index];

			// Half is left & right.
			const halfLength = Math.ceil( rucksack.length / 2 );    

			// Split each item in the array into an array item.
			const items = rucksack.split('');
			
			const leftItems = items.slice( 0, halfLength);
			const rightItems = items.slice( halfLength );

			// Return duplicate items in both arrays.
			const matchingItems = this.uniq( leftItems.filter(item => rightItems.includes(item)) );

			totalScore = totalScore + this.fetchMatchingItemScore( matchingItems );
		}

		return totalScore;
	}

	fetchMatchingItemScore( matchingLetters ) {
		
		let total = 0;

		matchingLetters.forEach(letter => {
			const indexOf = this.letters.indexOf( letter );

			if ( indexOf > -1 ) {
				total = total + (indexOf + 1);
			}
		});

		return total;
	}

	outputMyScore() {
		console.log( `The total score of duplicates is ${this.totalScore}` );
	}

	uniq(a) {
		return Array.from(new Set(a));
	}
}

// Create a version of the class.
new index( 'test.txt' );
