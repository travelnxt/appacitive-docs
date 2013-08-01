Appacitive API
=======
All the features available on the Appacitive platform are available via <a href="http://en.wikipedia.org/wiki/Representational_State_Transfer">REST</a> apis over HTTPS. 
These apis follow simple conventions and can be consumed by any rest client of your choice.
<a href="http://en.wikipedia.org/wiki/Cross-origin_resource_sharing">Cross-origin resource sharing (CORS)</a> is 
also enabled on the rest apis to makek them easy to consume from web based applications. 

The request and response format of the API is always <a href="http://en.wikipedia.org/wiki/JSON">json</a>. Standard error structures in the response will indicate success or failure for any given api request. You can find details of the same in the <a href="http://appacitive-docs.dev/index.html#errors">api conventions</a>.


Endpoints
------------

All appacitive apis are available over HTTPS at ``https://apis.appacitive.com/``.
A quick summary of the different urls is detailed below.

* **Articles** : <i>https://apis.appacitive.com/article/{type}/</i>
* **Connection** : <i>https://apis.appacitive.com/connection/{type}/</i>
* **User** : <i>https://apis.appacitive.com/user/</i>
* **Device** : <i>https://apis.appacitive.com/device/</i>

Request format
------------

The request body for all requests using PUT and POST must be in json format with ``Content-Type`` set as ``application/json``.
All authentication and contextual information is sent via http headers. The following http headers are currently supported by the
api.

** Supported http headers **

* **``appacitive-apikey``** : Api key of the app.
* **``appacitive-environment``** : Environment to be targetted. Valid values are ``live`` and ``sandbox``.
* **``appacitive-usersession`` (optional)** : User session token

```nolang
<span class="h3">Sample html with h3 size</span><br/><i>Libraries are <a href="http://help.appacitive.com">available in several languages</a></i>
Some html content on a New line
```


Response format
------------

The response from the api will always return a json object (even in the case of a failure). The success or failure status of the transaction will be returned in the form of a status object. Incase the operation does not return any data then the json response would contain just the status object itself.
The json structure of the status object is shown.

** Status object attributes **

* **``code``** : ``2xx`` (``200`` or ``201``) incase of success. Incase a resource is created as a side effect of the operation, then the status code returned is ``201``. In case of failure, a non 2xx error code would returned.
* **``message``**: Error message incase of an api call failure.
* **``referenceid``**: Unique reference id for the transaction for debugging. This reference id can be provided in issues and escalations.
* **``additionalmessages``**: Additonal messages incase of a failure.

**Note**: The http status code for the response will always be returned as ``200``.

```nolang
<span class="h3">Status object</span>
```
```nolang-rest
{
...,
  "status": {
     "code":"200",
     "message":"Successful",
     "referenceid":"345c000e-9565-4858-9936-3cf2492df7d3",
     "additionalmessages":[]
   }
}
```

Errors
------------

The api always returns a ``2xx`` code in the status object incase the api call was successful. A non ``2xx`` status code is used to indicate a failure. Certain conventions are followed for indicative purposes to hint the cause of the failure. A ``4xx`` error code is used to indicate validation and client errors. Validation failures would also include specifics in the additional messages.

Authentication
------------

To authenticate your api request you need to specify your application's API key and environment in every request. The environment header is used to route the request to your sandbox or live environment as requested. Your api key can be found in the api key section of the management portal for your app. For the Appacitive apis, all contextual and authentication information is always passed via http headers.

In order to pass the api key and environment information for the application use the following headers. 

* **``appacitive-apikey``** : Http header for the api key.
* **``appacitive-environment``**: Environment to target. Valid values are ``live`` and ``sandbox``.

``` javascript
Appacitive.initialize({ 
    apikey: '{Your api key}' /* required */, 
    env: 'live' /* environment live or sandbox, default is live */ 
});
```
``` csharp
//For Windows Phone 7 base app
App.Initialize(WindowsPhone7.WP7.Instance, 
                   "{Your api key}", 
                    Environment.Live);

//For Windows app
App.Initialize(Net45.WindowsHost.Instance, 
                   "{Your api key}", 
                    Environment.Live);
```
``` rest
// The header information includes the api key and the environment (sandbox in this example)
curl -X GET \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: sandbox" \
https://apis.appacitive.com/article/device/find/all
```

Article
=======
Articles represent your data stored inside the Appacitive platform. Every article has a dedicated type. This type is mapped to the schema that you create via the designer in your management console. If we were to use conventional databases as a metaphor, then a schema would correspond to a table and an article would correspond to one row inside that table.

The article api allows you to store, retreive and manage all the data that you store inside appacitive. You can retreive individual records or lists of records based on a specific filter criteria.

Article object
------------

** System generated attributes ** 

