class MostManager {
	#cap: number
	#most: number[] = []

	constructor(cap: number) {
		this.#cap = cap
	}

	apply(num: number) {
		if (this.#most.length < this.#cap) {
			this.#most.push(num)
			return
		}

		const min = Math.min(...this.#most)

		if (num > min) {
			this.#most.splice(this.#most.indexOf(min), 1)
			this.#most.push(num)
		}
	}

	getMost() {
		return this.#most
	}
}

const input = await Deno.readTextFile('input.txt')
const calories = input.split('\n')

const most = new MostManager(3)
let current_sum: number[] = []

for (const calorie of calories) {
	if (!calorie.length) {
		most.apply(sum(current_sum))
		current_sum = []

		continue
	}

	current_sum.push(parseInt(calorie))
}

console.log(sum(most.getMost()))

function sum(numbers: number[]) {
	let acc = 0

	for (const num of numbers) acc += num

	return acc
}
