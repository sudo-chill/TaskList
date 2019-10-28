## Author
Greg Martin - gregdmartin@gmail.com

## Project Description
This project, uncreatively called 'TaskList', allows one to create and delete task lists in a browser. Within a list, one can create, edit, and delete list items.

## Project Purpose
This was a project I chose to use for exploring React and NodeJS. I wanted to see what the fuss was about and generally get familiar with it since I know it's popular in the industry. I learned quite a bit about both. Of note was that I didn't want to just get a React application running; I wanted to learn how a real server-client relation between React and a NodeJS application looked, and how to test it, what challenges are present, etc.

## What I learned
So far, I've learned the following:

### JS
* ES6 classes are great. The formal constructor and function definitions made me feel more comfortable.
* Arrow methods are also great. I've used them a fair amount in coffeescript in the past, I'm glad to use them natively.
* The require/export mechanism is still a bit mysterious to me. It's not clear what the best practices are around exporting something.
* Await and async are a cool way to make promise code easier to write, but can make things a bit less straightforward to test. I suppose that's true of any promise-related functionality though.
* Fetch is odd...I don't like how it doesn't handle 5XX responses as errors, forcing me to do my own handling. I suspect most people simply use a library (axios seems common for React), but I decided to write my own tiny utility instead. It works well enough for what it's doing but is quite limited, especially in how it handles responses.

### React
* I was first turned off by embedding what feels like html (and it effectively is) in my JS code, but after working with it for awhile, I found it quite nice, and a good way to force an author to think about what they are building.
* I'm not sure if this is a standard practice, but I have a server running to handle React and another for the NodeJS app that does my business logic. I can see the value in this, but it also feels odd to start two different servers to view one UI experience.
* State flows DOWNWARDS. At least by default. It takes a bit of getting used to, the fact that it is not easy nor a good practice to have components communicate with their container components.
* Testing React components is fraught with peril. The testing libs I've used (jest and enzyme) are somewhat confusing, and getting the right mixture of mocking, resetting mocks, mounting components, and async/await was one of the most challenging parts of testing my React code.

### NodeJS/Express
* I had no idea how to get a server working, and my initial version didn't have one. Getting an express server running and getting it to easily work with the react server took some time and study, but I got it working well enough.
* Defining routes, at least for the very limited amount I have, was rather easy. I like that I can simply write `app.post('url', (req, res) =>)` and I've defined my route and the behavior attached to it.
* Testing this was a bit challenging since there's no included test framework. I used mocha since every example I found was doing it. After some pain with figuring out how to run what I wanted, it worked flawlessly and very quickly.
* The use of node for dependencies is convenient! However, how I'm supposed to download them is still confusing, and I'm not quite sure what to do with package-lock.json. Do I commit that?

### Application Design
* While this project was primarily about learning React/NodeJS, I also did a few neat things that I'm proud of. Most notably is my error code. I have a hierarchy of application-specific error codes that inherit from some base types, and each one has a code that immediately allows a client to know what the problem is. I also came up with a cool inheritance scheme to make it easy for the server to return error information including extra content specific to the error that ocurred if necessary.
* I am currently using an in-memory data store that reads an initial seed of data from a file and then allows mutation on the data by the client. This taught me a valuable lesson about how mutating actions are probably handled in databases. For instance, I have an array of values from the file, and then I want to do a deletion. Deleting a specific item from an array and allowing no empty spots is currently a gross inefficient method. Having a map would lose order and make it harder to sort. So exploring a better pattern for how to do data storage, even in memory, would be a good exercise.
* Validation is an important part of server side code, but I don't think my pattern for it is very robust. I think I need an extra layer of abstraction between my 'controller' code and my data store.

## Notes if you are reading this
* As stated above, this was an exploration of React/NodeJS. To that point, it is NOT production code and would need a ton more work to get it into a state where I'd even consider allowing more than one person to use it. Some examples of where it falls short:
  * The data store is far too simplistic. It cannot safely handle parallel mutation and does terribly inefficient things when updating state.
  * The data scheme is dumb; it only has lists as a global concept, and no partitioning by individual users.
  * Related to the above point, there is no general concept of users at all, and adding it would require authentication and security measures.
  * The UI is pretty ugly, and does not handle a variety of cases well.
  * There is not nearly enough validation on data or error types defined to deal with all possible flows.
  * There is no instrumentation of any kind.
  * There is no logging of any kind.
  * There has been no tuning of the Express server.
  * There is no concept of environment; All requests are made to localhost, and there is no mechanism to replace that with some public url.
  * The API is not well defined or documented. It does not follow all best practices.
  * The AJAX requests are made by a relatively limited and untested hand-crafted JS object instead of a mature library.

There are more reasons, but the above is a good sample of what all is missing from this application.  

* I don't think anything I did here is worthy of reuse by anyone. If you want to, go for it. A mention would be nice, but isn't necessary.
