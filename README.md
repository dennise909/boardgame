# boardgame
Technical Documentation for Pokedex App.
 Front End developer path assessment 


Table of contents:

Project Overview
Code Structure
Testing
Development process


Project Overview 

The Pokedex is an App / Card game based on Pokemon. It has been built with React App as the development environment. The game is intended to work in the following way:
The user accesses the page and will find two card decks. Each deck contains up to 4 cards with a Pokemon on it, that specifies their type and experience. 
Our app logic sums up all the experience of the four Pokemons and the one with the highest score wins the match.
In order to add new Pokemons, it is necessary to create them via Contentful’s WebApp.
You can find the whole code in the following Github repository.

Code Structure 

File Contents

The /src folder contains all the following public files:
App.js - 
index.js - 
Pokecard.js - Is a child component of the Pokedex, the props received from the parent are placed to build each pokemon card.
Pokecard.css - Contains the styling for each card.
Pokedex.js - Loops over the pokemons and returns the Pokecards.
Pokegame.js - File where the winning hand has been calculated by summing up the experience of the pokemons from the card deck which is the game logic and receives the object coming from the GraphQL API.
Pokegame.css - Contains the css to align the cards on the deck and gives the animation of the cards.
Pokelist.js - Contains the request to Contentful’s GraphQL API, and receives the JSON with the Pokemons created through the WebApp.



Contentful WebApp

To add new Pokemons to the game is necessary to do it via WebApp. The content type  Pokemon has been built under the Contentful Customer Success Organization in the Performance 3X space. 


The content type contains 3 fields required to be fulfilled which are : id, name, type and base experience.


Development process


Testing

For the current project the intended testing framework will be Jest. 

Parts of the code that will be tested are:

/Pokelist.js
API response from Contentful GraphQL

/Pokecard.js
Creation of the pokecard component

/Pokegame.js
Sum of the base experience from the Pokemon’s deck


Retrospective
