## /Api/User/Login [POST]

Endpoint for users to login with the application, expects two parameters \
@email:       The email of the user, which will become its username\
@password:    The password for the user \
@cookies:     A dictionary of cookies from client\
If doesnt match exactly to any account an 403 error will be raised, and passed to the client. \
@returns JSON of 
```
{'email': "test@gmail.com", 'name': "TEST NAME", 'phone': "204 335 4566", "jwt_token": "435gsdrgsd"} 
``` 
if successful. Else 403 if bad login cred. 500 if server error

## /Api/User/Register [POST]

Endpoint for users to register with the application, expects three parameters \
@name:        The name of the user to put into the system \
@email:       The email of the user, which will become its username \
@password:    The password for the user \
If email already exists in the system an 403 error will be raised, and passed to the client.\
@returns 200 code if successful, else 403 if unsuccessful registration. 500 If server error

## /Api/Restaurant/Register [POST]

Endpoint for restaurants to register with the application, expects three parameters \
@name:        The name of the restaurant to put into the system \
@email:       The email of the restaurant, which will become its username \
@password:    The password for the account \
@addr:        The location of the restaurant as an address eg "45 D'arcy Dr, Winnipeg MB". Use Automcomplete to get this address!\
If email already exists in the system an 403 error will be raised, and passed to the client.\
@returns 200 code if successful, else 403 if unsuccessful registration. 500 If server error

## /Api/Search [POST]

Endpoint expects to be given five parameters from client \
@dist:     The distance in kilometers the user wishes to search \
@query:    The desired restaurant, tag, menu item, etc \
@offset:   The offset for return results for pagination \
@limit:    The number of entries you wish to receive \
@addr:     The address of the client eg "45 D'arcy Dr. Winnipeg". Use autocomplete for this address!\
@cookies:  A dictionary of cookies from client\
@returns JSON of form
``` 
{ "restaurants": [{"id": 1, "name": "McDonalds", "description": "A great place for burgers!", "delivery_time": "22 Minutes", "address": "3344 Kevin Street, Winnipeg MB"}], "jwt_token": "325435faf"}
```
Default behaviour is empty query which will return first @limit restaurants within range

## /Api/Search/Autocomplete [POST]
Endpoint expects at least one parameter from client \
@addr:    The address attempting to autocomplete  
@token:   The generated token for the api call If the client doesnt send a token, one will be generated and returned.\
Client stores token for repeated requests, discarding once user selects an autocompleted option. \
@returns 
```
{ "completions": [{"name": "The Moon"}, {"name": "Mars"}], "token": "81467e77d1b544cda694932995109be3" }
```

## /Api/Images/<RESTAURANT_ID> [GET]
Endpoint expects only one param encoded in the url as an integer
This value is then used to retrieve the image from the backend. If no image
is uploaded for restaurant then a stock image is served.\
@returns image file


## /Api/Images/Upload [POST]
Endpoint expects 1 parameter other than the image file.\
@cookies:     A dictionary of cookies from client\
@returns
```
{'success': True, "jwt_token": "3141235ehe"}
```

## /Api/Images/Delete [POST]
Endpoint deletes image from server, expects 1 parameter.
@cookies:     A dictionary of cookies from client\
@returns
```
{'success': True, 'jwt_token': "234rsgdrasg"}
```

## /Api/Menu/<RESTAURANT_ID> [POST]
Endpoint retrieves the menu of the url encoded id of restaurant. expects one parameter non url\
@cookies:     A dictionary of cookies from client\
@returns JSON of form
```
{"addr": "45 D'arcy Dr, Winnipeg MB", "menu": [{"name": "Sweet Tacos", "price": 3.99, "description": "Delicious Tacos you'll regret the next morning!"}], "jwt_token": "324wtsg"}
```

## /Api/Restaurant/Update [POST]
Endpoint expects two parameters \
@descr:    The description of the restaurant, which is to be displayed on the menu and search page\
@cookies:  A dictionary of all cookies from the client \
If value of descr is empty than it will not be updated\
@returns 
```
{'success': True, 'jwt_token': "T456fghe546g5fd"}
```

## /Api/User/Update [POST]
Endpoint expects 5 parameters
@name     The name of the client\
@email    The email of client. Note that if user changes email to their own email server will error\
@password New password of user. \
@phone    Phone number of user. Expects string type\
@cookies  Dictionary of cookies from client\
Default behaviour is to update the parameters that are not empty strings\
@returns
```
{'success': True, 'jwt_token': "3452ubgsidbgiw"}
```

## /Api/User/Test [POST]
Endpoint expects one param\
@cookies    Dictionary of cookies from client\
@returns  200 code if token is still valid, else 403 if token is invalid or expired



## /Api/Transaction/Data [POST]
Endpoint expects one parameter \
@cookies    Dictionary of client side cookies\
Return json of orders for that restaurant, and jwt_token to refresh browser state
```
{"orders":[{"address":"45 D'arcy Dr. Winnipeg MB","id":"1","order":[{"menu_item":"Salad","quantity":"3"},{"menu_item":"Big Mac","quantity":"2"}],"state":"0"}]}
```


## /Api/Transaction/Update [POST]
Endpoint expects two parameters\
@cookies    Dictionary of client side cookies \
@id         Id of order to update the current stage \
Return jwt_token to refresh browser session
```
{"jwt_token": "345gadrhedrhd8ysj"}
```
Behaviour: Updates the state of the transaction into the next one. State 0 denotes that
the order has been made but not accepted by the restaurant. State 1 is accepted and making. 
State 2 is made meal, and delivering. Stage 4 is delivered.