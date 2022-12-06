import {asyncReadFile} from '../_lib/helpers.js';

/**
 * Init js class.
 */
class index {

	/**
	 * Class setu-up.
	 */
	constructor( fileName = 'test.txt' ) {

		this.answer = 0;

		this.initialise( fileName );
	}

	async initialise( fileName ) {

		// Read file.
		this.dataArray = await asyncReadFile( fileName )
		this.dataArray = this.dataArray[0].split('');

		// Loop logic.
		this.loopItems();
		
		// Output.
		this.outputMyScore();
	}

	loopItems() {
		
		let atIndex = 0;

		// this.dataArray
		for (let index = 0; index < this.dataArray.length; index++) {
			const letter = this.dataArray[index];
			
			// 4, 8, 12, 16
			// r, r, w, c

			if ( index > 14 ) {

				const lastFourLetters = [
					this.dataArray[index - 13],
					this.dataArray[index - 12],
					this.dataArray[index - 11],
					this.dataArray[index - 10],
					this.dataArray[index - 9],
					this.dataArray[index - 8],
					this.dataArray[index -7],
					this.dataArray[index - 6],
					this.dataArray[index - 5],
					this.dataArray[index - 4],
					this.dataArray[index - 3],
					this.dataArray[index - 2],
					this.dataArray[index - 1],
					this.dataArray[index],
				];

				// First find the duplicates.
				const hasDuplicates = lastFourLetters.filter((item, i, ar) => ar.indexOf(item) === i);

				if ( 14 === hasDuplicates.length ) {

					atIndex = index + 1;
					break;
				}
			}
		}

		this.answer = atIndex;
	}

	uniq(a) {
		return Array.from(new Set(a));
	}

	outputMyScore() {
		console.log( `The answer is: ${this.answer}` );
	}
}

// Create a version of the class.
new index( 'test.txt' );
