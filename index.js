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
                
            })
        })
    }
}
// отвечает за список городов и регионов рф
class LocDB {
	JSDOM = JSDOM
	base_url = 'https://locdb.ru'
	/** @type {string[]} */
	regions = []
	/** @type {number[]} */
	regionIDs = []
	/** @type {string[]} */
	cities = []
	/** @type {number[]} */
	cityIDs = []
	/** @type {Element[]} */
	regionEntries = []
	async fetchAllCities() {
		console.log('[locdb] Загрузка базы данных...')
		const res = await fetch(this.base_url)
		console.log('[locdb] Преобразование ответа в HTML...')
		const html = await res.text()
		console.log('[locdb] Подготовка списков регионов...')
		const { window } = new JSDOM(html)
		const columns = window.document.querySelectorAll('#localApp > div > div > div:nth-child(3) > div > div > div')
		columns.forEach(column => {
			[...column.children[0].children[0].children].forEach(element => {
				this.regionEntries.push(element)
			})
		})
		const regionNameRegex = /[0-9].*\n\s*/
		const regionIDRegex = /[0-9]{2}/
		this.regions = this.regionEntries.map(entry => entry.textContent.trim().replace(regionNameRegex, '')).filter(region => {
			if (!region) return false
			return region
		})
		this.regionIDs = this.regionEntries.filter(region => {
			if (!region.textContent) return false
			return region
		}).map(entry => regionIDRegex.exec(entry.textContent.trim())[0])
		console.log('[locdb] Подготовка списка населённых пунктов...')
		this.regions.forEach(region => {
			// зайти на каждый регион
			// загрузить все населённые пункты регионов
			// cities.push() все города
		})
	}
}
const locdb = new LocDB()
const openweather = new OpenWeatherClient()
console.log('[index] Запуск gulp...')
exec('gulp', {
	stdio: 'pipe'
}).stdout.on('data', data => {
	let output = String(data)
	output = output.split('\n').map(line => line.trim()).join('\n')
	process.stdout.write(output)
});

(async () => {
	await locdb.fetchAllCities()
})()
