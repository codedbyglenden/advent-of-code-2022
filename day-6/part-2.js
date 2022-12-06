import {asyncReadFile} from '../_lib/helpers.js';

/**
 * Init js class.
 */
class index {

	/**
	 * Class setu-up.
	 */
	constructor( fileName = 'test.txt' ) {

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
		
		// this.dataArray
	}

	outputMyScore() {
		console.log( `` );
	}
}

// Create a version of the class.
new index( 'test.txt' );
