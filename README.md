# SalesTraction

## API

GET /data/regions => regions list
GET /data/languages => lauguages list
GET /data/modes => work mode list
GET /data/schools => school list
GET /data/states => states list

POST /account/login => check login with a pass and an email : return account data
POST /account/delete => delete an account

POST /startup/create => create a new start up account
GET /startup/all => get all startup
GET /startup/get?id=0 => get the startup with the given id, return an error if the account is not a startup
GET /startup/offer/:id => get all offer from the give, startup

POST /students/create => create a new students up account
GET /students/all => get all students
GET /students/get?id=0 => get the student with the given id, return an error if the account is not a student
GET /students/offer/:id => get all register offer from the give, student #TODO

GET /offer/all?name=""&sector=""&region=""&commission=""&mode="" => get all offer with a filter
GET /offer/applications/:id => See all application of the offer with the given id
POST /offer/create => create an offer
POST /offer/update => update offer  
POST /offer/delete => delete an offer
POST /offer/apply => apply to an offer

POST /match/like => like an account
GET /match/suggestion/:id => get all suggestions for the account with the given id

## JSON

### Offer
```json
{
    "name": "<name>",  // Any string
    "product": "<product>", // Any string
    "range": "<range>",  // Any string
    "pitch": "<pitch>",  // Any string
    "commission": ,  // Any number
    "startup": 1,  // ID of the startup
    "region": "<region>", // Valid region in GET /data/regions
    "work_mode": "<workmode>" // Valid mode in GET /data/modes
}
```

### Startup
```json
{
    "name": "<name>", // Any string
    "email": "<email>", // Any string
    "siret": 1, // Any Number
    "linkedin": "<linkdin>", // Any string
    "description": "<desc>", // Any string
    "pass": "<pass>", // Any string
    "sector": ["<sector 1>", "<sector 2>"] //Array of sectors
}
```

### Student
```json
{
    "name": "<name>", // Any string
    "surname": "<surname>", // Any string
    "email": "<email>", // Any string
    "disponibility": "<dispo>", // Any string
    "description": "<desc>", // Any string
    "linkedin": "<link>", // Any string
    "pass": "<pass>", // Any string
    "school": "<school>", // Valid school in GET /data/schools
    "region": "<region>", // Valid region in GET /data/regions
    "languages": ["<lang 1>", "<lang 2>"], // Array of languages
    "sector": ["<sector 1>", "<sector 2>"] //Array of sectors
}
```

### Offer
```json
{
    "startup": 0, // ID of the startup
    "name": "<name>", // Any string
    "product": "<product>", // Any string
    "pitch": "<pitch>", // Any string
    "range": "<range>", // Any string
    "commission": "<commission>", // Valid commission in GET /data/commissions
    "client": "<client>", // Any string
    "work_mode": "<work_mode>", // Valid work_mode in GET /data/modes
}
```

### Like an account
```json
{
    "from" : 1,  // ID of the account that has liked an account
    "to" : 1, //ID of the liked account
}
```

### Apply to an Offer
```json
{
    "student": 0, //ID Account
    "offer": 0, //ID Offer
    "motivation": "<motivation>" // Motivation entered by the Student
}
```

### Delete Offer/Acccount
```json
{
    "id": 0, //ID Offer/Acccount
}
```