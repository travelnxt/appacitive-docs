Appacitive API
=======
All the features available on the Appacitive platform are available via <a href="http://en.wikipedia.org/wiki/Representational_State_Transfer">REST</a> apis over HTTPS. 
These apis follow simple conventions and can be consumed by any rest client of your choice.
<a href="http://en.wikipedia.org/wiki/Cross-origin_resource_sharing">Cross-origin resource sharing (CORS)</a> is 
also enabled on the rest apis to make them easy to consume from web based applications. 

The request and response format of the API is always <a href="http://en.wikipedia.org/wiki/JSON">JSON</a>. Standard error structures in the response will indicate success or failure for any given api request. You can find details of the same in the <a href="http://appacitive-docs.dev/index.html#errors">api conventions</a>.


Endpoints
------------

All appacitive apis are available over HTTPS at ``https://apis.appacitive.com/v1.0/``.
A quick summary of the different urls is detailed below.

|||
|:---------------|:------------|
| **Object**     | <i>https://apis.appacitive.com/v1.0/object/{type}/</i>
| **Connection** | <i>https://apis.appacitive.com/v1.0/connection/{type}/</i>
| **User**       | <i>https://apis.appacitive.com/v1.0/user/</i>
| **Device**     | <i>https://apis.appacitive.com/v1.0/device/</i>
| **Graph Search** | <i>https://apis.appacitive.com/v1.0/search/</i>
| **File**     | <i>https://apis.appacitive.com/v1.0/file/</i>
| **Email**     | <i>https://apis.appacitive.com/v1.0/email/</i>
| **Push**     | <i>https://apis.appacitive.com/v1.0/push/</i>



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
!!!javascript
** Conventions **

1. The javascript SDK is an async library and all data calls are async. Most calls have a signature like 
      `object::method({ success: onSuccess, error: onError })`
    where `onSuccess` and `onError` are functions that'll get executed in case of the call being a success or a failure respectively.
2. Every data call also returns a promise.
3. Every onSuccess callback for an object will get 1 argument viz. its own instance.
4. Every onError callback for an object will get 2 argument viz. error object and its own instance.
     Error object basically contains a code and message.
!!!
```javascript
$$$Example

//callbacks
obj.save({ 
    success: function(obj) {}, 
    error: function(err, obj){} 
});

//promise
var promise = obj.save();
promise.then(function(obj) {}, function(err, obj){} );
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
    appId: '{Application Id}' /* can be found on applist page*/
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
``` python
@requires_authorization
def somefunc(param1='', param2=0):
    r'''A docstring'''
    if param1 > param2: # interesting
        print 'Gre\'ater'
    return (param2 - param1 + 1) or None

class SomeClass:
    pass

