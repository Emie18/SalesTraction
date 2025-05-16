"# SalesTraction" 

## API

GET /data/regions => regions list
GET /data/lauguages => lauguages list
GET /data/modes => work mode list
GET /data/schools => school list
GET /data/states => states list

POST /account/login => check login with a pass and an email : return account data
GET /account/delete?id=0 => delete the account with id 0

POST /startup/create => create a new start up account
GET /startup/all => get all startup

POST /students/create => create a new students up account
GET /students/all => get all students