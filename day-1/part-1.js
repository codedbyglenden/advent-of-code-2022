import {promises as fsPromises} from 'fs';

/**
 * Init js class.
 */
class index {

	/**
	 * Class setu-up.
	 */
	constructor() {
		this.highestCalories = 0;
		this.elfWithHighestCalories = 0;
	}

	async init( fileName ) {
		this.caloriesArray = await this.asyncReadFile( fileName );

		this.loopCaloriesData();
		this.outputResult();
	}

	outputResult() {
		console.log( `Elf ${this.elfWithHighestCalories} has the highest numer of calories with: ${this.highestCalories}` );
	}

	loopCaloriesData() {

		if ( this.caloriesArray.length < 1 ) {
			return;
		}

		let currentElf = 0;
		let calorieIndex = [];
		let highestCalories = 0;
		let highestElf = 0;

		for (let index = 0; index < this.caloriesArray.length; index++) {
			const item = this.caloriesArray[index];
			
			if ( '' === item ) {

				if ( calorieIndex[currentElf] > highestCalories ) {
					highestCalories = calorieIndex[currentElf];
					highestElf = currentElf;
				}

				currentElf++;
				continue;
			} else {
				if ( undefined === calorieIndex[currentElf] ) {
					calorieIndex[currentElf] = 0;
				}

				calorieIndex[currentElf] = calorieIndex[currentElf] + parseInt( item );
			}
		}

		this.highestCalories = highestCalories;
		this.elfWithHighestCalories = highestElf;
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
new index().init( 'test.txt' );