* **``__id``** : Unique time-series <a href="http://en.wikipedia.org/wiki/Monotonic_function">monotonic</a> id automatically assigned by the system on creation. This is immutable. 
* **``__schematype``** : The type of the article as per the schema structure designed by you via the schema designer.
* **``__createdby``** : The id of the user that created the article. Incase a user token is provided during creation, then the created by will use the id of the corresponding user. The client can alternatively also provide this in the request.
* **``__lastmodifiedby``** : The id of the user that last updated the article. The id of the user that updated the article. Incase a user token is provided during creation, then the created by will use the id of the corresponding user. The client can alternatively also provide this in the request.
* **``__revision``** : The revision number of the article. This is incremented on every update and is used to provide <a href="http://en.wikipedia.org/wiki/Multiversion_concurrency_control">multi version concurrency control</a> incase of concurrent updates on the same article.
* **``__tags``** : This is an array of strings that you can use to "tag" specific articles. These tags can be used to search specific articles.
* **``__utcdatecreated``** : The timestamp of the time when the article was created, stored in ISO 8601 format with millisecond precision (YYYY-MM-DDTHH:MM:SS.MMMZ).
* **``__utclastupdateddate``** : The timestamp of the time when the article was last updated, stored in ISO 8601 format with millisecond precision (YYYY-MM-DDTHH:MM:SS.MMMZ).
* **``__attributes``** : List of key value pair values that can be stored with the article and are not validated by the schema definition.

** User defined properties ** 

User defined properties are fields defined by you via the schema designer. These are exposed as fields directly on the article object.

``` rest 
{
  // system properties
  "__id": "24208366452736268",
  "__schematype": "score",
  "__createdby": "42241231222736268",
  "__lastmodifiedby": "42241231222736268",
  "__revision": "2",
  "__tags": [],
  "__utcdatecreated": "2013-04-25T05:01:37.0000000Z",
  "__utclastupdateddate": "2013-04-25T05:02:01.0000000Z",

  // user defined properties 
  "difficulty": "normal",
  "score": "1400",
  "level": "10",
  
  // attributes
  "__attributes": {
    "is_first_time_user" : "true",
    "has_verified" : "false"
  }
}
```

``` csharp 
Article score = new Article("score");
score.Set<string>("difficulty", "normal");
score.Set<int>("level", 10);
score.Set<long>("score", 1400);
score.SetAttribute("is_first_time_user", "true");
score.SetAttribute("has_verified", "false");
```

``` javascript
var score = new Appacitive.Article({ schema: 'score' });
score.set('difficulty', 'normal');
score.set('level', 10);
score.set('score', 1400);
score.attr('is_first_time_user', 'true');
score.attr('has_verified', 'false');
```

Create a new article
------------

Creates a new article of a specific type.

```nolang
<span class="h5">METHOD</span>
```
``` rest
PUT https://apis.appacitive.com/article/{type}
```
``` csharp
Appacitive.SDK.Article.SaveAsync()
```
``` javascript
Appacitive.Article.save()
```

```nolang
<span class="h4">SAMPLE REQUEST</span>
```
``` rest
// Create an article of type score
curl -X PUT \
-H "Appacitive-Apikey: aY+tExrAJi9K+oorsVq5d3UT/HMi1wAYSEI04qvJwHA=" \
-H "Appacitive-Environment: sandbox" \
-H "Content-Type: application/json" \
-d '{ "title" : "test", "text" : "This is a test post.",
"__attributes" : { "has_verified" : "false" }}' \
https://apis.appacitive.com/article/post
```
``` csharp
var post = new Article("post");
post.Set<string>("title", "sample post");
post.Set<string>("text", "This is a sample post.");
post.SetAttribute("has_verified", "false");
await post.SaveAsync();
```
``` javascript
var post = new Appacitive.Article({ schema: 'post' });
player.set('title', 'sample post');
player.set('text', 'This is a sample post.');
player.save(function(){
  alert('new post saved successfully!');
}, function(status){
  alert('error while saving!');
});
```
```nolang
<span class="h4">SAMPLE RESPONSE</span>
```
``` rest
{
  "article": {
    "__id": "33017891581461312",
    "__schematype": "post",
    "__createdby": "System",
    "__lastmodifiedby": "System",
    "__schemaid": "23514020251304802",
    "__revision": "1",
    "__tags": [],
    "__utcdatecreated": "2013-07-31T10:45:15.1832474Z",
    "__utclastupdateddate": "2013-07-31T10:45:15.1832474Z",
    "title": "test",
    "text": "This is a test post.",
    "__attributes": {
      "has_verified": "false"
    }
  },
  "status": {
    "code": "200",
    "message": "Successful",
    "faulttype": null,
    "version": null,
    "referenceid": "1febaadd-f889-4b47-b1f9-cdeb63b6f937",
    "additionalmessages": []
  }
}
```
``` csharp
// All system properties (including id) will be populated.
```
``` javascript
// The response callback method would be invoked with the article updated with system properties.
```

Appacitive SDK
=======

