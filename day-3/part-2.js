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

		let groups = [];
		let groupCount = 0;
		let groupBadges =[];

		for (let index = 0; index < this.rucksackArray.length; index++) {
			const rucksack = this.rucksackArray[index];

			const bag = rucksack.split( '' );

			// If undefined set empty array.
			if ( undefined === groups[groupCount] ) {
				groups[groupCount] = [];
			}
	
			// Push bag into group.
			groups[groupCount].push( bag );		

			// Every three groups find the duplicates & labels them.
			if ( 0 === (index + 1) % 3 ) {

				// Find the duplicate letter between three arrays.
				const badge = this.uniq( groups[groupCount][0].filter(value => groups[groupCount][1].includes(value) && groups[groupCount][2].includes(value)) );

				// Find duplicates in this group & append the badge.
				groupBadges.push( badge[0] );

				// Increment the group number.
				groupCount++;
			}
		}

		return this.fetchMatchingItemScore( groupBadges );
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