>>> message = '''interpreter
... prompt'''
```
``` rest
// The header information includes the api key and the environment (sandbox in this example)
curl -X GET \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
https://apis.appacitive.com/object/device/find/all
```

Data
=======
In the next few sections we briefly describe some of the basic terms used in Appacitive like objects, connections, users, files etc.

Objects
-------
Objects represent your data stored inside the Appacitive platform. Every object is mapped to the `type` that you create via the designer in your management console. If we were to use conventional databases as a metaphor, then a type would correspond to a table and an object would correspond to one row inside that table.

The object api allows you to store, retrieve and manage all the data that you store inside Appacitive. You can retrieve individual records or lists of records based on a specific filter criteria.

<span class="h3">Structure of an object</span>

** System generated properties ** 

System generated properties are fields used for housekeeping and storing meta-information about the object. All system generated properties start with '__' , avoid changing their values.

<dl>
  <dt>\__id</dt>
  <dd><span>Unique time-series strictly <a href="http://en.wikipedia.org/wiki/Monotonic_function">monotonically</a> increasing id automatically assigned by the system on creation. This is immutable.</span></dd>
  <dt>\__type</dt>
  <dd><span>The type of the object as designed by you via the type designer.</span></dd>
  <dt>\__createdby</dt>
  <dd><span>The id of the user that created the object. Incase a user token is provided during creation, then the created by will use the id of the corresponding user. The client can alternatively also provide this in the request.</span></dd>
  <dt>\__lastmodifiedby</dt>
  <dd><span>The id of the user that last updated the object. The id of the user that updated the object. Incase a user token is provided during creation, then the created by will use the id of the corresponding user. The client can alternatively also provide this in the request.</span></dd>
  <dt>\__revision</dt>
  <dd><span>The revision number of the object. This is incremented on every update and is used to provide <a href="http://en.wikipedia.org/wiki/Multiversion_concurrency_control">multi version concurrency control</a> incase of concurrent updates on the same object.</span></dd>
  <dt>\__tags</dt>
  <dd><span>This is an array of strings that you can use to "tag" specific objects. These tags can be used to search specific objects.</span></dd>
  <dt>\__utcdatecreated</dt>
  <dd><span>The timestamp of the time when the object was created, stored in ISO 8601 format with millisecond precision (YYYY-MM-DDTHH:MM:SS.MMMZ).</span></dd>
  <dt>\__utclastupdateddate</dt>
  <dd><span>The timestamp of the time when the object was last updated, stored in ISO 8601 format with millisecond precision (YYYY-MM-DDTHH:MM:SS.MMMZ).</span></dd>
  <dt>\__attributes</dt>
  <dd><span>List of key value pair values that can be stored with the object and are not validated by the type definition.</span></dd>
</dl>


** User defined properties ** 

User defined properties are fields defined by you via the type designer. These are exposed as fields directly on the object.

``` rest
$$$sample object 
{
  // system properties
  "__id": "24208366452736268",
  "__type": "score",
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
APObject score = new APObject("score");
score.Set<string>("difficulty", "normal");
score.Set<int>("level", 10);
score.Set<long>("score", 1400);
score.SetAttribute("is_first_time_user", "true");
score.SetAttribute("team_color", "blue");
```

``` javascript
// Create object of type score
var score = new Appacitive.Object({ __type: 'score' });

// Set properties
score.set('difficulty', 'normal');
score.set('level', 10);
score.set('score', 1400);

// Set atributes
score.attr('is_first_time_user', 'true');
score.attr('team_color', 'blue');

// Add Tage
score.addTag("amateur");
score.addtag("unverified")
```


### Create a new object

Creates a new object of a specific type.

** Parameters ** 

<dl>
  <dt>object</dt>
  <dd>required<br/><span>The object to be created</span></dd>
</dl>

** Response **

Returns the newly created object with all the system defined properties (e.g., ``__id``) set.
In case of an error, the `status` object contains details of the failure.

``` rest
$$$Method
PUT https://apis.appacitive.com/object/{type}
```
``` csharp
$$$Method
Appacitive.SDK.APObject.SaveAsync();
```
``` javascript
$$$Method
Appacitive.Object::save();
```

``` rest
$$$Sample Request
//Create an object of type post
curl -X PUT \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {environment (sandbox or live)}" \
-H "Content-Type: application/json" \
-d '{ "title" : "test", "text" : "This is a test post.", "__attributes" : { "has_verified" : "false" }}' \
https://apis.appacitive.com/object/post
```
``` csharp
$$$Sample Request
var post = new APObject("post");
post.Set<string>("title", "sample post");
post.Set<string>("text", "This is a sample post.");
post.SetAttribute("has_verified", "false");
await post.SaveAsync();
```
``` javascript
$$$Sample Request
// Create object of type post
var post = new Appacitive.Object('post');

// Set properties
post.set('title', 'sample post');
post.set('text', 'This is a sample post.');

// Set attribbutes
post.attr('has_verified', 'false');

// Call save
post.save().then(function(){
  alert('new post saved successfully!');
}, function(status){
  alert('error while saving!');
});
```
``` rest
$$$Sample Response
{
  "object": {
    "__id": "33017891581461312",
    "__type": "post",
    "__createdby": "System",
    "__lastmodifiedby": "System",
    "__typeid": "23514020251304802",
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
//The response callback would be invoked with the object updated with system properties.
//A unique identifier called __id is generated and is stored in the post object. You can access it directly using id().
```

### Retrieve an existing object
The Appacitive platform supports retrieving single or multiple objects. All object retrievals on the platform
are done purely on the basis of the object id and type. You can also fine tune the exact list of fields that 
you want to be returned. This will allow for fine tuning the size of the message incase you are on a 
low bandwidth connection.

The different scenarios for object retrieval are detailed in the sections below.

#### Retrieve a single object

Returns an existing object from the system. To retrieve an existing object, you will need to provide its 
type and its system defined id.

** Parameters ** 

<dl>
  <dt>type</dt>
  <dd>required<br/><span>The type of the object to be retrieved</span></dd>
  <dt>id</dt>
  <dd>required<br/><span>The system generated id for the object</span></dd>
  <dt>fields</dt>
  <dd>optional<br/><span>List of properties to be returned.</span></dd>
</dl>

** Response **

Returns the existing object matching the given id.
In case of an error, the `status` object contains details of the failure.

``` rest
$$$Method
GET https://apis.appacitive.com/object/{type}/{id}?fields={comma separated list of fields}
```
``` rest
$$$Sample Request
//Get object of type post with id 33017891581461312
curl -X GET \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
https://apis.appacitive.com/object/post/33017891581461312
```
``` rest
$$$Sample Response
{
  "object": {
    "__id": "33017891581461312",
    "__type": "post",
    "__createdby": "System",
    "__lastmodifiedby": "System",
    "__typeid": "23514020251304802",
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
public static async Task<APObject> Appacitive.SDK.APObjects.GetAsync(
  string type, 
  string id, 
  IEnumerable<string> fields = null
)
```
``` csharp
$$$Sample Request
var post = await APObjects.GetAsync("post", "33017891581461312");
Console.WriteLine("Fetched post with title {0} and text {1}.",
  post.Get<string>("title"),
  post.Get<string>("text")
  );
```

``` javascript
$$$Method
Appacitive.Object.get({
  __type: 'type',    //mandatory
  id: 'objectId',   //mandatory
  fields: []         //optional
});
```
``` javascript
$$$Sample Request
Appacitive.Object.get({ 
    __type: 'post',
    id: '33017891581461312',
    fields: ['title']
}).then(function(post) {
    // Object is returned as argument to onsuccess
    alert('Fetched post with title: ' + post.get('title')); 
}, function(status) {
    alert('Could not fetch, probably because of an incorrect id');
});


//Retrieve post by `fetch`
var post = new Appacitive.Object('post');
post.id('33017891581461312');
post.fields(['title','text']);

post.fetch().then(function(obj) {
    alert('Fetched post with title: ' + post.get('title'));
}, function(status, obj) {
    alert('Could not fetch, probably because of an incorrect id');
});
```

#### Retrieve multiple objects 

Returns a list of multiple existing objects from the system. To get a list of objects you 
must provide the type of the object and a list of ids to retrieve. Given that only one type is allowed,
the list of ids must correspond to objects of the same type.

** Parameters ** 

<dl>
  <dt>type</dt>
  <dd>required<br/><span>The type of the object to be retrieved.</span></dd>
  <dt>id list</dt>
  <dd>required<br/><span>Comma separated list of object ids to retrieve.</span></dd>
  <dt>fields</dt>
  <dd>optional<br/><span>List of properties to be returned.</span></dd>
</dl>

** Response **

Returns an array of objects corresponding to the given id list. 
In case of an error, the `status` object contains details of the failure.

`NOTE` : Please note that providing the same id multiple times will not return duplicates.

``` rest
$$$Method
GET https://apis.appacitive.com/object/{type}/multiget/{comma separated ids}?fields={comma separated list of fields}
```
``` rest
$$$Sample Request
//Get object of type posts with id 33017891581461312 and 33017891581461313
curl -X GET \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
https://apis.appacitive.com/object/post/multiget/33017891581461312,33017891581461313
```
``` rest
$$$Sample Response
{
  "objects": [
    {
      "__id": "33017891581461312",
      "__type": "post",
      "__createdby": "System",
      "__lastmodifiedby": "System",
      "__typeid": "23514020251304802",
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
      "__type": "post",
      "__createdby": "System",
      "__lastmodifiedby": "System",
      "__typeid": "23514020251304802",
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
public static async Task<IEnumerable<APObject>> Appacitive.SDK.APObjects.MultiGetAsync(
  string type, 
  IEnumerable<string> idList, 
  IEnumerable<string> fields = null
)
```
``` csharp
$$$Sample Request
var ids = new [] {"33017891581461312", "33017891581461313" };
var posts = await APObjects.MultiGetAsync("post", ids);
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
Appacitive.Object.multiGet({
  type: 'type',   //mandatory
  ids: [],          //mandatory
  fields: []        //optional
});
```
``` javascript
$$$Sample Request
Appacitive.Object.multiGet({ 
    type: 'post',
    ids: ["33017891581461312", "33017891581461313"],
    fields: ["title"]
}).then(function(posts) { 
    // posts is an array of objects
}, function(status) {
    alert("code:" + status.code + "\nmessage:" + status.message);
});
```

#### Retrieving only specific fields for an object

The fields parameter allows you to pick and choose the exact properties that you want the system to return in the response.
This applies to both user and system defined properties. The ``__id``,``__type`` or ``__relationtype`` fields cannot be filtered 
out using this and will always be returned. To select specific fields you need to pass a list of the fields that you want the system to return.

``` rest
$$$Method
// The fields parameter can be applied to any objects or connections api call.
GET https://apis.appacitive.com/object/{type}/{id}?fields={comma separated list of fields}
```
``` rest
$$$Sample Request
//Get object of type post with id 33017891581461312 with text and title field alone.
curl -X GET \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
https://apis.appacitive.com/object/post/33017891581461312?fields=text,title
```
``` rest
$$$Sample Response
{
  "object": {
    "__id": "33017891581461312",
    "__type": "post",
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
public static async Task<APObject> Appacitive.SDK.APObjects.GetAsync(
  string type, 
  string id, 
  IEnumerable<string> fields = null
)
```
``` csharp
$$$Sample Request
var fields = new [] { "text", "title"};
var post = await APObjects.GetAsync("post", "33017891581461312", fields);
Console.WriteLine("Fetched post with title {0} and text {1}.",
  post.Get<string>("title"),
  post.Get<string>("text")
  );
```

``` javascript
$$$Method
Appacitive.Object.get({
  type: 'type',    //mandatory
  id: 'objectId',   //mandatory
  fields: []         //optional
});
```
``` javascript
$$$Sample Request
Appacitive.Object.get({ 
    type: 'post',
    id: '33017891581461312',
    fields: ['title','text']
}).then(function(obj) {
    // object obj is returned as argument to onsuccess
    alert('Fetched post with title: ' + obj.get('title')); 
}, function(status, obj) {
    alert('Could not fetch, probably because of an incorrect id');
});
```

### Update an object

To update an existing object, you need to provide the type and id of the object
along with the list of updates that are to be made. As the Appacitive platform supports partial updates,
and update only needs the information that has actually changed.

** Parameters ** 

<dl>
  <dt>type</dt>
  <dd>required<br/><span>The type of the object</span></dd>
  <dt>id</dt>
  <dd>required<br/><span>The system generated id of the object</span></dd>
  <dt>object updates</dt>
  <dd>required<br/><span>Theobject with the fields to be updated.</span></dd>
  <dt>revision</dt>
  <dd>optional<br/><span>The revision of the object. Incase the revision does not match on the server, the call will fail.</span></dd>
</dl>

** Response **

Returns the updated object.
In case of an error, the `status` object contains details of the failure.


``` rest
$$$Method
POST https://apis.appacitive.com/object/{type}/{id}?revision={current revision}
```
``` rest
$$$Sample Request
// Will update the object of type post with id 33017891581461312
// Updates include
// - title and text fields
// - adding a new attribute called topic
// - adding and removing tags.

curl -X POST \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Content-Type: application/json" \
-d '{ "title" : "updated title", "text" : "This is updated text for the post.", "__attributes" : { "topic" : "testing" }, "__addtags" : ["tagA", "tagB"], "__removetags" : ["tagC"]}' \
https://apis.appacitive.com/object/post/33017891581461312
```
``` rest
$$$Sample Response
{
  "object": {
    "__id": "33017891581461312",
    "__type": "post",
    "__createdby": "System",
    "__lastmodifiedby": "System",
    "__typeid": "23514020251304802",
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
public static async Task Appacitive.SDK.APObject.SaveAsync(int revision = 0)
```
``` csharp
$$$Sample Request
// Incase the object is not already retrieved from the system, 
// simply create a new instance of an object with the id. 
// This creates a "handle" to the object on the client
// without actually retrieving the data from the server.
// Simply update the fields that you want to update and invoke SaveAsync(). 

// This will simply create a handle or reference to the existing object.
var post = new APObject("post", "33017891581461312");

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
After the save, the existing post object would be updated with the latest values
of all the fields.
```

``` javascript
$$$Method
Appacitive.Object::save();
```
``` javascript
$$$Sample Request
var post = new Appacitive.Object({ __type: 'post', __id: '33017891581461312' });

// Update properties
post.set('title', 'updated title');
post.set('text', 'This is updated text for the post.');
//delete property
post.unset('type');
// Add a new attribute
post.attr('topic', 'testing');
// Add/remove tags
post.addTag('tagA');
post.removeTag('tagC');

post.save().then(function(obj) {
  alert('updated successfully!');
}, function(status, obj){
  alert('error while updating!');
});
```


### Delete an object

You can delete existing objects by simply providing the object id of the object that you want to delete.
This operation will fail if the object has existing connections with other objects.

** Parameters ** 

<dl>
  <dt>type</dt>
  <dd>required<br/><span>The type of the object to be deleted</span></dd>
  <dt>id</dt>
  <dd>required<br/><span>The system generated id for the object</span></dd>
</dl>

** Response **

Returns successful `status` object.
In case of an error, the `status` object contains details of the failure.


``` rest
$$$Method
DELETE https://apis.appacitive.com/object/{type}/{id}
```
``` rest
$$$Sample Request
// Will delete the object of type player with the id 123456678809

curl -X DELETE \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Appacitive-Apikey: {Your api key}" \
https://apis.appacitive.com/object/player/123456678809

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
$$$Method
Appacitive.Object::destroy();
```
``` javascript
$$$Sample Request
/* Delete a single object */
player.destroy().then(function() {
    alert('Deleted successfully');
}, function(status, obj) {
    alert('Delete failed')
});

```
``` csharp
/* Delete a single object */
await APObjects.DeleteAsync("player", "123456678809");
```

#### Delete multiple objects
Incase you want to delete multiple objects, simply pass a comma separated list of the ids of the objects that you want to delete.
Do note that all the objects should be of the same type and must not be connected with any other objects.

** Parameters ** 

<dl>
  <dt>type</dt>
  <dd>required<br/><span>The type of the object to be deleted</span></dd>
  <dt>id list</dt>
  <dd>required<br/><span>List of ids for the objects to be deleted</span></dd>
</dl>

** Response **

Returns successful `status` object.
In case of an error, the `status` object contains details of the failure.


``` rest
$$$Method
POST https://apis.appacitive.com/object/{type}/bulkdelete
```
``` rest
$$$Sample Request
// Will delete players with the ids 14696753262625025 and 14696753262625026.

curl -X POST \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Appacitive-Apikey: {Your api key}" \
-d '{"idlist":["14696753262625025","14696753262625026"]}' \
https://apis.appacitive.com/object/player/bulkdelete

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
$$$Method
Appacitive.Object.multiDelete({
  type: 'type', //mandatory
  ids: [], //mandatory
});
```
``` javascript
$$$Sample Request
/*  Delete multiple objects. */
Appacitive.Object.multiDelete({    
    type: 'player', //mandatory
    ids: ["14696753262625025", "14696753262625026"], //mandatory
}).then(function() { 
    //successfully deleted all objects
}, function(status) {
    alert("code:" + err.code + "\nmessage:" + err.message);
});
```
``` csharp
/*  Delete multiple objects. */
var ids = new [] { "14696753262625025", "14696753262625026" };
await APObjects.MultiDeleteAsync("player", ids);
```
#### Delete with Connection

There are scenarios where you might want to delete an object irrespective of existing connections. To do this in the delete operation, you need to explicitly indicate that you want to delete any existing connectons as well. This will cause the delete operation to delete any existing connections along with the specified object.

`NOTE`: This override is not available when deleting multiple objects in a single operation.

** Parameters ** 

<dl>
  <dt>type</dt>
  <dd>required<br/><span>The type of the object to be deleted</span></dd>
  <dt>id</dt>
  <dd>required<br/><span>The system generated id for the object</span></dd>
</dl>

** Response **

Returns successful `status` object.
In case of an error, the `status` object contains details of the failure.


``` rest
$$$Method
DELETE https://apis.appacitive.com/object/{type}/{id}?deleteconnections=true
```
``` rest
$$$Sample Request
// Will delete the object of type player with the id 123456678809
curl -X DELETE \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Appacitive-Apikey: {Your api key}" \
https://apis.appacitive.com/object/player/123456678809?deleteconnections=true

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
$$$Method
Appacitive.Object::destroy(true);

$$$Sample Request
//Setting the third argument to true will delete its connections if they exist
player.destroy(true).then(function() {
    alert('Deleted successfully');
}, function(status, obj) {
    alert('Delete failed')
}); 
```
``` csharp
/* Single Delete with connected objects */
var deleteConnection = true;
await APObjects.DeleteAsync("friend", "123456678809", deleteConnection);
```


Connections
------------
Connections represent business relationships between objects. As an example, a `employment` connection between a user object and a company object would indicate a relationship of "employment". In a typical relational database, linkages between data are represented via foreign key relationships. Connections are similar to foreign key relationships to the extent that they connect two objects. However, unlike foreign keys, connections can also define properties and store data just like objects. In the `employment` connection example we took earlier, the connection could contain a property called `joining_date` which would store the date the employee joined the company. This data is only relevant as long as the connection is relevant. 

Just like objects, every connection also has a dedicated type. This type is called a `Relation` and is defined using the designer in your management console. 

The connections api allows you to store, retrieve and manage connections between objects. It also allows you to query for connected data based on existing connections.

<span class="h3">The connection object</span>

** Endpoint **

The connection object will contain two endpoints representing the  objects that it is connecting. 
The contents of the endpoints are detailed below.
<dl style="border-bottom: none;">
  <dt>label</dt>
  <dd><span>The name of the endpoint in the connection.</span></dd>
  <dt>type</dt>
  <dd><span>The type of the object referred in the endpoint.</span></dd>
  <dt>objectid</dt>
  <dd><span>The id of object referred in the endpoint.</span></dd>
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
      "objectid": "37266319911026961"
    },
    "__endpointb": {
      "label": "employee",
      "type": "user",
      "objectid": "37266320027419512"
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
    var conn = APConnection
                    .New("employment")
                    .FromExistingObject("employee", "21317231283123")
                    .ToExistingObject("employer", "716238712836");
    conn.Set<DateTime>("joining_date", new DateTime(2012,1,1));
```
### Create a new connection

The Appacitive platform supports creating connections between existing as well as new objects. 
The different scenarios that are supported when creating a new connection are detailed in the sections below.


#### Create a connection between two existing objects

To create a connection between two existing objects, you need to pass the connection object with the object ids in the specific endpoints. You can also specify the connection properties that you would like to set when creating the connection.

** Parameters ** 

<dl>
  <dt>connection object</dt>
  <dd>required<br/><span>The connection object</span></dd>
</dl>

** Response **

Returns the newly created connection object with all the system defined properties (e.g., ``__id``) set.
In case of an error, the `status` object contains details of the failure.


``` rest
$$$Method
PUT https://apis.appacitive.com/connection/{relation type}
```
``` rest
$$$Sample Request
// Will create a new reviewed connection between 
//    * user object with id 123445678 and 
//    * hotel object with id 987654321.
// The reviewed relation defines two endpoints "reviewer" and "hotel" for this information.
curl -X PUT \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Appacitive-Apikey: {Your api key}" \
-d '{"__endpointa":{"label":"reviewer","objectid":"123445678"},"__endpointb":{"label":"hotel","objectid":"987654321"}}' \
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
      "objectid": "123445678"
    },
    "__endpointb": {
      "label": "hotel",
      "type": "hotel",
      "objectid": "987654321"
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
$$$Method
Appacitive.Connection::save()
```
``` javascript
$$$Sample Request
//`review` is relation name, 
//`reviewer` and `hotel` are the endpoint labels
var connection = new Appacitive.Connection({
                  relation: 'reviewed',
                  endpoints: [{
                      objectid: '123445678',
                      label: 'reviewer'
                  }, {
                      objectid: '987654321',
                      label: 'hotel'
                  }]                
              });
connection.save().then(function (obj) {
    alert('saved successfully!');
}, function (status, obj) {
    alert('error while saving!');
});

//Optionally you can provide the complete object
//instead of providing object id, to do so
var connection = new Appacitive.Connection({
                  relation: 'reviewed',
                  endpoints: [{
                      object: reviewerobject,
                      label: 'reviewer'
                  }, {
                      object: hotelObject,
                      label: 'hotel'
                  }]                
              });
connection.save().then(function (obj) {
    alert('saved successfully!');
}, function (status, obj) {
    alert('error while saving!');
});
```
``` csharp
//`review` is relation name, 
//`reviewer` and `hotel` are the endpoint labels
var connection = APConnection
                    .New("reviewed")
                    .FromExistingObject("reviewer", "123445678")
                    .ToExistingObject("hotel", "987654321");
await connection .SaveAsync();

// This can interchangably also be written as 
var connection = APConnection
                    .New("reviewed")
                    .FromExistingObject("hotel", "987654321")
                    .ToExistingObject("reviewer", "123445678");
await connection .SaveAsync();
```


#### Create a connection between a new and existing object.

In your application, you might want to be able to create a new object and connect it with an existing object 
as part of one transactional operation. The create connection operation allows you to interchangeably provide 
either an existing object reference or a completely new object inside the endpoint definition.

If a new object is provided in the request, then the operation will create both the object and the connection 
as part of a single transaction.

``` rest
$$$Method
PUT https://apis.appacitive.com/connection/{relation type}
```
``` rest
$$$Sample Request
// Will create a new my_score connection between 
//    * existing player object with id 123445678 and 
//    * new score object which will also be created when the connection is created.
// The my_score relation defines two endpoints "player" and "score" for this information.
curl -X PUT \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Appacitive-Apikey: {Your api key}" \
-d '{"__endpointa":{"label":"score","object":{"__type":"score","points":"150"}},"__endpointb":{"label":"player","objectid":"123445678"}}' \
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
      "objectid": "37529356194677342",
      "object": {
        "__id": "37529356194677342",
        "__type": "score",
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
      "objectid": "123445678"
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
$$$Method
Appacitive.Connection::save()
```
``` javascript
$$$Sample Request
// Will create a new my_score connection between 
//    * existing player object with id 123445678 and 
//    * new score object which will also be created when the connection is created.
// The my_score relation defines two endpoints "player" and "score" for this information.

//Create an instance of an object of type score. 
var score = new Appacitive.Object('score');
score.set('points', 150);

// existing player object.
var playerId = '123445678';

var connection = new Appacitive.Connection({
                  relation: 'my_scores',
                  endpoints: [{
                      objectid: playerId,
                      label: 'player'
                  }, {
                      object: score,
                      label: 'score'
                  }]                
              });
connection.save().then(function (obj) {
    console.log(connection.id());
    console.log(score.id());
    alert('saved successfully!');
}, function (status, obj) {
    alert('error while saving!');
});
```
``` csharp
/* Will create a new my_score connection between 
    - existing player object with id 123445678 and 
    - new score object which will also be created when the connection is created.
*/ The my_score relation defines two endpoints "player" and "score" for this information.

//Create an instance of object of type score
var score = new APObject("score");
score.Set("points", 150);

var connection = APConnection
                    .New("my_scores")
                    .FromExistingObject("player", "123445678")
                    .ToNewObject("score", score);
await connection.SaveAsync();

// The id of the score object should now be set since it has also been created on the server.
var scoreId = score.Id;
```


#### Create a connection between two new objects.

As indicated in the earlier example, the create connection operation allows you to pass either an existing object id
or a new object in its two endpoints. Passing a new object in each of the endpoints will allow you to create 
both the endpoints as well as the connection between the two in a single operation.

``` rest
$$$Method
PUT https://apis.appacitive.com/connection/{relation type}
```
``` rest
$$$Sample Request
// Will create a new my_score connection between 
//    * new player object
//    * new score object
// The my_score relation defines two endpoints "player" and "score" for this information.
curl -X PUT \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Appacitive-Apikey: {Your api key}" \
-d '{"__endpointa":{"label":"score","object":{"__type":"score","points":"150"}},"__endpointb":{"label":"player", "object":{"__type":"player","name":"sirius"}}}' \
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
      "objectid": "37529356194677342",
      "object": {
        "__id": "37529356194677342",
        "__type": "score",
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
      "objectid": "37529356194677889",
      "object": {
        "__id": "37529356194677889",
        "__type": "player",
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
$$$Method
Appacitive.Connection::save()
```
``` javascript
$$$Sample Request
// Will create a new my_score connection between 
//    * new player object
//    * new score object 
// The my_score relation defines two endpoints "player" and "score" for this information.

//Create an instance of an object of type score. 
var score = new Appacitive.Object('score');
score.set('points', 150);

//Create an instance of an object of type player. 
var player = new Appacitive.Object('player');
player.set('name', 'sirius');

var connection = new Appacitive.Connection({
                  relation: 'my_scores',
                  endpoints: [{
                      object: player,
                      label: 'player'
                  }, {
                      object: score,
                      label: 'score'
                  }]                
              });
connection.save().then(function (obj) {
    console.log(connection.id());
    console.log(score.id());
    console.log(player.id());
    alert('saved successfully!');
}, function (status, obj) {
    alert('error while saving!');
});
```
``` csharp
/* Will create a new my_score connection between 
    - existing player object with id 123445678 and 
    - new score object, which will also be created when the connection is created.
  The my_score relation defines two endpoints "player" and "score" for this information.
*/ 

//Create an instance of object of type score
var score = new APObject("score");
score.Set("points", 150);

//Create an instance of object of type player
var player = new APObject("player");
score.Set("name", "sirius");

var connection = APConnection
                    .New("my_scores")
                    .FromExistingObject("player", player)
                    .ToNewObject("score", score);
await connection .SaveAsync();

// The ids of the score and player objects will now be available.
var scoreId = score.Id;
var playerId = player.Id;
```
### Retrieve an existing connection

The Appacitive platform allows you to get connections in 3 ways depending on the usecase of your application.
The section below details out each of the 3 scenarios.

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
In case of an error, the `status` object contains details of the failure.

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
      "objectid": "37266379552981902"
    },
    "__endpointb": {
      "label": "reviewer",
      "type": "user",
      "objectid": "37266380289082256"
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
$$$Method
Appacitive.Connection.get({
  relation: 'type', //mandatory
  id: 'connectionId', //mandatory
  fields: [] //optional
})
```
``` javascript
$$$Sample Request
//Get the connection object and update the description
Appacitive.Connection.get({ 
    relation: 'reviewed',       //mandatory
    id: '33017891581461312'     //mandatory
}).then(function(obj) {
    // connection obj is returned as argument to onsuccess
    alert('review connection fetched successfully.');
}, function(status, obj) {
    alert('Could not fetch, probably because of an incorrect id');
});
```
``` csharp
//Single connection by connection id
var conn = await APConnections.GetAsync("review", "33017891581461312");
```

#### Retrieve multiple connections by id

Returns a list of multiple existing connections from the system. To get a list of connections you 
must provide the type of the relation and a list of ids to retrieve. Given that only one type is allowed,
the list of ids must correspond to connections of the same type.

** Parameters ** 

<dl>
  <dt>type</dt>
  <dd>required<br/><span>The type of the connection to be retrieved.</span></dd>
  <dt>id list</dt>
  <dd>required<br/><span>Comma separated list of connection ids to retrieve.</span></dd>
  <dt>fields</dt>
  <dd>optional<br/><span>List of properties to be returned.</span></dd>
</dl>

** Response **

Returns an array of connections corresponding to the given id list. 
In case of an error, the `status` object contains details of the failure.

`NOTE` : Please note that providing the same id multiple times will not return duplicates.

``` rest
$$$Method
GET https://apis.appacitive.com/connection/{type}/multiget/{comma separated ids}?fields={comma separated list of fields}
```
``` rest
$$$Sample Request
//Get connection of type reviewed with id 33017891581461312 and 33017891581461313
curl -X GET \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
https://apis.appacitive.com/connection/reviewed/multiget/33017891581461312,33017891581461313
```
``` rest
$$$Sample Response
{
  "connections": [
    {
      "__id": "33017891581461312",
      "__relationtype": "reviewed",
      "__endpointa": {
        "label": "hotel",
        "type": "hotel",
        "objectid": "37266379552981902"
      },
      "__endpointb": {
        "label": "reviewer",
        "type": "user",
        "objectid": "37266380289082256"
      },
      "__createdby": "System",
      "__lastmodifiedby": "System",
      "__relationid": "25394030771831308",
      "__revision": "2",
      "__utcdatecreated": "2013-09-16T08:13:10.0000000Z",
      "__utclastupdateddate": "2013-09-23T01:09:12.6510000Z",
      "__attributes": {}
    },
    {
      "__id": "33017891581461313",
      "__relationtype": "reviewed",
      "__endpointa": {
        "label": "hotel",
        "type": "hotel",
        "objectid": "37266379552981902"
      },
      "__endpointb": {
        "label": "reviewer",
        "type": "user",
        "objectid": "37266380289082266"
      },
      "__createdby": "System",
      "__lastmodifiedby": "System",
      "__relationid": "25394030771831308",
      "__revision": "2",
      "__utcdatecreated": "2013-09-16T08:13:10.0000000Z",
      "__utclastupdateddate": "2013-09-23T01:09:12.6510000Z",
      "__attributes": {}
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
public static async Task<IEnumerable<Connection>> Appacitive.SDK.Connections.MultiGetAsync(
  string type, 
  IEnumerable<string> idList, 
  IEnumerable<string> fields = null
)
```
``` csharp
$$$Sample Request
var ids = new [] {"33017891581461312", "33017891581461313" };
var reviewed = await APConnections.MultiGetAsync("reviewed", ids);
foreach( var review in reviewed )
{
  Console.WriteLine("Fetched reviewed with id {0}.",
    post.Get<long>("id")
    );
}
```

``` javascript
$$$Method
Appacitive.Connection.multiGet({
  relation: 'type',   //mandatory
  ids: [],          //mandatory
  fields: []        //optional
});
```
``` javascript
$$$Sample Request
Appacitive.Connection.multiGet({ 
    relation: 'reviewed',
    ids: ["33017891581461312", "33017891581461313"],
    fields: ["__id"]
}).then(function(reviewed) { 
    // reviewed is an array of connection objects
}, function(status) {
    alert("code:" + status.code + "\nmessage:" + status.message);
});
```

#### Retrieve a single connection via its endpoints

Only a single instance of a connection of a specific type can be created between two object instances.
As a result, a connection can also be uniquely identified by its type and the id pair of its endpoints.
As an example, say you have two users and you want to see if they are friends (by virtue of a "friend" connection between them),
then you can simply try and retrieve that connection by specifying the type as "friend" and providing the ids of the two users.

** Parameters ** 

<dl>
  <dt>type</dt>
  <dd>required<br/><span>The type of the connection to be retrieved.</span></dd>
  <dt>objectAId</dt>
  <dd>required<br/><span>Id of objectA</span></dd>
  <dt>objectBid</dt>
  <dd>required<br/><span>Id of objectB</span></dd>
  <dt>label</dt>
  <dd>optional<br/><span>For a relation between same type and different endpoint labels this becomes mandatory</span></dd>
</dl>

** Response **

Returns a connection of the specified type if one exists between objectAid and objectBid

``` rest
$$$Method
GET https://apis.appacitive.com/connection/{type}/find/{objectAid}/{objectBid}?label={label}
```
``` rest
$$$Sample Request
// Try and get an existing friend connection between two users John(22322) and Jane(33422) with endpoint label as 'friend' for Jane

curl -X GET \
-H "Appacitive-Environment: sandbox" \
-H "Appacitive-Session: P7IM2L8/EIC6kpzkC3wzQYFoDtIZZXhpUDZ2wf13FWfVki7flNEepVks8SlnLtgUyyjaZGTUVInQqvHJ8kwnNnHEdsZAGDU9+XNV107ZC/PkFEAs1RIpN43J69vPNvsN80shAG7eM+9YbheFH5eWHw==" \
https://apis.appacitive.com/connection/friend/find/22322/33422?label=freind

```
``` rest
$$$Sample Response
{
  "connection": {
    "__id": "33017891581461312",
    "__relationtype": "friend",
    "__endpointa": {
      "label": "me",
      "type": "user",
      "objectid": "22322"
    },
    "__endpointb": {
      "label": "friend",
      "type": "user",
      "objectid": "33422"
    }
  },
  "status": {
    "code": "200",
    "message": "Successful",
    "faulttype": null,
    "version": null,
    "referenceid": "6382c031-65a1-4188-a107-c119da41496d",
    "additionalmessages": []
  }
}
```
``` javascript
$$$Method
Appacitive.Connection.getBetweenObjectsForRelation({
  relation: 'type', //mandatory
  objectAId : 'objectAId', //mandatory
  objectBId : 'objectBId', //mandatory
  label: 'label' //optional
})
```
``` javascript
$$$Sample Request
// Try and get an existing friend connection between two users John and Jane

var idForJohn = "22322";
var idForJane = "33422";

Appacitive.Connection.getBetweenObjectsForRelation({ 
    relation: "friend", 
    objectAId : idForJohn, 
    objectBId : idForJane
}).then(function(obj){
    // connection obj is returned as argument to onsuccess
    if( obj !== null && obj !== undefined ) {
      alert('John and Jane are friends.');
    } else {
      alert('John and Jane are not friends.');
    }
}, function(status, obj) {
    alert('Could not fetch, probably because of an incorrect id');
});

//For a relation between same type and different endpoint labels
//'label' parameter becomes mandatory for the get call

//'friend' is the relation between user type
//and 'me' and 'you' are the endpoint labels

Appacitive.Connection.getBetweenObjectsForRelation({ 
    relation: "friend", 
    objectAId : "22322", 
    objectBId : "33422",
    label : "me"
}).then(function(obj){
    // connection obj is returned as argument to onsuccess
    alert('Connection fetched successfully');
}, function(status, obj) {
    alert('Could not fetch, probably because of an incorrect id');
});

```
``` csharp
//Single connection by endpoint object ids
var connection2 = await APConnections.GetAsync("reivew", 
                                       "22322", "33422");
```

### Update a connection

The endpoint information in a connection is immutable and cannot be modified after a connection has been created.
However, in all other ways, connections behave exactly like objects. All properties, attributes, tags etc
can be updated using the update connection operation. 

To update an existing connection, you need to provide the type and id of the connection along with the list of updates that are to be made. 

The Appacitive platform supports partial updates on connections. As a result, instead of sending the complete connection object, you can send just the fields that have actually changed.

** Parameters ** 

<dl>
  <dt>type</dt>
  <dd>required<br/><span>The type of the connection</span></dd>
  <dt>id</dt>
  <dd>required<br/><span>The system generated id for the connection</span></dd>
  <dt>connection updates</dt>
  <dd>required<br/><span>The connection object with the fields to be updated.</span></dd>
  <dt>revision</dt>
  <dd>optional<br/><span>The revision of the object. Incase the revision does not match on the server, the call will fail.</span></dd>
</dl>

** Response **

Returns the updated connection object.
In case of an error, the `status` object contains details of the failure.


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
      "objectid": "37266379552981902"
    },
    "__endpointb": {
      "label": "employee",
      "type": "user",
      "objectid": "37266380289082256"
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
$$$Method
Appacitive.Connection::save()
```
``` javascript
$$$Sample Request
//Get the connection object and update the description
Appacitive.Connection.get({ 
    relation: 'review',    //mandatory
    id: '1234345',         //mandatory
    fields: ["description"]
}).then(function(review) {
    // connection obj is returned as argument to onsuccess
    review.set('description','good hotel')
    review.save(function(){
      alert('review connection saved successfully.');
    }, function(status, obj){
      alert('Save failed for review connection');
    });
}, function(status) {
    alert('Could not fetch, probably because of an incorrect id');
});
```
``` csharp
//Get the connection object and update the description
var connection = await APConnections.GetAsync("review", "1234345");
connection.Set<string>("description", "good hotel");
await connection.SaveAsync();
```

### Delete a connection
You can delete a connection by simply providing the type of the connection along with it's id.

** Parameters ** 

<dl>
  <dt>type</dt>
  <dd>required<br/><span>The type of the connection to be deleted</span></dd>
  <dt>id</dt>
  <dd>required<br/><span>The system generated id for the connection</span></dd>
</dl>

** Response **

If the delete is successful, the response will contain a successful `status` object.
Incase the given id does not exist or in the event of a failure, the response will contain a `status` object with 
details of the failure.

``` rest
$$$Method
DELETE https://apis.appacitive.com/connection/{type}/{id}
```
``` rest
$$$Sample Request
// delete review connection with id 123123 //

curl -X DELETE \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Content-Type: application/json" \
https://apis.appacitive.com/connection/review/123123
```
``` rest
$$$Sample Response
{
  "code": "200",
  "message": "Successful",
  "faulttype": null,
  "version": null,
  "referenceid": "a01d2c73-78b5-49e3-9d56-f18f6103d3af",
  "additionalmessages": []
}
```

``` javascript
$$$Method
Appacitive.Connection::destroy()
```
``` javascript
$$$Sample Request
/* delete review connection with id 123123 */
var review = new Appacitive
  .Connection({relation: 'review', __id : '123123'});

review.destroy().then(function() {
    alert('Deleted successfully');
}, function(status, obj) {
    alert('Delete failed')
});

```
``` csharp
/* delete review connection with id 123123 */
await APConnections.DeleteAsync("review", "123345");

```

#### Delete multiple connections
Incase you want to delete multiple connections, simply pass a list of the ids of the connections that you want to delete.
One caveat here is that, all the connections should be of the same type.

** Parameters ** 

<dl>
  <dt>type</dt>
  <dd>required<br/><span>The type of the connection to be deleted</span></dd>
  <dt>idlist</dt>
  <dd>required<br/><span>The list of connection id to be deleted</span></dd>
</dl>

** Response **

If the delete is successful, the response will contain a successful `status` object.
Incase any of the given id do not exist or in the event of a failure, the response will contain a `status` object with 
details of the failure.

``` rest
$$$Method
POST https://apis.appacitive.com/connection/{type}/bulkdelete
```
``` rest
$$$Sample Request
// delete review connections with ids 40438996554377032, 40440007982449139 & 40440007982449139 //

curl -X DELETE \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Content-Type: application/json" \
-d '{ "idlist": [ "40438996554377032", "40440007982449139", "40440007982449139"] }' \
https://apis.appacitive.com/connection/review/bulkdelete
```
``` rest
$$$Sample Response
{
  "code": "200",
  "message": "Successful",
  "faulttype": null,
  "version": null,
  "referenceid": "a01d2c73-78b5-49e3-9d56-f18f6103d3af",
  "additionalmessages": []
}
```

``` javascript
$$$Method
Appacitive.Connection.multiDelete({
  relation: 'type', //mandatory
  ids: []           //mandatory  
})
```
``` javascript
$$$Sample Request
/* delete review connections with ids 40438996554377032, 40440007982449139 & 40440007982449139 */

Appacitive.Connection.multiDelete({    
    relation: 'reivew', //mandatory
    ids: ["40438996554377032", "40440007982449139", "40440007982449139"] //mandatory
}).then(function() { 
    //successfully deleted all connections
}, function(status) {
    alert("code:" + status.code + "\nmessage:" + status.message);
});
```
``` csharp
/* delete review connections with ids 40438996554377032, 40440007982449139 & 40440007982449139 */

var ids = new [] {"40438996554377032", "40440007982449139", "40440007982449139"};
await APConnections.MultiDeleteAsync("review", ids);
```

### Querying connections

Data inside the Appacitive platform is stored in the form of a data graph. This is very useful since most queries for data
can be broken down into some form of graph traversal. The sections below detail out how to use connections to query for
connected data inside the platform.

#### Get connected objects

In a relational database, you can query for related data by querying over a table's foreign key. Similarly, on the Appacitive platform,
related data can be retrieved by querying connections. You can query for all objects connected to a specific object via a given connection type. 

**For example**<br>
Querying for all users who have visited San Francisco can be represented as <br>
`Get all user objects connected to the city object (San Francisco) via the visited connection`.

In the query for connected data, you need to specify the type of the connection and the object (type & id ) for which you need connected data.

** Parameters ** 

<dl>
  <dt>connection_type</dt>
  <dd>required<br/><span>The type of the connection to be queried</span></dd>
  <dt>object_type</dt>
  <dd>required<br/><span>type of object for which to get the connected objects</span></dd>
  <dt>object id</dt>
  <dd>required<br/><span>The object id for which to get the connected objects</span></dd>
  <dt>returnEdge</dt>
  <dd>optional<br/><span>Flag indicating whether or not to return the individial connection information as well. True be default.</span></dd>
</dl>

** Response **

Returns the list of objects (along with connection information) connected to the given object via the given connection type.


``` rest
$$$Method
GET https://apis.appacitive.com/connection/{connection_type}/{object_type}/{object_id}/find?returnedge={true/false}
```
``` rest
$$$Sample Request
// Get all users who have visited San Francisco (city object with id 636523636) 

curl -X GET \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Content-Type: application/json" \
GET https://apis.appacitive.com/connection/visitor/city/636523636/find?returnedge=true
```
``` rest
$$$Sample Response

// System attributes have been removed for readability // 

{
  "paginginfo": {
    "pagenumber": 1,
    "pagesize": 20,
    "totalrecords": 2
  },
  "parent": "city",
  "nodes": [
    {
      "__id": "40440013641645242",
      "__type": "user",
      "username" : "john.doe",
      ...
      // Connection information is available in the __edge node. 
      // It is only returned if returnedge=true in request.
      "__edge": {
        "__label": "user",
        "__id": "40440013690928316",
        "__relationtype": "visitor"
      }
    },
    {
      "__id": "30440013682145242",
      "__type": "user",
      "username" : "jane.doe",
      ...
      "__edge": {
        "__label": "user",
        "__id": "30447393690923721",
        "__relationtype": "visitor"
      }
    }
  ],
  "status": {
    "code": "200",
    "message": "Successful",
    "faulttype": null,
    "version": null,
    "referenceid": "ab30a26c-6757-40f7-8c61-1f888e57f2c1",
    "additionalmessages": []
  }
}
```

``` javascript
$$$Method
Appacitive.Object::fetchConnectedObjects({
  relation: 'type', //mandatory
  label: 'label',   //optional
  returnEdge: true,  //optional: default is true
  fields: [],                //optional
  filter: {Appacitive.Filter obj}, //optional  
  pageNumber: 1 ,           //optional: default is 1
  pageSize: 50,             //optional: default is 50
  orderBy: '__utclastupdateddate', //optional
  isAscending: false        //optional: default is false
})
```
``` javascript
$$$Sample Request
// Get all users who have visited San Francisco (city object with id 63652363) 
var city = new Appacitive.Object({ __id : '63652363', __type : 'city');

city.fetchConnectedObjects({ 
  relation : 'visitor', //mandatory
  label: 'visitor', // optional
  returnEdge: true, // set to false to stop returning connection
  fields: ["__id"]
}).then(function(results) {

  // list of all connected objects to jane
  var users = city.children["visitor"];

  // Or you can directly pick users from results
  users = results;

  //iterating on the users array
  users.forEach(function (u) {
    //connection connecting city to each user
    console.log(u.connection.id());
  }
}, function(status) {
    alert("code:" + status.code + "\nmessage:" + status.message);
});

/* On success, city object is populated with a visitor property in its children. So, city.children.visitor will give you a list of all visitors of Appacitive.Object type. These objects also contain a connection property which consists of its link properties with jane.*/
```

``` csharp
// Get all users who have visited San Francisco (city object with id 636523636) 
var city = new APObject("city", "636523636");
var visitors = await city.GetConnectedObjectsAsync("visitor");
```

#### Retrieve all connections between two endpoints

Many instances of connections of different types can be created between two object instances.
Allowing us, to retrieve all connections between two object ids of same or different types.

**For example**<br>

Say you have two users and you want to see if they are friends (by virtue of a "friend" connection between them), and are they also married (by virtue of a "marriage" connection between them), then you can simply try and retrieve those connections providing the ids of the two users.

** Parameters ** 

<dl>
  <dt>objectAId</dt>
  <dd>required<br/><span>Id of objectA</span></dd>
  <dt>objectBId</dt>
  <dd>required<br/><span>Id of objectB</span></dd>
</dl>

** Response **

Returns a list of all connections that exists between objectAId and objectBId of any relation type

``` rest
$$$Method
GET https://apis.appacitive.com/connection/find/{objectAId}/{objectBId}
```
``` rest
$$$Sample Request
// Try and get all connections between two users John(22322) and Jane(33422)

curl -X GET \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Content-Type: application/json" \
https://apis.appacitive.com/connection/find/22322/33422

```
``` rest
$$$Sample Response
//Returns all connections present between objectAId and objectBId of any relation type.

// System attributes have been removed for readability
{
  "paginginfo": {
    "pagenumber": 1,
    "pagesize": 20,
    "totalrecords": 3
  },
  "connections": [
    {
      "__id": "41156992433261401",
      "__relationtype": "marriage",
      "__endpointa": {
        "label": "husband",
        "type": "user",
        "objectid": "22322"
      },
      "__endpointb": {
        "label": "wife",
        "type": "user",
        "objectid": "33422"
      }
    },
    {
      "__id": "41157044188875634",
      "__relationtype": "friend",
      "__endpointa": {
        "label": "me",
        "type": "user",
        "objectid": "33422"
      },
      "__endpointb": {
        "label": "freind",
        "type": "user",
        "objectid": "22322"
      }
    },
    {
      "__id": "41157051534150519",
      "__relationtype": "friend",
      "__endpointa": {
        "label": "me",
        "type": "user",
        "objectid": "22322"
      },
      "__endpointb": {
        "label": "freind",
        "type": "user",
        "objectid": "33422"
      }
    }
  ],
  "status": {
    "code": "200",
    "message": "Successful",
    "faulttype": null,
    "version": null,
    "referenceid": "ce871063-5443-4524-9443-d14860949c59",
    "additionalmessages": []
  }
}
```
``` javascript
$$$Method
Appacitive.Connection.getBetweenObjects({
  objectAId : 'objectAId', //mandatory
  objectBId : 'objectBId', //mandatory
  fields: [],                //optional
  filter: {Appacitive.Filter obj}, //optional  
  pageNumber: 1 ,           //optional: default is 1
  pageSize: 50,             //optional: default is 50
  orderBy: '__utclastupdateddate', //optional: default is __utclastupdateddate
  isAscending: false        //optional: default is false
})
```
``` javascript
$$$Sample Request
// Try and get all connections between two users John(22322) and Jane(33422)

var idForJohn = "22322";
var idForJane = "33422";

Appacitive.Connection.getBetweenObjects({ 
    objectAId : idForJohn, 
    objectBId : idForJane,
	  fields: ["__id"]
}).then(function(connections) {
    // connections is an array of all connections between two ids which is returned as argument to onsuccess
    connections.forEach(function(con) {
      if (conn.relation == 'marriage') {
        console.log("John and Jane are married");
      }
    });
}, function(status, obj) {
    alert('Could not fetch, probably because of incorrect id's');
});

```

#### Retrieve all inter-connections between one and many endpoints

Scenarios where you may need to determine all type of connections between one object and a set of objects, this query comes to rescue.

**For example**<br>

Say you have many `users` and `houses`( objects of type house) and you want to determine if they are connected to `Jane` by either a `friend` or by `marriage` or by `owns` connection, then you can simply try and retrieve those connections providing Jane's id as root and ids of the users and house as target.

** Parameters ** 

<dl>
  <dt>objectAId</dt>
  <dd>required<br/><span>Id of rrot object</span></dd>
  <dt>objectBids</dt>
  <dd>required<br/><span>Ids of target objects</span></dd>
</dl>

** Response **

Returns a list of all connections that exist between objectAid and objectBids of any relation type

**Note** that this is a `POST` HTTP call.

``` rest
$$$Method
POST https://apis.appacitive.com/connection/interconnects
```
``` rest
$$$Sample Request
// Try and get all connections between Jane(33422) and users John(22322), Tarzan(44522) and house (55622, 665722)

curl -X POST \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Content-Type: application/json" \
-d '{"object1id":"33422","object2ids":["22322","44522","55622","665722"]}' \
https://apis.appacitive.com/connection/interconnects
```
``` rest
$$$Sample Response
//Returns all connections present between objectAId and objectBIdS of any relation type.

// System attributes have been removed for readability
{
  "paginginfo": {
    "pagenumber": 1,
    "pagesize": 20,
    "totalrecords": 3
  },
  "connections": [
    {
      "__id": "41156992433261401",
      "__relationtype": "marriage",
      "__endpointa": {
        "label": "husband",
        "type": "user",
        "objectid": "22322"
      },
      "__endpointb": {
        "label": "wife",
        "type": "user",
        "objectid": "33422"
      }
    },
    {
      "__id": "41157051534150519",
      "__relationtype": "friend",
      "__endpointa": {
        "label": "me",
        "type": "user",
        "objectid": "22322"
      },
      "__endpointb": {
        "label": "freind",
        "type": "user",
        "objectid": "33422"
      }
    },
    {
      "__id": "41164995348794263",
      "__relationtype": "friend",
      "__endpointa": {
        "label": "me",
        "type": "user",
        "objectid": "22322"
      },
      "__endpointb": {
        "label": "freind",
        "type": "user",
        "objectid": "44522"
      }
    },
    {
      "__id": "41164995348794263",
      "__relationtype": "owns",
      "__endpointa": {
        "label": "user",
        "type": "user",
        "objectid": "22322"
      },
      "__endpointb": {
        "label": "house",
        "type": "house",
        "objectid": "665722"
      },
    },
  ],
  "status": {
    "code": "200",
    "message": "Successful",
    "faulttype": null,
    "version": null,
    "referenceid": "ce871063-5443-4524-9443-d14860949c59",
    "additionalmessages": []
  }
}
```
``` javascript
$$$Method
Appacitive.Connection.getInterconnects({
  objectAId : 'objectAId', //mandatory
  objectBIds : 'objectBId', //mandatory
  fields: [],                //optional
  pageNumber: 1 ,           //optional: default is 1
  pageSize: 50,             //optional: default is 50
  orderBy: '__utclastupdateddate', //optional
  isAscending: false        //optional: default is false
})
```
``` javascript
$$$Sample Request
// Try and get all connections between two users John(22322) and Jane(33422)

var idForJohn = "22322", idForJane = "33422", idForTarzan = "44522";
var idForHouse1 = "55622", idForHouse2 = "66722";

Appacitive.Connection.getInterconnects({ 
    objectAId : idForJohn, 
    objectBIds : [idForJane, idForTarzan, idForHouse1, idForHouse2]
    fields: ["__id"]
}).then(function(connections) {
    // connections is an array of all connections netween objectAId  and objectBIds which is returned as argument to onsuccess
    connections.forEach(function(con) {
      if (conn.relation == 'marriage') {
        console.log("John and Jane are married");
      }
      if (conn.relation == 'owns') {
        console.log("Jane owns this house with id" + conn.id());
      }
    });
}, function(status, obj) {
    alert('Could not fetch, probably because of incorrect id's);
});

```


Querying Data
------------
The Appacitive platform supports rich constructs to search and query your application data. You can filter on all properties and attributes of your data.
Apart from filters, you can also specify paging and sorting information for customizing the number and order of the results.


All search results are paged with a page size of `20` by default. You can change this by providing a custom page size. Please note that the maximum page size that is allowed is `200`.
Passing any value higher than this will limit the results to `200`. The platform also supports providing modifiers to fine tune the exact set of fields to return for each 
record of the search results. The platform specific examples will indicate how this can be done.

``` rest
$$$Method
GET https://apis.appacitive.com/object/{type}/find/all?query={query expression}
```
``` rest
$$$Sample Request
// Get all objects of type players where firstname = John

curl -X GET \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Content-Type: application/json" \
https://apis.appacitive.com/object/player/find/all?query=*firstname == 'john'
```
``` rest
$$$Sample Response

// System attributes have been removed for readability
{
  "paginginfo": {
    "pagenumber": 1,
    "pagesize": 20,
    "totalrecords": 2
  },
  "objects": [
    {
      "__id": "33017891581461312",
      "__type": "player",
      "firstname": "John",
      "lastname" : "Smith"
    },
    {
      "__id": "33017891581461313",
      "__type": "player",
      "firstname": "John",
      "lastname" : "Doe"
    }
  ],
  "status": {
    "code": "200",
    "message": "Successful",
    "faulttype": null,
    "version": null,
    "referenceid": "ce871063-5443-4524-9443-d14860949c59",
    "additionalmessages": []
  }
}
```
``` javascript
$$$Method
Appacitive.Queries.FindAllQuery(options).fetch();
```
```javascript
$$$Sample Request

var filter = Appacitive.Filter.Property("firstname").equalTo("John");

var query = new Appacitive.Queries.FindAllQuery(
  type: 'player', //mandatory 
  //or relation: 'freinds'
  fields: [*],      //optional: returns all user fields only
  filter: filter,   //optional  
  pageNumber: 1 ,   //optional: default is 1
  pageSize: 20,     //optional: default is 50
  orderBy: '__id',  //optional
  isAscending: false  //optional: default is false
}); 

// success callback
var successHandler = function(players) {
  //`players` is `PagedList` of `Object`

  console.log(players.total); //total records for query
  console.log(players.pageNumber); //pageNumber for this set of records
  console.log(players.pageSize); //pageSize for this set of records
  
  // fetching other left players
  if (!players.isLastPage) {
    // if this is not the last page then fetch further records 
    query.fetchNext().then(succcessHandler);

    // or you can fetch previous records too
    query.fetchPrev().then(succcessHandler);
  }
};

// make a call
query.fetch().then(succcessHandler);
```
``` csharp
//Build the query
var query = Query.Property("firstname").Equals("John");

//`results` is `PagedList` of `APObject`
var results = await APObjects.FindAllAsync("player", query.ToString());

//Iterating the `response`
var players = new List<APObject>();
while (true)
{
     results.ForEach(r => players.Add(r));
     if(response.IsLastPage) 
      break;
     results = await results.NextPageAsync();
}
```
### Conventions for REST api

Incase you are using the REST api directly, you will need to provide all query information in the url.
To prevent any ambiguity in terms of the property names or values, the platform provides its own 
sql like query syntax as detailed below.

#### Disambiguating between attribute and property names

An object or connection can have properties and attributes with the same name.
As a result, to disambiguate between the two, the following conventions should be followed when using the same in a query.

* Property names should always be prefixed with a * to indicate that it is a property.
* Attribute names should always be prefixed with an @ to indicate that it is an attribute.

``` rest
$$$ Samples
// Find all users with property age greater than 25
curl -X POST \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {sandbox or live}" \
-H "Content-Type: application/json" \
https://apis.appacitive.com/user/find/all?query=*age > 25

// Find all users with attribute group_name equal to developers.
curl -X POST \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {sandbox or live}" \
-H "Content-Type: application/json" \
https://apis.appacitive.com/user/find/all?query=@group_name=='developers'


```

``` javascript
// Not applicable as this is handled inside the SDK.
```

``` csharp
// Not applicable as this is handled inside the SDK.
```

#### Disambiguating between value data types

To disambiguate between mistaking datetime and geocode information as strings, these type of values must be 
sent in a specific format. The details of the formatting are provided below for each data type.

| Data type | Description | Sample |
|---------------|------------|------------|
| ** Numbers ** | Numbers are to be sent as is without quotes. | 123, 123.43 
| ** Strings ** | String values should be enclosed in single quotes. Existing single quotes in the value should be encoded. | 'This is a string value'
| ** Text ** | Text values should be enclosed in single quotes. Existing single quotes in the value should be encoded. | 'This is a string value'
| ** Date ** | Date values must be prefixed with the keyword date() as shown. | date('2012-04-10')
| ** DateTime ** | DateTime values must be prefixed with the keyword datetime() as shown. | datetime('2012-04-10:12:30:30.0000000z')
| ** Geocode ** | Geocode values are sent as a latitude,longitude pair. | 66.786123623,110.8971237213
| ** Boolean ** | Boolean values can be one of true or false without quotes. | true, false

``` javascript
// Not applicable as this is handled inside the SDK.
```

``` csharp
// Not applicable as this is handled inside the SDK.
```

### Simple queries

To query your data, simply provide the filter criteria based on which you want to filter you data.
A filter criteria is typically a triple with the following information - 

<dl>
  <dt>property or attribute name</dt>
  <dd>required<br/><span>The name of the property or attribute on which the filter is being applied.
  <dt>operator</dt>
  <dd>required<br/><span>The conditional operator that needs to be applied.
  <dt>filter value</dt>
  <dd>required<br/><span>The value which the operator will use to evaluate the filter.
</dl>

The table below shows a list of supported logical operators corresponding to the different types of properties:

| Operator        | Numbers      | Strings      | DateTime     | Text         | Geography    | Boolean      |
|:---------------:|:------------:|:------------:|:------------:|:------------:|:------------:|:------------:|
| ** == **        | Yes          | Yes          | Yes          | No           | No           | Yes 
| ** != **        | Yes          | Yes          | Yes          | No           | No           | Yes 
| ** > **         | Yes          | No           | Yes          | No           | No           | No 
| ** >= **        | Yes          | No           | Yes          | No           | No           | No 
| ** < **         | Yes          | No           | Yes          | No           | No           | No 
| ** <= **        | Yes          | No           | Yes          | No           | No           | No 
| ** like **      | No           | Yes          | No           | Yes          | No           | No 
| ** between **   | Yes          | No           | Yes          | No           | No           | No 

`NOTE`: The `between` operator is inclusive at both ends.


``` rest
$$$ Query Samples

/// Equals Operator
..?query=*firstname == 'john'
..?query=*age == 25
..?query=*update_date == datetime(‘2012-04-10:12:30:30.0000000z’)

/// Comparison operators
..?query=*age > 25
..?query=*update_date <= datetime(‘2012-04-10:12:30:30.0000000z’)

/// between operator
// between is inclusive at both ends
..?query=*age between (25,35)
..?query=*last_read_timestamp between (datetime(‘2012-04-10:00:00:00.0000000z’),datetime(‘2012-05-10:00:00:00.0000000z’))

/// like operator
..?query=*firstname like '*ohn'   //  starts with
..?query=*firstname like 'oh*'    //  ends with
..?query=*firstname like '*oh*'   //  contains
```

``` javascript
$$$MORE SAMPLES

//First name like "oh"
var likeFilter = Appacitive.Filter.Property("firstname").like("oh");

//First name starts with "jo"
var startsWithFilter = Appacitive.Filter.Property("firstname").startsWith("jo");

//First name ends with "oe"
var endsWithFilter = Appacitive.Filter.Property("firstname").endsWith("oe");

//First name matching several different values
var containsFilter = Appacitive.Filter.Property("firstname").contains(["John", "Jane", "Tarzan"]);

//Equal to some string
var equalToFilter = Appacitive.Filter.Property("firstname").equalTo("John");

//Equal to some number
var equalToNumberFilter = Appacitive.Filter.Property("age").equalTo(25);

//Between two dates
var start = new Date("12 Dec 1975");
var end = new Date("12 Jun 1995");
var betweenDatesFilter = Appacitive.Filter.Property("birthdate").betweenDate(start, end);

//Between two datetime objects
var betweenDateTimeFilter = Appacitive.Filter.Property("__utclastupdateddate").betweenDateTime(start, end);

//Between some time
var betweenTimeFilter = Appacitive.Filter.Property("birthtime").betweenTime(start, end);

//Between some two numbers
var betweenFilter = Appacitive.Filter.Property("age").between(23, 70);

//Greater than a date
var date = new Date("12 Dec 1975");
var greaterThanDateFilter = Appacitive.Filter.Property("birthdate").greaterThanDate(date);

//Greater than a datetime
var greaterThanDateTimeFilter = Appacitive.Filter.Property("birthdate").greaterThanDateTime(date);

//Greater than a time
var greaterThanTimeFilter = Appacitive.Filter.Property("birthtime").greaterThanTime(date);

//greater then some number 
var greaterThanFilter = Appacitive.Filter.Property("age").greaterThan(25);

//Same works for greaterThanEqualTo, greaterThanEqualToDate, greaterThanEqualToDateTime and greaterThanEqualToTime
//and for lessThan, lessThanDate, lessThanDateTime and lessThanTime
//and for lessThanEqualTo, lessThanEqualToDate, lessThanEqualToDateTime and lessThanEqualToTime
// and for equalTo, equalToNumber equalToDate, equalToDateTime, equalToTime 

```

``` csharp
///Samples

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

### Geo queries
You can specify a property type as a `geography` type for a given type or relation. These properties are essential latitude-longitude pairs.
Such properties support geo queries based on a user defined radial or polygonal region on the map. These are extremely useful for making map based or location based searches.
E.g., searching for a list of all restaurants within 20 miles of a given user's locations.


#### Radial Search

A radial search allows you to search for all records of a specific type which contain a geocode which lie within a predefined distance from a point on the map.
A radial search requires the following parameters.

<dl>
  <dt>type</dt>
  <dd>required<br/><span>The type or relation on which to apply the filter.
  <dt>property name</dt>
  <dd>required<br/><span>The name of the geography property on which to apply the filter.
  <dt>center geocode</dt>
  <dd>required<br/><span>The geocode which will act as the center of the radial region.
  <dt>radius</dt>
  <dd>required<br/><span>The radius of the radial region from the given center geocode.
  <dt>distance unit</dt>
  <dd>required<br/><span>The unit of distance (mi \ km).
</dl>

``` rest
$$$Method
GET https://apis.appacitive.com/object/{type}/find/all?query=*{property_name} within_circle {latitude},{longitude},{radius} {km or mi}
```
``` rest
$$$Sample Request
// Get all hotels with geocode property within 10 miles of 36.1749687195M, -115.1372222900M

curl -X GET \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Content-Type: application/json" \
https://apis.appacitive.com/object/hotel/find/all?query=*geocode within_circle 36.1749687195,-115.1372222900,10 mi
```
``` rest
$$$Sample Response

// System attributes have been removed for readability
{
  "paginginfo": {
    "pagenumber": 1,
    "pagesize": 20,
    "totalrecords": 2
  },
  "objects": [
    {
      "__id": "33017891581461312",
      "__type": "hotel",
      "name": "Hotel BeachFront",
      "geocode" : "36.1749687195,-115.1372222900"
    },
    {
      "__id": "33017891581461313",
      "__type": "hotel",
      "firstname": "Hotel SeaView",
      "lastname" : "36.1749687195,-115.1372222900023"
    }
  ],
  "status": {
    "code": "200",
    "message": "Successful",
    "faulttype": null,
    "version": null,
    "referenceid": "ce871063-5443-4524-9443-d14860949c59",
    "additionalmessages": []
  }
}
```
``` javascript
var center = new Appacitive.GeoCoord(36.1749687195, -115.1372222900);
var radialFilter = Appacitive.Filter.Property('location')
                                       .withinCircle(center,10,'km');

//create query object
var query = new Appacitive.Queries.FindAllQuery({
  type: 'hotel',
  filter: radialFilter
});

//or set it in an existing query
query.filter(radialFilter);

query.fetch();
```
``` csharp
//Search for hotels near Las Vegas in a radius of 10 miles
var center = new Geocode(36.1749687195M, -115.1372222900M);
var radialQuery = Query
                    .Property("location")
                    .WithinCircle(center, 10.0M, DistanceUnit.Miles);
var hotels = await APObjects.FindAllAsync( "hotel", radialQuery);
```

#### Polygon Search

A polygon search is a more generic form of geographcal search. It allows you to specify a polygonal region on the map via a set of geocodes 
indicating the vertices of the polygon. The search will allow you to query for all data of a specific type that lies within the given polygon.
This is typically useful when you want a finer grained control on the shape of the region to search.

<dl>
  <dt>type</dt>
  <dd>required<br/><span>The type or relation on which to apply the filter.
  <dt>property name</dt>
  <dd>required<br/><span>The name of the geography property on which to apply the filter.
  <dt>geocodes</dt>
  <dd>required<br/><span>List of geocodes indicating the vertices of the polygonal region.
</dl>
 
``` rest
$$$Method
GET https://apis.appacitive.com/object/{type}/find/all?query=*{property_name} within_polygon {lat1,long1} | {lat2,long2} | {lat3,long3} | ..
```
``` rest
$$$Sample Request
// Get all hotels with geocode property within a polygon created by points
1) 36.1749687195,-115.1372222900
2) 38.1123237195,-115.1372222900
3) 38.1123237195,-113.871283723
4) 36.1749687195,-113.871283723

curl -X GET \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Content-Type: application/json" \
https://apis.appacitive.com/object/hotel/find/all?query=*geocode within_polygon 36.1749687195,-115.1372222900 | 38.1123237195,-115.1372222900 | 38.1123237195,-113.871283723 | 36.1749687195,-113.871283723
```
``` rest
$$$Sample Response

// System attributes have been removed for readability
{
  "paginginfo": {
    "pagenumber": 1,
    "pagesize": 20,
    "totalrecords": 2
  },
  "objects": [
    {
      "__id": "33017891581461312",
      "__type": "hotel",
      "name": "Hotel BeachFront",
      "geocode" : "36.1749687195,-114.1372222900"
    },
    {
      "__id": "33017891581461313",
      "__type": "hotel",
      "firstname": "Hotel SeaView",
      "lastname" : "37.1749687195,-114.1372222900023"
    }
  ],
  "status": {
    "code": "200",
    "message": "Successful",
    "faulttype": null,
    "version": null,
    "referenceid": "ce871063-5443-4524-9443-d14860949c59",
    "additionalmessages": []
  }
}
```
``` javascript
var pt1 = new Appacitive.GeoCoord(36.1749687195, -115.1372222900);
var pt2 = new Appacitive.GeoCoord(34.1749687195, -116.1372222900);
var pt3 = new Appacitive.GeoCoord(35.1749687195, -114.1372222900);
var pt4 = new Appacitive.GeoCoord(36.1749687195, -114.1372222900);
var geocodes = [ pt1, pt2, pt3, pt4 ];
var polygonFilter = Appacitive.Filter.Property("location")
                                         .withinPolygon(geocodes);


//create query object
var query = new Appacitive.Queries.FindAllQuery({
  type: 'hotel',
  filter: polygonFilter
});

//or set it in an existing query
query.filter(polygonFilter);

//call fetch
query.fetch();
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

### Tag based queries

The Appacitive platform provides inbuilt support for tagging on all data (objects, connections, users and devices).
You can use this tag information to query for a specific data set. The different options available for searching based on tags are detailed in the sections below.

#### Query data tagged with one or more of the given tags

For data of a given type, you can query for all records that are tagged with one or more tags from a given list. For example - querying for all objects of type message that are tagged as `personal` or `private`.

** Parameters ** 
<dl>
  <dt>type</dt>
  <dd>required<br/><span>The type or relation on which to search.
  <dt>tags</dt>
  <dd>required<br/><span>List of tags to be searched for.
</dl>

** Response ** 
Returns a list of all records of the given type that are tagged with atleast one of the given tag values.

``` rest
$$$Method
GET https://apis.appacitive.com/object/{type}/find/all?query=tagged_with_one_or_more('{comma separated list of tags}')
```
``` rest
$$$Sample Request
// Get all objects of type message which are tagged with either personal or private.

curl -X GET \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Content-Type: application/json" \
https://apis.appacitive.com/object/message/find/all?query=tagged_with_one_or_more('personal,private')
```
``` rest
$$$Sample Response

// System attributes have been removed for readability
{
  "paginginfo": {
    "pagenumber": 1,
    "pagesize": 20,
    "totalrecords": 2
  },
  "objects": [
    {
      "__id": "33017891581461312",
      "__type": "message",
      "__tags": ["personal"],
      "title": "Personal message",
      "text": "This is a test personal message."
    },
    {
      "__id": "33017891581461313",
      "__type": "message",
      "__tags": ["private","test"],
      "title": "Private message test",
      "text": "This is a test private message."
    }
  ],
  "status": {
    "code": "200",
    "message": "Successful",
    "faulttype": null,
    "version": null,
    "referenceid": "ce871063-5443-4524-9443-d14860949c59",
    "additionalmessages": []
  }
}
```
``` csharp
// Get all messages tagged with tags personal or private.
var query = Query
              .Tags
              .MatchOneOrMore("personal", "private");
var messages = await APObjects.FindAllAsync( "message", query );
```
```javascript
//create the filter 
//accepts an array of tags
var tagFilter = Appacitive.Filter
                      .taggedWithOneOrMore(["personal", "private"]);

//create the query
var query = new Appacitvie.Filter.FindAllQuery({
  type: 'message',
  filter: tagFilter
});

//or set it in an existing query
query.filter(tagFilter);

//call fetch
query.fetch();
```


#### Query data tagged with all of the given tags

An alternative variation of the above tag based search allows you to query for all records that are tagged with all the tags from a given list. For example, querying for all objects of type `message` that are tagged as `personal` AND `private`.

** Parameters ** 
<dl>
  <dt>type</dt>
  <dd>required<br/><span>The type or relation on which to search.
  <dt>tags</dt>
  <dd>required<br/><span>List of tags to be searched for.
</dl>

** Response ** 
Returns a list of all records of the given type that are tagged with all of the given tag values.

``` rest
$$$Method
GET https://apis.appacitive.com/object/{type}/find/all?query=tagged_with_all('{comma separated list of tags}')
```
``` rest
$$$Sample Request
// Get all objects of type message which are tagged with either personal and test.

curl -X GET \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Content-Type: application/json" \
https://apis.appacitive.com/object/message/find/all?query=tagged_with_all('personal,test')
```
``` rest
$$$Sample Response
// System attributes have been removed for readability
{
  "paginginfo": {
    "pagenumber": 1,
    "pagesize": 20,
    "totalrecords": 1
  },
  "objects": [
    {
      "__id": "33017891581124312",
      "__type": "message",
      "__tags": ["personal", "test"],
      "title": "Personal test message",
      "text": "This is a test personal message."
    }
  ],
  "status": {
    "code": "200",
    "message": "Successful",
    "faulttype": null,
    "version": null,
    "referenceid": "ce871063-5443-4524-9443-d14860949c59",
    "additionalmessages": []
  }
}
```
``` csharp
// Get all messages tagged with tags personal and test
var query = Query
              .Tags
              .MatchAll("personal", "test");
var messages = await APObjects.FindAllAsync( "message", query );
```
```javascript
//create the filter 
//accepts an array of tags
var tagFilter = Appacitive.Filter
                          .taggedWithAll(["personal", "test"]);

//create the query
var query = new Appacitvie.Filter.FindAllQuery({
  type: 'message',
  filter: tagFilter
});

//or set it in an existing query
query.filter(tagFilter);

//call fetch
query.fetch();
```
### Free text queries

There are situations when you would want the ability to search across all text content inside your data.
Free text queries are ideal for implementing this kind of functionality. As an example, consider a free text lookup for users
which searches across the username, firstname, lastname, profile description etc.

You can pass multiple values inside a free text search. It also supports passing certain modifiers that allow you to control
how each search term should be used. This is detailed below.

** Parameters ** 
<dl>
  <dt>type</dt>
  <dd>required<br/><span>The type or relation on which to search.
  <dt>free text terms</dt>
  <dd>required<br/><span>List of free text terms to search for.
</dl>

** Response ** 
Returns a list of all records of the given type that match the given free text expression.

** Free text modifiers **

| Modifier        | Syntax        | Sample
|:---------------|:------------:|:------------|
| Starts with     | {prefix}*        | `econo*` will searc for all text containing words starting with `econo`.
| Ends with     | *{suffix}        | `*omic` will search for all text containing words ending with `omic`.
| Single character substitution | {text}?{text}   | `h?re` will match all text containing terms like `here`, `hare` etc.
| Must contain     | +{term}        | `+hello world` will search for all text that contains the term `hello` and may contain the term `world`.
| Must not contain     | -{term}       | `hello -world` will search for all text may contain the term hello but does not contain the term `world`.


``` rest
$$$Method
GET https://apis.appacitive.com/object/{type}/find/all?freetext={free text expression}
```
``` rest
$$$Sample Request
// Get all photos that contain the terms "champs" or "Palais".

curl -X GET \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Content-Type: application/json" \
https://apis.appacitive.com/object/photo/find/all?freetext=champs Palais
```
``` rest
$$$Sample Response

// System attributes have been removed for readability
{
  "objects": [
    {
      "__id": "38705090736030853",
      "__type": "photo",
      "url": "http://www.photosparis.com/images/paris_black_and_white_night/paris_champs_elysees_3_bwn.jpg",
      "description": "Champs Elysees"
    },
    {
      "__id": "38705134668218897",
      "__type": "photo",
      "url": "http://www.photosparis.com/images/paris_black_and_white/paris_parc_palais_royal_bw.jpg",
      "description": "Parc Palais Royale"
    }
  ],
  "paginginfo": {
    "pagenumber": 1,
    "pagesize": 20,
    "totalrecords": 2
  },
  "status": {
    "code": "200",
    "message": "Successful",
    "faulttype": null,
    "version": null,
    "referenceid": "0eb5b341-76f1-4f9d-97ef-c1512ea4a4cc",
    "additionalmessages": []
  }
}
```
```javascript
//create the query
var query = new Appacitvie.Filter.FindAllQuery({
  type: 'message',
  freeText: 'champs palais'
});

//or set it in the query
query.freeText('champs palais');

//call fetch
query.fetch();
```

### Sorting and paging

All search queries on the platform return a paginated response. You can specify the page number and page size of the result set that you want returned. By default, the page size for results is `20`. This is capped to a max value of `200` for performance reasons. 


You can also specify the property name based on which you would like the result set to be sorted, along with the direction (ascending or descending). Take a look at the platform specific samples to see how this information is passed from the client.

``` rest
$$$Method
GET https://apis.appacitive.com/object/{type}/find/all?psize={page size}&pnum={page number}&orderBy={order by property name}&isAsc={true or false}
```
``` rest
$$$Sample Request
// Get page 2 of photos with page size 1 sorted by __id descending. 

curl -X GET \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Content-Type: application/json" \
GET https://apis.appacitive.com/object/photo/find/all?psize=1&pnum=2&orderBy=__id&isAsc=false

```
``` rest
$$$Sample Response

// System attributes have been removed for readability
{
  "objects": [
    {
      "__id": "38705319445135958",
      "__type": "photo",
      "__tags": [
        "florence",
        "italy"
      ],
      "url": "http://media-cdn.tripadvisor.com/media/photo-s/00/19/01/0a/florence-italy.jpg",
      "description": "Florence bridge"
    }
  ],
  "paginginfo": {
    "pagenumber": 2,
    "pagesize": 1,
    "totalrecords": 9
  },
  "status": {
    "code": "200",
    "message": "Successful",
    "faulttype": null,
    "version": null,
    "referenceid": "de861482-b527-4023-9dec-d0e3d3eb490a",
    "additionalmessages": []
  }
}
```
```javascript
//create a query
var query = new Appacitive.Queries.findAllQuery({
  type: 'photo',
  pageSize: 30, //default: 50
  pageNumber: 4, //default: 1
  orderBy: '__id', //default: __utclastupdateddate
  isAscending: true //default: false
});

//set paging in an existing query
query.pageSize(25);
query.pageNumber(2);


//set sorting in an existing query
query.orderBy('__createdby');
query.isAscending(false);

// success callback
var successHandler = function(photos) {
  //`photos` is `PagedList` of `Object`

  console.log(photos.total); //total records for query
  console.log(photos.pageNumber); //pageNumber for this set of records
  console.log(photos.pageSize); //pageSize for this set of records

  // fetching other left players
  if (!players.isLastPage) {
    // if this is not the last page then fetch further records 
    query.fetchNext().then(successHandler);
  }
};

//call fetch
query.fetch().then(successHandler);
```

### Compound Queries

Compound queries allow you to combine multiple queries into one single query. The multiple queries can be combined using the boolean 
&& (AND) and || (OR) operators. When using a combination of AND and OR, you can use round brackets to create logical groups within the compound query. 
Individual SDKs provide helper methods to help assist in building compound queries.

`NOTE`: All types of queries with the exception of free text queries can be combined into a compound query.

``` javascript
//Use of `And` and `Or` operators
var center = new Appacitive.GeoCoord(36.1749687195, -115.1372222900);

//AND query
var complexFilter = 
      Appacitive.Filter.And(
          //OR query
          Appacitive.Filter.Or( 
             Appacitive.Filter.Property("firstname").startsWith("jo"),
             Appacitive.Filter.Property("lastname").like("oe")
          ),
          Appacitive.Filter.Property("location")
              .withinCircle(center, 
                      10, 
                      'mi') // can be set to 'km' or 'mi'
      );
//create query object
var query = new Appacitive.Queries.FindAllQuery({
  type: 'player'
});

//set filter in query
query.filter(complexFilter);

//add more filters
query.filter(
            Appacitive.Filter.And(
              Appacitive.Filter.Property('gender').equalTo('male'),
              query.filter()
            )
          );

//fire the query
query.fetch();
```
``` csharp
//Use of `And` and `Or` operators
var center = new Geocode(36.1749687195M, -115.1372222900M);

                   //AND query
var complexQuery = Query.And(new[]{
                      //OR query
                      Query.Or(new[] { 
                         Query.Property("firstname").StartsWith("jo"),
                         Query.Property("lastname").Like("*oe*")
                      }),
                      Query.Property("location")
                          .WithinCircle(center, 
                                  10.0M, 
                                  DistanceUnit.Miles)
          });
```

Graph Search
------------

Graph queries offer immense potential when it comes to traversing and mining for connected data. There are two kinds of graph queries, `filter` and `projection`.
You can read about them here <http://www.example.com>.

### Creating graph queries

You can create `filter` and `projection` graph queries from the management portal. When you create such queries from the portal, you are required to assign a unique `name` with every saved search query.
You can then use this `name` to execute the query from your app by making the appropriate api call to Appacitive. 

### Executing filter graph queries

You can execute a saved graph query (filter or projection) by using it's `name` that you assigned to it while creating it from the management portal.
You will need to send any `placeholders` you might have set up while creating the query as a list of key-value pairs in the body of the request.
Note that graph queries are HTTP POST calls.

** Parameters **

<dl>
	<dt>name</dt>
	<dd>required<br/><span>This is the unique name of the query you want to execute.
	<dt>placeholders</dt>
	<dd>optional<br/><span>This is an array of key-value pairs through which you supply the values to the placeholders in the query.
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
POST https://apis.appacitive.com/search/{filter query name}/filter
```
``` rest
$$$Sample Request
//	Execute a saved filter query
curl -X POST \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Content-Type: application/json" \
-d
{
	"placeholders": {
		"key1": "value1",
		"key2": "value2"
	}
}
https://apis.appacitive.com/search/sample_filter/filter
```

``` rest
$$$Sample Response
{
	"ids": [
	"34912447775245454",
	"34322447235528474",
	"34943243891025029"
	],
	"status": {
		"code": "200",
		"message": "Successful",
		"faulttype": null,
		"version": null,
		"referenceid": "18368cc3-f0a3-4c8d-8203-668415d83308",
		"additionalmessages": []
	}
}
```

```csharp
var filterQueryName = "sample_filter";
var placeholderFillers = new Dictionary<string, string> { { "key1", "value1" }, { "key2", "value2" } };
var results = await Graph.Filter(filterQueryName, placeholderFillers);
```
```javascript
$$$Method
Appacitive.Queries.GraphFilterQuery({filterQueryName}, {placeholderFillers}).fetch();
```
```javascript
$$$Sample Request
var filterQueryName = "sample_filter";
var placeholderFillers = { key1: "value1", key2: "value2" };
var query = new Appacitive.Queries.GraphFilterQuery(filterQueryName, placeholderFillers);

query.fetch().then(function(ids) {
  console.log(ids.length + " found");
}, function(status) {
  console.log("Error running filter query");
});
```

### Executing projection graph queries

Executing saved projection queries works the same way as executing saved filter queries. The only difference is that you also need to pass the initial `ids` as an array of strings to feed the projection query.
The response to a projection query will depend on how you design your projection query. Do test them out using the query builder from the query tab on the management portal and from the test harness.

** Parameters **

<dl>
	<dt>name</dt>
	<dd>required<br/><span>This is the unique name of the query you want to execute.
	<dt>ids</dt>
	<dd>required<br/><span>These are the id(s) you need to feed into the query as the starting point.
	<dt>placeholders</dt>
	<dd>optional<br/><span>This is an array of key-value pairs through which you supply the values to the placeholders in the query.
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
POST https://apis.appacitive.com/search/{projection query name}/project
```
``` rest
$$$Sample Request
//	Execute a saved projection query
curl -X POST \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Content-Type: application/json" \
-d
{
	"ids": [
	"34912447775245454",
	"34322447235528474",
	"34943243891025029"
	],
	"placeholders": {
		"key1": "value1",
		"key2": "value2"
	}
}
https://apis.appacitive.com/search/sample_projection/project
```

``` rest
$$$Sample Response
{
	"movie": {
		"values": []
	},
	"status": {
		"code": "200",
		"message": "Successful",
		"faulttype": null,
		"version": null,
		"referenceid": "6c64bfeb-d495-4615-8dd5-e48b1f37f817",
		"additionalmessages": []
	}
}
```

```csharp
var projectQueryName = "sample_project";
var rootIds = new List<string>() { "34912447775245454", "34322447235528474", "34943243891025029" };
var placeholderFillers = new Dictionary<string, string> { { "key1", "value1" }, { "key2", "value2" } };
var result = await Graph.Project(projectQueryName, rootIds, placeholderFillers);
```
```javascript
$$$Method
Appacitive.Queries.GraphProjectQuery({projectQueryName}, {placeholderFillers}).fetch();
```
```javascript
$$$Sample Request
var projectQueryName = "sample_filter";
var placeholderFillers = { key1: "value1", key2: "value2" };
var query = new Appacitive.Queries.GraphProjectQuery(projectQueryName, placeholderFillers);

query.fetch().then(function(results) {
  /* results object contains list of objects for provided ids
     Each object contains a children property
     Children contains array of objects 
     of specified child elements in query
     eg: */ 
  console.log("This id '" + results[0].id() + "' has " 
       + results[0].children["freinds"].length) + " freinds and owns "
       + results[0].children["owns"].length) + " houses");
}, function(status) {
  console.log("Error running project query");
});

```

User management
======

Users represent your apps' users. Appacitive provides API(s) to store and manage details and data about your users out of the box through an inbuilt type called `user`.

Users
------------

This inbuilt type `user` behaves just like any other type created by you with added features like authentication, location tracking, password management, session management and third-party social integration using OAuth 1.0 or OAuth 2.0.

`Note` : While working with user API(s) you need to pass an additional HTTP header called `Appacitive-User-Auth` with its value set to a valid user `session token` generated for that user.

<span class="h3">The user object</span>

** System generated properties ** 

The `user` object contains all the `system defined properties` that you would find in an object of any type like `__id`, `__type`, `__createdby`, `__lastmodifiedby`, `__utcdatecreated`, `__utclastupdateddate`, `__revision`, `__tags` and `__attributes`.  
It also has some additional `pre-defined` properties to provide the added user management features, and you can also add more properties to the `user` type the same way you would add properties to any other type using the management portal. 

The additional pre-defined properties are as follows.


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
  <dd><span>An ```mandatory``` ```string``` property with a email ```regex``` validation on it for storing and managing the users email address.</span></dd>
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
  "__type": "user",
  "__createdby": "System",
  "__lastmodifiedby": "System",
  "__typeid": "34888670844153416",
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

Appacitive provides multiple ways through which you can add new users to your app.
You may choose to use Appacitive's `User Management` system alone to manage all of your apps' users, or additionally integrate with facebook, twitter or any other <a href="http://en.wikipedia.org/wiki/OAuth">OAuth</a> provider for identity management.
Appacitive allows you to link as many OAuth accounts with Appacitive `user` objects and manage them using Appacitive's user API(s). 
And because `user` type are internally similar to object type, you can connect a `user` object to other users or objects of other types by creating corresponding relations from the management portal.

#### Creating a simple user

Creates a new user in Appacitive. This user is an independent user in the Appacitive system for your app, in the environment you specify through the `Appacitive-Environment` header, without any linked identites. 
You can link it to a OAuth account later on.
Some basic system properties are mandatory, namely `username`, `firstname`, `email` and `password`. The `username` should be unique for every user. 
Every user is assigned a unique monotonically increasing `__id` by the system.
All other pre-defined properties are optional and you may wish to use them or add more according to your app's requirements using the management portal.

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
In case of an error, the `status` object contains details of the failure.

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
    "__type": "user",
    "__createdby": "System",
    "__lastmodifiedby": "System",
    "__typeid": "34888670847828365",
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

``` javascript
$$$Method
Appacitive.User::save();
```
``` javascript
$$$Sample Request

// set the fields
var userDetails = {
    username: 'john.doe@appacitive.com',
    password: /* password as string */,
    email: 'johndoe@appacitive.com',
    firstname: 'John',
    lastname: 'Doe'
};

var newUser = new Appacitive.User(userDetails);

//and then call save on that object
newUser.save().then(function(obj) {
    alert('Saved successfully, id: ' + newUser.get('__id'));
}, function(status, obj) {
    alert('An error occured while saving the user.');
});
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

The `__createdby` and `__lastmodifiedby` properties are set to `System`. They will be set to a user id if you use another user's `session token` to perform actions on this user.
The `__revision` is initially set to 1 when the user is created. This number gets incremented by 1 everytime you perform a successful update operation on the user object.
`__attributes` are simple string key-value pairs which you can assign to every `user`, `object` and `connection` entity. 
The `__tags` object is an array of string tags. You can perform search queries on `__attributes` and `__tags`. 

#### Creating a user with a link to a OAuth 2.0 provider

Creates a new user in the Appacitive system and links it to a facebook account. Each linked identity is assigned a `name` like 'facebook' or 'twitter' or some custom name you provide.
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
//  Create a new user and link it to a facebook account
curl -X PUT \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Content-Type: application/json" \
-d '{ "username": "john.doe", "firstname": "John", "email": "john.doe@appacitive.com", "password": "p@ssw0rd", "__link": { "authtype": "facebook", "accesstoken": "{facebook access token}" }}' \
https://apis.appacitive.com/user
```
``` javascript
$$$Method
Appacitive.User::save();
```
``` javascript
$$$Sample Request
//  Create a new user and link it to a facebook account

// Include this script in your page for facebook login

window.fbAsyncInit = function() {
    Appacitive.Facebook.initialize({
        appId      : 'YOUR_APP_ID', // Facebook App ID
        status     : false, // check login status
        cookie     : true, // enable cookies to allow Appacitive to access the session
        xfbml      : true  // parse XFBML
    });
    // Additional initialization code here
};

//create user object
var user = new Appacitive.User({
    username: 'john.doe@appacitive.com',
    password: /* password as string */,
    email: 'johndoe@appacitive.com',
    firstname: 'John',
    lastname: 'Doe' 
});

//Registering via facebook is done like so
Appacitive.Facebook.requestLogin().then(function(fbResponse) {
  console.log('Facebook login successfull with access token: ' + Appacitive.Facebook.accessToken());
  
  //link facebook account
  user.linkFacebook(global.Appacitive.Facebook.accessToken());

  //You can access linked accounts of a user, using this field
  console.dir(user.linkedAccounts()); 

  //create the user on server
  return user.save()
}).then(function(obj) {
    console.dir(user.linkedAccounts());
}, function(status, obj) {
    alert('An error occured while saving the user.');
});
```

``` rest
$$$Sample Response
{
  "user": {
    "__id": "34889981737698423",
    "__type": "user",
    "__createdby": "System",
    "__lastmodifiedby": "System",
    "__typeid": "34888670847828365",
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
    "__type": "user",
    "__createdby": "System",
    "__lastmodifiedby": "System",
    "__typeid": "34888670847828365",
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
``` javascript
$$$Method
Appacitive.User::save();
```
``` javascript
$$$Sample Request
//create user object
var user = new Appacitive.User({
    username: 'john.doe@appacitive.com',
    password: /* password as string */,
    email: 'johndoe@appacitive.com',
    firstname: 'John',
    lastname: 'Doe'
});

//link facebook account
user.linkTwitter({
  oauthtoken: {{twitterObj.oAuthToken}}, //mandatory
  oauthtokensecret: {{twitterObj.oAuthTokenSecret}}, //mandatory
  consumerKey: {{twitterObj.consumerKey}}, // optional
  consumerSecret: {{twitterObj.consumerSecret}} // optional
});

// consumerKey and consumerSecret are optional, if they've
// been configured on Appacitive Portal Social section 

//You can access linked accounts of a user, using this field
console.dir(user.linkedAccounts()); 

//create the user on server
user.save().then(function(obj) {
  console.dir(user.linkedAccounts());
});

```

#### Create a user with just the OAuth access token

You can optionally create a new user in Appacitive with just the OAth access token for the user. 
You can use this option to integrate facebook login in your app.
You need to add an extra property in the request object called `createnew` with its value set to `true`. 
The system will pull the required details about the user from the OAth provider and create a new Appacitive user with it.
Note that this is a `POST` HTTP call.

In this example, we will use a facebook access token.

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
//  Create a new user using the OAuth token
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
    "__type": "user",
    "__createdby": "System",
    "__lastmodifiedby": "System",
    "__typeid": "34888670847828365",
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
``` javascript
$$$Method
Appacitive.Users.signupWithFacebook();
```
``` javascript
$$$Sample Request
//  Create a new user using the Facebook access token

// Include this script in your page for facebook login
window.fbAsyncInit = function() {
    Appacitive.Facebook.initialize({
        appId      : 'YOUR_APP_ID', // Facebook App ID
        status     : false, // check login status
        cookie     : true, // enable cookies to allow Appacitive to access the session
        xfbml      : true  // parse XFBML
    });
    // Additional initialization code here
};

//Login with facebook
Appacitive.Facebook.requestLogin().then(function(fbResponse) {
  var token = Appacitive.Facebook.accessToken();

  console.log('Facebook login successfull with access token: '
     + token);

  // signup with Appacitive
  return Appacitive.Users.signupWithFacebook(token);

}).then(function (authResult) {
  // user has been successfully signed up and set as current user
  // authresult contains the user and Appacitive-usertoken
}, function(err) {
  if (global.Appacitive.Facebook.accessToken()) {
    // there was an error during facebook login
  } else {
    // there was an error signing up the user
  }
});

{
    "token": "{{userAuthToken}}",
    "user": Appacitive.User object
}

```
``` javascript
$$$Sample Request
//  Create a new user using the OAuth 1.0 token

//For login with twitter, pass twitter credentials to SDK
Appacitive.Users.loginWithTwitter({
  oauthtoken: {{twitterObj.oAuthToken}}, //mandatory
  oauthtokensecret: {{twitterObj.oAuthTokenSecret}}, //mandatory
  consumerKey: {{twitterObj.consumerKey}}, //optional
  consumerSecret: {{twitterObj.consumerSecret}} //optional
}).then(function(authResult){
  //User logged-in successfully
});

// consumerKey and consumerSecret are optional, if they've
// been configured on Appacitive Portal Social section 


//As before the `authResult` parameter is the same.
{
    "token": "{{userAuthToken}}",
    "user": Appacitive.User object
}
```

#### Link account with existing Appacitive user.

You can link an existing Appacitive user to a social identity provider which works on OAuth 1.0 or OAuth 2.0.

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
//  Link an account to a appacitive user
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
``` javascript
$$$Method
Appacitive.User::linkFacebook({{accessToken}});
```
``` javascript
$$$Sample Request

//Note: here, we consider that the user has already logged-in with facebook using Appacitive.Facebook.requestLogin method

If you want to associate an existing loggedin Appacitive.User to a Facebook account, you can link it like so

var user = Appacitive.User.currentUser();
user.linkFacebook(global.Appacitive.Facebook.accessToken()).then(function(obj) {
  //You can access linked accounts of a user, using this field
  console.dir(user.linkedAccounts()); 
});

```

##### Link appacitive user to a OAuth 1.0 account

We can link an Appacitive user to a twitter account after the user has already been created in Appacitive.

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
-d '{ "authtype": "twitter", "oauthtoken": "{twitter oauth token}", "oauthtokensecret": "{twitter oauth token secret}", "consumerkey": "{twitter consumer key}", "consumersecret": "{twitter consumer secret}" }' \
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
```javascript
$$$Method
Appacitive.User::linkTwitter({{twitterObj}})
```
``` javascript
$$$Sample Request
Note: here, we consider that the user has already logged-in with twitter

If you want to associate an existing loggedin Appacitive.User to a Twitter account, you can link it like so

var user = Appacitive.User.currentUser();
user.linkTwitter({
  oauthtoken: {{twitterObj.oAuthToken}} ,
  oauthtokensecret: {{twitterObj.oAuthTokenSecret}},
  consumerKey: {{twitterObj.consumerKey}},
  consumerSecret: {{twitterObj.consumerSecret}}
}).then(function(obj) {
  //You can access linked accounts of a user, using this field
  console.dir(user.linkedAccounts()); 
});
```

#### Delink account with existing appacitive user.

If you no longer want to associate an Appacitive user to an OAuth provider, you can delink the account using the linked identity's `name`.

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
``` javascript
$$$Method
Appacitive.User::unlink();
```
``` javascript
$$$Sample Request
//specify account which needs to be delinked
Appacitive.Users.current().unlink('facebook').then(function() {
  alert("Facebook account delinked successfully");
});

Appacitive.Users.current().unlink('twitter').then(function() {
  alert("Twitter account delinked successfully");
});

```

### Authenticating a user

To make user specific API calls to Appacitive, you need to authenticate the user to the Appacitive API and create a `session token` for the user every time he logs into your app.
You will pass this `session token` as a HTTP header called `Appacitive-User-Auth`. The `user` object is also returned on a successful authentication call.

!!!javascript
Each instance of an app can have one logged in user at any given time. You can also explicitly set the accesstoken and tell the SDK to start using the access token.
!!!

```javascript
// the access token
// var token = /* ... */

// setting it in the SDK
Appacitive.session.setUserAuthHeader(token);
// now the sdk will send this token with all requests to the server
// Access control has started

// removing the auth token
Appacitive.session.removeUserAuthHeader();
// Access control has been disabled

//Setting accessToken doesn't takes care of setting user associated for it. 
//For that you need to set current user too.
```

!!!javascript
**Current User**
Whenever you use any signup or login method, the user is stored in localStorage and can be retrieved using `Appacitive.Users.current`.So, everytime your app opens, you just need to check this value, to be sure whether the user is logged-in or logged-out.
!!!

```javascript
var cUser = Appacitive.User.current();
if (cUser) {
    // user is logged in
} else {
    // user is not logged in
}

//You can explicitly set the current user as

var user = new Appacitive.User({
    __id : '2121312'
    username: 'john.doe@appacitive.com'
    email: 'johndoe@appacitive.com',
    firstname: 'John',
    lastname: 'Doe'
});

Appacitive.Users.setCurrentUser(user, token);

//Now current user points to `john.doe`
console.log(Appacitive.Users.current().get('__id'));
```

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
//  Authenticate user with his username and password
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
    "__type": "user",
    "__createdby": "System",
    "__lastmodifiedby": "System",
    "__typeid": "34888670847828365",
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

```javascript
$$$Method
Appacitive.Users.login("{{username}}", "{{password}}");
```
``` javascript
$$$Sample Request
//Login with username and password
Appacitive.Users.login("{{username}}", "{{password}}").then(function (authResult) {
    // user has been logged in successfully
    conole.log(authResult.token);
    alert('Saved successfully, id: ' + authResult.user.get('__id'));
});

//The `authResult` is similar as given above.
{
    "token": "token",
    "user": Appacitive.User object
}
```

``` javascript
//Signup and login
```
```javascript
$$$Method
Appacitive.Users.signup(userDetails);
```
``` javascript
$$$Sample Request
// set the fields
var userDetails = {
  username: 'john.doe@appacitive.com',
  password: /* password as string */,
  email: 'johndoe@appacitive.com',
  firstname: 'John',
  lastname: 'Doe'
};

// now to create the user
Appacitive.Users.signup(userDetails).then(function(authResult) {
  conole.log(authResult.token);
  alert('Saved successfully, id: ' + authResult.user.get('__id'));
});

//The `authResult` is.
{
    "token": "{{userAuthToken}}",
    "user": Appacitive.User object
}
```

#### Authenticate with OAuth 2.0 access token

You can authenticate a user and generate a session token using a access token using one of his linked identities like facebook.

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
//  Authenticate user using an access token associate with him in one of his linked identities
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
    "__type": "user",
    "__createdby": "System",
    "__lastmodifiedby": "System",
    "__typeid": "34888670847828365",
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
``` javascript
$$$Method
Appacitive.Users.loginWithFacebook({{accessToken}});
```
``` javascript
$$$Sample Request
//Login with facebook
Appacitive.Facebook.requestLogin().then(function(fbResponse) {
  var token = Appacitive.Facebook.accessToken();
  console.log('Facebook login successfull with access token: ' 
      + token);

  // login with Appacitive
  return Appacitive.Users.loginWithFacebook(token);

}).then(function (authResult) {
  // user has been successfully signed up and set as current user
  // authresult contains the user and Appacitive-usertoken
}, function(err) {
  if (global.Appacitive.Facebook.accessToken()) {
    // there was an error during facebook login
  } else {
    // there was an error during user login
  }
});


//As before the `authResult` parameter is the same.
{
    "token": "{{userAuthToken}}",
    "user": Appacitive.User object
}
```

#### Authenticate with a OAuth 1.0 access token

The `consumerkey` and `consumersecret` are optional here. 
You can set them up once in the management portal in the social network settings tab.

``` rest
$$$Method
POST https://apis.appacitive.com/user/authenticate
```
``` rest
$$$Sample Request
//  Authenticate user using an access token associate with him in one of his linked identities
curl -X POST \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Content-Type: application/json" \
-d '{ "type": "twitter", "oauthtoken": "{oAuth token}", "oauthtokensecret": "{oAuth token secret}", "consumerKey": "{consumer key}", "consumerSecret": "{consumer secret}" }' \
https://apis.appacitive.com/user/authenticate
```
``` rest
$$$Sample Response
{
  "token": "SThEdVFBc01ZRlR0N2ZEajRjNGV6UjhDREU1UWNxVURsK0E4bmZUQmYyOVdnbVlIdFhHQjZ6dlRRUkVHNndHSnZUbU42bUR0OUVWdTB3V3NBOFNVa29LMWowMkg1c0trMXZxemFCS2dTaTNJaVpNRlBNKzdSZ3Y5OGlvT2hoRkMzd3dmTU5qcGtNRDN4R0Fzd3JwaU5jTWc1ZlBPclErOXBKN05NZWlXL2JNPQ==",
  "user": {
    "__id": "34912447775245454",
    "__type": "user",
    "__createdby": "System",
    "__lastmodifiedby": "System",
    "__typeid": "34888670847828365",
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
``` javascript
$$$Method
Appacitive.Users.loginWithTwitter(authRequest);
```
``` javascript
$$$Sample Request
//Authenticate user with twitter
//Once you've logged-in with twitter, pass twitter credentials to SDK
Appacitive.Users.loginWithTwitter({
  oauthtoken: {{twitterObj.oAuthToken}}, //mandatory
  oauthtokensecret: {{twitterObj.oAuthTokenSecret}}, //mandatory
  consumerKey: {{twitterObj.consumerKey}}, //optional
  consumerSecret: {{twitterObj.consumerSecret}} //optional
}).then(function(authResult){
  //User logged-in successfully
});

// consumerKey and consumerSecret are optional, if they've
// been configured on Appacitive Portal Social section 

//As before the `authResult` parameter is the same.
{
    "token": "userAuthToken",
    "user": Appacitive.User object
}
```

### Retrieving users

Once a user is created in Appacitive, a unique long `__id` is assigned to it and a unique string `username`, which you provided, is associated with it.
You can access the specific user for retrieving, updating, deleting etc. using one of three ways, by his `id`, by his `username` or by a session `token` generated for that user.
You can specify what type of user accessing mechanism you are using by passing a query string parameter called `useridtype`. 
The values for `useridtype` can be `id`, `username` and `token` for accessing the user using his unique system generated `__id`, a unique string `username` assigned by you or a generated token using his credentials respectively.
In the absense of the parameter `useridtype`, the system assumes it to be `id`.

This call takes an additional `Appacitive-User-Auth` header with its value set as a valid user token.
The following three example illustrate retrieving the user in the three possible ways. 
The same pattern applies for other calls like deleting the user or updating the user as well.

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
//  Get user by id
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
    "__type": "user",
    "__createdby": "System",
    "__lastmodifiedby": "System",
    "__typeid": "34888670847828365",
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
``` javascript
$$$Method
Appacitive.User::fetch();
```
``` javascript
$$$Sample Request
var user = new Appacitive.User({ __id: '12345' });
user.fetch().then(function (obj) {
    alert('Fetched user with id 12345');
}, function(status, obj) {
    alert('Could not fetch user with id 12345');
});
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
//  Get user by username
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
    "__type": "user",
    "__createdby": "System",
    "__lastmodifiedby": "System",
    "__typeid": "34888670847828365",
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

``` javascript
$$$Method
Appacitive.Users.getUserByUsername('{{username}}');
```
``` javascript
$$$Sample Request
//fetch user by username
Appacitive.Users.getUserByUsername("john.doe").then(function(user) {
    alert('Fetched user with username ' + user.get('username'));
}, function(status) {
    alert('Could not fetch user with username  john.doe');
});
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
//  Get logged in User
var loggedInUser = await Users.GetLoggedInUserAsync();
```
``` rest
$$$Method
GET https://apis.appacitive.com/user/me?useridtype=token&token={user token}
```
``` rest
$$$Sample Request
//  Retrieve user with his session token
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
    "__type": "user",
    "__createdby": "System",
    "__lastmodifiedby": "System",
    "__typeid": "34888670847828365",
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
``` javascript
$$$Method
Appacitive.Users.getUserByToken("{{usertoken}}");
```
``` javascript
$$$Sample Request


//fetch user by token
Appacitive.Users.getUserByToken("asfa21sadas").then(function(user) {
    alert('Fetched user with username ' + user.get('username'));
}, function(status) {
    alert('Could not fetch user with usertoken');
});



```

### Updating a user

The update user call is similar to the update object call. The update user calls expect a json object with only the user properties that you want updated.
The property keys which you send with non-null values will get updated if they aren't marked as immutable.
The property keys you don't send in the body of the POST call stay unchanged.
The property keys you send with values set as `null` are deleted from the user object (set to null).
The same convention is followed with `__attributes` as with the properties.
The `__addtags` and `__removetags` properties which are arrays of strings are used to update tags.

You can specify which user you want to update by using either his `id`, `username` or `token`. You will use the `useridtype` parameter to specify which option you are using.
 
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
In case of an error, the `status` object contains details of the failure.

``` rest
$$$Method
POST https://apis.appacitive.com/user/
```
``` rest
$$$Sample Request
//  Update user
curl -X POST \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Content-Type: application/json" \
-d '{ "email":"johnny@appacitive.com", "username":"johnny", "phone": null, "lastname":null, "__addtags":[ "coffee.lover", "foodie" ], "__removetags":[ "newuser" ] }' \
https://apis.appacitive.com/user
```
``` rest
$$$Sample Response
{
  "user": {
    "__id": "34889981737698423",
    "__type": "user",
    "__createdby": "System",
    "__lastmodifiedby": "System",
    "__typeid": "34888670847828365",
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
    "lastname":null,
    "birthdate": "1982-11-17",
    "phone": null,
    "isemailverified": "false",
    "isenabled": "true",
    "location": "18.534064000000000,73.899551000000000",
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
var user = await Users.GetByIdAsync("65464576879867989");
user.FirstName = "jane";
//Updating custom field 'city'
user.Set<string>("city", "New York"); 
await user.SaveAsync();
```
``` javascript
$$$Method
Appacitive.User::save()
```
``` javascript
$$$Sample Request
//Update logged-in user
var user = Appacitive.Users.current();

user.save().then(function(obj) {
  alert('User updated successfully!');
}, function(status, obj) {
  alert('error while updating user!');
});
```

### Searching for users

Searching for users follows all the same filtering principles as searching for objects of any other type.

``` javascript
$$$Method
Appacitive.Object.findAll({
  type: 'user', //mandatory
  fields: [],       //optional
  filter: {Appacitive.Filter obj}, //optional  
  pageNumber: 1 ,   //optional: default is 1
  pageSize: 50,     //optional: default is 50
  orderBy: '__id',  //optional
  isAscending: false  //optional: default is false
})
```
``` javascript
$$$Sample Request
Appacitive.Object.FindAll({
  type: 'user',
  fields: ["username", "firstname", "email"]
}).then(function(users) {
  //users is an array of Appacitive.User objects
  console.log("Users fetched");
}, function(status) {
  console.log("Error fetching users");
});
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

Delete requests follow the same practice as get requests for user, the only difference being that the HTTP method type is DELETE, instead of GET.
Make sure there are no connections with the user you are deleting, otherwise the API will return an error. You can use the `deleteconnections` query string parameter if you want to also delete all connections associated with the user.
There are three ways in which you could delete the user (the same as retrieving a user), by his `id`, by his `username` or by the `token` generated for him.

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
//  Delete user using his id
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
``` javascript
$$$Method
Appacitive.Users.deleteUser('{{id}}');
```
``` javascript
$$$Sample Request
//To delete a user with an `__id` of, say, 1000.
Appacitive.Users.deleteUser('1000').then(function() {
    // deleted successfully
}, function(status) {
    // delete failed
});
```

#### Delete user by username

An additional query string parameter called `useridtype` is sent to specify the kind of user identifier you are using, which in this case is `username`.

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
//  Delete user using his username
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
``` javascript
$$$NOT SUPPORTED
```

#### Delete user by user token

Here you can delete a user by his session token. 
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
//  Delete user using his session token
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
``` javascript
$$$Method
Appacitive.Users.deleteCurrentUser();
```
``` javascript
$$$Sample Request
//You can delete the currently logged in user via a helper method.
Appacitive.Users.deleteCurrentUser().then(function() {
    // delete successful
}, function(status) {
    // delete failed
});
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
//  Delete user using his session token
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
``` javascript
$$$Method
Appacitive.User::checkin({{Appacitive.GeoCoord}});
```
``` javascript
$$$Sample Request
//Change current users location
Appacitive.Users.currentUser().checkin(new Appacitive.GeoCoord(18.57, 75.55)).then(function() {
  alert("Checked in successfully");
});
```

### Session Management


!!! javascript
Once the user is authenticated successfully, you will be provided with the user details and an access token. This access token identifies the currently logged in user and will be used to implement access control. Each instance of an app can have one logged in user at any given time. By default the SDK takes care of setting and unsetting this token. However, you can explicitly tell the SDK to start using another access token.
!!!

``` javascript
// the access token
var token = {{token}};

// setting it in the SDK
Appacitive.session.setUserAuthHeader(token);
// now the sdk will send this token with all requests to the server
// Access control has started

// removing the auth token
Appacitive.session.removeUserAuthHeader();
// Access control has been disabled
```
```javascript
$$$Note 
//Setting accessToken doesn't takes care of setting user associated for it. For that you will need to set current user too.

var user = new Appacitive.User({
    __id : '2121312'
    username: 'john.doe@appacitive.com'
    email: 'johndoe@appacitive.com',
    firstname: 'John',
    lastname: 'Doe'
});

Appacitive.Users.setCurrentUser(user, token);

//Now current user points to `john.doe`
console.log(Appacitive.Users.current().get('__id'));
```

#### Validate session token

Once you create a session `token` for a user using one of the aunthenticating mechanisms, you may want to validate whether the token is a valid token or not in subsequent api calls.

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
//  Validate user's session token
curl -X POST \
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
``` javascript
$$$Method
Appacitive.Users.validateCurrentUser(validateAPI);
```
``` javascript
$$$Sample Request
// to check whether user is loggedin locally. This won't make any explicit apicall to validate user
Appacitive.Users.validateCurrentUser().then(function(isValid) {
    if (isValid) //user is logged in
});

// to check whether user is loggedin, explicitly making an apicall to validate usertoken
Appacitive.Users.validateCurrentUser(true).then(function(isValid) {
    if (isValid)  //user is logged in
    // This method also sets the current user for that token
}); // set to true to validate usertoken making an apicall
```


#### Invalidate session

You may want to invalidate a previously generated session token for a user at some point before its expiry.

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
//  Invalidate the user's session token
curl -X POST \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Appacitive-User-Auth: {User token}" \
-H "Content-Type: application/json" \
https://apis.appacitive.com/user/invalidate?userToken=RlYzRlcxY3lsRDlqYUpmQlNha0IwcTJRTXJDYVd6QWZOMlVPR0JWSmNhbTgyWVZxSTVnTmkvR1N0MXJMZm1nZGZCYWNZVk40eEZ4dTB3V3NBOFNVa3FUSEdQZVBTZDBWazJFUW03R0dZQVc5MjdZZmtGRFd1Q092enpTSUpQSWI1VEpqV2xsUUU0U3dIZGcwVTdZTkdNTWc1ZlBPclErOXBKN05NZWlXL2JNPQ==
```

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
``` javascript
$$$Method
Appacitive.User::logout();
```
```javascript
$$4Sample Request
Appacitive.Users.current().logout().then(function() {
    // user is logged out   
    // this will now be null
    var cUser = Appacitive.Users.current();  
});
```

### Password Management

Appacitive provides an intuitive password management and recovery protocol to app developers so that their users can recover or change their passwords safely if and when the need arises.

#### Change password

If a user of your app simply wants to change his/her password, it requires a simple HTTP call to Appacitive with the necessary details. This call is also available in all the SDKs.

** Parameters **

<dl>
  <dt>userid</dt>
  <dd>required<br/><span>The user's unique identifier
  <dt>useridtype</dt>
  <dd>required<br/><span>The user's unique identifier's type. Could be `id`, `username` or `token`
  <dt>oldpassword</dt>
  <dd>required<br/><span>The user's original password
  <dt>newpassword</dt>
  <dd>required<br/><span>The new password which the user wants to set for his account
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
POST https://apis.appacitive.com/user/{userId}/changepassword?useridtype={id/username/token}
```

``` rest
$$$Sample Request
//  Change user's password
curl -X POST \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Appacitive-User-Auth: {User token}" \
-H "Content-Type: application/json" \
-d '{ "oldpassword": "{old password}", "newpassword": "{new password}" }' \
https://apis.appacitive.com/user/45178614534861534/changepassword?useridtype=id
```

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
``` javascript
$$$Method
Appacitive.User::updatePassword('{oldPassword}','{newPassword}');
```
``` javascript
$$$Sample Request
//You can make this call only for a loggedin user
Appacitive.Users.current().updatePassword('{oldPassword}','{newPassword}').then(function(){
  alert("Password updated successfully"); 
});
```


#### Forgot password

In situations where a user forgets his password, Appacitive provides a secure way to allow your users to reset their password. The process is initiated by your app sending an API call to Appacitive, asking the system to dispatch a reset password email to the user's verified email address.
A link in this email redirects the user to a page (either hosted by Appacitive or by you on your end), where he can enter a new password for his account. Appacitive adds a special token to the url so that the link is valid only for a short duration. To read more about the forgot password flow and possible customizations to the email structure and the page (where the user enters his new password),
read the blog post <a href="http://blogs.appacitive.com/2013/10/password-management-in-appacitive.html">here</a>.

** Parameters **

<dl>
  <dt>username</dt>
  <dd>required<br/><span>The user's unique username
  <dt>subject</dt>
  <dd>required<br/><span>The subject for the email that goes out to the user
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
POST https://apis.appacitive.com/user/sendresetpasswordemail
```

``` rest
$$$Sample Request
//  Send reset password email
curl -X POST \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {sandbox or live}" \
-H "Content-Type: application/json" \
-d '{ "username": "{username of the user}", "subject": "{subject of the email}" }' \
https://apis.appacitive.com/user/sendresetpasswordemail
```
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

``` javascript
$$$Method
Appacitive.Users.sendResetPasswordEmail("{username}", "{subject for the mail}");
```
``` javascript
$$$Sample Request
Appacitive.Users.sendResetPasswordEmail("{username}", "{subject for the mail}").then(function(){
  alert("Password reset mail sent successfully"); 
});
```

!!!javascript
** Custom Reset Password **

You can also create a custom reset password page or provide a custom reset password page URL from our management portal.

On setting custom URL, the reset password link in the email will redirect user to that URL with a reset password token appended in the query string.
!!!

```javascript
$$$Example
```
```javascript
//consider your url is 
http://help.appacitive.com

//after user clicks on the link, he'll be redirected to this url
http://help.appacitive.com?token=dfwfer43243tfdhghfog909043094
```
!!!javascript
The token provided in url can then be used to change the password for that user.

So basically, following flow can be utilized for reset password

1. Validate token specified in URL
2. If valid then allow the user to enter his new password and save it
!!!
```javascript
$$$Sample
```
```javascript
//validate token
Appacitive.Users.validateResetPasswordToken(token).then(function(user) {
  //token is valid and json user object is returned for that token
});

//reset password
Appacitive.Users.resetPassword(token, newPassword).then(function() {
  //password for user has been updated successfully
});
```

Email
=======

Appacitive allows you to integrate your current email providers to send out emails through our APIs.
The provider settings can be configured in the Portal, or you can send them along with each call that you make.

`Note` : The email settings in the request body overrides the email settings set using the management portal.

Sending a simple email
------------
You can use this API to send simple (non templated) emails.

** Parameters **

<dl>
	<dt>smtp</dt>
	<dd>required, if not preconfigured or else optional<br/><span>These are SMPT settings like `username`, `password`, `host`, `port` and `enablessl`.
	<dt>to</dt>
	<dd>required<br/><span>List of email addresses to send the email to
	<dt>cc</dt>
	<dd>optional<br/><span>List of email addresses to cc to
	<dt>bcc</dt>
	<dd>optional<br/><span>List of email addresses to bcc to
	<dt>from</dt>
	<dd>optional<br/><span>The email address from which email is sent
	<dt>replyto</dt>
	<dd>optional<br/><span>The reply-to email address
	<dt>subject</dt>
	<dd>required<br/><span>The subject of the email
	<dt>body</dt>
	<dd>required<br/><span>The body of the email
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
POST https://apis.appacitive.com/email/send
```
``` rest
$$$Sample Request
//	Send a simple raw email
curl -X POST \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Content-Type: application/json" \
-d
{
	"smtp": {
		"username": "john@doe.com",
		"password": "john'sPwd",
		"host": "smtp.gmail.com",
		"port": 465,
		"enablessl": true
	},
	"to": ["jane@doe.com"],
  	"cc":["support@doe.com"],
	"subject": "Welcome Jane",
	"from": "john@doe.com",
	"replyto": "john@doe.com",
	"body": {
		"content": "Welcome to Appacitive !!",
		"ishtml": false
	}
}
```

``` rest
$$$Sample Response
{
	"email": {
		"__id": "40440008658821032",
		"subject": "Welcome Jane",
		"from": "john@appacitive.com",
		"to": ["jane@doe.com"],
		"cc": ["support@doe.com"],
		"bcc": [],
		"body": {
			"content": "Welcome to Appacitive !!",
			"ishtml": false
		}
	},
	"status": {
		"code": "200",
		"message": "Successful",
		"faulttype": null,
		"version": null,
		"referenceid": "707c8597-112e-4af7-ad37-8d08e2532497",
		"additionalmessages": []
	}
}
```

``` javascript
$$$Method 
Appacitive.Email.sendRawEmail(email);
```
``` javascript
$$$Sample Request
//Email setup is not necessary if it is setup form Portal
//This is supposed to be called just once as an initial setup
Appacitive.Email.setupEmail({
    username: 'john@doe.com',
    password: 'johnPWD',
    host: 'smtp.gmail.com',
    port: 465,
    enablessl: true,
    from: 'john@doe.com',
    replyto: 'john@doe.com'
});

var email = {
    to: ['jane@doe.com'],
    cc: ['support@doe.com'],
    subject: 'Welcome Jane',
    body: 'Welcome to Appacitive',
    ishtml: false
};

Appacitive.Email.sendRawEmail(email).then(function (email) {
    alert('Successfully sent.');
}, function(status) {
    alert('Email sending failed.')
});
```


``` csharp
$$$Sample Request

var to = new [] {"email1", "email2"..}
var cc = new [] {"email1", "email2"..}
var bcc = new [] {"email1", "email2"..}

//Using a preconfigured SMTP setting
await NewEmail
      .Create("Put the subject here")
      .To(to, cc, bcc)
      .From("john@doe.com", "john@doe.com")
      .WithBody("This is a raw body email.", false)
      .SendAsync();

//Passing the SMTP setting in the call
await NewEmail
      .Create("Put the subject here")
      .To(to, cc, bcc)
      .From("john@doe.com", "john@doe.com")
      .WithBody("This is a raw body email.", false)
      .Using("smtp.gmail.com", 465, "john@doe.com","johnsPWD")
      .SendAsync();


```
 
Sending a templated email
------------

You can send an email using a saved template.
The template can be created and saved using the management portal. 
To know about creating email templates, read the blog post <a href="http://blogs.appacitive.com/2013/08/emails-and-email-templates-in-appacitive.html">here</a>.

** Parameter **

<dl>
	<dt>smtp</dt>
	<dd>required (if not preconfigured)<br/><span>This is the SMPT settings.
	<dt>to</dt>
	<dd>required<br/><span>List of email ids to send email to
	<dt>cc</dt>
	<dd>optional<br/><span>List of email ids to cc to
	<dt>bcc</dt>
	<dd>optional<br/><span>List of email ids to bcc to
	<dt>from</dt>
	<dd>optional<br/><span>The email id from which email is sent
	<dt>replyto</dt>
	<dd>optional<br/><span>The reply to email address
	<dt>subject</dt>
	<dd>required<br/><span>The subject of the email to send
	<dt>body</dt>
	<dd>required<br/><span>The body of the email to send
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
POST https://apis.appacitive.com/email/send
```
``` rest
$$$Sample Request
//	Send a templated email
curl -X POST \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Content-Type: application/json" \
-d
{
	"smtp": {
		"username": "john@doe.com",
		"password": "john'sPwd",
		"host": "smtp.gmail.com",
		"port": 465,
		"enablessl": true
	},
	"to": ["jane@doe.com"],
  	"cc":["support@doe.com"],
	"subject": "Welcome Jane",
	"from": "john@doe.com",
	"replyto": "john@doe.com",
	"body": {
		"templatename": "{templateName}",
		"data": {
			"placeholder-key1": "value1",
			"placeholder-key2": "value2"
		},
		"ishtml": true
	}
}
```

``` rest
$$$Sample Response
{
	"email": {
		"__id": "40440008658821032",
		"subject": "Welcome Jane",
		"from": "john@appacitive.com",
		"to": ["jane@doe.com"],
		"cc": ["support@doe.com"],
		"bcc": [],
		"body": {
			"templatename": "{templateName}",
			"data": {
				"placeholder-key1": "value1",
				"placeholder-key2": "value2"
			},
			"ishtml": true		
		}
	},
	"status": {
		"code": "200",
		"message": "Successful",
		"faulttype": null,
		"version": null,
		"referenceid": "707c8597-112e-4af7-ad37-8d08e2532497",
		"additionalmessages": []
	}
}
```          
``` csharp
$$$Sample Request

var to = new [] {"email1", "email2"..}
var cc = new [] {"email1", "email2"..}
var bcc = new [] {"email1", "email2"..}

//Using a preconfigured SMTP setting
await NewEmail
      .Create("Put the subject here")
      .To(to, cc, bcc)
      .From("john@doe.com", "john@doe.com")
      .WithTemplateBody( "sample", 
              new Dictionary<string, string> 
              {
				  {"placeholder-key1", "value1"},
                  {"placeholder-key2", "value2"}
              },false)
      .SendAsync();

//Passing the SMTP setting in the call
await NewEmail
      .Create("Put the subject here")
      .To(to, cc, bcc)
      .From("john@doe.com", "john@doe.com")
      .WithTemplateBody( "sample", 
              new Dictionary<string, string> 
              {
                  {"placeholder-key1", "value1"},
                  {"placeholder-key2", "value2"}
              },true)
      .Using("smtp.gmail.com", 465, "john@doe.com","johnsPWD")
      .SendAsync();


```
``` javascript
$$$Method 
Appacitive.Email.sendTemplatedEmail(email);
```
``` javascript
$$$Sample Request
//Email setup is not necessary if it is setup form Portal
//This is supposed to be called just once as an initial setup
Appacitive.Email.setupEmail({
    username: 'john@doe.com',
    password: 'johnPWD',
    host: 'smtp.gmail.com',
    port: 465,
    enablessl: true,
    from: 'john@doe.com',
    replyto: 'john@doe.com'
});

var email = {
    to: ['jane@doe.com'],
    cc: ['support@doe.com'],
    subject: 'Welcome Jane',
    templateName: 'sample',
    data: 
    {
    	'placeholder-key1': 'value1',
    	'placeholder-key2': 'value2'	
    },
    ishtml: false
};

Appacitive.Email.sendTemplatedEmail(email).then(function (email) {
    alert('Successfully sent.');
}, function(status) {
    alert('Email sending failed.')
});
```

Push
=======
Push is a great way to send timely and relevant targetted messages to users of your app and enhance their overall experience and keep them informed of the latest developements on your app.
Appacitive allows you to send push notifications to your users in a variety of ways and targets android, ios and windows phone.

For detailed info around how platform specific push notifications work, you can check out their specific docs.

iOS       : https://developer.apple.com/notifications/

Android     : http://developer.android.com/google/gcm/index.html

Windows Phone : http://msdn.microsoft.com/en-us/library/hh221549.aspx

Registering the devices
------------

You need to give Appacitive an info about the device on which you want to send the push notfication, i.e. the device type (ios, android etc), device token etc.
Below you can see the call to register the device

** Parameter **

<dl>
  <dt>devicetype</dt>
  <dd>required<br/><span>Specifies the platform of device (ios,android,windows)
  <dt>devicetoken</dt>
  <dd>required<br/><span>The device id which is given by the platform SDK and is used to identify the device
  <dt>channels</dt>
  <dd>optional<br/><span>List of channels (groups) to add the device to
  <dt>timezone</dt>
  <dd>optional<br/><span>The timezone of the device
  <dt>isactive</dt>
  <dd>optional<br/><span>Whether the device is active. If false then notification will not be sent to it
  <dt>__tags</dt>
  <dd>optional<br/><span>List of strings which can be used to tag the device
  <dt>__attributes</dt>
  <dd>optional<br/><span>Array of Key Value pairs to store extra info
  <dt>location</dt>
  <dd>optional<br/><span>The location (lat,long) of the device
</dl>


``` rest
$$$Method
PUT https://apis.appacitive.com/device/register
```
``` rest
$$$Sample Request
//  Register Device
curl -X PUT \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Content-Type: application/json" \
-d
{
  "__tags": [
    "tag1"
  ],
  "devicetype": "ios",
  "location": "18.534064,73.899551",
  "channels":[
    "channel1",
    "channel2"
  ],
  "devicetoken": "c6ae0529f4752a6a0d127900f9e7c",
  "isactive": "true",
  "__attributes": {}
}
```

``` rest
$$$Sample Response
{
  "device": {
    "__id": "40632379999653094",
    "__type": "device",
    "__createdby": "System",
    "__lastmodifiedby": "System",
    "__typeid": "38812996656563683",
    "__revision": "1",
    "__tags": [
      "tag1"
    ],
    "__utcdatecreated": "2013-10-23T11:54:15.6604000Z",
    "__utclastupdateddate": "2013-10-23T11:54:15.6604000Z",
    "devicetype": "ios",
    "location": "18.534064,73.899551",
    "channels":[
      "channel1",
      "channel2"
    ],
    "devicetoken": "asda124123jhkj1h2k3h123",
    "isactive": "true",
    "__attributes": {}
  },
  "status": {
    "code": "200",
    "message": "Successful",
    "faulttype": null,
    "version": null,
    "referenceid": "264e3549-95d8-40d8-be58-c20651f284c9",
    "additionalmessages": []
  }
}
```

```javascript
var device = new Appacitive.Object('device');
device.set('devicetype', 'ios');
device.set('devicetoken', 'c6ae0529f4752a6a0d127900f9e7c');
device.save).then(function(obj) {
  alert('new device registered successfully!');
}, function(status, obj){
  alert('error while registering!');
});
```

```csharp

Device device = new Device(DeviceType.iOS)
            {
                DeviceToken = "c6ae0529f4752a6a0d127900f9e7c",
                Location = new Geocode(10,10),
            };
            device.Channels.Add("channel1");
            device.Channels.Add("channel2");
            await device.SaveAsync();
``` 

Push message anatomy
------------
You can see the anatomy of the Push message that you will need to send to the Appacitive API

** Parameter **

<dl>
  <dt>broadcast</dt>
  <dd>optional<br/><span>Set true to send push to every device
  <dt>deviceids</dt>
  <dd>optional<br/><span>List of specific device ids to send push to
  <dt>query</dt>
  <dd>optional<br/><span>Filter out devices on which you want to send a Push
  <dt>channels</dt>
  <dd>optional<br/><span>List of channels(groups) to which you want to send a Push
  <dt>data</dt>
  <dd>required<br/><span>This contains the message, badges,custom data etc for the notification
  <dt>expireafter</dt>
  <dd>optional<br/><span>Specified the time to live for message in case it is not recieved by the device
  <dt>platformoptions</dt>
  <dd>optional<br/><span>Sending extra data which is specific to the device platform
</dl>

```rest
{
        "broadcast": true,
        "deviceids": [
           "{{deviceId}}",
           "{{deviceId}}",
           "{{deviceId}}"
        ],
        "query": "{{your query goes here}}",
        "channels": [
           "{{nameOfChannel}}",
           "{{nameOfChannel}}",
           "{{nameOfChannel}}"
        ],
        "data": {
           "alert": "{{your message}}",
           "badge": "1",
           "customdata1": "customvalue1",
           "customdata2": "customvalue2",
        },
        "expireafter": "100000",
        "platformoptions": {
           "ios": {
              "sound": "test"
           },
           "android": {
              "title": "test title"
           },
           "wp": {
              "notificationtype":"tile"
           }
        }
     }
```

Sending a Push message
------------
Once you have configured your Push settings in the Portal, you can send a Push by making a simple API call.
There are mutiple ways you can send a Push. It could be a broadcast, or to a channel or based on a query.

###Broadcasting a Push

This is for sending a push to all the devices that are registered for a push.

``` rest
$$$Method
POST https://apis.appacitive.com/push/
```
``` rest
$$$Sample Request
//  Broadcast a Push
curl -X DELETE \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Content-Type: application/json" \
-d
{
  "broadcast": true,
  "query": null,
  "channels": null,
  "platformoptions": {
    "ios": {
      "sound": "test"
    },
    "android": {
      "title": "test title"
    }
  },
  "data": {
    "alert": "Testing!!",
    "badge": "1",
    "customvalue": "my custom value"
  },
  "expireafter": "100000"
}
```

``` rest
$$$Sample Response
{
  "id": "40613473488604239",
  "status": {
    "code": "200",
    "message": "Successful",
    "faulttype": null,
    "version": null,
    "referenceid": "c6ae0d24-529f-4752-a6a0-d127900f9e7c",
    "additionalmessages": []
  }
}
```

``` javascript
$$$Method 
Appacitive.Push.send(options);
```
``` javascript
$$$Sample Request

var options = {
    "broadcast": true, // set this to true for broadcast
    "platformoptions": {
        // platform specific options
        "ios": {
            "sound": "test"
        },
        "android": {
            "title": "test title"
        }
    },
    "data": {
        // message to send
        "alert": "Testing!!",
        // Increment existing badge by 1
        "badge": "+1",
        //Custom data field1 and field2
        "field1": "my custom value",
        "field2": "my custom value"
    },
    "expireafter": "100000" // Expiry in seconds
}

Appacitive.Push.send(options).then(function(notification) {
    alert('Push notification sent successfully');
}, function(status) {
    alert('Sending Push Notification failed.');
});
```
``` csharp
$$$Sample Request

await PushNotification
      .Broadcast("Message")
      .WithBadge("+1")
      .WithExpiry(1000)
      .WithData(new { field1 = "value1", field2 = "value2" })
      .WithPlatformOptions(
            new IOsOptions
            {
                SoundFile = soundFile
            })
        .WithPlatformOptions(
            new AndroidOptions
            {
                NotificationTitle = title
            })
        .WithPlatformOptions(
            new WindowsPhoneOptions
            {
                Notification = new ToastNotification
                {
                    Text1 = wp_text1,
                    Text2 = wp_text2,
                    Path = wp_path
                }
            })
      .SendAsync();

```

###Sending a Query based Push

You can send a push depending on certain filters.
Like say you want to send a Push to just the iOS devices. You can specifiy that using a query based Push.

``` rest
$$$Method
POST https://apis.appacitive.com/push/
```
``` rest
$$$Sample Request
//  Send a push based on a query
curl -X DELETE \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Content-Type: application/json" \
-d
{
  "broadcast": false,
  "query": "*devicetoken == 'ios'",
  "channels": null,
  "platformoptions": {
    "ios": {
      "sound": "test"
    },
    "android": {
      "title": "test title"
    }
  },
  "data": {
    "alert": "Testing!!",
    "badge": "1",
    "customvalue": "my custom value"
  },
  "expireafter": "100000"
}
```

``` rest
$$$Sample Response
{
  "id": "40613473488604239",
  "status": {
    "code": "200",
    "message": "Successful",
    "faulttype": null,
    "version": null,
    "referenceid": "c6ae0d24-529f-4752-a6a0-d127900f9e7c",
    "additionalmessages": []
  }
}
```

``` javascript
$$$Method 
Appacitive.Push.send(options);
```
``` javascript
$$$Sample Request

var options = {
    "query": Appacitive,.Filter.Property('devicetype').equalTo('ios'),
    "broadcast": false,
    "platformoptions": {
        // platform specific options
        "ios": {
            "sound": "test"
        },
        "android": {
            "title": "test title"
        }
    },
    "data": {
        // message to send
        "alert": "Testing!!",
        // Increment existing badge by 1
        "badge": "+1",
        //Custom data field1 and field2
        "field1": "my custom value",
        "field2": "my custom value"
    },
    "expireafter": "100000" // Expiry in seconds
}

Appacitive.Push.send(options).then(function(notification) {
    alert('Push notification sent successfully');
}, function(status) {
    alert('Sending Push Notification failed.');
});
```
``` csharp
$$$Sample Request

await PushNotification
      .ToQueryResult("Message","*devicetoken == 'ios'")
      .WithBadge("+1")
      .WithExpiry(1000)
      .WithData(new { field1 = "value1", field2 = "value2" })
      .WithPlatformOptions(
            new IOsOptions
            {
                SoundFile = soundFile
            })
        .WithPlatformOptions(
            new AndroidOptions
            {
                NotificationTitle = title
            })
        .WithPlatformOptions(
            new WindowsPhoneOptions
            {
                Notification = new ToastNotification
                {
                    Text1 = wp_text1,
                    Text2 = wp_text2,
                    Path = wp_path
                }
            })
      .SendAsync();
```
```csharp
$$$OR

await PushNotification
      .ToQueryResult("Message",Query.Property("devicetype").IsEqualTo("ios").ToString())
      .WithBadge("+1")
      .WithExpiry(1000)
      .WithData(new { field1 = "value1", field2 = "value2" })
      .WithPlatformOptions(
            new IOsOptions
            {
                SoundFile = soundFile
            })
        .WithPlatformOptions(
            new AndroidOptions
            {
                NotificationTitle = title
            })
        .WithPlatformOptions(
            new WindowsPhoneOptions
            {
                Notification = new ToastNotification
                {
                    Text1 = wp_text1,
                    Text2 = wp_text2,
                    Path = wp_path
                }
            })
      .SendAsync();

```

###Sending a Push to Channels

You can send a Push to channels (groups). 

``` rest
$$$Method
POST https://apis.appacitive.com/push/
```
``` rest
$$$Sample Request
//  Sending to channels
curl -X DELETE \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Content-Type: application/json" \
-d
{
  "broadcast": false,
  "query": null,
  "channels": [
     "channel1",
     "channel2"
  ],
  "platformoptions": {
    "ios": {
      "sound": "test"
    },
    "android": {
      "title": "test title"
    }
  },
  "data": {
    "alert": "Testing!!",
    "badge": "1",
    "customvalue": "my custom value"
  },
  "expireafter": "100000"
}
```

``` rest
$$$Sample Response
{
  "id": "40613473488604239",
  "status": {
    "code": "200",
    "message": "Successful",
    "faulttype": null,
    "version": null,
    "referenceid": "c6ae0d24-529f-4752-a6a0-d127900f9e7c",
    "additionalmessages": []
  }
}
```

``` javascript
$$$Method 
Appacitive.Push.send(options);
```
``` javascript
$$$Sample Request

var options = {
    "query": null,
    "channels":[
        "channel1",
        "channel2"
    ]
    "broadcast": false,
    "platformoptions": {
        // platform specific options
        "ios": {
            "sound": "test"
        },
        "android": {
            "title": "test title"
        }
    },
    "data": {
        // message to send
        "alert": "Testing!!",
        // Increment existing badge by 1
        "badge": "+1",
        //Custom data field1 and field2
        "field1": "my custom value",
        "field2": "my custom value"
    },
    "expireafter": "100000" // Expiry in seconds
}

Appacitive.Push.send(options).then(function(notification) {
    alert('Push notification sent successfully');
}, function(status) {
    alert('Sending Push Notification failed.');
});
```
``` csharp
$$$Sample Request

await PushNotification
      .ToChannels("Message","channel1","channel2")
      .WithBadge("+1")
      .WithExpiry(1000)
      .WithData(new { field1 = "value1", field2 = "value2" })
      .WithPlatformOptions(
            new IOsOptions
            {
                SoundFile = soundFile
            })
        .WithPlatformOptions(
            new AndroidOptions
            {
                NotificationTitle = title
            })
        .WithPlatformOptions(
            new WindowsPhoneOptions
            {
                Notification = new ToastNotification
                {
                    Text1 = wp_text1,
                    Text2 = wp_text2,
                    Path = wp_path
                }
            })
      .SendAsync();
```

###Sending a Push to a list of devices

You can send a Push to just a specific set of device ids as well. 

``` rest
$$$Method
POST https://apis.appacitive.com/push/
```
``` rest
$$$Sample Request
//  Sending to devices
curl -X DELETE \
-H "Appacitive-Apikey: {Your api key}" \
-H "Appacitive-Environment: {target environment (sandbox/live)}" \
-H "Content-Type: application/json" \
-d
{
  "broadcast": false,
  "query": null,
  "channels": null,
  "deviceids": [
    "6ae0d2459f4752a6a0d127900f9e7c",
    "4ff790cc012543a49abf653e880ae"
  ],
  "platformoptions": {
    "ios": {
      "sound": "test"
    },
    "android": {
      "title": "test title"
    }
  },
  "data": {
    "alert": "Testing!!",
    "badge": "1",
    "customvalue": "my custom value"
  },
  "expireafter": "100000"
}
```

``` rest
$$$Sample Response
{
  "id": "40613473488604239",
  "status": {
    "code": "200",
    "message": "Successful",
    "faulttype": null,
    "version": null,
    "referenceid": "c6ae0d24-529f-4752-a6a0-d127900f9e7c",
    "additionalmessages": []
  }
}
```

``` javascript
$$$Method 
Appacitive.Push.send(options);
```
``` javascript
$$$Sample Request

var options = {
    "query": null,
    "deviceids": [
      "6ae0d2459f4752a6a0d127900f9e7c",
      "4ff790cc012543a49abf653e880ae"
    ],
    "broadcast": false,
    "platformoptions": {
        // platform specific options
        "ios": {
            "sound": "test"
        },
        "android": {
            "title": "test title"
        }
    },
    "data": {
        // message to send
        "alert": "Testing!!",
        // Increment existing badge by 1
        "badge": "+1",
        //Custom data field1 and field2
        "field1": "my custom value",
        "field2": "my custom value"
    },
    "expireafter": "100000" // Expiry in seconds
}

Appacitive.Push.send(options).then(function(notification) {
    alert('Push notification sent successfully');
}, function(status) {
    alert('Sending Push Notification failed.');
});
```
``` csharp
$$$Sample Request

await PushNotification
      .ToDeviceIds("Message","deviceid1","deviceid2")
      .WithBadge("+1")
      .WithExpiry(1000)
      .WithData(new { field1 = "value1", field2 = "value2" })
      .WithPlatformOptions(
            new IOsOptions
            {
                SoundFile = soundFile
            })
        .WithPlatformOptions(
            new AndroidOptions
            {
                NotificationTitle = title
            })
        .WithPlatformOptions(
            new WindowsPhoneOptions
            {
                Notification = new ToastNotification
                {
                    Text1 = wp_text1,
                    Text2 = wp_text2,
                    Path = wp_path
                }
            })
      .SendAsync();
```

Platform specific options
------------

There is a section of platform specific options which are different for different platforms.
Following are the options that we support.

###iOS options

As of now the extra option that iOS supports is the ability to specificy a sound file which the device will play when it recevies the notification.
This sound file should be shipped with the App.

``` rest
$$$JSON object

"platformoptions": {
    "ios": {
      "sound": "{name of sound file}"
    }
  }
```

```javascript
$$$Sample options
var options = 
{
  "broadcast":true,
  ..
  ..
  "platformoptions": {
     "ios": {
        "sound": "{name of sound file}"
      }
    }
}
```

```csharp
await PushNotification
      .ToDeviceIds(....)
      ...
      ...
      .WithPlatformOptions(
            new IOsOptions
            {
                SoundFile = "{name of sound file}"
            })
      .SendAsync();

```

###Android options

The option specific to the android platform is the "title" which the android user will see along with the message in case of a notification

``` rest
$$$JSON object

"platformoptions": {
    "android": {
              "title": "test title"
    }
  }
```

```javascript
$$$Sample options
var options = 
{
  "broadcast":true,
  ..
  ..
  "platformoptions": {
     "android": {
              "title": "test title"
      }
    }
}
```

```csharp
await PushNotification
      .ToDeviceIds(....)
      ...
      ...
      new AndroidOptions
            {
                NotificationTitle = title
            })
      .SendAsync();

```

###Windows Options

Windows Phone supports three types of Push Notifications.

1)Toast<br>
2)Raw<br>
3)Tile

We shall discuss them below, one by one.
####Toast
A toast displays at the top of the screen to notify users of an event, such as a news or weather alert. 
For more details on what each param exactly means you can check <a href='http://msdn.microsoft.com/en-us/library/windowsphone/develop/jj662938(v=vs.105).aspx'>Toasts for Windows Phone.</a><br>
Toast notification is supported by all windows phone.

```rest

"platformoptions": {
            "wp": {
                   "navigatepath": "",
                   "notificationtype": "toast",
                   "text1": "App text1",
                   "text2": "App text2"
            }
     }
```

```javascript

var options = {
  "broadcast" : true,
  ..
  ..
  "platformoptions": {
            "wp": {
                   "navigatepath": "",
                   "notificationtype": "toast",
                   "text1": "App text1",
                   "text2": "App text2"
            }
     }
}
```

```csharp

await PushNotification
        .Broadcast("message")
        ..
        ..
        .WithPlatformOptions(
            new WindowsPhoneOptions
            {
                Notification = new ToastNotification
                {
                    Text1 = wp_text1,
                    Text2 = wp_text2,
                    Path = wp_path
                }
            })
```
####Raw
Using Raw notification you can send any kind of data (represented in string format) to a windows phone device. This type of notification will be honored by phone only when the app is running.<br>
Raw notification is supported by all windows phone.

```rest

"platformoptions": {
            "wp": {
                   "data": "",                   
                   "notificationtype": "raw"
            }
     }
```

```javascript

var options = {
  "broadcast" : true,
  ..
  ..
  "platformoptions": {
            "wp": {
                   "data": "",                   
                   "notificationtype": "raw"
            }
     }
}
```

```csharp

await PushNotification
        .Broadcast("message")
        ..
        ..
        .WithPlatformOptions(
             new WindowsPhoneOptions
                {
                    Notification = new RawNotification() 
                    { 
                      RawData = "string data.." 
                    }
                })
```
####Tiles
Windows Phone supports three types of Tile Notifications<br>

1)Flip (supported by all WP)<br>
2)Cyclic (supported by WP8 only)<br>
3)Iconic (supported by WP8 only)

The properties which supports clear field functionality have an appropriate comment against them. By sending clear field for a property, that property will be cleared on the device for example if "cleartitle":"true" is sent in notification, title of the tile will be cleared.

To know more about Tile notification and exact meaning of the parameters you can checkout
<a href='http://msdn.microsoft.com/en-us/library/windowsphone/develop/hh202948(v=vs.105).aspx'>Windows Tiles Page</a>


#####Flip
The flip Tile template flips from front to back.

```rest
"platformoptions": {
          "wp": {
            "notificationtype": "tile",
            "tiletemplate": "flip",
            "title": "", /*supports clear field*/
            "backgroundimage": "", /*supports clear field*/
            "count": "", /*supports clear field*/
          /*following settings are for windows phone 7.5 and above */
            "smallbackgroundimage": "", /*supports clear field*/
            "widebackgroundimage": "",  /*supports clear field*/
            "backtitle": "",  /*supports clear field*/
            "backbackgroundimage": "",  /*supports clear field*/
            "widebackbackgroundimage": "",/*supports clear field*/
            "backcontent": "", /*supports clear field*/
            "widebackcontent": ""   /*supports clear field*/
        }
     }
```

```csharp
await PushNotification
        .Broadcast("message")
        .WithPlatformOptions(
              new WindowsPhoneOptions
              {
              Notification = TileNotification.CreateNewFlipTile( 
              new FlipTile
                        {
                          BackBackgroundImage = "bbimage",
                          BackContent = "back content",
                          BackTitle = "back title",
                          FrontBackgroundImage = "fbi",
                          FrontCount = "front count",
                          FrontTitle = "front title",
                          SmallBackgroundImage = "sbi",
                          TileId = "tileid",
                          WideBackBackgroundImage = "wbi",
                          WideBackContent = "wbc",
                          WideBackgroundImage = "wbi"
                        })
              })

```

```javascript
var options=
{
  "broadcast":true,
  ..
  ..
  "platformoptions": {
          "wp": {
            "notificationtype": "tile",
            "tiletemplate": "flip",
            "title": "", /*supports clear field*/
            "backgroundimage": "", /*supports clear field*/
            "count": "", /*supports clear field*/
          /*following settings are for windows phone 7.5 and above */
            "smallbackgroundimage": "", /*supports clear field*/
            "widebackgroundimage": "",  /*supports clear field*/
            "backtitle": "",  /*supports clear field*/
            "backbackgroundimage": "",  /*supports clear field*/
            "widebackbackgroundimage": "",/*supports clear field*/
            "backcontent": "", /*supports clear field*/
            "widebackcontent": ""   /*supports clear field*/
        }
     }
}
```

#####Cyclic (only wp8)

The cycle Tile template cycles through between one and nine images.

```rest
"platformoptions": {
      "wp": {
        "notificationtype": "tile",
        "tiletemplate": "cycle",
        "cycleimage1": "",  /*supports clear field*/
        "cycleimage2": "",  /*supports clear field*/
        "cycleimage3": "",  /*supports clear field*/
        "cycleimage4": "",  /*supports clear field*/
        "cycleimage5": "",  /*supports clear field*/
        "cycleimage6": "",  /*supports clear field*/
        "cycleimage7": "",  /*supports clear field*/
        "cycleimage8": "",  /*supports clear field*/
        "cycleimage9": "",  /*supports clear field*/
                   
        /*To send Flip Notification to WP7 and WP75 in same push message*/
        "wp7": {
            "tiletemplate": "flip",
            "title": "",  /*supports clear field*/
            "backgroundimage": "", /*supports clear field*/
            "count": "",  /*supports clear field*/
          },
        "wp75" : {
            "tiletemplate": "flip",
            "title": "",  /*supports clear field*/
            "backgroundimage": "", /*supports clear field*/
            "count": "", /*supports clear field*/
            "smallbackgroundimage": "", /*supports clear field*/
            "widebackgroundimage": "", /*supports clear field*/
            "backtitle": "", /*supports clear field*/
            "backbackgroundimage": "", /*supports clear field*/
            "widebackbackgroundimage": "", /*supports clear field*/
            "backcontent": "",  /*supports clear field*/
            "widebackcontent": ""  /*supports clear field*/
          } 
        }
     }
```

```javascript
var options = 
{
  "broadcast":true,
  ..
  ..
  "platformoptions": {
      "wp": {
        "notificationtype": "tile",
        "tiletemplate": "cycle",
        "cycleimage1": "",  /*supports clear field*/
        "cycleimage2": "",  /*supports clear field*/
        "cycleimage3": "",  /*supports clear field*/
        "cycleimage4": "",  /*supports clear field*/
        "cycleimage5": "",  /*supports clear field*/
        "cycleimage6": "",  /*supports clear field*/
        "cycleimage7": "",  /*supports clear field*/
        "cycleimage8": "",  /*supports clear field*/
        "cycleimage9": "",  /*supports clear field*/               
    /*To send Flip Notification to WP7 and WP75 in same push message*/
        "wp7": {
            "tiletemplate": "flip",
            "title": "",  /*supports clear field*/
            "backgroundimage": "", /*supports clear field*/
            "count": "",  /*supports clear field*/
          },
        "wp75" : {
            "tiletemplate": "flip",
            "title": "",  /*supports clear field*/
            "backgroundimage": "", /*supports clear field*/
            "count": "", /*supports clear field*/
            "smallbackgroundimage": "", /*supports clear field*/
            "widebackgroundimage": "", /*supports clear field*/
            "backtitle": "", /*supports clear field*/
            "backbackgroundimage": "", /*supports clear field*/
            "widebackbackgroundimage": "", /*supports clear field*/
            "backcontent": "",  /*supports clear field*/
            "widebackcontent": ""  /*supports clear field*/
          } 
        }
     }

}
```

```csharp
await PushNotification
        .Broadcast("message")
        .WithPlatformOptions(
                  new WindowsPhoneOptions
                  {
                    Notification = TileNotification.CreateNewCyclicTile(
                      new CyclicTile
                        {
                          CycleImage1 = "image1",
                          CycleImage2 = "image2",
                          CycleImage3 = "image3"
                        },
                      new FlipTile
                        {
                          BackBackgroundImage = "bbimage",
                          BackContent = "back content",
                          BackTitle = "back title",
                          FrontBackgroundImage = "fbi",
                          FrontCount = "front count",
                          FrontTitle = "front title",
                          SmallBackgroundImage = "sbi",
                          TileId = "tileid",
                          WideBackBackgroundImage = "wbi",
                          WideBackContent = "wbc",
                          WideBackgroundImage = "wbi"
                  })
            })
```

#####Iconic (only wp8)
The iconic template displays a small image in the center of the Tile, and incorporates Windows Phone design principles.

```rest
"platformoptions": {
      "wp": {
          "notificationtype": "tile",
          "tiletemplate": "iconic",
          "title": "",  /*supports clear field*/
          "iconimage": "",  /*supports clear field*/
          "smalliconimage": "",  /*supports clear field*/
          "backgroundcolor": "", /*supports clear field*/
          "widecontent1": "", /*supports clear field*/
          "widecontent2": "", /*supports clear field*/
          "widecontent3": "", /*supports clear field*/
  /*To send Flip Notification to WP7 and WP75 in same push message*/
          "wp7": {
                "tiletemplate": "flip",
                "title": "", /*supports clear field*/
                "backgroundimage": "", /*supports clear field*/
                "count": "", /*supports clear field*/
              },
          "wp75" : {
                "tiletemplate": "flip",
                "title": "",  /*supports clear field*/
                "backgroundimage": "",  /*supports clear field*/
                "count": "",  /*supports clear field*/
                "smallbackgroundimage": "", /*supports clear field*/
                "widebackgroundimage": "",  /*supports clear field*/
                "backtitle": "",   /*supports clear field*/
                "backbackgroundimage": "", /*supports clear field*/
                "widebackbackgroundimage": "",/*supports clear field*/
                "backcontent": "",  /*supports clear field*/
                "widebackcontent": ""  /*supports clear field*/
              } 
        }
     }
```

```javascript
var options=
{
  "broadcast":true,
  "platformoptions": {
      "wp": {
          "notificationtype": "tile",
          "tiletemplate": "iconic",
          "title": "",  /*supports clear field*/
          "iconimage": "",  /*supports clear field*/
          "smalliconimage": "",  /*supports clear field*/
          "backgroundcolor": "", /*supports clear field*/
          "widecontent1": "", /*supports clear field*/
          "widecontent2": "", /*supports clear field*/
          "widecontent3": "", /*supports clear field*/
          /*To send Flip Notification to WP7 and WP75 in same push message*/
          "wp7": {
                "tiletemplate": "flip",
                "title": "", /*supports clear field*/
                "backgroundimage": "", /*supports clear field*/
                "count": "", /*supports clear field*/
              },
          "wp75" : {
                "tiletemplate": "flip",
                "title": "",  /*supports clear field*/
                "backgroundimage": "",  /*supports clear field*/
                "count": "",  /*supports clear field*/
                "smallbackgroundimage": "", /*supports clear field*/
                "widebackgroundimage": "",  /*supports clear field*/
                "backtitle": "",   /*supports clear field*/
                "backbackgroundimage": "", /*supports clear field*/
                "widebackbackgroundimage": "", /*supports clear field*/
                "backcontent": "",  /*supports clear field*/
                "widebackcontent": ""  /*supports clear field*/
              } 
        }
     }
}
```

```csharp
await PushNotification
        .Broadcast("message")
        new WindowsPhoneOptions
          {
            Notification = TileNotification.CreateNewIconicTile(
                new IconicTile
                  {
                    BackgroundColor = "bc",
                    WideContent1 = "wc1",
                    WideContent2 = "wc2",
                    FrontTitle = "front title"
                  },
                new FlipTile
                  {
                    BackBackgroundImage = "bbimage",
                    BackContent = "back content",
                    BackTitle = "back title",
                    FrontBackgroundImage = "fbi",
                    FrontCount = "front count",
                    FrontTitle = "front title",
                    SmallBackgroundImage = "sbi",
                    TileId = "tileid",
                    WideBackBackgroundImage = "wbi",
                    WideBackContent = "wbc",
                    WideBackgroundImage = "wbi"
                  })
          })
```


Files
=======

Appacitive allows you to upload, download and ditribute media files like images, videos etc. on the appacitive platform so you can build rich applications and deliver media using an extensive CDN. 
The appacitive files api works by providing you `pre-signed` urls to a third-party cloud storage service (<a href="http://aws.amazon.com/s3/">Amazon S3</a>), where the files can be uploaded to or downloaded from.
You can upload and download files of any size and most filetypes are supported. 

``` javascript
//To upload or download files, the SDK provides `Appacitive.File` class
//You can instantiate it to perform operations on file.
//You must know the content type (mimeType) of the file because this is a required parameter. 
//Optionally you can provide name/id of the file by which it will be saved on the server.

These are the options you need to initialize a file object
var options = {
    fileId: //  a unique string representing the filename on server,
    contentType: // Mimetype of file,
    fileData: // data to be uploaded, this could be bytes or HTML5 fileupload instance data
};

//If you don't provide contentType, then the SDK will try to get the MimeType from the HTML5 fileData object or it'll set it as 'text/plain'.
```

Upload
----------------

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
//  Generate upload url
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
``` javascript
$$$Method
Appacitive.File::save();
```
``` javascript
$$$Sample File Objects

//If you have a byte stream, you can use the following interface to build file object.
var bytes = [ 0xAB, 0xDE, 0xCA, 0xAC, 0XAE ];

//create file object
var file = new Appacitive.File({
    fileId: 'serverFile.png',
    fileData: bytes,
    contentType: 'image/png'
});


//If you've a fileupload control in your HTML5 app which allows the user to pick a file from their local drive to upload, you can simply create the object as

//consider this as your fileupload control
<input type="file" id="imgUpload">

//in a handler or in a function you could get a reference to it, if you've selected a file
var fileData = $('#imgUpload')[0].files[0];

//create file object
var file = new Appacitive.File({
    fileId: fileData.name,
    fileData: fileData
});
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
``` javascript
$$$Sample Request
// save it on server
file.save).then(function(url) {
  alert('Download url is ' + url);
}, function(err) {
  //alert("Error uploading file");
});

//After save, the success callback gets a url in response which can be saved in your object and is also reflected in the file object. 
//This url is basically a download url which you could be used to render it in your DOM.

//file object after upload
{
  fileId: 'serverFile.png',
  contentType: 'image/png',
  url: '{{some url}}'
}

//if you don't provide fileId while upload, then you'll get a unique fileId set in you file object
{
  fileId: '3212jgfjs93798',
  contentType: 'image/png',
  url: '{{some url}}'
}
```

Download
----------------

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
//  Generate download url
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
```javascript
$$$Method
Appacitive.File::getDownloadUrl()
```
```javascript
$$$Sample Request
//create file object
var file = new Appacitive.File({
    fileId: "test.png"
});

// call to get download url
file.getDownloadUrl).then(function(url) {
    alert("Download url:" + url);
    $("#imgUpload").attr('src',file.url);
}, function(err) {
    alert("Downloading file");
});
```

You can now download the file by making a GET request to the `pre-signed` download `url` in the response object. 
No additional headers are required. For more details, refer to <a href="http://aws.amazon.com/documentation/s3/">Amazon S3 documentation</a>. 
Url is valid for 1 minute by default, but if you want to increase the expiry time set the `expires` query string parameter while retreiving the download url. 
This url only allows you to perform a GET on the file.

Delete a file
------------------

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
//  Delete file
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

Update a file
--------------
You can update a previously uploaded file for your app by using it's unique file name and re-uploading another file in its place.