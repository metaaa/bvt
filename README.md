# Interview Task - Software Engineer-NodeJs

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
