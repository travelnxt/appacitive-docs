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
```csharp
//For Windows Phone 7 base app
App.Initialize(Appacitive.Sdk.WindowsPhone7.WP7.Instance, 
                   "{Your api key}", 
                    Environment.Live);

//For Windows app
App.Initialize(Appacitive.Sdk.Net45.WindowsHost.Instance, 
                   "{Your api key}", 
                    Environment.Live);
```

Article
------------
Duis at ullamcorper nunc. Sed quis tincidunt lacus, et congue nunc. Duis vitae pharetra justo. Curabitur at ornare nibh, posuere facilisis tortor. Fusce ac consequat ipsum, id vehicula libero. Vivamus malesuada purus eget neque hendrerit dignissim. Suspendisse dignissim sem vitae erat ultrices aliquet. Donec vulputate urna metus, non volutpat ipsum laoreet at. Mauris diam lacus, suscipit consequat lobortis interdum, vulputate ac leo. Praesent quis iaculis mi. Maecenas nec molestie ligula, a tincidunt orci. Proin et nulla diam.

### Create
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus rhoncus quam quis semper. Vivamus at eros in diam eleifend rhoncus non non lorem. Nunc sed vehicula nibh. Nam sed turpis sem. Fusce lectus mi, viverra id felis eu, varius suscipit odio.

```javascript
/*Creating a new article*/
var player = new Appacitive.Article({ schema: 'player' });
player.set('age', 23);
player.save(function(){
  alert('saved successfully!');
}, function(status){
  alert('error while saving!');
});
```
```csharp
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

```javascript
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
```csharp
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

```javascript
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
```csharp
var article = await Articles.GetAsync("friend", 
                                      "123456678809", 
                                      new [] { "__id", "name" });
```

#### Get Multiple Articles
Duis at ullamcorper nunc. Sed quis tincidunt lacus, et congue nunc. Duis vitae pharetra justo. Curabitur at ornare nibh, posuere facilisis tortor. Fusce ac consequat ipsum, id vehicula libero.

```javascript
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
```csharp
var ids = new[] { "4543212", "79782374", "8734734" };
IEnumerable<Article> articles = await Articles.MultiGetAsync("friend", ids);
```

### Delete
Duis at ullamcorper nunc. Sed quis tincidunt lacus, et congue nunc. Duis vitae pharetra justo. Curabitur at ornare nibh, posuere facilisis tortor. Fusce ac consequat ipsum, id vehicula libero.

```javascript
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
```csharp
/*Single Delete*/
await Appacitive.Sdk.Articles.DeleteAsync("friend", "123456678809");

/*Multi Delete*/
var ids = new [] { "234234", "71231230", "97637282" };
await Articles.MultiDeleteAsync("friend", ids);
```

#### Delete with Connection
Vivamus malesuada purus eget neque hendrerit dignissim. Suspendisse dignissim sem vitae erat ultrices aliquet. Donec vulputate urna metus, non volutpat ipsum 

```javascript
//Setting the third argument to true will delete its connections if they exist
player.del(function(obj) {
    alert('Deleted successfully');
}, function(err, obj) {
    alert('Delete failed')
}, true); 
```
```csharp
/*Single Delete with connected articles*/
await Appacitive.Sdk.Articles.DeleteAsync("friend", "123456678809", true);
```

Connections
------------
Duis at ullamcorper nunc. Sed quis tincidunt lacus, et congue nunc. Duis vitae pharetra justo. Curabitur at ornare nibh, posuere facilisis tortor. Fusce ac consequat ipsum, id vehicula libero. Vivamus malesuada purus eget neque hendrerit dignissim. Suspendisse dignissim sem vitae erat ultrices aliquet. Donec vulputate urna metus, non volutpat ipsum laoreet at. Mauris diam lacus, suscipit consequat lobortis interdum, vulputate ac leo. Praesent quis iaculis mi. Maecenas nec molestie ligula, a tincidunt orci. Proin et nulla diam.

### Create
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus rhoncus quam quis semper. Vivamus at eros in diam eleifend rhoncus non non lorem. Nunc sed vehicula nibh. Nam sed turpis sem. Fusce lectus mi, viverra id felis eu, varius suscipit odio.

#### New Connection between two existing Articles
Duis at ullamcorper nunc. Sed quis tincidunt lacus, et congue nunc. Duis vitae pharetra justo. Curabitur at ornare nibh, posuere facilisis tortor. Fusce ac consequat ipsum, id vehicula libero. Duis at ullamcorper nunc. Sed quis tincidunt lacus, et congue nunc. Duis vitae pharetra justo. Curabitur at ornare nibh, posuere facilisis tortor. Fusce ac consequat ipsum, id vehicula libero. 

```javascript
/*Creating a new article*/
var player = new Appacitive.Article({ schema: 'player' });
player.set('age', 23);
player.save(function(){
  alert('saved successfully!');
}, function(status){
  alert('error while saving!');
});
```
```csharp
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

```javascript
/*Creating a new article*/
var player = new Appacitive.Article({ schema: 'player' });
player.set('age', 23);
player.save(function(){
  alert('saved successfully!');
}, function(status){
  alert('error while saving!');
});
```
```csharp
//Create an instance of Article
var hotelArticle = new Article("hotel");
//Other hotel properties

