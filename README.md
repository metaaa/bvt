# TODOS

- Please read the instructions carefully and ensure you understand the requirements before
you start coding.
- There is no time limit as such on the task, you can work on it over the next couple of days as
you see fit and as your time allows and keep focused on the quality of your code and the
chosen solutions.
- It&#39;s important that you use a (local) git repository to track your code as you go along.
- Enjoy your coding and good luck!

## TASK DESCRIPTION
Create a Node.js API server that calls the following URL and navigates through it&#39;s content.

URL: `https://partners.betvictor.mobi/en-gb/in-play/1/events`

The Content hierarchy is: `Sports` &gt; `Competions &gt; `Events &gt; `Markets &gt; `Outcomes`
Minimum requisites are:
* Endpoint to list all sports
* Endpoint to list all events(per sportId) – where sportId is optional parameter.
* Endpoint to list all data for a given event
* Endpoint to list all sports in all languages
* Language support (English, German and Chinese)
* Caching
* Full test coverage

### Notes:
* Obey the list order as per upstream API &#39;pos&#39; property
* Please use a local Git repository and commit as you go along
* Use http request client to fetch the data from the URL
* If your location is blacklisted use proxy

# INSTRUCTIONS

## PRE_REQ:
* yarn
* docker & docker-compose
* git

## SETUP:
* `git clone git@github.com:metaaa/betvictor_test.git`
* `docker-compose up -d`
* `cp .env.example .env`
* `yarn install:dev`
* `yarn start:dev`

## API ENDPOINTS
* Endpoint to list all sports
  * `http://en.localhost:3005/sports?lang=en`
  * Returns all sports by the given language (sorted by pos key)
* Endpoint to list all sports in all languages
  * `http://en.localhost:3005/sports/all`
  * Returns all sports for all languages (both sorted by pos key)
* Endpoint to list all events(per sportId) – where sportId is optional parameter.
  * `http://en.localhost:3005/events?lang=en`
  * Returns all events by the given language (sorted by pos key)
  * `http://en.localhost:3005/events?lang=en&group-events=yes`
  * Returns all events by the given language grouped by the sport_id (sorted by pos key)
* Endpoint to list all data for a given event
  * `http://en.localhost:3005/events/1796451800?lang=en`
  * Returns all data for the event with the provided id

## FEATURES:
* Caching used
* Lists are sorted by the pos key
* axios client used for http requests
* languages supported: English, German, Chinese
* Tests written in jest
