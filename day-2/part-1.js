import {asyncReadFile} from '../_lib/helpers.js';

/**
 * Init js class.
 */
class index {

	/**
	 * Class setu-up.
	 */
	constructor() {

		// List all the win conditions.

		// List all the draw conditions.

		// List all the lose conditions.

		// Foreach letter.

		this.letters = {
			A: 1, // Rock
			B: 2, // Paper
			C: 3, // Scissors

			X: 1, // Rock
			Y: 2, // Paper
			Z: 3, // scissors
		};

		// Win give you 6, draw gives you 3.
		this.winDrawLossScores = {
			A : {
				Y: 6,
				X: 3,
				Z: 0,
			},
			B : {
				Z: 6,
				Y: 3,
				X: 0,
			},
			C : {
				X: 6,
				Z: 3,
				Y: 0
			},
		};

		this.myFinalScore = 0;
		this.dataArray = [];

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
			
			myScore = myScore +this.winDrawLossScores[ match[0] ][ match[1] ] + this.letters[ match[1] ];
		}

		this.myFinalScore = myScore;
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