var connection = Connection
                    .New("review")
                    .FromExistingArticle("reviewer", "123445678")
                    .ToNewArticle("hotel", hotelArticle);
await connection .SaveAsync();
```

#### New Connection between two new articles
Duis at ullamcorper nunc. Sed quis tincidunt lacus, et congue nunc. Duis vitae pharetra justo. Curabitur at ornare nibh, posuere facilisis tortor. Fusce ac consequat ipsum, id vehicula libero. Duis at ullamcorper nunc. Sed quis tincidunt lacus, et congue nunc. Duis vitae pharetra justo. Curabitur at ornare nibh, posuere facilisis tortor. Fusce ac consequat ipsum, id vehicula libero. 

```javascript
/*Creating a new article*/
var player = new Appacitive.Article({ schema: 'player' });
player.set('age', 23);
player.save(function(){
  alert('saved successfully!');
}, function(status){
  alert('error while saving!');
});
```
```csharp
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

```javascript
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
```csharp
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

```javascript
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
```csharp
var article = await Articles.GetAsync("friend", 
                                      "123456678809", 
                                      new [] { "__id", "name" });
```

#### Get Multiple Articles
Duis at ullamcorper nunc. Sed quis tincidunt lacus, et congue nunc. Duis vitae pharetra justo. Curabitur at ornare nibh, posuere facilisis tortor. Fusce ac consequat ipsum, id vehicula libero.

```javascript
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
```csharp
var ids = new[] { "4543212", "79782374", "8734734" };
IEnumerable<Article> articles = await Articles.MultiGetAsync("friend", ids);
```

### Delete
Duis at ullamcorper nunc. Sed quis tincidunt lacus, et congue nunc. Duis vitae pharetra justo. Curabitur at ornare nibh, posuere facilisis tortor. Fusce ac consequat ipsum, id vehicula libero.

```javascript
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
```csharp
/*Single Delete*/
await Appacitive.Sdk.Articles.DeleteAsync("friend", "123456678809");

/*Multi Delete*/
var ids = new [] { "234234", "71231230", "97637282" };
await Articles.MultiDeleteAsync("friend", ids);
```

#### Delete with Connection
Vivamus malesuada purus eget neque hendrerit dignissim. Suspendisse dignissim sem vitae erat ultrices aliquet. Donec vulputate urna metus, non volutpat ipsum 

```javascript
//Setting the third argument to true will delete its connections if they exist
player.del(function(obj) {
    alert('Deleted successfully');
}, function(err, obj) {
    alert('Delete failed')
}, true); 
```
```csharp
/*Single Delete with connected articles*/
await Appacitive.Sdk.Articles.DeleteAsync("friend", "123456678809", true);
```

Users
------------

Files
------------

Querying Data
------------

To fetch a Github Repository's readme file, use the `Flatdoc.github` fetcher.
This will fetch the Readme file of the repository's default branch.
To fetch a Github Repository's readme file, use the `Flatdoc.github` fetcher.
This will fetch the Readme file of the repository's default branch.
To fetch a Github Repository's readme file, use the `Flatdoc.github` fetcher.
This will fetch the Readme file of the repository's default branch.

``` javascript
Flatdoc.run({
  fetcher: Flatdoc.github('USER/REPO')
});
```


You may also fetch another file other than the Readme file, just specify it as
the 2nd parameter.

``` javascript
Flatdoc.run({
  fetcher: Flatdoc.github('USER/REPO', 'Changelog.md')
});
```

After you've done this, you probably want to deploy it via [GitHub Pages].

[GitHub Pages guide >][GitHub Pages]

### Via a file

You may also fetch a file. In this example, this fetches the file `Readme.md` in
the same folder as the HTML file.

``` javascript
Flatdoc.run({
  fetcher: Flatdoc.file('Readme.md')
});
```
``` ruby
Flatdoc.run({
  fetcher: Flatdoc.file('Readme.md')
});
```
``` rest
Flatdoc.run({
  fetcher: Flatdoc.file('Readme.md')
});

You may actually supply any URL here. It will be fetched via AJAX. This is
useful for local testing.

``` javascript
Flatdoc.run({
  fetcher: Flatdoc.file('http://yoursite.com/Readme.md')
});
```

How it works
------------

Flatdoc is a hosted `.js` file (along with a theme and its assets) that you can
add into any page hosted anywhere.

#### All client-side

There are no build scripts or 3rd-party services involved. Everything is done in
the browser. Worried about performance? Oh, It's pretty fast.

Flatdoc utilizes the [GitHub API] to fetch your project's Readme files. You may
also configure it to fetch any arbitrary URL via AJAX.

#### Lightning-fast parsing

Next, it uses [marked], an extremely fast Markdown parser that has support for
GitHub flavored Markdown.

Flatdoc then simply renders *menu* and *content* DOM elements to your HTML
document. Flatdoc also comes with a default theme to style your page for you, or
you may opt to create your own styles.

Markdown extras
---------------