Nam erat dolor, consectetur ut laoreet a, eleifend a purus. Ut dictum turpis ac ante eleifend, vitae malesuada massa fermentum. Pellentesque at sem et turpis venenatis ullamcorper. Aliquam convallis tellus enim, sit amet pretium risus dignissim vel. Nulla venenatis enim tortor, semper dignissim risus rutrum viverra. Ut tristique arcu urna, id interdum ipsum euismod volutpat. Maecenas est ante, rutrum ut felis vitae, congue euismod lectus. Etiam dictum ornare fringilla.

Initialize SDK
------------

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus rhoncus quam quis semper. Vivamus at eros in diam eleifend rhoncus non non lorem. Nunc sed vehicula nibh. Nam sed turpis sem. Fusce lectus mi, viverra id felis eu, varius suscipit odio. Sed luctus lectus et turpis euismod laoreet. Donec id lorem eros. Nam lobortis quam nec auctor dictum. Nunc et vehicula tellus. Sed tempor, lacus nec tincidunt sagittis, metus risus dignissim mauris, in vulputate dolor orci nec sapien. Nulla quis consectetur tellus. Duis id posuere orci.

``` javascript
Appacitive.initialize({ 
    apikey: '{Your api key}' /* required */, 
    env: 'live' /* environment live or sandbox, default is live */ 
});
```
``` csharp
//For Windows Phone 7 base app
App.Initialize(WindowsPhone7.WP7.Instance, 
                   "{Your api key}", 
                    Environment.Live);

//For Windows app
App.Initialize(Net45.WindowsHost.Instance, 
                   "{Your api key}", 
                    Environment.Live);
```


Article
------------

Duis at ullamcorper nunc. Sed quis tincidunt lacus, et congue nunc. Duis vitae pharetra justo. Curabitur at ornare nibh, posuere facilisis tortor. Fusce ac consequat ipsum, id vehicula libero. Vivamus malesuada purus eget neque hendrerit dignissim. Suspendisse dignissim sem vitae erat ultrices aliquet. Donec vulputate urna metus, non volutpat ipsum laoreet at. Mauris diam lacus, suscipit consequat lobortis interdum, vulputate ac leo. Praesent quis iaculis mi. Maecenas nec molestie ligula, a tincidunt orci. Proin et nulla diam.


``` javascript
Appacitive.initialize({ 
    apikey: '{Your api key}' /* required */, 
    env: 'live' /* environment live or sandbox, default is live */ 
});
```
``` csharp
//For Windows Phone 7 base app
App.Initialize(WindowsPhone7.WP7.Instance, 
                   "{Your api key}", 
                    Environment.Live);

//For Windows app
App.Initialize(Net45.WindowsHost.Instance, 
                   "{Your api key}", 
                    Environment.Live);
```

### Create

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus rhoncus quam quis semper. Vivamus at eros in diam eleifend rhoncus non non lorem. Nunc sed vehicula nibh. Nam sed turpis sem. Fusce lectus mi, viverra id felis eu, varius suscipit odio.

``` javascript
/*Creating a new article*/
var player = new Appacitive.Article({ schema: 'player' });
player.set('age', 23);
player.save(function(){
  alert('saved successfully!');
}, function(status){
  alert('error while saving!');
});
```
``` csharp
//For Windows Phone 7 base app
var obj = new Article("player"); //the type of schema is 'player'
obj.Set<int>("age", 23);
obj.Set<decimal>("avgrating", 22m / 7m);
await obj.SaveAsync();

//For Windows app
dynamic obj = new Article("player"); //the type of schema is 'player'
obj.age = 23;
obj.avgrating = 22m / 7m;
await obj.SaveAsync();
```


### Update

Duis at ullamcorper nunc. Sed quis tincidunt lacus, et congue nunc. Duis vitae pharetra justo. Curabitur at ornare nibh, posuere facilisis tortor. Fusce ac consequat ipsum, id vehicula libero.

``` javascript
/*Updating the article*/
var player = new Appacitive.Article({ schema: 'player' });
player.set('age', 23);
player.save(function(){
  alert('saved successfully!');
  player.set('age', 24);
  player.save(function(){
    alert('updated successfully!');
  }, function(status){
    alert('error while updating!');
  });
}, function(status){
  alert('error while saving!');
});
```
``` csharp
//For Windows Phone 7 base app
var obj = new Article("player");     
obj.Set<int>("age", 23);
/*Saving the article*/
await obj.SaveAsync();               
obj.Set<int>("age", 24);             
/*Updating the same article*/       
await obj.SaveAsync();               

//For Windows app
dynamic obj = new Article("player"); 
obj.age = 23;
/*Saving the article*/  
await obj.SaveAsync();
obj.age =  24;                       
/*Updating the same article*/         
decimal = avgRating = obj.avgrating; 
```


### Get

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus rhoncus quam quis semper. Vivamus at eros in diam eleifend rhoncus non non lorem. Nunc sed vehicula nibh. Nam sed turpis sem. Fusce lectus mi, viverra id felis eu, varius suscipit odio.


