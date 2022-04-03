# Hasura Sfr Assignment
## Hasura GraphQl
Hinweis: Die PostgreSQL Datenbank wurde direkt im Hasura Cloud Portal erstellt

Der Hasura GraphQL Endpoint ist unter folgender Adresse erreichbar: https://sfrhasura.hasura.app/v1/graphql
Die verwendeten Queries befinden sich in den jeweiligen Projekten.
### REST API
Dadurch, dass Hasura bereits eingebaute REST-APIs anbietet, habe ich die REST-Schnittstellen direkt dort erstellt.
Um auf die REST-API zugreifen zu können, muss folgender HTTP-Header verwendet werden: 

<ul>  
<li>Key: x-hasura-admin-secret</li>  
<li>Value: m46Gp8uPOJTGIEhtPGO0wipDaz12IJOMCLamPI3LXo95xZSvxUqEwRhHhIxbUM9T</li> 
</ul>




####  CreateUser
**POST** 
https://sfrhasura.hasura.app/api/rest/createUser
Body:
```
{
	"username": "Felix"
}
```
####  CreatePayment
**POST** https://sfrhasura.hasura.app/api/rest/createPayment
Body:
```
{
	"senderId": 1,
	"recipientId": 2,
	"description": "Essen",
	"amount": 100
}
```
####  UpdatePaymentStatus
**PUT** https://sfrhasura.hasura.app/api/rest/updatePaymentStatus
Body:
```
{
	"id": 1,
	"status": "Done"
}
```
####  CreateTransaction
**POST** 
https://sfrhasura.hasura.app/api/rest/createTransaction
Body:
```
{
	"senderId": 1,
	"recipientId": 2,
	"description": "Essen",
	"amount": 100
}
```

## C# Transaction Service
Als Transaction Service wurde eine C# Web-API verwendet (HasuraAPI).  Diese muss über Visual Studio lokal gestartet werden.

## React GraphQL Client
Der React GraphQL Client muss ebenfalls lokal über "npm start" gestartet werden. Danach kann der Client über http://localhost:3000/ aufgerufen werden. Zuerst muss man sich mit einem Usernamen einloggen. Falls der Username noch nicht in der HasuraDB existiert, wird ein neuer Eintrag in der "users" Datenbank angelegt und der User wird automatisch eingeloggt.
Danach können beliebig viele Payments abgeschickt werden. 

Est ist außerdem möglich, den User durch einen weiteren Login zu wechseln.
