Appacitive API
=======

Introduction
------------

All the functionality on the Appacitive platform is publicly available using  apis. We use standard conventions using http headers and verbs which can be 
used by most of the existing http clients available. We also support 

```nolang
<span class="h3">Sample html with h3 size</span><i>Libraries are <a href="https://stripe.com/docs/libraries">available in several languages</a></i>
Some html content on a New line
```

API   
Introduction  
=========================
All the features available on the Appacitive platform are available via <a href="http://en.wikipedia.org/wiki/Representational_State_Transfer">REST</a> apis. 
These apis follow simple conventions and can be consumed by any rest client of your choice.
<a href="http://en.wikipedia.org/wiki/Cross-origin_resource_sharing">Cross-origin resource sharing (CORS)</a> is also enabled on the rest apis to makek them easy to consume from web based applications. 

The request and response format of the API is always <a href="http://en.wikipedia.org/wiki/JSON">json</a>. Standard error structures in the response will indicate success or failure for any given api request. You can find details of the same in the **api conventions**.

API Authentication
=========================
To authenticate your api request you need to specify your application's API key and environment in every request.
The environment header is used to route the request to your sandbox or live environment as requested.
Your api key can be found in the api key section of the management portal for your app.

For the Appacitive apis, all contextual and authentication information is always passed via http headers.
In order to pass the api key and environment information for the application use the following headers.

* appacitive-apikey : Http header for the api key
* appacitive-environment: Environment to target. Valid values are live and sandbox.

  
  Authentication  
  Errors  
    
Libraries   
  .NET  
    Introduction
    Conventions
    Utilities
  Javascript  
    Introduction
    Conventions
    Utilities
    
Articles    
  Create a new article  
  Update an existing article  
  Delete an existing article  
  Delete multiple articles  
  Get an existing article 
  Get multiple articles 
  List all articles 
    
Connections   
  Create a new connection 
  Update an existing connection 
  Delete a connection 
  Delete multiple connections 
  Get an existing connection  
  Get multiple connections  
  Get connected articles  
  Get intersection  
  Get interconnects 
  List all connections  
    
Users   
  Create a new user 
  Update an existing user 
  Delete an existing user 
  Get an existing user  
  Authenticate a user 
  Authenticate with facebook  
  Authenticate with twitter 
  Reset password  
  Change password 
  Checkin 
    
Devices   
  Register a new device 
  Update a device 
  Delete a device 
  Get a device  
    
Querying data   
  General 
  Filters 
    Syntax
    Basic filters
    Geolocation filters
    Text filters
    Tag filters
    Complex queries
    
Push notifications    
  Push to devices 
  Broadcast 
  Push to query 
  Windows Push notifications  