import {asyncReadFile} from '../_lib/helpers.js';

/**
 * Init js class.
 */
class index {

	/**
	 * Class setu-up.
	 */
	constructor( fileName = 'test.txt' ) {
		this.answer = '';

		this.initialise( fileName );
	}

	async initialise( fileName ) {

		// Read file.
		this.dataArray = await asyncReadFile( fileName )

		// Loop logic.
		this.loopItems();
		
		// Output.
		this.outputMyScore();
	}

	loopItems() {
		
	}

	outputMyScore() {
		console.log( `The answer is: ${this.answer}` );
	}
}

// Create a version of the class.
new index( 'test.txt' );
