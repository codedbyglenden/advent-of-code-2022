import {asyncReadFile} from '../_lib/helpers.js';

/**
 * Init js class.
 */
class index {

	/**
	 * Class setu-up.
	 */
	constructor() {

		// Winning sequences.
			// Rock beats Scissors (a beats z)
			// Paper beats Rock (b beats x)
			// Scissors beats paper (c beats y)

		// Draw both are the same
			// A and X
			// B and Y
			// C and Z
		
		// Loss
			// Scissors vs rock (c and x)
			// Rock vs paper (y and b)
			// Paper vs Scissors (z and c)

		this.myFinalScore = 0;
		this.dataArray = [];

		this.letters = {
			A: 1, // Rock
			B: 2, // Paper
			C: 3, // Scissors

			X: 1, // Rock
			Y: 2, // Paper
			Z: 3, // scissors
		};

		this.initialise();
	}

	async initialise() {

		await this.readFilesAndCreateArray();
		this.loopData();
		this.outputMyScore();
	}

	outputMyScore() {
		console.log( `My final score is: ${this.myFinalScore}` );
	}
	
	loopData() {

		let myScore = 0;

		for (let index = 0; index < this.dataArray.length; index++) {
			const match = this.dataArray[index];
			
			// Take user hands & return our score.
			myScore = myScore + this.determinWin( match[0], match[1] );
		}

		this.myFinalScore = myScore;
	}

	getOutcome( playerOneHand, playerTwoHand ) {

		if ( this.letters[playerOneHand] === this.letters[playerTwoHand] ) {
			return 3;
		}

		if (
			(
				'A' !== playerOneHand && this.letters[playerOneHand] > this.letters[playerTwoHand] &&
				'X' !== playerTwoHand
			) ||
			'A' === playerOneHand && this.letters[playerTwoHand] > 2 
		) {
			return 0;
		}

		return 6;
	}

	determinWin( playerOneHand, playerTwoHand ) {

		playerOneHand = playerOneHand.toUpperCase();
		playerTwoHand = playerTwoHand.toUpperCase();

		// is it a win, loss, or draw.
		let score = this.getOutcome( playerOneHand, playerTwoHand );

		// Add the letter score to the result.
		score = score + this.letters[playerTwoHand];

		// Return.
		return score;
	}

	async readFilesAndCreateArray() {

		let finalData = [];
		
		// Reads a text file & returns an array with a new array item for every line.
		const arrayOfData = await asyncReadFile( 'test.txt' );

		// Convert into a multi-dimentional array.
		arrayOfData.forEach(line => {
			finalData.push( line.split(' ') );
		});

		// Make this array avaliable class wide.
		this.dataArray = finalData;
	}
}

// Create a version of the class.
new index();
