# Pragma Brewery

This is the Pragma Brewery coding challenge. 

The UI displays the containers in the truck along with their current temperature and the acceptable temperature range.

The API is a GraphQL Apollo server running on Node.js and serving mock data, which is located in the data folder.

## Run the tests

### API
`cd api/ && npm run test`

### UI
`cd ui/ && npm run test`

## Start the project in development

### API
`cd api/ && npm start`

### UI
`cd ui/ && npm start`

## Start the project in production using docker-compose

To start the project in production, we use *docker-compose* to start the two containers, one for the API and one for the UI.

A multi-stage build is used to create small images. The tests are run in the build stage of each image so the image won't build if there is any test failing.

Bring everything up by running `docker-compose up`.
The UI is accessible on [http://localhost:8080](http://localhost:8080)

## Assumptions
- The number of containers that are in the truck was not defined. As the containers are generated for the purpose of this challenge and that we can assume that the server would be setup specifically for the truck, we can define the number of containers using the _CONTAINERS_TO_CREATE_ environment variable in the _api/.env_ file. The default is 21.
- The id of a container can be any string, this project only uses incremental ids starting at 1 as strings
- The UI would be accessed from a tablet or a mobile device inside of the truck
- There is a permanent access to the server via internet or the server is located inside of the truck and we access it locally
- There are only 3 types of notifications, all related to the containers: one for one a container is too cold, another one for when it is too hot, another one when the temperature sensor is down. All these notifications are displayed in the top right corner. These 3 types of notifications are mutually exclusive, which means that a container can have only one type of notification at the time.
- It is not specified at which frequency the temperature of each container should updated. I have decided to update this value every 10 seconds for each container.

## FAQ

#### What is the delay between each call to the temperature API?

The temperature API will be called every 10 seconds. The API generates random temperatures at each call, so we often end up with unrealistic temperature variations every 10 seconds. However, having such a short delay between each call provides a near realtime feeling in the UI. Using a real temperature API to fetch the temperature of the sensors would solve the issue of temperatures variating greatly between calls and would be more realistic.

#### How is the user notified of the temperatures falling out of acceptable range?

Whenever the temperature of a refrigerated container falls outside the acceptable range of temperatures, which is defined by the type of beer it contains, the color of the temperature will indicate whether the temperature is too hot (in red) or too cold (in blue). If the temperature is in the range it will appear green.

#### What should happen when a sensor is down or the temperature API is down?

Each container should clearly indicate if it has any issues. Here, I have decided to display a message in the container to indicate that the sensor is unresponsive and send a notification indicating the container's sensor is down.

#### How is the data generated?

The containers are mocked in the API. Each one of them is assigned a random type of beer, which defines the temperature range of the container. The number of containers that are generated here are defined by the CONTAINERS_TO_CREATE environment variable, set in the */api/.env* file.

#### About the code

##### General

The code style is functional. Jest is used for the tests. In production, the code runs in docker images which requires to have docker installed on the machine building the project.

##### The UI

The UI uses react with the hooks and the context API for the notifications. The components are separated between data components, which make the API calls, and presentational components.

Only functional components where used in the UI. Apollo-client is used to fetch the data from the GraphQL API, and I opted for parcel for the build as it requires almost no configuration and is faster than webpack.

The code is transpiled with babel (present-env and preset-react).

The UI is responsive and can be used on mobile devices.

##### The API

The API is an Apollo GraphQL server simply serving the mock data. It provides the data about the containers and has a call to get the temperature for a container providing its id, which will in turn call the temperature API.

The containers are generated on the server startup and get assigned a random type of beer. Restarting the server therefore changes the content of every container, as well as their acceptable temperature range.

There is no transpiling or bundling here. The latest version of node having a good support for the latest ECMAScript features and supporting ESM modules, it was not necessary. The `--es-module-specifier-resolution=node` flag is used to avoid having to suffix the local modules with ".js" when importing them.

##### Specificities of the solution

First, a call to fetch the list of containers is made to the UI. These containers do not container a temperature yet. The UI will indicate for each of them that the temperature is being read from the sensor. At that moment, each container will call the API, which will in turn call the temperature service and update each container one by one as soon as we get the temperature. This has the main advantage that the initial loading is fast and that the UI feels reactive.

Ideally, I would have prefered to put the container temperature in the calls for the container and indicate that this field is slow to load with Apollo's `@defer` directive. However, the support for this directive is at this day still experimental so I prefered to split the containers and temperature calls.

#### What can be improved on the next iteration?

##### In the UI
- Add some end-to-end tests
- Use prop-types foor the components
- Use styled components
- Improve the design
- Make a progressive web app with offline support
- Display the notifications differently for small screens

##### In the API
- Add some integration and end-to-end tests
- Use https
- Add authentication on the calls
- We could use subscriptions instead of polling to retrieve the containers temperature

##### General
- Create a build pipeline for CI/CD