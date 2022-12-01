import {promises as fsPromises} from 'fs';

/**
 * Init js class.
 */
class index {

	/**
	 * Class setu-up.
	 */
	constructor() {

		this.topScores = [];

		this.highestCalories = 0;
		this.elfWithHighestCalories = 0;
	}

	async init( fileName ) {
		this.caloriesArray = await this.asyncReadFile( fileName );

		this.loopCaloriesData();
		this.highestCalories = this.addAllData();
		this.outputResult(); 
	}

	outputResult() {
		console.log( `Elf ${this.topScores[0].key} has the highest numer of calories with: ${this.topScores[0].score}` );
		console.log( `\nThe top three elves have a combined calorie count of: ${this.highestCalories}` );
	}

	addAllData( howManyToAdd = 3 ) {

		let total = 0;

		this.topScores.forEach(( element, key ) => {

			if ( key > ( howManyToAdd - 1 ) ) {
				return;
			}

			total = element.score + total;
		});

		return total;
	}

	loopCaloriesData() {

		if ( this.caloriesArray.length < 1 ) {
			return;
		}

		let currentElf = 0,
			calorieIndex = [],
			topScores = [];

		for (let index = 0; index < this.caloriesArray.length; index++) {
			const item = this.caloriesArray[index];
			
			// If nothing then it's a new elf.
			if ( '' === item ) {
				
				topScores.push({
					key: currentElf,
					score: calorieIndex[currentElf],
				});

				// Sort array high to low.
				topScores.sort((a, b) => {
					return b.score - a.score;
				});

				// Select next elf.
				currentElf++;
				continue;
			} else {
				if ( undefined === calorieIndex[currentElf] ) {
					calorieIndex[currentElf] = 0;
				}

				calorieIndex[currentElf] = calorieIndex[currentElf] + parseInt( item );
			}
		}

		this.topScores = topScores;
	}

	/**
	 * Read the file & return an array.
	 * @param {*} filename 
	 * @returns {array} 
	 */
	async asyncReadFile(filename) {
		try {
			const contents = await fsPromises.readFile(filename, 'utf-8');
			const arr = contents.split(/\r?\n/);
			return arr;
		} catch (err) {
			console.log(err);
		}
	}
}

// Create a version of the class.
const item = new index();

// init the class.
item.init( 'test.txt' );