#### Get a Single Article

Duis at ullamcorper nunc. Sed quis tincidunt lacus, et congue nunc. Duis vitae pharetra justo. Curabitur at ornare nibh, posuere facilisis tortor. Fusce ac consequat ipsum, id vehicula libero.

``` javascript
//Retrieve the player
Appacitive.Article.get({ 
    schema: 'player',    //mandatory
    id: '123456678809',  //mandatory
    fields: ["name"]     //optional
}, function(obj) {
    // artice obj is returned as argument to onsuccess
    alert('Fetched player with name: ' + obj.get('name')); 
}, function(err, obj) {
    alert('Could not fetch, probably because of an incorrect id');
});

//Retrieve player by `fetch`
var player = new Appacitive.Article('player');
player.id('123456678809');
player.fetch(function(obj) {
    alert('Fetched player with name: ' + player.get('name'));
}, function(err, obj) {
    alert('Could not fetch, probably because of an incorrect id');
}, ["name", "age"]//optional
);
```
``` csharp
var article = await Articles.GetAsync("friend", 
                                      "123456678809", 
                                      new [] { "__id", "name" });
```


#### Get Multiple Articles

Duis at ullamcorper nunc. Sed quis tincidunt lacus, et congue nunc. Duis vitae pharetra justo. Curabitur at ornare nibh, posuere facilisis tortor. Fusce ac consequat ipsum, id vehicula libero.

``` javascript
//`fields` parameter denotes the fields to be returned 
//in the article object, to avoid increasing the payload
Appacitive.Article.multiGet({ 
    schema: 'players', //mandatory
    ids: ["14696753262625025", "14696753262625026"], //mandatory
    fields: ["name"] //optional
}, function(articles) { 
    // articles is an array of article objects
}, function(err) {
    alert("code:" + err.code + "\nmessage:" + err.message);
});
```
``` csharp
var ids = new[] { "4543212", "79782374", "8734734" };
IEnumerable<Article> articles = await Articles.MultiGetAsync("friend", ids);
```


### Delete

Duis at ullamcorper nunc. Sed quis tincidunt lacus, et congue nunc. Duis vitae pharetra justo. Curabitur at ornare nibh, posuere facilisis tortor. Fusce ac consequat ipsum, id vehicula libero.

``` javascript
/*Single Delete*/
player.del(function(obj) {
    alert('Deleted successfully');
}, function(err, obj) {
    alert('Delete failed')
});

/*Multi Delete*/
Appacitive.Article.multiDelete({    
    schema: 'players', //mandatory
    ids: ["14696753262625025", "14696753262625026"], //mandatory
}, function() { 
    //successfully deleted all articles
}, function(err) {
    alert("code:" + err.code + "\nmessage:" + err.message);
});
```
``` csharp
/*Single Delete*/
await Articles.DeleteAsync("friend", "123456678809");

/*Multi Delete*/
var ids = new [] { "234234", "71231230", "97637282" };
await Articles.MultiDeleteAsync("friend", ids);
```


#### Delete with Connection

Vivamus malesuada purus eget neque hendrerit dignissim. Suspendisse dignissim sem vitae erat ultrices aliquet. Donec vulputate urna metus, non volutpat ipsum 

``` javascript
//Setting the third argument to true will delete its connections if they exist
player.del(function(obj) {
    alert('Deleted successfully');
}, function(err, obj) {
    alert('Delete failed')
}, true); 
```
``` csharp
/*Single Delete with connected articles*/
await Articles.DeleteAsync("friend", "123456678809", true);
```


Connections
------------
Duis at ullamcorper nunc. Sed quis tincidunt lacus, et congue nunc. Duis vitae pharetra justo. Curabitur at ornare nibh, posuere facilisis tortor. Fusce ac consequat ipsum, id vehicula libero. Vivamus malesuada purus eget neque hendrerit dignissim. Suspendisse dignissim sem vitae erat ultrices aliquet. Donec vulputate urna metus, non volutpat ipsum laoreet at. Mauris diam lacus, suscipit consequat lobortis interdum, vulputate ac leo. Praesent quis iaculis mi. Maecenas nec molestie ligula, a tincidunt orci. Proin et nulla diam.


### Create

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus rhoncus quam quis semper. Vivamus at eros in diam eleifend rhoncus non non lorem. Nunc sed vehicula nibh. Nam sed turpis sem. Fusce lectus mi, viverra id felis eu, varius suscipit odio.


#### New Connection between two existing Articles

Duis at ullamcorper nunc. Sed quis tincidunt lacus, et congue nunc. Duis vitae pharetra justo. Curabitur at ornare nibh, posuere facilisis tortor. Fusce ac consequat ipsum, id vehicula libero. Duis at ullamcorper nunc. Sed quis tincidunt lacus, et congue nunc. Duis vitae pharetra justo. Curabitur at ornare nibh, posuere facilisis tortor. Fusce ac consequat ipsum, id vehicula libero. 

