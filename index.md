Appacitive API
=======

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus rhoncus quam quis semper. Vivamus at eros in diam eleifend rhoncus non non lorem. Nunc sed vehicula nibh. Nam sed turpis sem. Fusce lectus mi, viverra id felis eu, varius suscipit odio. Sed luctus lectus et turpis euismod laoreet. Donec id lorem eros. Nam lobortis quam nec auctor dictum. Nunc et vehicula tellus. Sed tempor, lacus nec tincidunt sagittis, metus risus dignissim mauris, in vulputate dolor orci nec sapien. Nulla quis consectetur tellus. Duis id posuere orci.

```nolang
<span class="h3">Sample html with h3 size</span><i>Libraries are <a href="https://stripe.com/docs/libraries">available in several languages</a></i>
Some html content on a New line
```

Duis at ullamcorper nunc. Sed quis tincidunt lacus, et congue nunc. Duis vitae pharetra justo. Curabitur at ornare nibh, posuere facilisis tortor. Fusce ac consequat ipsum, id vehicula libero. Vivamus malesuada purus eget neque hendrerit dignissim. Suspendisse dignissim sem vitae erat ultrices aliquet. Donec vulputate urna metus, non volutpat ipsum laoreet at. Mauris diam lacus, suscipit consequat lobortis interdum, vulputate ac leo. Praesent quis iaculis mi. Maecenas nec molestie ligula, a tincidunt orci. Proin et nulla diam.

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