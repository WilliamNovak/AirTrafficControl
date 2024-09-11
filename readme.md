# :airplane: Air Traffic Control System

## Description
This system aims to assist pilots in creating and approving flight plans, ensuring safety and air traffic flow. It offers features to manage information about pilots, aircraft, airways, and flight plans, as well as automatically validate and approve flight plans based on various rules and restrictions.

## Features
* **Pilot Management:**
    * Register and query pilots.
    * Activate and deactivate licenses.
* **Aircraft Management:**
    * Register and query aircraft.
    * Validate altitude and time restrictions by aircraft type.
* **Airway Management:**
    * Register airways divided into 10 altitudes.
    * Query airways between an origin and destination airport.
    * Query available altitudes for a specific airway, date, and time slot.
* **Flight Plan Management:**
    * Submit flight plans for approval.
    * Query flight plans by ID.
    * Cancel flight plans.
* **Flight Plan Validation and Approval:**
    * Verify pilot's license.
    * Verify aircraft autonomy.
    * Verify altitude compatibility with aircraft type.
    * Verify time restrictions for aircraft type.
    * Verify availability of time slots.

## Restrictions
* **Altitudes:** Airways are divided into 10 altitudes between 25,000 and 35,000 feet.
* **Slots de Tempo:** Slots are considered hourly.
* **Tipos de Aeronaves:** Private, commercial passenger and commercial cargo, each with its own restrictions.
* **Aprovação de Planos de Voo:** A flight plan is only approved if all restrictions are met.

## Libraries
* **Node.js:** JavaScript runtime environment for the server-side.
    * Installation: https://nodejs.org/
* **bycontract:** Library for creating function contracts, ensuring code quality.
    * Installation: ```npm install bycontract```
* **prompt-sync:** Library to create interactive command-line interfaces.
    * Installation: ```npm install prompt-sync```
* **jest:** JavaScript testing framework.
    * Installation: ```npm install jest```

## Running the System
1. **Clone the repository:**
```bash
git clone https://seu-repositorio.git
```

2. **Install dependencies:**
```bash
cd seu-projeto
npm install dependency
```

3. **Run system:**
```bash
node index.js
```

4. **Run tests:**
```bash
cd tests
npm run test aprovarPlanoVoo.test.js
npm run test validaData.test.js
```