``` javascript
//`review` is relation name, 
//`reviewer` and `hotel` are endpoint A and B labels
var connection = new Appacitive.Connection({
                  relation: 'review',
                  endpoints: [{
                      articleid: '123445678',
                      label: 'reviewer'
                  }, {
                      articleid: '987654321',
                      label: 'hotel'
                  }]                
              });
connection.save(function () {
    alert('saved successfully!');
}, function (status) {
    alert('error while saving!');
});
```
``` csharp
//`review` is relation name, 
//`reviewer` and `hotel` are endpoint A and B labels
var connection = Connection
                    .New("review")
                    .FromExistingArticle("reviewer", "123445678")
                    .ToExistingArticle("hotel", "987654321");
await connection .SaveAsync();
```


#### New Connection between existing article and a new article

Duis at ullamcorper nunc. Sed quis tincidunt lacus, et congue nunc. Duis vitae pharetra justo. Curabitur at ornare nibh, posuere facilisis tortor. Fusce ac consequat ipsum, id vehicula libero. Duis at ullamcorper nunc. Sed quis tincidunt lacus, et congue nunc. Duis vitae pharetra justo. Curabitur at ornare nibh, posuere facilisis tortor. Fusce ac consequat ipsum, id vehicula libero. 

``` javascript
/*Creating a new article*/
var player = new Appacitive.Article({ schema: 'player' });
player.set('age', 23);
player.save(function(){
  alert('saved successfully!');
}, function(status){
  alert('error while saving!');
});
```
``` csharp
//Create an instance of Article
var hotelArticle = new Article("hotel");
hotelArticle.Set("name", "Caesar Palace");
//Other hotel properties

var connection = Connection
                    .New("review")
                    .FromExistingArticle("reviewer", "123445678")
                    .ToNewArticle("hotel", hotelArticle);
await connection .SaveAsync();
```


#### New Connection between two new articles

Duis at ullamcorper nunc. Sed quis tincidunt lacus, et congue nunc. Duis vitae pharetra justo. Curabitur at ornare nibh, posuere facilisis tortor. Fusce ac consequat ipsum, id vehicula libero. Duis at ullamcorper nunc. Sed quis tincidunt lacus, et congue nunc. Duis vitae pharetra justo. Curabitur at ornare nibh, posuere facilisis tortor. Fusce ac consequat ipsum, id vehicula libero. 

``` javascript
/*Creating a new article*/
var player = new Appacitive.Article({ schema: 'player' });
player.set('age', 23);
player.save(function(){
  alert('saved successfully!');
}, function(status){
  alert('error while saving!');
});
```
``` csharp
//Create two new articles which needs to be connected
var article1= new Article("schema1");
var article2 = new Article("schema2");

var connection = Connection
                    .New("relationtype")
                    .FromNewArticle("labela", article1)
                    .ToNewArticle("labelb", article2);
await connection.SaveAsync();
```

### Update

Duis at ullamcorper nunc. Sed quis tincidunt lacus, et congue nunc. Duis vitae pharetra justo. Curabitur at ornare nibh, posuere facilisis tortor. Fusce ac consequat ipsum, id vehicula libero.

``` javascript
/*Updating the article*/
var player = new Appacitive.Article({ schema: 'player' });
player.set('age', 23);
player.save(function(){
  alert('saved successfully!');
  player.set('age', 24);
  player.save(function(){
    alert('updated successfully!');
  }, function(status){
    alert('error while updating!');
  });
}, function(status){
  alert('error while saving!');
});
```
``` csharp
//Get the connection object and update the description
var connection = await Connections.GetAsync("review", "1234345");
connection.Set<string>("description", "good hotel");
await connection.SaveAsync();
```

### Get

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus rhoncus quam quis semper. Vivamus at eros in diam eleifend rhoncus non non lorem. Nunc sed vehicula nibh. Nam sed turpis sem. Fusce lectus mi, viverra id felis eu, varius suscipit odio.

#### Get Connection by Id

Duis at ullamcorper nunc. Sed quis tincidunt lacus, et congue nunc. Duis vitae pharetra justo. Curabitur at ornare nibh, posuere facilisis tortor. Fusce ac consequat ipsum, id vehicula libero.

``` javascript
//Retrieve the player
Appacitive.Article.get({ 
    schema: 'player',    //mandatory
    id: '123456678809',  //mandatory
    fields: ["name"]     //optional
}, function(obj) {
    // artice obj is returned as argument to onsuccess
    alert('Fetched player with name: ' + obj.get('name')); 
}, function(err, obj) {
    alert('Could not fetch, probably because of an incorrect id');
});

//Retrieve player by `fetch`
var player = new Appacitive.Article('player');
player.id('123456678809');
player.fetch(function(obj) {
    alert('Fetched player with name: ' + player.get('name'));
}, function(err, obj) {
    alert('Could not fetch, probably because of an incorrect id');
}, ["name", "age"]//optional
);
```
``` csharp
//Single connection by connection id
var connection1 = await Connections.GetAsync("reivew", "12345");
```