Flatdoc offers a few harmless, unobtrusive extras that come in handy in building
documentation sites.

#### Code highlighting

You can use Markdown code fences to make syntax-highlighted text. Simply
surround your text with three backticks. This works in GitHub as well.
See [GitHub Syntax Highlighting][fences] for more info.

    ``` html
    <strong>Hola, mundo</strong>
    ```

#### Blockquotes

Blockquotes show up as side figures. This is useful for providing side
information or non-code examples.

> Blockquotes are blocks that begin with `>`.

#### Smart quotes

Single quotes, double quotes, and double-hyphens are automatically replaced to
their typographically-accurate equivalent. This, of course, does not apply to
`<code>` and `<pre>` blocks to leave code alone.

> "From a certain point onward there is no longer any turning back. That is the
> point that must be reached."  
> --Franz Kafka

#### Buttons

If your link text has a `>` at the end (for instance: `Continue >`), they show
up as buttons.

> [View in GitHub >][project]

Customizing
===========

Basic
-----

### Theme options

For the default theme (*theme-white*), You can set theme options by adding
classes to the `<body>` element. The available options are:

#### big-h3
Makes 3rd-level headings bigger.

``` html
<body class='big-h3'>
```

#### no-literate
Disables "literate" mode, where code appears on the right and content text
appear on the left.

``` html
<body class='no-literate'>
```

#### large-brief
Makes the opening paragraph large.

``` html
<body class='large-brief'>
```

### Adding more markup

You have full control over the HTML file, just add markup wherever you see fit.
As long as you leave `role='flatdoc-content'` and `role='flatdoc-menu'` empty as
they are, you'll be fine.

Here are some ideas to get you started.

 * Add a CSS file to make your own CSS adjustments.
 * Add a 'Tweet' button on top.
 * Add Google Analytics.
 * Use CSS to style the IDs in menus (`#acknowledgements + p`).

### JavaScript hooks

Flatdoc emits the events `flatdoc:loading` and `flatdoc:ready` to help you make
custom behavior when the document loads.

``` js
$(document).on('flatdoc:ready', function() {
  // I don't like this section to appear
  $("#acknowledgements").remove();
});
```

Full customization
------------------

You don't have to be restricted to the given theme. Flatdoc is just really one
`.js` file that expects 2 HTML elements (for *menu* and *content*). Start with
the blank template and customize as you see fit.

[Get blank template >][template]

``` html
<html>
  <head>
    <script src='jquery.js'></script>
    <script src='http://rstacruz.github.io/flatdoc/v/0.8.0/flatdoc.js'></script>
    <!-- Initializer -->
    <script>
      Flatdoc.run({
        fetcher: Flatdoc.github('USER/REPO')
      });
    </script>
  </head>

  <body role='flatdoc'>
    <div role='flatdoc-menu'></div>
    <div role='flatdoc-content'></div>
  </body>
</html>
```
Misc
====

Inspirations
------------

The following projects have inspired Flatdoc.

 * [Backbone.js] - Jeremy's projects have always adopted this "one page
 documentation" approach which I really love.

 * [Docco] - Jeremy's Docco introduced me to the world of literate programming,
 and side-by-side documentation in general.

 * [Stripe] - Flatdoc took inspiration on the look of their API documentation.

 * [DocumentUp] - This service has the same idea but does a hosted readme 
 parsing approach.

Attributions
------------

[Photo](http://www.flickr.com/photos/doug88888/2953428679/) taken from Flickr,
licensed under Creative Commons.

Changelog
---------

#### v0.8.0 - May 26, 2013

First version.

Acknowledgements
----------------

© 2013, Rico Sta. Cruz. Released under the [MIT 
License](http://www.opensource.org/licenses/mit-license.php).

**Flatdoc** is authored and maintained by [Rico Sta. Cruz][rsc] with help from its 
[contributors][c]. It is sponsored by my startup, [Nadarei, Inc][nd].

 * [My website](http://ricostacruz.com) (ricostacruz.com)
 * [Nadarei, Inc.](http://nadarei.co) (nadarei.co)
 * [Github](http://github.com/rstacruz) (@rstacruz)
 * [Twitter](http://twitter.com/rstacruz) (@rstacruz)

[rsc]: http://ricostacruz.com
[c]:   http://github.com/rstacruz/flatdoc/contributors
[nd]:  http://nadarei.co

[GitHub API]: http://github.com/api
[marked]: https://github.com/chjj/marked
[Backbone.js]: http://backbonejs.org
[dox]: https://github.com/visionmedia/dox
[Stripe]: https://stripe.com/docs/api
[Docco]: http://jashkenas.github.com/docco
[GitHub pages]: https://pages.github.com
[fences]:https://help.github.com/articles/github-flavored-markdown#syntax-highlighting
[DocumentUp]: http://documentup.com

[project]: https://github.com/rstacruz/flatdoc
[template]: https://github.com/rstacruz/flatdoc/raw/gh-pages/templates/template.html
[blank]: https://github.com/rstacruz/flatdoc/raw/gh-pages/templates/blank.html
[dist]: https://github.com/rstacruz/flatdoc/tree/gh-pages/v/0.8.0
