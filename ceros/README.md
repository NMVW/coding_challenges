# Ceros Ski Code Challenge: Rhinaldo

Welcome to the Ceros Code Challenge - Ski Edition!

Fixes:
* White blizzard bug fixed

Refactor:
* Repo restructure for easier maintainability and build/deployment
* Component/Service architecture:
- master Game controller class managing game entities while delegating rendering to a Canvas instance
- decoupling all entities and separating concerns into auxiliary services and components greatly simplified the app

Features:
* Spacebar to jump - now skiers can fly over trees and rocks
* Score - scoreboard widget persists score to localStorage api (10 pts/sec)
* Rhinaldo - skier carries rhino to safety, but don't crash!
* Crash Score - each crash sets skier back 50 points

Wishlist:
* Skier acceleration
* Independent Rhinaldo
* Include the jump ramp!?
* Multiplayer mode
* Improve theme (landing page?)
* Reset button
* More unit tests (had issues with mocha babel-loader)
* CDN to speed up static fetches (cache)

Bugs:
* Not all key bindings handled (naive window event handler)
* Scoreboard runs while stationary (free points!)

# [Rhinaldo](https://rhinaldo.herokuapp.com/)

Rhinaldo needs your help to get to the bottom of Mont Blanc.

## Table of Contents

1. [Requirements](#requirements)
1. [Project File Structure](#structure)
1. [Development](#development)
    1. [Build](#bundle)
    1. [Test](#test)
    1. [Webpack Dev Server](#webpack-dev-server)
1. [Deployment](#deployment)
    1. [Heroku](#launching-app)
1. [Team](#team)

## Requirements <a id="requirements"></a>

 Make sure you have installed all of the following prerequisites in your dev environment:

* NPM 6.8.0
* Node 8.3.0

## Project File Structure <a id="structure"></a>
`config/` is a placeholder for environment and deployment json vars
`src/` contains all source and assets targeted for bundling (app code)
`test/` should be where unit tests sit

## Development <a id="development"></a>

### Build <a id="bundle"></a>

From within the root directory:

```sh
npm install
npm run dev
```
- outputs bundle analyzer at localhost:9090
- serves & watches bundles/assets at localhost:3333

### Tests <a id="test"></a>

Build the project from within the root directory then from a bash CLI:

```sh
npm test
```
This series of commands will run the mocha suite test

## Deployment <a id="deployment"></a>

### Heroku <a id="launching-app"></a>

Production grade build:
```sh
npm run build_prod
npm start
```
- outputs optimized, compressed static production bundles
- spawns node express web server to statically serve dist/

Procfile handles these build steps, only need to push to Heroku repo to deploy

## Team <a id="team"></a>

+ Nicolas Vinson