#### Get Connection by Endpoint Article Ids

Duis at ullamcorper nunc. Sed quis tincidunt lacus, et congue nunc. Duis vitae pharetra justo. Curabitur at ornare nibh, posuere facilisis tortor. Fusce ac consequat ipsum, id vehicula libero.

``` javascript
//`fields` parameter denotes the fields to be returned 
//in the article object, to avoid increasing the payload
Appacitive.Article.multiGet({ 
    schema: 'players', //mandatory
    ids: ["14696753262625025", "14696753262625026"], //mandatory
    fields: ["name"] //optional
}, function(articles) { 
    // articles is an array of article objects
}, function(err) {
    alert("code:" + err.code + "\nmessage:" + err.message);
});
```
``` csharp
//Single connection by endpoint article ids
var connection2 = await Connections.GetAsync("reivew", 
                                             "22322", "33422");
```

#### Get Connected Articles
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus rhoncus quam quis semper. Vivamus at eros in diam eleifend rhoncus non non lorem. Nunc sed vehicula nibh. Nam sed turpis sem. Fusce lectus mi, viverra id felis eu, varius suscipit odio.

``` javascript
//`fields` parameter denotes the fields to be returned 
//in the article object, to avoid increasing the payload
Appacitive.Article.multiGet({ 
    schema: 'players', //mandatory
    ids: ["14696753262625025", "14696753262625026"], //mandatory
    fields: ["name"] //optional
}, function(articles) { 
    // articles is an array of article objects
}, function(err) {
    alert("code:" + err.code + "\nmessage:" + err.message);
});
```
``` csharp
//Get an instance of Article
var hotel = new Article("123345456");
var response = await hotel.GetConnectedArticlesAsync("review");
```

### Delete
Duis at ullamcorper nunc. Sed quis tincidunt lacus, et congue nunc. Duis vitae pharetra justo. Curabitur at ornare nibh, posuere facilisis tortor. Fusce ac consequat ipsum, id vehicula libero.

``` javascript
/*Single Delete*/
player.del(function(obj) {
    alert('Deleted successfully');
}, function(err, obj) {
    alert('Delete failed')
});

/*Multi Delete*/
Appacitive.Article.multiDelete({    
    schema: 'players', //mandatory
    ids: ["14696753262625025", "14696753262625026"], //mandatory
}, function() { 
    //successfully deleted all articles
}, function(err) {
    alert("code:" + err.code + "\nmessage:" + err.message);
});
```
``` csharp
//Single delete
await Connections.DeleteAsync("review", "123345");

//Multi Delete
var ids = new [] {"123345","3452341"};
await Connections.MultiDeleteAsync("review", ids);
```

Users
------------

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus rhoncus quam quis semper. Vivamus at eros in diam eleifend rhoncus non non lorem. Nunc sed vehicula nibh. Nam sed turpis sem. Fusce lectus mi, viverra id felis eu, varius suscipit odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus rhoncus quam quis semper. Vivamus at eros in diam eleifend rhoncus non non lorem. Nunc sed vehicula nibh. Nam sed turpis sem. Fusce lectus mi, viverra id felis eu, varius suscipit odio. 

### Create

Duis at ullamcorper nunc. Sed quis tincidunt lacus, et congue nunc. Duis vitae pharetra justo. Curabitur at ornare nibh, posuere facilisis tortor. Fusce ac consequat ipsum, id vehicula libero.

``` javascript
//TODO
```
``` csharp
//Create a User
var user = new User
{
    Username = "john.doe",
    FirstName = "John",
    Email = "john.doe@gmail.com",
    Password = "password"
};
await user.SaveAsync();
```


### Update

Duis at ullamcorper nunc. Sed quis tincidunt lacus, et congue nunc. Duis vitae pharetra justo. Curabitur at ornare nibh, posuere facilisis tortor. Fusce ac consequat ipsum, id vehicula libero.

``` javascript
//TODO
```
``` csharp
//Get the user which needs to be updated
var user = await Users.GetByIdAsync("123456");
user.FirstName = "jane";
//Updating custom field 'city'
user.Set<string>("city", "New York"); 
await user.SaveAsync();
```

### Get

Duis at ullamcorper nunc. Sed quis tincidunt lacus, et congue nunc. Duis vitae pharetra justo. Curabitur at ornare nibh, posuere facilisis tortor. Fusce ac consequat ipsum, id vehicula libero.

#### Get User by Id

Duis at ullamcorper nunc. Sed quis tincidunt lacus, et congue nunc. Duis vitae pharetra justo. Curabitur at ornare nibh, posuere facilisis tortor. Fusce ac consequat ipsum, id vehicula libero.

``` javascript
//TODO
```
``` csharp
//Get User by `id`
var user = await Users.GetByIdAsync("123456");

//To get only specific fields (username, firstname and lastname)
var user = await Users.GetByIdAsync("123456", 
                      new [] { "username", "firstname", "lastname" });
```

