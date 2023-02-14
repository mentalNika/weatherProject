export interface ForecastResponse {
    location: {
        name: string;
        region: string;
        country: string;
        tz_id: string;
        localtime_epoch: number;
        localtime: string;
    };
    forecast: {
        forecastday: {
            date: string;
            date_epoch: number;
            day: {
                maxtemp_c: number;
                mintemp_c: number;
                avgtemp_c: number;
                condition: {
                    text: string;
                    icon: string;
                    code: number;
                };
                uv: number;
            };
            astro: {
                sunrise: string;
                sunset: string;
                moonrise: string;
                moonset: string;
                moon_phase: string;
                moon_illumination: number;
            };
            hour: {
                time: string;
                temp_c: number;
                condition: {
                    text: string;
                    icon: string;
                    code: number;
                };
                chance_of_rain: string;
                chance_of_snow: string;
            }[];
        }[];
    };
}
