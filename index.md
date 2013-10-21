Appacitive API
=======
All the features available on the Appacitive platform are available via <a href="http://en.wikipedia.org/wiki/Representational_State_Transfer">REST</a> apis over HTTPS. 
These apis follow simple conventions and can be consumed by any rest client of your choice.
<a href="http://en.wikipedia.org/wiki/Cross-origin_resource_sharing">Cross-origin resource sharing (CORS)</a> is 
also enabled on the rest apis to make them easy to consume from web based applications. 

The request and response format of the API is always <a href="http://en.wikipedia.org/wiki/JSON">JSON</a>. Standard error structures in the response will indicate success or failure for any given api request. You can find details of the same in the <a href="http://appacitive-docs.dev/index.html#errors">api conventions</a>.


Endpoints
------------

All appacitive apis are available over HTTPS at ``https://apis.appacitive.com/``.
A quick summary of the different urls is detailed below.

|||
|:---------------|:------------|
| **Article**     | <i>https://apis.appacitive.com/article/{type}/</i>
| **Connection** | <i>https://apis.appacitive.com/connection/{type}/</i>
| **User**       | <i>https://apis.appacitive.com/user/</i>
| **Device**     | <i>https://apis.appacitive.com/device/</i>
| **Graph Search** | <i>https://apis.appacitive.com/search/</i>
| **File**     | <i>https://apis.appacitive.com/file/</i>
| **Email**     | <i>https://apis.appacitive.com/email/</i>
| **Push**     | <i>https://apis.appacitive.com/push/</i>



Request format
------------

The request body for all requests using PUT and POST must be in JSON format with ``Content-Type`` set as ``application/json``.
All authentication and contextual information is sent via http headers. The following http headers are currently supported by the
api.

** Supported HTTP headers **

<dl>
  <dt>appacitive-apikey</dt>
  <dd>required<br/><span>Api key of the app.</span></dd>
  <dt>appacitive-environment</dt>
  <dd>required<br/><span>Environment to be targeted. Valid values are ``live`` and ``sandbox``.</span></dd>
  <dt>appacitive-usersession</dt>
  <dd>optional<br/><span>User session token</span></dd>
</dl>


Response format
------------

The response from the api will always return a JSON object (even in the case of a failure). The success or failure status of the transaction will be returned in the form of a status object. Incase the operation does not return any data then the json response would contain just the status object itself.
The JSON structure of the status object is shown.

** Status object properties **

<dl>
  <dt>code</dt>
  <dd><span>``2xx`` (``200`` or ``201``) incase of success. Incase a resource is created as a side effect of the operation, then the status code returned is ``201``. In case of failure, a non 2xx error code would returned.</span></dd>
  <dt>message</dt>
  <dd><span>Error message incase of an api call failure.</span></dd>
  <dt>referenceid</dt>
  <dd><span>Unique reference id for the transaction for debugging. This reference id can be provided in issues and escalations.</span></dd>
  <dt>additionalmessages</dt>
  <dd><span>Additional messages incase of a failure.</span></dd>
</dl>

**Note**: The http status code for the response will always be returned as ``200``.