#### Get User by Username

Duis at ullamcorper nunc. Sed quis tincidunt lacus, et congue nunc. Duis vitae pharetra justo. Curabitur at ornare nibh, posuere facilisis tortor. Fusce ac consequat ipsum, id vehicula libero.

``` javascript
//TODO
```
``` csharp
//Get User by `username`
var user = await Users.GetByUsernameAsync("john.doe");
```

#### Get logged in User

Duis at ullamcorper nunc. Sed quis tincidunt lacus, et congue nunc. Duis vitae pharetra justo. Curabitur at ornare nibh, posuere facilisis tortor. Fusce ac consequat ipsum, id vehicula libero.

``` javascript
//TODO
```
``` csharp
//Get logged in User
var loggedInUser = await Users.GetLoggedInUserAsync();
```

### Search

Duis at ullamcorper nunc. Sed quis tincidunt lacus, et congue nunc. Duis vitae pharetra justo. Curabitur at ornare nibh, posuere facilisis tortor. Fusce ac consequat ipsum, id vehicula libero.

``` javascript
//TODO
```
``` csharp
//Search user by building `Query`
var token = "john";
var query = BooleanOperator.Or(new[]{
                          Query.Property("firstname").Like("*" + token + "*"),
                          Query.Property("lastname").Like("*" + token + "*")
                 });
var users = await Users.FindAllAsync(query.ToString());
```

### Delete

Duis at ullamcorper nunc. Sed quis tincidunt lacus, et congue nunc. Duis vitae pharetra justo. Curabitur at ornare nibh, posuere facilisis tortor. Fusce ac consequat ipsum, id vehicula libero.

``` javascript
//TODO
```
``` csharp
//Delete user by it's `id`
await Users.DeleteUserAsync("1234567");
```

#### Delete with Connection

Vivamus malesuada purus eget neque hendrerit dignissim. Suspendisse dignissim sem vitae erat ultrices aliquet. Donec vulputate urna metus, non volutpat ipsum 

``` javascript
//Setting the third argument to true will delete its connections if they exist
player.del(function(obj) {
    alert('Deleted successfully');
}, function(err, obj) {
    alert('Delete failed')
}, true); 
```
``` csharp
//Delete user with connected articles
await Users.DeleteUserAsync("1234567", true);
```

### Authentication

Duis at ullamcorper nunc. Sed quis tincidunt lacus, et congue nunc. Duis vitae pharetra justo. Curabitur at ornare nibh, posuere facilisis tortor. Fusce ac consequat ipsum, id vehicula libero.


#### Authenticating user by Username and Password

Duis at ullamcorper nunc. Sed quis tincidunt lacus, et congue nunc. Duis vitae pharetra justo. Curabitur at ornare nibh, posuere facilisis tortor. Fusce ac consequat ipsum, id vehicula libero. Duis at ullamcorper nunc. Sed quis tincidunt lacus, et congue nunc. Duis vitae pharetra justo. Curabitur at ornare nibh, posuere facilisis tortor. Fusce ac consequat ipsum, id vehicula libero.

``` javascript
//TODO
```
``` csharp
//Authenticating user by `username` and `password`
var creds = new UsernamePasswordCredentials("username", "password")
{
   TimeoutInSeconds = 15 * 60,
   MaxAttempts = int.MaxValue 
};
 
// Authenticate
var result = await creds.AuthenticateAsync();
User loggedInUser = result.LoggedInUser;
string token = result.UserToken;

//If you want to setup user context for the application you will need to do
var creds = new UsernamePasswordCredentials("username", "password")
{
   TimeoutInSeconds = 15 * 60,
   MaxAttempts = int.MaxValue
};

var userSession = await App.LoginAsync(credentials);
var user = userSession.LoggedInUser;  //Logged in user
```

Files
------------

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus rhoncus quam quis semper. Vivamus at eros in diam eleifend rhoncus non non lorem. Nunc sed vehicula nibh. Nam sed turpis sem. Fusce lectus mi, viverra id felis eu, varius suscipit odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus rhoncus quam quis semper. Vivamus at eros in diam eleifend rhoncus non non lorem. Nunc sed vehicula nibh. Nam sed turpis sem. Fusce lectus mi, viverra id felis eu, varius suscipit odio. 

### Upload

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus rhoncus quam quis semper. Vivamus at eros in diam eleifend rhoncus non non lorem. Nunc sed vehicula nibh. Nam sed turpis sem. Fusce lectus mi, viverra id felis eu, varius suscipit odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce 

