const { exec } = require('child_process')
const { WebSocketServer } = require('ws')
const server = new WebSocketServer({
	port: 8080
})
/** @type {import('ws').WebSocket[]} Список подключённых пользователей */
let sockets = []

class YandexWeather {
    base_url = 'https://api.weather.yandex.ru/v2/informers'
    makeApiCallUrl({ lat, lon, lang }) {
        return `${this.base_url}?lat=${lat}&lon=${lon}&lang=${lang}`
    }
    async fetchCurrent({ lat, lon }) {
        return await fetch(this.makeApiCallUrl({ lat, lon }), {
			method: 'GET',
			headers: new Headers({
				'X-Yandex-API-Key': '09c8ffab-9f63-4d1d-96bb-b9d502b8ffa0'
			})
		})
    }
}
class LocDB {
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
const yandexweather = new YandexWeather()
server.on('connection', socket => {
	sockets.push(socket)
	console.log(`[websocket] Новое соединение (${sockets.length} всего)`)
	socket.on('message', async msg => {
		let message = JSON.parse(msg)
		console.log(message)
		if (message.action == 'currentWeather') {
			console.log(`[websocket] Запрос на текущую погоду в "${message.data.city}"`)
			console.log('[index] Импорт "dice-coefficient"...')
			const { diceCoefficient } = await import('dice-coefficient')
			console.log(`[dice-coefficient] Поиск города "${message.data.city}" в locdb...`)
			/** @type {{city: any, diceCoefficient: number}[]} */
			const diceCoefficientResults = []
			locdb.cities.forEach(city => {
				const res = diceCoefficient(city.attributes.name, message.data.city)
				diceCoefficientResults.push(res)
			})
			const closest = findClosest(1, diceCoefficientResults)
			const resCity = locdb.cities[diceCoefficientResults.indexOf(closest)]
			console.log(`[locdb] Самый похожий город к запросу "${message.data.city}": ${resCity.attributes.name}`)
			console.log(`[yandexweather] Запрос погоды по координатам города ${resCity.attributes.name}`)
			const resWeather = await yandexweather.fetchCurrent({
				lat: resCity.attributes.point_lat,
				lon: resCity.attributes.point_lon,
				lang: 'ru-RU'
			}).catch(err => {
				console.error(`[yandexweather] Ошибка во время запроса текущей погоды в ${resCity.attributes.name}`)
				console.error(err)
			})
			const json = await resWeather.json()
			console.log(json)
			console.log('[websocket] Отправка информации о погоде пользователю...')
			console.log(resCity.attributes.name)
			socket.send(JSON.stringify({
				action: 'response',
				data: json,
				city: resCity.attributes.name
			}))
		}
	})
	socket.on('disconnect', () => {
		console.log(`[websocket] Пользователь отключился (${sockets.length} всего)`)
	})
})
console.log('[index] Запуск gulp...')
exec('gulp', {
	stdio: 'pipe'
}).stdout.on('data', data => {
	let output = String(data)
	output = output.split('\n').map(line => line.trim()).join('\n')
	process.stdout.write(output)
});

locdb.getAllCities()
/** @param {number} x @param {any[]} arr */
function findClosest(x, arr) {
	const indexArr = arr.map(k => { return Math.abs(k - x) })
	const min = Math.min.apply(Math, indexArr)
	return arr[indexArr.indexOf(min)]
}
