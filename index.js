class OpenWeatherClient {
    api_key = '3f32c6174a894c81c2ce9542fa42441d'
    base_url = 'https://api.openweathermap.org/data/3.0/onecall'
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
class YandexGeocoderClient {

}