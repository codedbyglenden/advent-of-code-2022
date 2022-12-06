import {asyncReadFile} from '../_lib/helpers.js';

/**
 * Init js class.
 */
class index {

	/**
	 * Class setu-up.
	 */
	constructor( fileName = 'test.txt' ) {

		this.score = 0;

		this.initialise( fileName );
	}

	async initialise( fileName ) {

		// Read file.
		this.dataArray = await asyncReadFile( fileName );

		// Loop logic.
		this.loopItems();
		
		// Output.
		this.outputMyScore();
	}

	loopItems() {

		let crossOverCount = 0;
		
		for (let index = 0; index < this.dataArray.length; index++) {

			// Example: 94-97,31-95
			const line = this.dataArray[index];
			
			// Elf pairs.
			const elfPair = line.split( ',' );

			// Elf sectors.
			let pairSectors = {
				start: [],
				end: [],
			};

			elfPair.forEach(elf => {
				const sector = elf.split( '-' );

				pairSectors.start.push( parseInt( sector[0] ) );
				pairSectors.end.push( parseInt( sector[1] ) );
			});

			if ( ! ( pairSectors.end[0] < pairSectors.start[1] || pairSectors.end[1] < pairSectors.start[0] ) ) {
				crossOverCount++;
			}
		}

		this.score = crossOverCount;
	}

	outputMyScore() {
		console.log( `The score is: ${this.score}` );
	}
}

// Create a version of the class.
new index( 'test.txt' );
