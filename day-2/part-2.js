import {asyncReadFile} from '../_lib/helpers.js';

/**
 * Init js class.
 */
class index {

	/**
	 * Class setu-up.
	 */
	constructor() {

		// Points for if you win / lose / draw.
		this.pointsForOutcome = {
			X: 0, // Lose
			Y: 3, // Draw
			Z: 6, // Win
		};

		this.winDrawLossScores = {
			A : {
				Z: 2, // Select to Win.. (paper)
				Y: 1, // Select to draw. (rock)
				X: 3, // Select to lose. (scissors)
			},
			B : {
				Z: 3, // Select to Win.. (scissors)
				Y: 2, // Select to draw. (paper)
				X: 1, // Select to lose. (rock)
			},
			C : {
				Z: 1, // Select to Win.. (rock)
				Y: 3, // Select to draw. (scissors)
				X: 2, // Select to lose. (paper)
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
			
			myScore = myScore + this.winDrawLossScores[ match[0] ][ match[1] ] + this.pointsForOutcome[ match[1] ];
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
