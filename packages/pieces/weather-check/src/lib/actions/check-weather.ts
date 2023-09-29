// Import necessary libraries from the ActivePieces framework and common utilities
import { createAction, PieceAuth, Property } from "@activepieces/pieces-framework";
import { httpClient, HttpMethod } from "@activepieces/pieces-common";

// Define the checkWeather action
export const checkWeather = createAction({
    name: 'check_weather',  // Name of the action
    auth: PieceAuth.None(),  // Authentication type; none in this case
    displayName: 'Check Weather',  // Display name for the action
    description: 'Check the hourly weather forecast for a specified grid point',  // Description of the action
    props: {
        // Define properties for the action: gridX and gridY coordinates
        gridX: Property.Number({
            displayName: 'Grid X',
            description: 'The X coordinate of the grid point',
            required: true  // This property is required
        }),
        gridY: Property.Number({
            displayName: 'Grid Y',
            description: 'The Y coordinate of the grid point',
            required: true  // This property is required
        })
    },
    // Define the run method that will be executed when the action is invoked
    async run(context) {
        // Construct the URL using the gridX and gridY property values
        const WEATHER_API_URL = `https://api.weather.gov/gridpoints/MPX/${context.propsValue['gridX']},${context.propsValue['gridY']}/forecast/hourly`;
        // Send an HTTP GET request to the weather.gov API
        const weatherResponse = await httpClient.sendRequest({
            method: HttpMethod.GET,
            url: WEATHER_API_URL,
            headers: {
                'Accept': 'application/geo+json',  // Specify the desired response format
            },
        });
        // Return the response body, which should contain the weather data
        return weatherResponse.body;
    },
});