```rest
$$$Status object
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

** HTTP Headers **
<dl>
  <dt>appacitive-apikey</dt>
  <dd><span>Http header for the api key.</span></dd>
  <dt>appacitive-environment</dt>
  <dd><span>Environment to target. Valid values are ``live`` and ``sandbox``</span></dd>
</dl>


``` javascript
Appacitive.initialize({ 
    apikey: '{Your api key}' /* required */, 
    env: 'live' /* environment live or sandbox, default is live */,
    appId: '{Application Id}' /* can be found on app list page of portal*/
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
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
https://apis.appacitive.com/article/device/find/all
```

Appacitive Modules
=======
In the next few sections we briefly describe some of the basic terms used in Appacitive like articles, connections, users, files etc.

Articles
-------
Articles represent your data stored inside the Appacitive platform. Every article has a dedicated type. This type is mapped to the schema that you create via the designer in your management console. If we were to use conventional databases as a metaphor, then a schema would correspond to a table and an article would correspond to one row inside that table.

The article api allows you to store, retrieve and manage all the data that you store inside appacitive. You can retrieve individual records or lists of records based on a specific filter criteria.

<span class="h3">The article object</span>

** System generated properties ** 

<dl>
  <dt>\__id</dt>
  <dd><span>Unique time-series strictly <a href="http://en.wikipedia.org/wiki/Monotonic_function">monotonically</a> increasing id automatically assigned by the system on creation. This is immutable.</span></dd>
  <dt>\__schematype</dt>
  <dd><span>The type of the article as per the schema structure designed by you via the schema designer.</span></dd>
  <dt>\__createdby</dt>
  <dd><span>The id of the user that created the article. Incase a user token is provided during creation, then the created by will use the id of the corresponding user. The client can alternatively also provide this in the request.</span></dd>
  <dt>\__lastmodifiedby</dt>
  <dd><span>The id of the user that last updated the article. The id of the user that updated the article. Incase a user token is provided during creation, then the created by will use the id of the corresponding user. The client can alternatively also provide this in the request.</span></dd>
  <dt>\__revision</dt>
  <dd><span>The revision number of the article. This is incremented on every update and is used to provide <a href="http://en.wikipedia.org/wiki/Multiversion_concurrency_control">multi version concurrency control</a> incase of concurrent updates on the same article.</span></dd>
  <dt>\__tags</dt>
  <dd><span>This is an array of strings that you can use to "tag" specific articles. These tags can be used to search specific articles.</span></dd>
  <dt>\__utcdatecreated</dt>
  <dd><span>The timestamp of the time when the article was created, stored in ISO 8601 format with millisecond precision (YYYY-MM-DDTHH:MM:SS.MMMZ).</span></dd>
  <dt>\__utclastupdateddate</dt>
  <dd><span>The timestamp of the time when the article was last updated, stored in ISO 8601 format with millisecond precision (YYYY-MM-DDTHH:MM:SS.MMMZ).</span></dd>
  <dt>\__attributes</dt>
  <dd><span>List of key value pair values that can be stored with the article and are not validated by the schema definition.</span></dd>
</dl>


** User defined properties ** 

User defined properties are fields defined by you via the schema designer. These are exposed as fields directly on the article object.

``` rest
$$$sample object 
{
  // system properties
  "__id": "24208366452736268",
  "__schematype": "score",
  "__createdby": "System",
  "__lastmodifiedby": "System",
  "__revision": "1",  
  "__utcdatecreated": "2013-04-25T05:01:37.0000000Z",
  "__utclastupdateddate": "2013-04-25T05:02:01.0000000Z",

  // user defined properties 
  "difficulty": "normal",
  "score": "1400",
  "level": "10",
  
  // attributes
  "__attributes": {
    "is_first_time_user" : "true",
    "team_color" : "blue"
  },

  // tags
  "__tags": ["amateur","unverified"]
}
```

``` csharp 
Article score = new Article("score");
score.Set<string>("difficulty", "normal");
score.Set<int>("level", 10);
score.Set<long>("score", 1400);
score.SetAttribute("is_first_time_user", "true");
score.SetAttribute("team_color", "blue");
```

``` javascript
var score = new Appacitive.Article({ schema: 'score' });
score.set('difficulty', 'normal');
score.set('level', 10);
score.set('score', 1400);
score.attr('is_first_time_user', 'true');
score.attr('has_verified', 'false');
```


### Create a new article

Creates a new article of a specific type.

** Parameters ** 

<dl>
  <dt>article object</dt>
  <dd>required<br/><span>The article object</span></dd>
</dl>

** Response **

Returns the newly created article object with all the system defined properties (e.g., ``__id``) set.
In case of an error, the `status` object contains details for the failure.

``` rest
$$$Method
PUT https://apis.appacitive.com/article/{type}
```
``` csharp
$$$Method
Appacitive.SDK.Article.SaveAsync();
```
``` javascript
$$$Method
Appacitive.Article::save(successHandler, errorHandler);
```

``` rest
$$$Sample Request
//Create an article of type post
curl -X PUT \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {environment (sandbox or live)}" \
-H "Content-Type: application/json" \
-d '{ "title" : "test", "text" : "This is a test post.", "__attributes" : { "has_verified" : "false" }}' \
https://apis.appacitive.com/article/post
```
``` csharp
$$$Sample Request
var post = new Article("post");
post.Set<string>("title", "sample post");
post.Set<string>("text", "This is a sample post.");
post.SetAttribute("has_verified", "false");
await post.SaveAsync();
```
``` javascript
$$$Sample Request
var post = new Appacitive.Article({ schema: 'post' });
post.set('title', 'sample post');
post.set('text', 'This is a sample post.');
post.save(function(){
  alert('new post saved successfully!');
}, function(status){
  alert('error while saving!');
});
```
``` rest
$$$Sample Response
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

### Retrieve an existing article
The appacitive platform supports retrieving single or multiple articles. All article retrievals on the platform
are done purely on the based of the article id and type. You can also fine tune the exact list of fields that 
you want to be returned. This will allow for fine tuning the size of the message incase you are on a 
low bandwidth connection.

The different scenarios for article retrieval are detailed in the sections below.

#### Retrieve a single article

Returns an existing article from the system. To retrieve an existing article, you will need to provide its 
type and its system defined id.

** Parameters ** 

<dl>
  <dt>type</dt>
  <dd>required<br/><span>The type of the article to be retrieved</span></dd>
  <dt>id</dt>
  <dd>required<br/><span>The system generated id for the article</span></dd>
  <dt>fields</dt>
  <dd>optional<br/><span>Comma separated list of properties to be returned.</span></dd>
</dl>

** Response **

Returns the existing article object matching the given id.
In case of an error, the `status` object contains details for the failure.

``` rest
$$$Method
GET https://apis.appacitive.com/article/{type}/{id}?fields={comma separated list of fields}
```
``` rest
$$$Sample Request
//Get article of type post with id 33017891581461312
curl -X GET \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
https://apis.appacitive.com/article/post/33017891581461312
```
``` rest
$$$Sample Response
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
$$$Method
public static async Task<Article> Appacitive.SDK.Articles.GetAsync(
  string type, 
  string id, 
  IEnumerable<string> fields = null
)
```
``` csharp
$$$Sample Request
var post = await Articles.GetAsync("post", "33017891581461312");
Console.WriteLine("Fetched post with title {0} and text {1}.",
  post.Get<string>("title"),
  post.Get<string>("text")
  );
```

``` javascript
$$$Method
Appacitive.Article.get({
  schema: 'type',    //mandatory
  id: 'articleId',   //mandatory
  fields: []         //optional
}, successHandler, errorHandler);
```
``` javascript
$$$Sample Request
Appacitive.Article.get({ 
    schema: 'post',
    id: '33017891581461312',
    fields: ['title']
}, function(obj) {
    // article obj is returned as argument to onsuccess
    alert('Fetched post with title: ' + obj.get('title')); 
}, function(err, obj) {
    alert('Could not fetch, probably because of an incorrect id');
});


//Retrieve post by `fetch`
var post = new Appacitive.Article('post');
post.id('33017891581461312');
post.fields(['title','text']);

post.fetch(function(obj) {
    alert('Fetched post with title: ' + post.get('title'));
}, function(err, obj) {
    alert('Could not fetch, probably because of an incorrect id');
});
```

#### Retrieve multiple article 

Returns an list of multiple existing articles from the system. To get a list of articles you 
must provide the type of the article and a list of ids to retrieve. Given that only one type is allowed,
the list of ids must correspond to articles of the same type.

** Parameters ** 

<dl>
  <dt>type</dt>
  <dd>required<br/><span>The type of the article to be retrieved.</span></dd>
  <dt>id list</dt>
  <dd>required<br/><span>Comma separated list of article ids to retrieve.</span></dd>
  <dt>fields</dt>
  <dd>optional<br/><span>Comma separated list of properties to be returned.</span></dd>
</dl>

** Response **

Returns an array of article corresponding to the given id list. 
In case of an error, the `status` object contains details for the failure.

`NOTE` : Please note that providing the same id multiple times will not return duplicates.

``` rest
$$$Method
GET https://apis.appacitive.com/article/{type}/multiget/{comma separated ids}?fields={comma separated list of fields}
```
``` rest
$$$Sample Request
//Get article of type posts with id 33017891581461312 and 33017891581461313
curl -X GET \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
https://apis.appacitive.com/article/post/multiget/33017891581461312,33017891581461313
```
``` rest
$$$Sample Response
{
  "articles": [
    {
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
    {
      "__id": "33017891581461313",
      "__schematype": "post",
      "__createdby": "System",
      "__lastmodifiedby": "System",
      "__schemaid": "23514020251304802",
      "__revision": "1",
      "__tags": [],
      "__utcdatecreated": "2013-07-31T10:45:15.1832474Z",
      "__utclastupdateddate": "2013-07-31T10:45:15.1832474Z",
      "title": "sample",
      "text": "This is a sample post.",
      "__attributes": {
        "has_verified": "false"
      }
    }
  ],
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
$$$Method
public static async Task<IEnumerable<Article>> Appacitive.SDK.Articles.MultiGetAsync(
  string type, 
  IEnumerable<string> idList, 
  IEnumerable<string> fields = null
)
```
``` csharp
$$$Sample Request
var ids = new [] {"33017891581461312", "33017891581461313" };
var posts = await Articles.MultiGetAsync("post", ids);
foreach( var post in posts )
{
  Console.WriteLine("Fetched post with title {0} and text {1}.",
    post.Get<string>("title"),
    post.Get<string>("text")
    );
}
```

``` javascript
$$$Method
Appacitive.Article.multiGet({
  schema: 'type',   //mandatory
  ids: [],          //mandatory
  fields: []        //optional
}, successHandler, errorHandler);
```
``` javascript
$$$Sample Request
Appacitive.Article.multiGet({ 
    schema: 'post',
    ids: ["33017891581461312", "33017891581461313"],
    fields: ["title"]
}, function(posts) { 
    // posts is an array of article objects
}, function(err) {
    alert("code:" + err.code + "\nmessage:" + err.message);
});
```

#### Retrieving only specific fields for an article

The fields parameter allows you to pick and choose the exact properties that you want the system to return in the response.
This applies to both user and system defined properties. The ``__id``,``__schematype`` or ``__relationtype`` fields cannot be filtered 
out using this and will always be returned. To select specific fields you need to pass a list of the fields that you want the system to return.

``` rest
$$$Method
// The fields parameter can be applied to any articles or connections api call.
GET https://apis.appacitive.com/article/{type}/{id}?fields={comma separated list of fields}
```
``` rest
$$$Sample Request
//Get article of type post with id 33017891581461312 with text and title field alone.
curl -X GET \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
https://apis.appacitive.com/article/post/33017891581461312?fields=text,title
```
``` rest
$$$Sample Response
{
  "article": {
    "__id": "33017891581461312",
    "__schematype": "post",
    "title": "test",
    "text": "This is a test post."
  },
  "status": {
    "code": "200",
    "message": "Successful",
    "faulttype": null,
    "version": null,
    "referenceid": "d5675b60-d030-4487-8588-d8935224fb76",
    "additionalmessages": []
  }
}
```

``` csharp
$$$Method
public static async Task<Article> Appacitive.SDK.Articles.GetAsync(
  string type, 
  string id, 
  IEnumerable<string> fields = null
)
```
``` csharp
$$$Sample Request
var fields = new [] { "text", "title"};
var post = await Articles.GetAsync("post", "33017891581461312", fields);
Console.WriteLine("Fetched post with title {0} and text {1}.",
  post.Get<string>("title"),
  post.Get<string>("text")
  );
```

``` javascript
$$$Method
Appacitive.Article.get({
  schema: 'type',    //mandatory
  id: 'articleId',   //mandatory
  fields: []         //optional
}, successHandler, errorHandler);
```
``` javascript
$$$Sample Request
Appacitive.Article.get({ 
    schema: 'post',
    id: '33017891581461312',
    fields: ['title','text']
}, function(obj) {
    // article obj is returned as argument to onsuccess
    alert('Fetched post with title: ' + obj.get('title')); 
}, function(err, obj) {
    alert('Could not fetch, probably because of an incorrect id');
});
```

### Update an article

To update an existing article, you need to provide the type and id of the article
along with the list of updates that are to be made. As the Appacitive platform supports partial updates,
and update only needs the information that has actually changed.

** Parameters ** 

<dl>
  <dt>type</dt>
  <dd>required<br/><span>The type of the article</span></dd>
  <dt>id</dt>
  <dd>required<br/><span>The system generated id of the article</span></dd>
  <dt>article updates</dt>
  <dd>required<br/><span>The article object with the fields to be updated.</span></dd>
  <dt>revision</dt>
  <dd>optional<br/><span>The revision of the article. Incase the revision does not match on the server, the call will fail.</span></dd>
</dl>

** Response **

Returns the updated article object.
In case of an error, the `status` object contains details for the failure.


``` rest
$$$Method
POST https://apis.appacitive.com/article/{type}/{id}?revision={current revision}
```
``` rest
$$$Sample Request
// Will update the article of type post with id 33017891581461312
// Updates include
// - title and text fields
// - adding a new attribute called topic
// - adding and removing tags.

curl -X POST \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Content-Type: application/json" \
-d '{ "title" : "updated title", "text" : "This is updated text for the post.", "__attributes" : { "topic" : "testing" }, "__addtags" : ["tagA", "tagB"], "__removetags" : ["tagC"]}' \
https://apis.appacitive.com/article/post/33017891581461312
```
``` rest
$$$Sample Response
{
  "article": {
    "__id": "33017891581461312",
    "__schematype": "post",
    "__createdby": "System",
    "__lastmodifiedby": "System",
    "__schemaid": "23514020251304802",
    // revision number incremented
    "__revision": "2",
    "__tags": [
      // newly added tags
      "tagA",
      "tagB"
    ],
    "__utcdatecreated": "2013-07-31T10:45:15.1832474Z",
    "__utclastupdateddate": "2013-08-06T20:47:19.8779616Z",
    // updated properties
    "title": "updated title",
    "text": "This is updated text for the post.",
    "__attributes": {
      // existing attribute
      "has_verified": "false",
      // newly added attribute
      "topic": "testing"
    }
  },
  "status": {
    "code": "200",
    "message": "Successful",
    "faulttype": null,
    "version": null,
    "referenceid": "363556a8-3786-4b6c-8dd0-e627b9205e65",
    "additionalmessages": []
  }
}
```

``` csharp
$$$Method
public static async Task Appacitive.SDK.Article.SaveAsync(int revision = 0)
```
``` csharp
$$$Sample Request
// Incase the article is not already retrieved from the system, 
// simply create a new instance of an article with the id. 
// This creates a "handle" to the object on the client
// without actually retrieving the data from the server.
// Simply update the fields that you want to update and invoke SaveAsync(). 

// This will simply create a handle or reference to the existing article.
var post = new Article("post", "33017891581461312");

// Update properties
post.Set<string>("title", "updated title");
post.Set<string>("text", "This is updated text for the post.");
// Add a new attribute
post.SetAttribute("topic", "testing");
// Add/remove tags
post.AddTags( new [] { "tagA", "tagB"});
post.RemoveTag( "tagC");

await post.SaveAsync();
```
``` csharp
$$$Note
After the save, the existing post article would be updated with the latest values
of all the fields.
```

``` javascript
$$$Method
Appacitive.Article::save(successHandler, errorHandler);
```
``` javascript
$$$Sample Request
var post = new Appacitive.Article({ schema: 'post', __id: '33017891581461312' });

// Update properties
post.set('title', 'updated title');
post.set('text', 'This is updated text for the post.');
// Add a new attribute
post.attr('topic', 'testing');
// Add/remove tags
post.addTag('tagA');
post.removeTag('tagC');

post.save(function(){
  alert('updated successfully!');
}, function(status){
  alert('error while updating!');
});
```


### Delete an article

You can delete existing articles by simply providing the article id of the article tht you want to delete.
This operation will fail if the article has existing connections with other articles.

** Parameters ** 

<dl>
  <dt>type</dt>
  <dd>required<br/><span>The type of the article to be retrieved</span></dd>
  <dt>id</dt>
  <dd>required<br/><span>The system generated id for the article</span></dd>
</dl>

** Response **

Returns successful `status` object.
In case of an error, the `status` object contains details for the failure.


``` rest
$$$Method
DELETE https://apis.appacitive.com/article/{type}/{id}
```
``` rest
$$$Sample Request
// Will delete the article of type player with the id 123456678809

curl -X DELETE \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Appacitive-Apikey: {Your api key}" \
https://apis.appacitive.com/article/player/123456678809

```
``` rest
$$$Sample Response
{
  "code": "200",
  "message": "Successful",
  "faulttype": null,
  "version": null,
  "referenceid": "d8740cfc-f669-443c-9d6d-f3204fd65ab3",
  "additionalmessages": []
}
```

``` javascript
/* Delete a single article */
player.del(function(obj) {
    alert('Deleted successfully');
}, function(err, obj) {
    alert('Delete failed')
});

```
``` csharp
/* Delete a single article */
await Articles.DeleteAsync("player", "123456678809");
```

#### Delete multiple articles
Incase you want to delete multiple articles, simply pass a comma separated list of the ids of the articles that you want to delete.
Do note that all the articles should be of the same type and must not be connected with any other articles.

** Parameters ** 

<dl>
  <dt>type</dt>
  <dd>required<br/><span>The type of the article to be retrieved</span></dd>
  <dt>id list</dt>
  <dd>required<br/><span>List of ids for the articles to be deleted</span></dd>
</dl>

** Response **

Returns successful `status` object.
In case of an error, the `status` object contains details for the failure.


``` rest
$$$Method
POST https://apis.appacitive.com/article/{type}/bulkdelete
```
``` rest
$$$Sample Request
// Will delete players with the ids 14696753262625025 and 14696753262625026.

curl -X POST \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Appacitive-Apikey: {Your api key}" \
-d '{"idlist":["14696753262625025","14696753262625026"]}' \
https://apis.appacitive.com/article/player/bulkdelete

```
``` rest
$$$Sample Response
{
  "code": "200",
  "message": "Successful",
  "faulttype": null,
  "version": null,
  "referenceid": "ece1f32e-3590-4514-a73d-1d9662049010",
  "additionalmessages": []
}
```
``` javascript
/*  Delete multiple articles. */
Appacitive.Article.multiDelete({    
    schema: 'player', //mandatory
    ids: ["14696753262625025", "14696753262625026"], //mandatory
}, function() { 
    //successfully deleted all articles
}, function(err) {
    alert("code:" + err.code + "\nmessage:" + err.message);
});
```
``` csharp
/*  Delete multiple articles. */
var ids = new [] { "14696753262625025", "14696753262625026" };
await Articles.MultiDeleteAsync("player", ids);
```
#### Delete with Connection

There are scenarios where you might want to delete an article irrespective of existing connections. To do this in the delete operation, you need to explicitly indicate that you want to delete any existing connectons as well. This will cause the delete operation to delete any existing connections along with the specified article.

`NOTE`: This override is not available when deleting multiple articles in a single operation.

** Parameters ** 

<dl>
  <dt>type</dt>
  <dd>required<br/><span>The type of the article to be retrieved</span></dd>
  <dt>id</dt>
  <dd>required<br/><span>The system generated id for the article</span></dd>
</dl>

** Response **

Returns successful `status` object.
In case of an error, the `status` object contains details for the failure.


``` rest
$$$Method
DELETE https://apis.appacitive.com/article/{type}/{id}?deleteconnections=true
```
``` rest
$$$Sample Request
// Will delete the article of type player with the id 123456678809
curl -X DELETE \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Appacitive-Apikey: {Your api key}" \
https://apis.appacitive.com/article/player/123456678809?deleteconnections=true

```
``` rest
$$$Sample Response
{
  "code": "200",
  "message": "Successful",
  "faulttype": null,
  "version": null,
  "referenceid": "d8740cfc-f669-443c-9d6d-f3204fd65ab3",
  "additionalmessages": []
}
```
``` javascript
//Setting the third argument to true will delete its connections if they exist
player.del(function(obj) {
    alert('Deleted successfully');
}, function(err, obj) {
    alert('Delete failed')
}, true); 
```
``` csharp
/* Single Delete with connected articles */
var deleteConnection = true;
await Articles.DeleteAsync("friend", "123456678809", deleteConnection);
```


Connections
------------
Connections represent business relationships between articles. As an example, a `employment` connection between a user article and a company article would indicate an relationship of "employment". In a typical relational database, linkages between data are represented via foreign key relationships. Connections are similar to foreign key relationships to the extent that they connect two articles. However, unlike foreign keys, connections can also define properties and store data just like articles. In the `employment` connection example we took earlier, the connection could contain a property called `joining_date` which would store the date the employee joined the company. This data is only relevant as long as the connection is relevant. 

Just like articles, every connection also has a dedicated type. This type is called a `Relation` and is defined using the designer in your management console. 

The connections api allows you to store, retrieve and manage connections between articles. It also allows you to query for connected data based on existing connections.

<span class="h3">The connection object</span>

** Endpoint **

The connection object will contain two endpoints representing the  articles that it is connecting. 
The contents of the endpoints are detailed below.
<dl style="border-bottom: none;">
  <dt>label</dt>
  <dd><span>The name of the endpoint in the connection.</span></dd>
  <dt>type</dt>
  <dd><span>The type of the article referred in the endpoint.</span></dd>
  <dt>articleid</dt>
  <dd><span>The id of article referred in the endpoint.</span></dd>
</dl>

`NOTE`: The endpoint names `__endpointa` and `__endpointb` are interchangable. Do NOT use them to refer to the endpoint.
Do use the label of the endpoint to identify the correct endpoint.

** System generated properties ** 

<dl>
  <dt>\__id</dt>
  <dd><span>Unique time-series strictly <a href="http://en.wikipedia.org/wiki/Monotonic_function">monotonically</a> increasing id automatically assigned by the system on creation. This is immutable.</span></dd>
  <dt>\__relationtype</dt>
  <dd><span>The type of the connection as per the relation structure designed by you via the model designer.</span></dd>
  <dt>\__createdby</dt>
  <dd><span>The id of the user that created the connection. Incase a user token is provided during creation, then the created by will use the id of the corresponding user. The client can alternatively also provide this in the request.</span></dd>
  <dt>\__lastmodifiedby</dt>
  <dd><span>The id of the user that last updated the connection. The id of the user that updated the connection. Incase a user token is provided during creation, then the created by will use the id of the corresponding user. The client can alternatively also provide this in the request.</span></dd>
  <dt>\__revision</dt>
  <dd><span>The revision number of the connection. This is incremented on every update and is used to provide <a href="http://en.wikipedia.org/wiki/Multiversion_concurrency_control">multi version concurrency control</a> incase of concurrent updates on the same connection.</span></dd>
  <dt>\__tags</dt>
  <dd><span>This is an array of strings that you can use to "tag" specific connections. These tags can be used to search specific connections.</span></dd>
  <dt>\__utcdatecreated</dt>
  <dd><span>The timestamp of the time when the connection was created, stored in ISO 8601 format with millisecond precision (YYYY-MM-DDTHH:MM:SS.MMMZ).</span></dd>
  <dt>\__utclastupdateddate</dt>
  <dd><span>The timestamp of the time when the connection was last updated, stored in ISO 8601 format with millisecond precision (YYYY-MM-DDTHH:MM:SS.MMMZ).</span></dd>
  <dt>\__attributes</dt>
  <dd><span>List of key value pair values that can be stored with the connection and are not validated by the relation definition.</span></dd>
</dl>

** User defined properties ** 

User defined properties are fields defined by you via the model designer. These are exposed as fields directly on the connection object.

``` rest
$$$sample object 
{
    // endpoints
    "__endpointa": {
      "label": "employer",
      "type": "company",
      "articleid": "37266319911026961"
    },
    "__endpointb": {
      "label": "employee",
      "type": "user",
      "articleid": "37266320027419512"
    },

    // system properties
    "__id": "37266320704799820",
    "__relationtype": "employment",
    "__createdby": "System",
    "__lastmodifiedby": "System",
    "__revision": "1",
    "__tags": [],
    "__utcdatecreated": "2013-09-16T08:12:15.4798000Z",
    "__utclastupdateddate": "2013-09-16T08:12:15.4798000Z",
    
    // user defined properties 
    "joining_date" : "2013-09-16",

    // attributes
    "__attributes": {},

    // tags
    "__tags": ["amateur","unverified"]
    
}
```
``` csharp
    var conn = Connection
                    .New("employment")
                    .FromExistingArticle("employee", "21317231283123")
                    .ToExistingArticle("employer", "716238712836");
    conn.Set<DateTime>("joining_date", new DateTime(2012,1,1));
```
### Create a new connection

The Appacitive platform supports creating connections between existing as well as new articles. 
The different scenarios that are supported when creating a new connection are detailed in the sections below.


#### Create a connection between two existing articles

To create a connection between two existing articles, you need to pass the connection object with the article ids in the specific endpoints. You can also specify the connection properties that you would like to set when creating the connection.

** Parameters ** 

<dl>
  <dt>connection object</dt>
  <dd>required<br/><span>The connection object</span></dd>
</dl>

** Response **

Returns the newly created connection object with all the system defined properties (e.g., ``__id``) set.
In case of an error, the `status` object contains details for the failure.


``` rest
$$$Method
PUT https://apis.appacitive.com/connection/{relation type}
```
``` rest
$$$Sample Request
// Will create a new reviewed connection between 
//    * user article with id 123445678 and 
//    * hotel article with id 987654321.
// The reviewed relation defines two endpoints "reviewer" and "hotel" for this information.
curl -X PUT \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Appacitive-Apikey: {Your api key}" \
-d '{"__endpointa":{"label":"reviewer","articleid":"123445678"},"__endpointb":{"label":"hotel","articleid":"987654321"}}' \
https://apis.appacitive.com/connection/reviewed
```
``` rest
$$$Sample Response
{
  "connection": {
    "__id": "37398331888157174",
    "__relationtype": "reviewed",
    "__endpointa": {
      "label": "reviewer",
      "type": "user",
      "articleid": "123445678"
    },
    "__endpointb": {
      "label": "hotel",
      "type": "hotel",
      "articleid": "987654321"
    },
    "__createdby": "System",
    "__lastmodifiedby": "System",
    "__relationid": "27474673757454962",
    "__revision": "1",
    "__tags": [],
    "__utcdatecreated": "2013-09-17T19:10:25.0748000Z",
    "__utclastupdateddate": "2013-09-17T19:10:25.0748000Z",
    "__attributes": {}
  },
  "status": {
    "code": "200",
    "message": "Successful",
    "faulttype": null,
    "version": null,
    "referenceid": "84879761-ca28-49a0-8410-579fbd670473",
    "additionalmessages": []
  }
}
```
``` javascript
//`review` is relation name, 
//`reviewer` and `hotel` are the endpoint labels
var connection = new Appacitive.Connection({
                  relation: 'reviewed',
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

//Optionally you can provide the complete article object
//instead of providing article id, to do so
var connection = new Appacitive.Connection({
                  relation: 'reviewed',
                  endpoints: [{
                      article: reviewerArticle,
                      label: 'reviewer'
                  }, {
                      article: hotelArticle,
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
//`reviewer` and `hotel` are the endpoint labels
var connection = Connection
                    .New("reviewed")
                    .FromExistingArticle("reviewer", "123445678")
                    .ToExistingArticle("hotel", "987654321");
await connection .SaveAsync();

// This can interchangably also be written as 
var connection = Connection
                    .New("reviewed")
                    .FromExistingArticle("hotel", "987654321")
                    .ToExistingArticle("reviewer", "123445678");
await connection .SaveAsync();
```


#### Create a connection between a new and existing article.

In your application, you might want to be able to create a new article and connect it with an existing article 
as part of one transactional operation. The create connection operation allows you to interchangable provide 
either an existing article reference or a completely new article inside the endpoint definition.

If a new article is provided in the request, then the operation will create both the article and the connection 
as part of a single transaction.

``` rest
$$$Method
PUT https://apis.appacitive.com/connection/{relation type}
```
``` rest
$$$Sample Request
// Will create a new my_score connection between 
//    * existing player article with id 123445678 and 
//    * new score article which will also be created when the connection is created.
// The my_score relation defines two endpoints "player" and "score" for this information.
curl -X PUT \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Appacitive-Apikey: {Your api key}" \
-d '{"__endpointa":{"label":"score","article":{"__schematype":"score","points":"150"}},"__endpointb":{"label":"player","articleid":"123445678"}}' \
https://apis.appacitive.com/connection/my_score

```
``` rest
$$$Sample Response
{
  "connection": {
    "__id": "37529356259689055",
    "__relationtype": "my_score",
    "__endpointa": {
      "label": "score",
      "type": "score",
      "articleid": "37529356194677342",
      "article": {
        "__id": "37529356194677342",
        "__schematype": "score",
        "__createdby": "System",
        "__lastmodifiedby": "System",
        "__revision": "1",
        "__tags": [],
        "__utcdatecreated": "2013-09-19T05:52:57.9392000Z",
        "__utclastupdateddate": "2013-09-19T05:52:57.9392000Z",
        "points": "150"
      }
    },
    "__endpointb": {
      "label": "player",
      "type": "player",
      "articleid": "123445678"
    },
    "__createdby": "System",
    "__lastmodifiedby": "System",
    "__relationid": "27474673757454962",
    "__revision": "1",
    "__tags": [],
    "__utcdatecreated": "2013-09-19T05:52:58.0172000Z",
    "__utclastupdateddate": "2013-09-19T05:52:58.0172000Z",
    "__attributes": {}
  },
  "status": {
    "code": "200",
    "message": "Successful",
    "faulttype": null,
    "version": null,
    "referenceid": "b7a7e058-4853-406e-9601-611aa7f38665",
    "additionalmessages": []
  }
}
```
``` javascript
// Will create a new my_score connection between 
//    * existing player article with id 123445678 and 
//    * new score article which will also be created when the connection is created.
// The my_score relation defines two endpoints "player" and "score" for this information.

//Create an instance of an article of type score. 
var score = new Appacitive.Article({ schema: 'score' });
score.set('points', '150');

// existing player article.
var playerId = '123445678';

var connection = new Appacitive.Connection({
                  relation: 'my_scores',
                  endpoints: [{
                      articleid: playerId,
                      label: 'player'
                  }, {
                      article: score,
                      label: 'score'
                  }]                
              });
connection.save(function () {
    alert('saved successfully!');
}, function (status) {
    alert('error while saving!');
});
```
``` csharp
/* Will create a new my_score connection between 
    - existing player article with id 123445678 and 
    - new score article which will also be created when the connection is created.
*/ The my_score relation defines two endpoints "player" and "score" for this information.

//Create an instance of article of type score
var score = new Article("score");
score.Set("points", 150);

var connection = Connection
                    .New("my_scores")
                    .FromExistingArticle("player", "123445678")
                    .ToNewArticle("score", score);
await connection .SaveAsync();

// The id of the score object should now be set since it has also been created on the server.
var scoreId = score.Id;
```


#### Create a connection between two new articles.

As indicated in the earlier example, the create connection operation allows you to pass either an existing article id
or a new article object in its two endpoints. Passing a new article in each of the endpoints will allow you to create 
both the endpoints as well as the connection between the two in a single operation.

``` rest
$$$Method
PUT https://apis.appacitive.com/connection/{relation type}
```
``` rest
$$$Sample Request
// Will create a new my_score connection between 
//    * new player article
//    * new score article
// The my_score relation defines two endpoints "player" and "score" for this information.
curl -X PUT \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Appacitive-Apikey: {Your api key}" \
-d '{"__endpointa":{"label":"score","article":{"__schematype":"score","points":"150"}},"__endpointb":{"label":"player", "article":{"__schematype":"player","name":"sirius"}}}' \
https://apis.appacitive.com/connection/my_score

```
``` rest
$$$Sample Response
{
  "connection": {
    "__id": "41449356194671234",
    "__relationtype": "my_score",
    "__endpointa": {
      "label": "score",
      "type": "score",
      "articleid": "37529356194677342",
      "article": {
        "__id": "37529356194677342",
        "__schematype": "score",
        "__createdby": "System",
        "__lastmodifiedby": "System",
        "__revision": "1",
        "__tags": [],
        "__utcdatecreated": "2013-09-19T05:52:57.9392000Z",
        "__utclastupdateddate": "2013-09-19T05:52:57.9392000Z",
        "points": "150"
      }
    },
    "__endpointb": {
      "label": "player",
      "type": "player",
      "articleid": "37529356194677889",
      "article": {
        "__id": "37529356194677889",
        "__schematype": "player",
        "__createdby": "System",
        "__lastmodifiedby": "System",
        "__revision": "1",
        "__tags": [],
        "__utcdatecreated": "2013-09-19T05:52:57.9392000Z",
        "__utclastupdateddate": "2013-09-19T05:52:57.9392000Z",
        "name": "sirius"
      }
    },
    "__createdby": "System",
    "__lastmodifiedby": "System",
    "__relationid": "27474673757454962",
    "__revision": "1",
    "__tags": [],
    "__utcdatecreated": "2013-09-19T05:52:58.0172000Z",
    "__utclastupdateddate": "2013-09-19T05:52:58.0172000Z",
    "__attributes": {}
  },
  "status": {
    "code": "200",
    "message": "Successful",
    "faulttype": null,
    "version": null,
    "referenceid": "b7a7e058-4853-406e-9601-611aa7f38665",
    "additionalmessages": []
  }
}
```
``` javascript
// Will create a new my_score connection between 
//    * new player article
//    * new score article 
// The my_score relation defines two endpoints "player" and "score" for this information.

//Create an instance of an article of type score. 
var score = new Appacitive.Article({ schema: 'score' });
score.set('points', '150');

// existing player article.
var player = new Appacitive.Article({ schema: 'player' });
player.set('name', 'sirius');

var connection = new Appacitive.Connection({
                  relation: 'my_scores',
                  endpoints: [{
                      article: player,
                      label: 'player'
                  }, {
                      article: score,
                      label: 'score'
                  }]                
              });
connection.save(function () {
    alert('saved successfully!');
}, function (status) {
    alert('error while saving!');
});
```
``` csharp
/* Will create a new my_score connection between 
    - existing player article with id 123445678 and 
    - new score article which will also be created when the connection is created.
  The my_score relation defines two endpoints "player" and "score" for this information.
*/ 

//Create an instance of article of type score
var score = new Article("score");
score.Set("points", 150);

//Create an instance of article of type player
var player = new Article("player");
score.Set("name", "sirius");

var connection = Connection
                    .New("my_scores")
                    .FromExistingArticle("player", player)
                    .ToNewArticle("score", score);
await connection .SaveAsync();

// The ids of the score and player objects will now be available.
var scoreId = score.Id;
var playerId = player.Id;
```
### Retrieve an existing connection

The appacitive platform allows you to get connections in 3 ways depending on the usecase for your application.
The section below detail out each of the 3 scenarios.

#### Retrieve a single connection by id

Returns a single connection specified by id. To get a single connection you need to specify it's id and type.

** Parameters ** 

<dl>
  <dt>type</dt>
  <dd>required<br/><span>The type of the connection to be retrieved</span></dd>
  <dt>id</dt>
  <dd>required<br/><span>The system generated id for the connection</span></dd>
  <dt>fields</dt>
  <dd>optional<br/><span>Comma separated list of properties to be returned.</span></dd>
</dl>

** Response **

Returns the existing connection object matching the given id.
In case of an error, the `status` object contains details for the failure.

``` rest
$$$Method
GET https://apis.appacitive.com/connection/{type}/{id}?fields={(optional) comma separated list of fields}
```
``` rest
$$$Sample Request
curl -X GET \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
https://apis.appacitive.com/connection/reviewed/33017891581461312
```
``` rest
$$$Sample Response
{
  "connection": {
    "__id": "33017891581461312",
    "__relationtype": "reviewed",
    
    "__endpointa": {
      "label": "hotel",
      "type": "hotel",
      "articleid": "37266379552981902"
    },
    "__endpointb": {
      "label": "reviewer",
      "type": "user",
      "articleid": "37266380289082256"
    },
    "__createdby": "System",
    "__lastmodifiedby": "System",
    "__relationid": "25394030771831308",
    "__revision": "2",
    "__utcdatecreated": "2013-09-16T08:13:10.0000000Z",
    "__utclastupdateddate": "2013-09-23T01:09:12.6510000Z",
    "__attributes": {}
  },
  "status": {
    "code": "200",
    "message": "Successful",
    "faulttype": null,
    "version": null,
    "referenceid": "24877b7e-b6ec-4d3d-81dd-c691087b4893",
    "additionalmessages": []
  }
}
```
``` javascript
//Get the connection object and update the description
Appacitive.Connection.get({ 
    relation: 'reviewed',       //mandatory
    id: '33017891581461312'     //mandatory
}, function(obj) {
    // connection obj is returned as argument to onsuccess
    alert('review connection fetched successfully.');
}, function(err, obj) {
    alert('Could not fetch, probably because of an incorrect id');
});
```
``` csharp
//Single connection by connection id
var conn = await Connections.GetAsync("review", "33017891581461312");
```

#### Retrieve multiple connections by id

#### Retrieve a single connection via its endpoints

Only a single instance of a connection of a specific type can be created between two article instances.
As a result, a connection can also be uniquely identified by its type and the id pair of its endpoints.
As an example, say you have two users and you want to see if they are friends (by virtue of a "friend" connection between them),
the you can simply try and retrieve that connection by specifying the type as "friend" and providing the ids of the two users.

``` javascript
// Try and get an existing friend connection between two users John and Jane

var idForJohn = "22322";
var idForJane = "22322";

Appacitive.Connection.getBetweenArticlesForRelation({ 
    relation: "review", 
    articleAId : idForJohn, 
    articleBId : "idForJane"
}, function(obj){
    // connection obj is returned as argument to onsuccess
    if( obj !== null && obj !== undefined ) {
      alert('John and Jane are friends.');
    } else {
      alert('John and Jane are not friends.');
    }
}, function(err, obj) {
    alert('Could not fetch, probably because of an incorrect id');
});

//For a relation between same schema type and differenct endpoint labels
//'label' parameter becomes mandatory for the get call

//'friend' is the relation between user schema
//and 'me' and 'you' are the endpoint labels
Appacitive.Connection.getBetweenArticlesForRelation({ 
    relation: "friend", 
    articleAId : "22322", 
    articleBId : "33422",
    label : "me"
}, function(obj){
    // connection obj is returned as argument to onsuccess
    alert('Connection fetched successfully');
}, function(err, obj) {
    alert('Could not fetch, probably because of an incorrect id');
});

```
``` csharp
//Single connection by endpoint article ids
var connection2 = await Connections.GetAsync("reivew", 
                                             "22322", "33422");
```

### Update a connection

The endpoint information in a connection is immutable and cannot be modified after a connection has been created.
However, in all other ways, connections behave exactly like articles. All properties, attributes, tags etc
can be updated using the update connection operation. 

To update an existing connection, you need to provide the type and id of the connection along with the list of updates that are to be made. 

The Appacitive platform supports partial updates on connections. As a result, instead of sending the complete connection object, you can send just the fields that have actually changed.

** Parameters ** 

<dl>
  <dt>type</dt>
  <dd>required<br/><span>The type of the connection</span></dd>
  <dt>id</dt>
  <dd>required<br/><span>The system generated id for the connection</span></dd>
  <dt>article updates</dt>
  <dd>required<br/><span>The connection object with the fields to be updated.</span></dd>
  <dt>revision</dt>
  <dd>optional<br/><span>The revision of the article. Incase the revision does not match on the server, the call will fail.</span></dd>
</dl>

** Response **

Returns the updated connection object.
In case of an error, the `status` object contains details for the failure.


``` rest
$$$Method
POST https://apis.appacitive.com/connection/{type}/{id}?revision={current revision}
```
``` rest
$$$Sample Request
// Will update the connection of type employment with id 33017891581461312
// Will set the joining_date property along with some attributes and tags.
// NOTE: Notice the fact that we do not have to send the endpoints.

curl -X POST \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Content-Type: application/json" \
-d '{ "joining_date" : "2012-09-16", "__attributes" : { "topic" : "testing" }, "__addtags" : ["tagA", "tagB"], "__removetags" : ["tagC"]}' \
https://apis.appacitive.com/connection/employment/33017891581461312
```
``` rest
$$$Sample Response
{
  "connection": {
    "__id": "33017891581461312",
    "__relationtype": "employment",
    
    // user defined property (updated)
    "joining_date" : "2012-09-16",

    "__endpointa": {
      "label": "employer",
      "type": "company",
      "articleid": "37266379552981902"
    },
    "__endpointb": {
      "label": "employee",
      "type": "user",
      "articleid": "37266380289082256"
    },
    "__createdby": "System",
    "__lastmodifiedby": "System",
    "__relationid": "25394030771831308",
    "__revision": "2",

    // updated tags
    "__tags": [
      "tagA",
      "tagB"
    ],
    "__utcdatecreated": "2013-09-16T08:13:10.0000000Z",
    "__utclastupdateddate": "2013-09-23T01:09:12.6510000Z",
    "__attributes": {
      // newly added attribute
      "topic": "testing"
    }
  },
  "status": {
    "code": "200",
    "message": "Successful",
    "faulttype": null,
    "version": null,
    "referenceid": "24877b7e-b6ec-4d3d-81dd-c691087b4893",
    "additionalmessages": []
  }
}
```

``` javascript
//Get the connection object and update the description
Appacitive.Article.get({ 
    relation: 'review',    //mandatory
    id: '1234345'          //mandatory
}, function(obj) {
    // connection obj is returned as argument to onsuccess
    obj.set('description','good hotel')
    obj.save(function(){
      alert('review connection saved successfully.');
    }, function(err, obj){
      alert('Save failed for review connection');
    });
}, function(err, obj) {
    alert('Could not fetch, probably because of an incorrect id');
});
```
``` csharp
//Get the connection object and update the description
var connection = await Connections.GetAsync("review", "1234345");
connection.Set<string>("description", "good hotel");
await connection.SaveAsync();
```



#### Get Connected Articles
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus rhoncus quam quis semper. Vivamus at eros in diam eleifend rhoncus non non lorem. Nunc sed vehicula nibh. Nam sed turpis sem. Fusce lectus mi, viverra id felis eu, varius suscipit odio.

``` javascript
//Get an instance of Article
var hotel = new Appacitive.Article({ __id : '123345456', schema : 'hotel');
var connectionCollection = hotel.getConnectedArticles({ relation : 'review' });
connectionCollection.fetch(function(){
  //itirating on the collection
  connectionCollection.forEach(function (connection) {
  }
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
var review = new Appacitive.Connection({relation: 'review', __id : '123123'});
review.del(function(obj) {
    alert('Deleted successfully');
}, function(err, obj) {
    alert('Delete failed')
});

/*Multi Delete*/
Appacitive.Connection.multiDelete({    
    relation: 'reivew', //mandatory
    ids: ["14696753262625025", "14696753262625026"], //mandatory
}, function() { 
    //successfully deleted all connections
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

Users represent your apps' users whose management API's are provided out of the box. 
They are internally simply articles of an inbuilt schema called `user` with added features like authentication, location tracking, password management, session management and third-party social integration using OAuth 1.0 or OAuth 2.0.

`Note` : While working with user API(s) you need to pass an additional http header `Appacitive-User-Auth` with its value set to a valid user session token generated for that user.

<span class="h3">The user object</span>

** System generated properties ** 

The `user` object contains all the `system defined properties` present in an article of any schema. 
It also has some additional `predefined properties` and you can add more properties to the `user` schema the same way you would add properties to any other schema through the management portal. 
The additional predefined properties are as follows.


<dl>
  <dt>username</dt>
  <dd><span>A ```unique``` and ```mandatory``` ```string``` property for storing a username for every user in the system.</span></dd>
  <dt>birthdate</dt>
  <dd><span>A ```non-mandatory``` ```date``` property to store the date of birth of that user.</span></dd>
  <dt>firstname</dt>
  <dd><span>A ```mandatory``` ```string``` property for the firstname of the user.</span></dd>
  <dt>lastname</dt>
  <dd><span>An ```optional``` ```string``` property for the lastname of the user.</span></dd>
  <dt>email</dt>
  <dd><span>An ```optional``` ```string``` property with a email ```regex``` validation on it for storing and managing the users email address.</span></dd>
  <dt>location</dt>
  <dd><span>An ```optional``` ```geography``` property for checkin management and geo-based querying.</span></dd>
  <dt>password</dt>
  <dd><span>A ```masked``` and ```mandatory``` ```string``` property for storing and managing the password for that user.</span></dd>
  <dt>phone</dt>
  <dd><span>An ```optional``` ```string``` property for storing the phone number of the user.</span></dd>
  <dt>isenabled</dt>
  <dd><span>An ```optional``` ```bool``` property which lets you block the user.</span></dd>
  <dt>isonline</dt>
  <dd><span>An ```optional``` ```bool``` property which lets you check whether the user is currently online.</span></dd>
  <dt>connectionid</dt>
  <dd><span>An ```optional``` ```string``` property which lets you manage the bi-directional websocket on the user with real time messaging. For more info check out the RTM docs.</span></dd>
</dl>


``` rest
$$$sample object 
{
	"__id": "34889377044890389",
	"__schematype": "user",
	"__createdby": "System",
	"__lastmodifiedby": "System",
	"__schemaid": "34888670844153416",
	"__revision": "1",
	"__tags": ["tall", "male"],
	"__utcdatecreated": "2013-08-21T02:31:42.8498473Z",
	"__utclastupdateddate": "2013-08-21T02:31:42.8498473Z",
	"username": "john.doe",
	"location": "18.534064,73.899551",
	"email": "john.doe@appacitive.com",
	"firstname": "John",
	"lastname": "Doe",
	"birthdate": "1982-11-17",
	"isenabled": "true",
	"phone": "+91 9041-222-333",
	"__attributes": {
		"company": "appacitive",
		"niche": "ux",
		"gender": "male"
	}
}
```

### Creating a new user

Appacitive provides multiple ways in which new users can be added to your app.
You may choose to use the appacitive's `user management` system alone to manage all of your app's users or additionally integrate with facebook, twitter or any other <a href="http://en.wikipedia.org/wiki/OAuth">OAuth</a> provider for identity management.
Appacitive allows you to link as many OAuth accounts with Appacitive user objects and manage them using Appacitive's user api(s). 
And because `user` objects are internally similar to `article` objects, you can connect a `user` object to other users or articles of other schemas by creating corresponding relations through the management portal.

#### Creating a simple user

Creates a new user in the appacitive system. This user is an independent user in the sppacitive system for your app, in the environment you specify through the `Appacitive-Environment` header, without any linked identites. 
You can link it to a OAuth account later on.
Some basic system properties are mandatory, namely `username`, `firstname` and `password`. The `username` should be unique for every user. 
Every user is assigned a unique `__id` by the system.
All other predefined properties are optional and you may wish to use them according to your app's requirements or add more if required through the management portal.

** Parameters ** 

<dl>
  <dt>user object</dt>
  <dd>required<br/><span>The user object</span></dd>  
</dl>

** HTTP headers **

<dl>
	<dt>Appacitive-Apikey</dt>
	<dd>required<br/><span>The api key for your app.
	<dt>Appacitive-Environment</dt>
	<dd>required<br/><span>Environment to be targeted. Valid values are `live` and `sandbox`.
	<dt>Content-Type</dt>
	<dd>required<br/><span>This should be set to `application/json`.
</dl>

** Response **

Returns the newly created user object with all the system defined properties set like `__id`, `__utcdatecreated`, `__createdby` etc.
In case of an error, the `status` object contains details for the failure.

``` rest
$$$Method
PUT https://apis.appacitive.com/user
```
``` rest
$$$Sample Request
curl -X PUT \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Content-Type: application/json" \
-d '{ "__tags": ["male"], "username": "john.doe", "firstname": "John", "email": "john.doe@appacitive.com", "password": "p@ssw0rd" }' \
https://apis.appacitive.com/user
```
``` rest
$$$Sample Response
{
	"user": {
		"__id": "34889981737698423",
		"__schematype": "user",
		"__createdby": "System",
		"__lastmodifiedby": "System",
		"__schemaid": "34888670847828365",
		"__revision": "1",
		"__tags": [
			"male"
		],
		"__utcdatecreated": "2013-08-21T02:41:19.5142397Z",
		"__utclastupdateddate": "2013-08-21T02:41:19.5142397Z",
		"username": "john.doe",
		"email": "john.doe@appacitive.com",
		"firstname": "John",
		"isenabled": "true",
		"phone": null,
		"__attributes": {}
	},
	"status": {
		"code": "201",
		"message": "Successful",
		"faulttype": null,
		"version": null,
		"referenceid": "1f5ba0c8-b523-485a-9e04-ac924c6e442a",
		"additionalmessages": []
	}
}
```

``` csharp
//Create a User
var user = new User
{
    Username = "john.doe",
    FirstName = "John",
    Email = "john.doe@appacitive.com",
    Password = "p@ssw0rd"
};
await user.SaveAsync();
```

The `__createdby` and `__lastmodifiedby` properties are set to `System`. They will be set to a user id if you use another user's session token to perform actions on this user.
The `__revision` is initially set to 1 when a new user is created. This number gets incremented by 1 everytime you perform a successful update operation on the user object.
`__attributes` are simple string key-value pairs which you can assign to every `user`, `article` and `connection` object. 
The `__tags` object is a list of string tags. You can perform search queries on `__attributes` and `__tags`. 

#### Creating a user with a link to a OAuth 2.0 provider

Creates a new user in the Appacitive system and links it to a facebook account.
Here onwards, the linked identity can be accessed using the `name` of the identity.

** Parameters ** 

<dl>
  <dt>user object</dt>
  <dd>required<br/><span>The user object</span></dd>  
  <dt>`__link` object</dt>
  <dd>required<br/><span>Details about the linked account. These are enclosed inside the user object.</span></dd>  
</dl>

** HTTP headers **

<dl>
	<dt>Appacitive-Apikey</dt>
	<dd>required<br/><span>The api key for your app.
	<dt>Appacitive-Environment</dt>
	<dd>required<br/><span>Environment to be targeted. Valid values are `live` and `sandbox`.
	<dt>Content-Type</dt>
	<dd>required<br/><span>This should be set to `application/json`.
</dl>

``` rest
$$$Method
PUT https://apis.appacitive.com/user/
```
``` rest
$$$Sample Request
//	Create a new user and link it to a facebook account
curl -X PUT \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Content-Type: application/json" \
-d '{ "username": "john.doe", "firstname": "John", "email": "john.doe@appacitive.com", "password": "p@ssw0rd", "__link": { "authtype": "facebook", "accesstoken": "{facebook access token}"	}}' \
https://apis.appacitive.com/user
```
``` rest
$$$Sample Response
{
	"user": {
		"__id": "34889981737698423",
		"__schematype": "user",
		"__createdby": "System",
		"__lastmodifiedby": "System",
		"__schemaid": "34888670847828365",
		"__revision": "1",
		"__tags": [
			"newuser"
		],
		"__utcdatecreated": "2013-08-21T02:41:19.5142397Z",
		"__utclastupdateddate": "2013-08-21T02:41:19.5142397Z",
		"username": "john.doe",
		"email": "john.doe@appacitive.com",
		"firstname": "John",
		"isemailverified": "false",
		"isenabled": "true",
		"phone": null,
		"__attributes": {}
	},
	"status": {
		"code": "201",
		"message": "Successful",
		"faulttype": null,
		"version": null,
		"referenceid": "1f5ba0c8-b523-485a-9e04-ac924c6e442a",
		"additionalmessages": []
	}
}
```
#### Creating a user and link it to a OAuth 1.0 provider

Creates a new user in the Appacitive system and links it to a twitter account. 
If you have already specified the `consumerkey` and `consumersecret` in the management portal, you don't have to pass it again for this call.

** Parameters ** 

<dl>
  <dt>user object</dt>
  <dd>required<br/><span>The user object</span></dd>  
  <dt>`__link` object</dt>
  <dd>required<br/><span>Details about the linked account. This object is sent inside the user object.</span></dd>  
</dl>

** HTTP headers **

<dl>
	<dt>Appacitive-Apikey</dt>
	<dd>required<br/><span>The api key for your app.
	<dt>Appacitive-Environment</dt>
	<dd>required<br/><span>Environment to be targeted. Valid values are `live` and `sandbox`.
	<dt>Content-Type</dt>
	<dd>required<br/><span>This should be set to `application/json`.
</dl>

``` rest
$$$Method
PUT https://apis.appacitive.com/user/
```
``` rest
$$$Sample Request
//Create a new user and link it to a twitter account
curl -X PUT \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Content-Type: application/json" \
-d '{ "username": "john.doe", "firstname": "John", "email": "john.doe@appacitive.com", "password": "p@ssw0rd", "__link": { "authtype": "twitter", "oauthtoken": "{twitter oauth token}", "oauthtokensecret": "{twitter oauth token secret}", "consumerkey": "{twitter consumer key}", "consumersecret": "{twitter consumer secret}"}}' \
https://apis.appacitive.com/user
```
``` rest
$$$Sample Response
{
	"user": {
		"__id": "34889981737698423",
		"__schematype": "user",
		"__createdby": "System",
		"__lastmodifiedby": "System",
		"__schemaid": "34888670847828365",
		"__revision": "1",
		"__tags": [
			"newuser"
		],
		"__utcdatecreated": "2013-08-21T02:41:19.5142397Z",
		"__utclastupdateddate": "2013-08-21T02:41:19.5142397Z",
		"username": "john.doe",
		"email": "john.doe@appacitive.com",
		"firstname": "John",
		"isemailverified": "false",
		"isenabled": "true",
		"phone": null,
		"__attributes": {}
	},
	"status": {
		"code": "201",
		"message": "Successful",
		"faulttype": null,
		"version": null,
		"referenceid": "1f5ba0c8-b523-485a-9e04-ac924c6e442a",
		"additionalmessages": []
	}
}
```

#### Create a user with just the OAuth access token

You can optionally create a new user in the appacitive system with just the OAth access token of the user. 
You can use this option to integrate facebook login in your app.
You need to add an extra property in the request object called `createnew` with its value set to `true`. 
The system will pull the required details about the user from the OAth provider and create a new appacitive user with it.
Note that this is a `POST` HTTP call.

In this example we will use facebook's access token.

** Parameters ** 

<dl>
  <dt>`__link` object</dt>
  <dd>required<br/><span>Details about the linked account</span></dd>  
</dl>

** HTTP headers **

<dl>
	<dt>Appacitive-Apikey</dt>
	<dd>required<br/><span>The api key for your app.
	<dt>Appacitive-Environment</dt>
	<dd>required<br/><span>Environment to be targeted. Valid values are `live` and `sandbox`.
	<dt>Content-Type</dt>
	<dd>required<br/><span>This should be set to `application/json`.
</dl>

``` rest
$$$Method
PUT https://apis.appacitive.com/user/authenticate
```
``` rest
$$$Sample Request
//	Create a new user using the OAuth token
curl -X POST \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Content-Type: application/json" \
-d '{ "type": "facebook", "accesstoken": "{facebook access token}", "createnew": true }' \
https://apis.appacitive.com/user/authenticate
```
``` rest
$$$Sample Response
{
	"user": {
		"__id": "34889981737698423",
		"__schematype": "user",
		"__createdby": "System",
		"__lastmodifiedby": "System",
		"__schemaid": "34888670847828365",
		"__revision": "1",
		"__utcdatecreated": "2013-08-21T02:41:19.5142397Z",
		"__utclastupdateddate": "2013-08-21T02:41:19.5142397Z",
		"username": "john.doe",
		"email": "john.doe@appacitive.com",
		"firstname": "John",,
		"lastname": "Doe",
		"birthdate": "1980-05-20",
		"isemailverified": "false",
		"isenabled": "true",
		"phone": null,
		"__attributes": {}
	},
	"status": {
		"code": "201",
		"message": "Successful",
		"faulttype": null,
		"version": null,
		"referenceid": "1f5ba0c8-b523-485a-9e04-ac924c6e442a",
		"additionalmessages": []
	}
}
```

#### Link account with existing appacitive user.

You can link an existing appacitive user to a social identity provider which works on OAuth 1.0 or OAuth 2.0.

##### Link appacitive user to a OAuth 2.0 account 

** Parameters ** 

<dl>
  <dt>```__link``` object</dt>
  <dd>required<br/><span>Details about the linked account</span></dd>  
</dl>

** HTTP headers **

<dl>
	<dt>Appacitive-Apikey</dt>
	<dd>required<br/><span>The api key for your app.
	<dt>Appacitive-Environment</dt>
	<dd>required<br/><span>Environment to be targeted. Valid values are `live` and `sandbox`.
	<dt>Content-Type</dt>
	<dd>required<br/><span>This should be set to `application/json`.
</dl>

** Response **

The response contains a `status` object which describes the status of the request.

``` rest
$$$Method
POST https://apis.appacitive.com/user/{userId}/link
```
``` rest
$$$Sample Request
//	Link an account to a appacitive user
curl -X PUT \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Content-Type: application/json" \
-d '{ "type": "facebook", "accesstoken": "{facebook access token}" }' \
https://apis.appacitive.com/user/john.doe/link?useridtype=username
```
``` rest
$$$Sample Response
{
	"status": {
		"code": "200",
		"message": "Successful",
		"faulttype": null,
		"version": null,
		"referenceid": "1f5ba0c8-b523-485a-9e04-ac924c6e442a",
		"additionalmessages": []
	}
}
```

##### Link appacitive user to a OAuth 1.0 account

We can link an appacitive user to a twitter account after the user has already been created in appacitive.

** Parameters ** 

<dl>
  <dt>`__link` object</dt>
  <dd>required<br/><span>Details about the linked account</span></dd>  
</dl>

** HTTP headers **

<dl>
	<dt>Appacitive-Apikey</dt>
	<dd>required<br/><span>The api key for your app.
	<dt>Appacitive-Environment</dt>
	<dd>required<br/><span>Environment to be targeted. Valid values are `live` and `sandbox`.
	<dt>Content-Type</dt>
	<dd>required<br/><span>This should be set to `application/json`.
</dl>

** Response **

The response contains a `status` object which describes the status of the request.

``` rest
$$$Method
PUT https://apis.appacitive.com/user/{userId}/link
```
``` rest
$$$Sample Request
//Create a new user
curl -X PUT \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Content-Type: application/json" \
-d '{ "authtype": "twitter", "oauthtoken": "{twitter oauth token}",	"oauthtokensecret": "{twitter oauth token secret}",	"consumerkey": "{twitter consumer key}", "consumersecret": "{twitter consumer secret}" }' \
https://apis.appacitive.com/user/john.doe/link?useridtype=username
```
``` rest
$$$Sample Response
{
	"status": {
		"code": "200",
		"message": "Successful",
		"faulttype": null,
		"version": null,
		"referenceid": "1f5ba0c8-b523-485a-9e04-ac924c6e442a",
		"additionalmessages": []
	}
}
```

#### Delink account with existing appacitive user.

If you no longer want to associate an appacitive user to a OAuth provider, you can delink the account using the linked identity's `name`.

** Parameters ** 

<dl>
  <dt>user id</dt>
  <dd>required<br/><span>A user identifier for the user</span></dd> 
  <dt>name</dt>
  <dd>required<br/><span>The name of the linked identity you want to remove for the user</span></dd>  
</dl>

** HTTP headers **

<dl>
	<dt>Appacitive-Apikey</dt>
	<dd>required<br/><span>The api key for your app.
	<dt>Appacitive-Environment</dt>
	<dd>required<br/><span>Environment to be targeted. Valid values are `live` and `sandbox`.
	<dt>Content-Type</dt>
	<dd>required<br/><span>This should be set to `application/json`.
</dl>

``` rest
$$$Method
POST https://apis.appacitive.com/user/{userId}/{name}/delink
```
``` rest
$$$Sample Request
//Delink OAuth account
curl -X POST \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Content-Type: application/json" \
https://apis.appacitive.com/user/john.doe/facebook/delink?useridtype=username
```
``` rest
$$$Sample Response
{
	"status": {
		"code": "200",
		"message": "Successful",
		"faulttype": null,
		"version": null,
		"referenceid": "1f5ba0c8-b523-485a-9e04-ac924c6e442a",
		"additionalmessages": []
	}
}
```

### Authenticating a user

You need to authenticate the user to the Appacitive API and create a session `token` for the user every time he logs into your app, to make user specefic API calls.
You will pass this session token as a HTTP header called `Appacitive-User-Auth`. The user object is also returned on a successful authentication call.

#### Authenticating user by username and password

** Parameter **

<dl>
	<dt>username</dt>
	<dd>required<br/><span>The unique username for the user.
	<dt>password</dt>
	<dd>required<br/><span>The password associated for the user.
	<dt>expiry</dt>
	<dd>optional<br/><span>An optional integer which specifies the cascading window duration (in minutes) before the created token expires.
	<dt>attempts</dt>
	<dd>optional<br/><span>An optional integer which specifies for how many calls is the token valid for.
</dl>

** HTTP headers **

<dl>
	<dt>Appacitive-Apikey</dt>
	<dd>required<br/><span>The api key for your app.
	<dt>Appacitive-Environment</dt>
	<dd>required<br/><span>Environment to be targeted. Valid values are `live` and `sandbox`.
	<dt>Content-Type</dt>
	<dd>required<br/><span>This should be set to `application/json`.
</dl>

** Response **

A newly generated string session `token`, the `user` object itself and a `status` object are returned.


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
``` rest
$$$Method
POST https://apis.appacitive.com/user/authenticate
```
``` rest
$$$Sample Request
//	Authenticate user with his username and password
curl -X POST \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Content-Type: application/json" \
-d '{ "username": "john.doe", "password": "p@ssw0rd" }' \
https://apis.appacitive.com/user/authenticate
```
``` rest
$$$Sample Response
{
	"token": "SThEdVFBc01ZRlR0N2ZEajRjNGV6UjhDREU1UWNxVURsK0E4bmZUQmYyOVdnbVlIdFhHQjZ6dlRRUkVHNndHSnZUbU42bUR0OUVWdTB3V3NBOFNVa29LMWowMkg1c0trMXZxemFCS2dTaTNJaVpNRlBNKzdSZ3Y5OGlvT2hoRkMzd3dmTU5qcGtNRDN4R0Fzd3JwaU5jTWc1ZlBPclErOXBKN05NZWlXL2JNPQ==",
	"user": {
		"__id": "34912447775245454",
		"__schematype": "user",
		"__createdby": "System",
		"__lastmodifiedby": "System",
		"__schemaid": "34888670847828365",
		"__revision": "1",
		"__tags": [],
		"__utcdatecreated": "2013-08-21T08:38:24.0000000Z",
		"__utclastupdateddate": "2013-08-21T08:38:24.0000000Z",
		"username": "john.doe",
		"email": "john.doe@appacitive.com",
		"firstname": "John",
		"lastname": "Doe",
		"birthdate": "1982-11-17",
		"isemailverified": "false",
		"isenabled": "true",
		"location": "18.534064000000000,73.899551000000000",
		"phone": "9876543210",
		"__attributes": {}
	},
	"status": {
		"code": "200",
		"message": "Successful",
		"faulttype": null,
		"version": null,
		"referenceid": "237a743a-9091-48a4-8433-6643415cb970",
		"additionalmessages": []
	}
}
```

#### Authenticate with OAuth 2.0 access token

You can authenticate a user and generate a session token using a access token from one of his linked identities like facebook.

** Parameter **

<dl>
	<dt>name</dt>
	<dd>required<br/><span>The name of the linked identity.
	<dt>accesstoken</dt>
	<dd>required<br/><span>The access token linked to the user for the linked identity identified by the name above.	
</dl>

** HTTP headers **

<dl>
	<dt>Appacitive-Apikey</dt>
	<dd>required<br/><span>The api key for your app.
	<dt>Appacitive-Environment</dt>
	<dd>required<br/><span>Environment to be targeted. Valid values are `live` and `sandbox`.
	<dt>Content-Type</dt>
	<dd>required<br/><span>This should be set to `application/json`.
</dl>

``` rest
$$$Method
POST https://apis.appacitive.com/user/authenticate
```
``` rest
$$$Sample Request
//	Authenticate user using an access token associate with him in one of his linked identities
curl -X POST \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Content-Type: application/json" \
-d '{ "type": "facebook", "accesstoken": "{facebook access token}" }' \
https://apis.appacitive.com/user/authenticate
```
``` rest
$$$Sample Response
{
	"token": "SThEdVFBc01ZRlR0N2ZEajRjNGV6UjhDREU1UWNxVURsK0E4bmZUQmYyOVdnbVlIdFhHQjZ6dlRRUkVHNndHSnZUbU42bUR0OUVWdTB3V3NBOFNVa29LMWowMkg1c0trMXZxemFCS2dTaTNJaVpNRlBNKzdSZ3Y5OGlvT2hoRkMzd3dmTU5qcGtNRDN4R0Fzd3JwaU5jTWc1ZlBPclErOXBKN05NZWlXL2JNPQ==",
	"user": {
		"__id": "34912447775245454",
		"__schematype": "user",
		"__createdby": "System",
		"__lastmodifiedby": "System",
		"__schemaid": "34888670847828365",
		"__revision": "1",
		"__tags": [],
		"__utcdatecreated": "2013-08-21T08:38:24.0000000Z",
		"__utclastupdateddate": "2013-08-21T08:38:24.0000000Z",
		"username": "john.doe",
		"email": "john.doe@appacitive.com",
		"firstname": "John",
		"lastname": "Doe",
		"birthdate": "1982-11-17",
		"isemailverified": "false",
		"isenabled": "true",
		"location": "18.534064000000000,73.899551000000000",
		"phone": "9876543210",
		"__attributes": {}
	},
	"status": {
		"code": "200",
		"message": "Successful",
		"faulttype": null,
		"version": null,
		"referenceid": "237a743a-9091-48a4-8433-6643415cb970",
		"additionalmessages": []
	}
}
```


#### Authenticate with a OAuth 1.0 access token

The `consumerkey` and `consumersecret` are optional here. 
You can set them up once using the management portal in the social network settings tab.

``` rest
$$$Method
POST https://apis.appacitive.com/user/authenticate
```
``` rest
$$$Sample Request
//	Authenticate user using an access token associate with him in one of his linked identities
curl -X POST \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Content-Type: application/json" \
-d '{ "type": "twitter", "oauthtoken": "{oAuth token}",	"oauthtokensecret": "{oAuth token secret}",	"consumerKey": "{consumer key}", "consumerSecret": "{consumer secret}" }' \
https://apis.appacitive.com/user/authenticate
```
``` rest
$$$Sample Response
{
	"token": "SThEdVFBc01ZRlR0N2ZEajRjNGV6UjhDREU1UWNxVURsK0E4bmZUQmYyOVdnbVlIdFhHQjZ6dlRRUkVHNndHSnZUbU42bUR0OUVWdTB3V3NBOFNVa29LMWowMkg1c0trMXZxemFCS2dTaTNJaVpNRlBNKzdSZ3Y5OGlvT2hoRkMzd3dmTU5qcGtNRDN4R0Fzd3JwaU5jTWc1ZlBPclErOXBKN05NZWlXL2JNPQ==",
	"user": {
		"__id": "34912447775245454",
		"__schematype": "user",
		"__createdby": "System",
		"__lastmodifiedby": "System",
		"__schemaid": "34888670847828365",
		"__revision": "1",
		"__tags": [],
		"__utcdatecreated": "2013-08-21T08:38:24.0000000Z",
		"__utclastupdateddate": "2013-08-21T08:38:24.0000000Z",
		"username": "john.doe",
		"email": "john.doe@appacitive.com",
		"firstname": "John",
		"lastname": "Doe",
		"birthdate": "1982-11-17",
		"isemailverified": "false",
		"isenabled": "true",
		"location": "18.534064000000000,73.899551000000000",
		"phone": "9876543210",
		"__attributes": {}
	},
	"status": {
		"code": "200",
		"message": "Successful",
		"faulttype": null,
		"version": null,
		"referenceid": "237a743a-9091-48a4-8433-6643415cb970",
		"additionalmessages": []
	}
}
```

### Retrieving users

Once a user is created in appacitive, a unique long `__id` is assigned to it and a unique string `username` which you provide is associated with it.
You can access the a specific user for retrieving, updating, deleting etc. using one of three ways, by his `id`, by his `username` or by a session `token` generated for that user.
You can specify what type of user accessing way you are using by passing a query string parameter called `useridtype`. 
The values for `useridtype` can be `id`, `username` and `token` for accessing the user using his unique system generated `__id`, a unique string `username` assigned by you or a generated token using his credentials respectively.
In the absense of the parameter `useridtype`, the system assumes it to be `id`.

This call takes an additional `Appacitive-User-Auth` header with its value set as a valid user token.
The following three example illustrate retrieving the user in the three possible ways. The same pattern applies for other calls like deleting the user or updating the user as well.

#### Get User by Id


** Parameter **

<dl>
	<dt>id</dt>
	<dd>required<br/><span>The long user id assigned to the user by the system.
</dl>

** HTTP headers **

<dl>
	<dt>Appacitive-Apikey</dt>
	<dd>required<br/><span>The api key for your app.
	<dt>Appacitive-Environment</dt>
	<dd>required<br/><span>Environment to be targeted. Valid values are `live` and `sandbox`.
	<dt>Appacitive-User-Auth</dt>
	<dd>required<br/><span>A session token generated for a user.
	<dt>Content-Type</dt>
	<dd>required<br/><span>This should be set to `application/json`.
</dl>

** Response **

The user object is returned if a user exists in the system for your app with the id you supplied.


``` csharp
//Get User by `id`
var user = await Users.GetByIdAsync("1234525435344346");

//To get only specific fields (username, firstname and lastname)
var user = await Users.GetByIdAsync("1234525435344346", 
                      new [] { "username", "firstname", "lastname" });
```
``` rest
$$$Method
GET https://apis.appacitive.com/user/{user Id}
```
``` rest
$$$Sample Request
//	Get user by id
curl -X POST \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Appacitive-User-Auth: {User token}" \
-H "Content-Type: application/json" \
https://apis.appacitive.com/user/34912447775245454
```
``` rest
$$$Sample Response
{
	"user": {
		"__id": "34912447775245454",
		"__schematype": "user",
		"__createdby": "System",
		"__lastmodifiedby": "System",
		"__schemaid": "34888670847828365",
		"__revision": "1",
		"__tags": [],
		"__utcdatecreated": "2013-08-21T08:38:24.0000000Z",
		"__utclastupdateddate": "2013-08-21T08:38:24.0000000Z",
		"username": "john.doe",
		"email": "john.doe@appacitive.com",
		"firstname": "John",
		"lastname": "Doe",
		"birthdate": "1982-11-17",
		"isemailverified": "false",
		"isenabled": "true",
		"location": "18.534064000000000,73.899551000000000",
		"phone": "9876543210",
		"__attributes": {}
	},
	"status": {
		"code": "200",
		"message": "Successful",
		"faulttype": null,
		"version": null,
		"referenceid": "52c15dea-23ff-46cd-9edf-6266e7217271",
		"additionalmessages": []
	}
}
```

#### Get User by username

A user can be retrieved using his unique string `username` which you supplied when creating the user. 
The value of `useridtype` is set to `username`.

** Parameter **

<dl>
	<dt>username</dt>
	<dd>required<br/><span>The string unique username assigned to the user by you while creating the user.
</dl>

** HTTP headers **

<dl>
	<dt>Appacitive-Apikey</dt>
	<dd>required<br/><span>The api key for your app.
	<dt>Appacitive-Environment</dt>
	<dd>required<br/><span>Environment to be targeted. Valid values are `live` and `sandbox`.
	<dt>Appacitive-User-Auth</dt>
	<dd>required<br/><span>A session token generated for a user.
	<dt>Content-Type</dt>
	<dd>required<br/><span>This should be set to `application/json`.
</dl>


``` rest
$$$Method
GET https://apis.appacitive.com/user/{username}?useridtype=username
```
``` rest
$$$Sample Request
//	Get user by username
curl -X POST \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Appacitive-User-Auth: {User token}" \
-H "Content-Type: application/json" \
https://apis.appacitive.com/user/john.doe?useridtype=username
```
``` rest
$$$Sample Response
{
	"user": {
		"__id": "34912447775245454",
		"__schematype": "user",
		"__createdby": "System",
		"__lastmodifiedby": "System",
		"__schemaid": "34888670847828365",
		"__revision": "1",
		"__tags": [],
		"__utcdatecreated": "2013-08-21T08:38:24.0000000Z",
		"__utclastupdateddate": "2013-08-21T08:38:24.0000000Z",
		"username": "john.doe",
		"email": "john.doe@appacitive.com",
		"firstname": "John",
		"lastname": "Doe",
		"birthdate": "1982-11-17",
		"isemailverified": "false",
		"isenabled": "true",
		"location": "18.534064000000000,73.899551000000000",
		"phone": "9876543210",
		"__attributes": {}
	},
	"status": {
		"code": "200",
		"message": "Successful",
		"faulttype": null,
		"version": null,
		"referenceid": "52c15dea-23ff-46cd-9edf-6266e7217271",
		"additionalmessages": []
	}
}
```
``` csharp
//Get User by `username`
var user = await Users.GetByUsernameAsync("john.doe");
```

#### Get user by user token

Here you can get a user by a session token generated for that user using his credentials. 
A valid session token still needs to be passed in the `Appacitive-User-Auth` header, but the user that is returned is the user whose token you pass as the query string parameter `token`.
The `useridtype` query string parameter is set to `token`.

** Parameter **

<dl>
	<dt>token</dt>
	<dd>required<br/><span>A string token generated for the user using his credentials.
</dl>

** HTTP headers **

<dl>
	<dt>Appacitive-Apikey</dt>
	<dd>required<br/><span>The api key for your app.
	<dt>Appacitive-Environment</dt>
	<dd>required<br/><span>Environment to be targeted. Valid values are `live` and `sandbox`.
	<dt>Appacitive-User-Auth</dt>
	<dd>required<br/><span>A session token generated for a user.
	<dt>Content-Type</dt>
	<dd>required<br/><span>This should be set to `application/json`.
</dl>

``` csharp
//	Get logged in User
var loggedInUser = await Users.GetLoggedInUserAsync();
```
``` rest
$$$Method
GET https://apis.appacitive.com/user/me?useridtype=token&token={user token}
```
``` rest
$$$Sample Request
//	Retrieve user with his session token
curl -X POST \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Appacitive-User-Auth: {User token}" \
-H "Content-Type: application/json" \
https://apis.appacitive.com/user/me?useridtype=token&token=K2liWXVlSHZ0elNESUloTFlLRE5EQ2lzWXZtM0FFL0JxYW01WTBtVFlmTHZ6aHFMaWtEKzRUdlRRUkVHNndHSnZUbU42bUR0OUVWdTB3V3NBOFNVa2kvekJpTUZGYyt2ZEFTVi9mbGdNN2xRaEZuWUJidVByR3lFMkZlTzNrRHV3cldVUFRNbFA5M3B6NFN5Rkd3K1dNTWc1ZlBPclErOXBKN05NZWlXL2JNPQ==
```
``` rest
$$$Sample Response
{
	"user": {
		"__id": "34912447775245454",
		"__schematype": "user",
		"__createdby": "System",
		"__lastmodifiedby": "System",
		"__schemaid": "34888670847828365",
		"__revision": "1",
		"__tags": [],
		"__utcdatecreated": "2013-08-21T08:38:24.0000000Z",
		"__utclastupdateddate": "2013-08-21T08:38:24.0000000Z",
		"username": "john.doe",
		"email": "john.doe@appacitive.com",
		"firstname": "John",
		"lastname": "Doe",
		"birthdate": "1982-11-17",
		"isemailverified": "false",
		"isenabled": "true",
		"location": "18.534064000000000,73.899551000000000",
		"phone": "9876543210",
		"__attributes": {}
	},
	"status": {
		"code": "200",
		"message": "Successful",
		"faulttype": null,
		"version": null,
		"referenceid": "52c15dea-23ff-46cd-9edf-6266e7217271",
		"additionalmessages": []
	}
}
```

### Updating a user

The update user call is similar to the update article call. 
The property keys which you send with non-null values will get updated if they aren't marked as immutable.
The property keys you don't send in the body of the POST call stay unchanged.
The property keys you send with values set as `null` are deleted from the user object.
The same convention is followed with `__attributes` as with the properties.
Use the `__addtags` and `__removetags` array of strings properties to update tags.

You can specify which user you are updating by using either his `id`, `username` or `token`. You will use the `useridtype` parameter to specify which option you are using.
 
** Parameters ** 

<dl>
  <dt>user object</dt>
  <dd>required<br/><span>The user object with inserted, modified or nullified values.</span></dd>  
</dl>

** HTTP headers **

<dl>
	<dt>Appacitive-Apikey</dt>
	<dd>required<br/><span>The api key for your app.
	<dt>Appacitive-Environment</dt>
	<dd>required<br/><span>Environment to be targeted. Valid values are `live` and `sandbox`.
	<dt>Content-Type</dt>
	<dd>required<br/><span>This should be set to `application/json`.
</dl>

** Response **

Returns the updated user object with the `__revision` number incremented.
In case of an error, the `status` object contains details for the failure.

``` rest
$$$Method
POST https://apis.appacitive.com/user/
```
``` rest
$$$Sample Request
//	Update user
curl -X POST \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Content-Type: application/json" \
-d '{
        "firstname":"john",
        "email":"johnny@appacitive.com",
        "username":"johnny",
        "phone": null,
        "isenabled":"true",
        "lastname":null,
        "__addtags":[
           "coffee.lover",
           "foodie"
        ],
        "__removetags":[
           "newuser"
        ]
     }' \
https://apis.appacitive.com/user
```
``` rest
$$$Sample Response
{
	"user": {
		"__id": "34889981737698423",
		"__schematype": "user",
		"__createdby": "System",
		"__lastmodifiedby": "System",
		"__schemaid": "34888670847828365",
		"__revision": "2",
		"__tags": [
			"coffee.lover",
            "foodie"
		],
		"__utcdatecreated": "2013-08-21T02:41:19.5142397Z",
		"__utclastupdateddate": "2013-08-21T02:41:19.5142397Z",
		"username": "john.doe",
		"email": "johnny@appacitive.com",
		"firstname": "John",
		"isemailverified": "false",
		"isenabled": "true",
		"__attributes": {}
	},
	"status": {
		"code": "201",
		"message": "Successful",
		"faulttype": null,
		"version": null,
		"referenceid": "1f5ba0c8-b523-485a-9e04-ac924c6e442a",
		"additionalmessages": []
	}
}
```
``` csharp
//Get the user which needs to be updated
var user = await Users.GetByIdAsync("123456");
user.FirstName = "jane";
//Updating custom field 'city'
user.Set<string>("city", "New York"); 
await user.SaveAsync();
```

### Searching for users

Searching for users follows all the same principles as searching for articles of any other schema.

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

### Deleting a user

Delete requests follow the same practise as get request for user, the only difference being that you send a DELETE HTTP request instead of a GET request.
There are three ways you could delete the user, the same as retrieving a user, by his `id`, by his `username` or by his `token` generated for him.

** Parameters **

<dl>
	<dt>user identifier</dt>
	<dd>required<br/><span>An identifier to identify the user like username, id or token.	
</dl>

** Response **

A status object describing the status of the delete user call.

#### Deleting a user by his id

** HTTP headers **

<dl>
	<dt>Appacitive-Apikey</dt>
	<dd>required<br/><span>The api key for your app.
	<dt>Appacitive-Environment</dt>
	<dd>required<br/><span>Environment to be targeted. Valid values are `live` and `sandbox`.
	<dt>Appacitive-User-Auth</dt>
	<dd>required<br/><span>A session token generated for a user.
	<dt>Content-Type</dt>
	<dd>required<br/><span>This should be set to `application/json`.
</dl>


``` rest
$$$Method
DELETE https://apis.appacitive.com/user/{userId}
```
``` rest
$$$Sample Request
//	Delete user using his id
curl -X DELETE \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Appacitive-User-Auth: {User token}" \
-H "Content-Type: application/json" \
https://apis.appacitive.com/user/34912447775245454
```
``` rest
$$$Sample Response
{
	"status": {
		"code": "200",
		"message": "Successful",
		"faulttype": null,
		"version": null,
		"referenceid": "52c15dea-23ff-46cd-9edf-6266e7217271",
		"additionalmessages": []
	}
}
```
#### Delete user by username

An additional query string parameter called `useridtype` is sent to specify the kind of user identifier you are using.

** HTTP headers **

<dl>
	<dt>Appacitive-Apikey</dt>
	<dd>required<br/><span>The api key for your app.
	<dt>Appacitive-Environment</dt>
	<dd>required<br/><span>Environment to be targeted. Valid values are `live` and `sandbox`.
	<dt>Appacitive-User-Auth</dt>
	<dd>required<br/><span>A session token generated for a user.
	<dt>Content-Type</dt>
	<dd>required<br/><span>This should be set to `application/json`.
</dl>


``` rest
$$$Method
DELETE https://apis.appacitive.com/user/{username}?useridtype=username
```
``` rest
$$$Sample Request
//	Delete user using his username
curl -X DELETE \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Appacitive-User-Auth: {User token}" \
-H "Content-Type: application/json" \
https://apis.appacitive.com/user/john.doe?useridtype=username
```
``` rest
$$$Sample Response
{
	"status": {
		"code": "200",
		"message": "Successful",
		"faulttype": null,
		"version": null,
		"referenceid": "52c15dea-23ff-46cd-9edf-6266e7217271",
		"additionalmessages": []
	}
}
```

#### Delete user by user token

Here you can get a user by his session token. 
A valid session token still needs to be passed in the `Appacitive-User-Auth` header, but the user that is deleted is the user whose token you pass as the query string parameter `token`.

** HTTP headers **

<dl>
	<dt>Appacitive-Apikey</dt>
	<dd>required<br/><span>The api key for your app.
	<dt>Appacitive-Environment</dt>
	<dd>required<br/><span>Environment to be targeted. Valid values are `live` and `sandbox`.
	<dt>Appacitive-User-Auth</dt>
	<dd>required<br/><span>A session token generated for a user.
	<dt>Content-Type</dt>
	<dd>required<br/><span>This should be set to `application/json`.
</dl>

``` rest
$$$Method
DELETE https://apis.appacitive.com/user/me?useridtype=token&token={user token}
```
``` rest
$$$Sample Request
//	Delete user using his session token
curl -X DELETE \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Appacitive-User-Auth: {User token}" \
-H "Content-Type: application/json" \
https://apis.appacitive.com/user/me?useridtype=token&token=K2liWXVlSHZ0elNESUloTFlLRE5EQ2lzWXZtM0FFL0JxYW01WTBtVFlmTHZ6aHFMaWtEKzRUdlRRUkVHNndHSnZUbU42bUR0OUVWdTB3V3NBOFNVa2kvekJpTUZGYyt2ZEFTVi9mbGdNN2xRaEZuWUJidVByR3lFMkZlTzNrRHV3cldVUFRNbFA5M3B6NFN5Rkd3K1dNTWc1ZlBPclErOXBKN05NZWlXL2JNPQ==
```
``` rest
$$$Sample Response
{
	"status": {
		"code": "200",
		"message": "Successful",
		"faulttype": null,
		"version": null,
		"referenceid": "52c15dea-23ff-46cd-9edf-6266e7217271",
		"additionalmessages": []
	}
}
```
#### Deleting a user along with all connections to it

You can pass an optional query string parameter in the delete call called `deleteconnections` with its value set to `true` to also delete all connections associated with the user object you want to delete.

** HTTP headers **

<dl>
	<dt>Appacitive-Apikey</dt>
	<dd>required<br/><span>The api key for your app.
	<dt>Appacitive-Environment</dt>
	<dd>required<br/><span>Environment to be targeted. Valid values are `live` and `sandbox`.
	<dt>Appacitive-User-Auth</dt>
	<dd>required<br/><span>A session token generated for a user.
	<dt>Content-Type</dt>
	<dd>required<br/><span>This should be set to `application/json`.
</dl>

``` rest
$$$Method
DELETE https://apis.appacitive.com/user/{userid}?deleteconnections=true
```
``` rest
$$$Sample Request
//	Delete user using his session token
curl -X DELETE \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Appacitive-User-Auth: {User token}" \
-H "Content-Type: application/json" \
https://apis.appacitive.com/user/416176845248641548?deleteconnections=true
```
``` rest
$$$Sample Response
{
	"status": {
		"code": "200",
		"message": "Successful",
		"faulttype": null,
		"version": null,
		"referenceid": "52c15dea-23ff-46cd-9edf-6266e7217271",
		"additionalmessages": []
	}
}
```
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

### Location Tracking

You can store the users last known location in the `geography` property called `location`. You can use these geo-coordinates in searches. 

** Parameters **

<dl>
	<dt>userid</dt>
	<dd>required<br/><span>The userid of the user you want to track location for.
	<dt>lat</dt>
	<dd>required<br/><span>The latitude of the coordinates (decimal) where the user is checking in.
	<dt>long</dt>
	<dd>required<br/><span>The longitude of the coordinates (decimal) where the user is checking in.
</dl>

** HTTP headers **

<dl>
	<dt>Appacitive-Apikey</dt>
	<dd>required<br/><span>The api key for your app.
	<dt>Appacitive-Environment</dt>
	<dd>required<br/><span>Environment to be targeted. Valid values are `live` and `sandbox`.
	<dt>Appacitive-User-Auth</dt>
	<dd>required<br/><span>A session token generated for a user.
	<dt>Content-Type</dt>
	<dd>required<br/><span>This should be set to `application/json`.
</dl>

``` rest
$$$Method
POST https://apis.appacitive.com/user/{userid}/checkin?lat={latitude}&long={longitude}
```
``` rest
$$$Sample Request
//	Delete user using his session token
curl -X POST \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Appacitive-User-Auth: {User token}" \
-H "Content-Type: application/json" \
https://apis.appacitive.com/user/john.doe/checkin?useridtype=username&lat=10.10&long=20.20
```

``` rest
$$$Sample Response
{
	"status": {
		"code": "200",
		"message": "Successful",
		"faulttype": null,
		"version": null,
		"referenceid": "52c15dea-23ff-46cd-9edf-6266e7217271",
		"additionalmessages": []
	}
}
```

### Session Management

#### Validate session token

Once you create a session `token` for a user using one of the aunthenticating mechanisms, you may want to validate whether the token is a valid token or not.

** Parameters **

<dl>
	<dt>token</dt>
	<dd>required<br/><span>The string session token previously generated for the user.
</dl>

** HTTP headers **

<dl>
	<dt>Appacitive-Apikey</dt>
	<dd>required<br/><span>The api key for your app.
	<dt>Appacitive-Environment</dt>
	<dd>required<br/><span>Environment to be targeted. Valid values are `live` and `sandbox`.
	<dt>Appacitive-User-Auth</dt>
	<dd>required<br/><span>A session token generated for the user.
	<dt>Content-Type</dt>
	<dd>required<br/><span>This should be set to `application/json`.
</dl>

``` rest
$$$Method
POST https://apis.appacitive.com/user/validate?userToken={user session token}
```
``` rest
$$$Sample Request
//	Delete user using his session token
curl -X DELETE \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Appacitive-User-Auth: {User token}" \
-H "Content-Type: application/json" \
https://apis.appacitive.com/user/validate?userToken=RlYzRlcxY3lsRDlqYUpmQlNha0IwcTJRTXJDYVd6QWZOMlVPR0JWSmNhbTgyWVZxSTVnTmkvR1N0MXJMZm1nZGZCYWNZVk40eEZ4dTB3V3NBOFNVa3FUSEdQZVBTZDBWazJFUW03R0dZQVc5MjdZZmtGRFd1Q092enpTSUpQSWI1VEpqV2xsUUU0U3dIZGcwVTdZTkdNTWc1ZlBPclErOXBKN05NZWlXL2JNPQ==```

``` rest
$$$Sample Response
{
	"result": true,
	"status": {
		"code": "200",
		"message": "Successful",
		"faulttype": null,
		"version": null,
		"referenceid": "d7cf599a-bce3-44db-b404-c9fe09d4c0f4",
		"additionalmessages": []
	}
}
```


#### Invalidate session

Yoy may want to invalidate a previously generated session token for a user.

** Parameters **

<dl>
	<dt>token</dt>
	<dd>required<br/><span>The string session token previously generated for the user.
</dl>

** HTTP headers **

<dl>
	<dt>Appacitive-Apikey</dt>
	<dd>required<br/><span>The api key for your app.
	<dt>Appacitive-Environment</dt>
	<dd>required<br/><span>Environment to be targeted. Valid values are `live` and `sandbox`.
	<dt>Appacitive-User-Auth</dt>
	<dd>required<br/><span>A session token generated for the user.
	<dt>Content-Type</dt>
	<dd>required<br/><span>This should be set to `application/json`.
</dl>

``` rest
$$$Method
POST https://apis.appacitive.com/user/invalidate?userToken={user session token}
```
``` rest
$$$Sample Request
//	Delete user using his session token
curl -X DELETE \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Appacitive-User-Auth: {User token}" \
-H "Content-Type: application/json" \
https://apis.appacitive.com/user/invalidate?userToken=RlYzRlcxY3lsRDlqYUpmQlNha0IwcTJRTXJDYVd6QWZOMlVPR0JWSmNhbTgyWVZxSTVnTmkvR1N0MXJMZm1nZGZCYWNZVk40eEZ4dTB3V3NBOFNVa3FUSEdQZVBTZDBWazJFUW03R0dZQVc5MjdZZmtGRFd1Q092enpTSUpQSWI1VEpqV2xsUUU0U3dIZGcwVTdZTkdNTWc1ZlBPclErOXBKN05NZWlXL2JNPQ==```

``` rest
$$$Sample Response
{
	"status": {
		"code": "200",
		"message": "Successful",
		"faulttype": null,
		"version": null,
		"referenceid": "d7cf599a-bce3-44db-b404-c9fe09d4c0f4",
		"additionalmessages": []
	}
}
```

### Password Management

#### Reset password

#### Send forgot password email

#### Validate reset password token

#### Reset forgot password


Files
------------

Appacitive allows you to upload, download and ditribute media files like images, videos etc. on the appacitive platform so you can build rich applications and deliver media using an extensive CDN. 
The appacitive files api works by providing you `pre-signed` urls to a third-party cloud storage service (<a href="http://aws.amazon.com/s3/">Amazon S3</a>), where the files can be uploaded to or downloaded from.
You can upload and download files of any size and most filetypes are supported. 

### Upload

To upload a file on appacitive for your app, you need to get a pre-signed Amazon S3 url to which you will be uploading your file. 
You can get this url by making a HTTP GET request to the appacitive file `getupload` url. 
The `contenttype` query string parameter you send here should match the `content-type` http header value when uploading the file onto amazon s3 in the subsequent call.
A unique string `id` is associated with every file you store on the appacitive platform. This string `id` is either the optional `filename` query string parameter you pass while generating the upload url or appacitive assigns it a unique system generated value.
You can use this unique string file `id` to access, update or delete that file. Uploading multiple files using the same `filename` will lead to overwriting the file.

In the request, the optional query string paramertes you can provide are.

** Query string parameters **

<dl>
	<dt>contenttype</dt>
	<dd>required<br/><span>Mime-type of the file you are uploading.	
	<dt>filename</dt>
	<dd>optional<br/><span>Unique name for the file.
	<dt>expires</dt>
	<dd>optional<br/><span>Duration (in minutes) for which the upload url will be valid, default value is 5.	
</dl>

** HTTP headers **

<dl>
	<dt>Appacitive-Apikey</dt>
	<dd>required<br/><span>The api key for your app.
	<dt>Appacitive-Environment</dt>
	<dd>required<br/><span>Environment to be targeted. Valid values are `live` and `sandbox`.	
</dl>

``` rest
$$$Method
GET https://apis.appacitive.com/file/uploadurl?contenttype={content-type}
```
``` rest
$$$Sample Request
//	Generate upload url
curl -X GET \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Content-Type: application/json" \
https://apis.appacitive.com/file/uploadurl?filename=mypicture&contenttype=image/jpeg&expires=10
```
``` rest
$$$Sample Response
{
	"url": "https://stageblobstorage.s3.amazonaws.com/35003686659949394/_applications/35003695411364691/_deployments/35003749377377197/mypicture?AWSAccessKeyId=AKIAI5YIAGHRQS6VJETQ&Expires=1377164142&Signature=CELV5LBQs7d%2FJ%2FukBEnQJc%2Fb%2BBc%3D",
	"id": "mypicture",
	"status": {
		"code": "200",
		"message": "Successful",
		"faulttype": null,
		"version": null,
		"referenceid": "4f5a30f7-6b27-4d2b-92b5-c449d3083328",
		"additionalmessages": []
	}
}
```

When the above request is successful, the HTTP response is a `200` OK and the response body is a json object containing the third party cloud storage providers upload `url` and the file `id`, which is the parameter `filename`'s value provided by you or a unique system generated identifier for the file.
Now upload the file by making a PUT request to the `url` in the response above. The necessary authorization information is already embedded in the URI. For more details, refer to <a href="http://aws.amazon.com/documentation/s3/">Amazon S3 documentation</a>. 
This url is valid for 5 minutes if `expires` was not specified while retreiving the url and only allows you to perform a PUT on the url. 
You need to provied the same value for the `Content-Type` http header, which you provided while retreiving the url and if not provided, use 'application/octet-stream' or 'binary/octet-stream'. 
You send the media file in the payload object of the PUT call.

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

To download a file from Appacitive for your app, you need to get a `pre-signed` download url for the file using its file `id`, from where you will be able to download the file.

** Parameters **

<dl>
	<dt>filename</dt>
	<dd>required<br/><span>The filename used when generating the uploadurl.
	<dt>expires</dt>
	<dd>optional<br/><span>Time in minutes for which the url will be valid, default value 5 mins.	
</dl>
 
``` rest
$$$Method
GET https://apis.appacitive.com/file/download/{file id}
```
``` rest
$$$Sample Request
//	Generate download url
curl -X GET \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Content-Type: application/json" \
https://apis.appacitive.com/file/download/mypicture
```
``` rest
$$$Sample Response
{
	"uri": "https://stageblobstorage.s3.amazonaws.com/35003686659949394/_applications/35003695411364691/_deployments/35003749377377197/mypicture?AWSAccessKeyId=AKIAI5YIAGHRQS6VJETQ&Expires=1377171161&Signature=%2FGpFSIMTVMdq%2FKf%2F8jvdPbvoGgs%3D",
	"status": {
		"code": "200",
		"message": "Successful",
		"faulttype": null,
		"version": null,
		"referenceid": "0514cae7-2f8a-4232-8712-ed14e2a0c6ef",
		"additionalmessages": []
	}
}
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
You can now download the file by making a GET request to the `pre-signed` download `url` in the response object. 
No additional headers are required. For more details, refer to <a href="http://aws.amazon.com/documentation/s3/">Amazon S3 documentation</a>. 
Url is valid for 1 minute by default, but if you want to increase the expiry time set the `expires` query string parameter while retreiving the download url. 
This url only allows you to perform a GET on the file.

### Delete a file

This deletes a previously uploaded file from appacitive.

** Parameters **

<dl>
	<dt>filename</dt>
	<dd>required<br/><span>The unique filename associated with the file in the app.	
</dl>
 
``` rest
$$$Method
DELETE https://apis.appacitive.com/file/delete/{file id}
```
``` rest
$$$Sample Request
//	Delete file
curl -X DELETE \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Content-Type: application/json" \
https://apis.appacitive.com/file/delete/mypicture
```
``` rest
$$$Sample Response
{
	"status": {
		"code": "200",
		"message": "Successful",
		"faulttype": null,
		"version": null,
		"referenceid": "0514cae7-2f8a-4232-8712-ed14e2a0c6ef",
		"additionalmessages": []
	}
}
```
### Update a file

You can update a previously uploaded file for your app by using it's unique file name and re-uploading another file in its place.


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