# ICTPRG443 - Apply intermediate programming skills in different languages 2022

Created by Michael Hermann
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.4.

## Contents

- Description
- Installation instructions
- Run Application
- Run Unit Tests

## Description

You have been asked to re-develop the fishing simulator game using Java and Visual Studio Code. The game will be based on the roll of a die, meaning there can only be six unique outcomes for each roll of the die or ‘Cast’. Each possible outcome of the cast produces a number that relates to a fish or other object.

Create the application in accordance to organisational guideline and coding standards. Each round of the game is performed as an iteration of a loop that repeats as long as the player wants to fish for more items. At the end of each round, the program will ask the user whether they want to keep the catch. At the beginning of each round, the program will ask the user whether they want to continue fishing. The program simulates the rolling of a six-sided die. Each item that can be caught is represented by a number generated from the die; for example, 1 for "Mullet", 2 for "Lost bait", 3 for a "Snapper", and so on. Each item the user catches is worth different number of points. The user can gain extra points if they release a keepable catch. The loop keeps a running total of the user's fishing points. After the loop has finished the total number of fishing points is displayed, along with a list of the fish kept and a message that varies depending on the points earned. User name and password to be implemented

## Installation instructions

1. Check Node `npm -v` (If not found install node/newest version)
2. Install Angular Client `npm install -g @angular/cli`
3. Install Node Packages `npm i`
4. Add Install Angular Material `ng add @angular/material`

## Run Application

Ensure there are 2 seperate terminal windows open
In first terminal ensure directory is the game folder FishingGamePart2, the second ensure that it is in the backend folder. If not use `cd backend` to navigate to backend folder.

To run database `node server.js`, database should start listening on porrt 3000.
To run application `ng serve -o`, Navigate to `http://localhost:4200/`.

All game results and users are stored within JSON files held in the backend folder.

## Running unit tests

Run `ng test` in console to execute the unit tests.

## Usage guide

1. Run application
2. Register a username and password
3. Login using the username and password
4. Click fishing rod to begin game
5. Fish image and choice buttons should appear
6. Click choice buttons
7. Score and count updates
8. Game screen resets
9. Click rod to continue playing
10. Click bucket to view count of kept fish
11. Click 'X' button to end the game
12. View game results on end game screen
13. Select 'PLay Again' to play another round
14. Select 'End Game' to end the session and be navigated back to the login page

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
