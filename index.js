const { JSDOM } = require('jsdom')
const { exec } = require('child_process')

// API погоды
class OpenWeatherClient {
    api_key = '3f32c6174a894c81c2ce9542fa42441d'
    base_url = 'https://api.openweathermap.org/data/3.0/onecall'
	/** @type {LocDB} */
	locdbInstance
	/** @param {LocDB} locdb Класс */
	constructor(locdb) {
		this.locdbInstance = locdb
	}
    makeApiCallUrl({ lat, lon, exclude, lang }) {
        return `${this.base_url}?lat=${lat}&lon=${lon}&lang=${lang}&exclude=${exclude}&appid=${this.api_key}`
    }
    async fetchCurrent(...opts) {
        return await fetch({
            url: this.makeApiCallUrl({
                ...opts
            })
        })
    }
}
// отвечает за список городов и регионов рф
class LocDB {
	JSDOM = JSDOM
	db = require('./db.json')
	base_url = 'https://locdb.ru'
	regions = this.db.elements[0].elements[0].elements
	cities = []
	getAllCities() {
		this.regions.forEach(region => {
			region.elements.forEach(element => {
				this.cities.push(element)
			})
		})
		console.log(`[locdb] Всего ${this.cities.length} населённых пунктов`)
	}
}

const locdb = new LocDB()
const openweather = new OpenWeatherClient(locdb)
console.log('[index] Запуск gulp...')
exec('gulp', {
	stdio: 'pipe'
}).stdout.on('data', data => {
	let output = String(data)
	output = output.split('\n').map(line => line.trim()).join('\n')
	process.stdout.write(output)
});

locdb.getAllCities()