``` javascript
//TODO
```
``` csharp
//Upload via Byte Stream
var fileName = "serverFileName.jpg";
var bytes = memoryStream.ToArray();
var upload = new FileUpload("image/jpeg", fileName, 30);
string uploadedFileName = await upload.UploadAsync(bytes);

//Upload via File Path
var upload = new FileUpload("image/jpeg", fileName, 30);
string uploadedFileName = await upload.UploadFileAsync(filePath);

//Custom Upload
//Get the upload url and upload the file
var upload = new FileUpload("image/jpeg");
string uploadUrl = await upload.GetUploadUrlAsync(30);
//Custom logic to upload file
```

### Download

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus rhoncus quam quis semper. Vivamus at eros in diam eleifend rhoncus non non lorem. Nunc sed vehicula nibh. Nam sed turpis sem. Fusce lectus mi, viverra id felis eu, varius suscipit odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce 

``` javascript
//TODO
```
``` csharp
//Three ways to download file
var download = new FileDownload(fileName);

//1: Get the byte stream
var bytes = await download.DownloadAsync();

//2: Download the data and write to a local file
await download.DownloadFileAsync(localFileName);

//3: Get the download URL
var downloadUrl = await download.GetDownloadUrl(30);
//Custom logic to download file
```

Querying Data
------------

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus rhoncus quam quis semper. Vivamus at eros in diam eleifend rhoncus non non lorem. Nunc sed vehicula nibh. Nam sed turpis sem. Fusce lectus mi, viverra id felis eu, varius suscipit odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus rhoncus quam quis semper. Vivamus at eros in diam eleifend rhoncus non non lorem. Nunc sed vehicula nibh. Nam sed turpis sem. Fusce lectus mi, viverra id felis eu, varius suscipit odio. 

### Simple Search

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus rhoncus quam quis semper. Vivamus at eros in diam eleifend rhoncus non non lorem. Nunc sed vehicula nibh. Nam sed turpis sem. Fusce lectus mi, viverra id felis eu, varius suscipit odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce 

``` javascript
//Todo
```
``` csharp
//Build the query
var query = Query.Property("firstname").Equals("John");

//`response` is `PagedList` of `Article`
var reponse = await Articles.FindAllAsync("player", query.ToString());

//Iterating the `response`
var list = new List<Article>();
while (response.Count > 0)
{
     response.ForEach(r => list.Add(r));
     if (response.IsLastPage) break;
     await response.NextPageAsync();
}

//MORE SAMPLES

//First name like "oh"
var likeQuery = Query.Property("firstname").Like("oh");

//First name starts with "jo"
var startWithQuery = Query.Property("firstname").StartsWith("jo");

//Between two dates
var start = DateTime.UtcNow.AddYears(-30);
var end = DateTime.UtcNow.AddYears(-20);
var betweenDatesQuery = Query.Property("birthdate").Between(start, end);

//Greater than a date
var date = DateTime.UtcNow.AddYears(-30);
var greaterThanQuery = Query.Property("birthdate").IsGreaterThan(date);
```


### Compound Search

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus rhoncus quam quis semper. Vivamus at eros in diam eleifend rhoncus non non lorem. Nunc sed vehicula nibh. Nam sed turpis sem. Fusce lectus mi, viverra id felis eu, varius suscipit odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce 

``` javascript
//Todo
```
``` csharp
//Use of `And` and `Or` operators
var center = new Geocode(36.1749687195M, -115.1372222900M);

                   //AND query
var complexQuery = BooleanOperator.And(new[]{
                      //OR query
                      BooleanOperator.Or(new[] { 
                         Query.Property("firstname").StartsWith("jo"),
                         Query.Property("lastname").Like("*oe*")
                      }),
                      Query.Property("location")
                          .WithinCircle(center, 
                                        10.0M, 
                                        DistanceUnit.Miles)
          });
```

### Radial Search

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus rhoncus quam quis semper. Vivamus at eros in diam eleifend rhoncus non non lorem. Nunc sed vehicula nibh. Nam sed turpis sem. Fusce lectus mi, viverra id felis eu, varius suscipit odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce 

``` javascript
//Todo
```
``` csharp
//Search for hotels near Las Vegas in a radius of 10 miles
var center = new Geocode(36.1749687195M, -115.1372222900M);
var radialQuery = Query.Property("location")
                          .WithinCircle(center, 
                                        10.0M, 
                                        DistanceUnit.Miles);
```

### Polygon Search

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus rhoncus quam quis semper. Vivamus at eros in diam eleifend rhoncus non non lorem. Nunc sed vehicula nibh. Nam sed turpis sem. Fusce lectus mi, viverra id felis eu, varius suscipit odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce 

``` javascript
//Todo
```
``` csharp
//Search for hotel which is between 4 co-ordinates
var pt1 = new Geocode(36.1749687195M, -115.1372222900M);
var pt2 = new Geocode(34.1749687195M, -116.1372222900M);
var pt3 = new Geocode(35.1749687195M, -114.1372222900M);
var pt4 = new Geocode(36.1749687195M, -114.1372222900M);
var geocodes = new[] { pt1, pt2, pt3, pt4 };
var polygonQuery = Query.Property("location").WithinPolygon(geocodes);
```