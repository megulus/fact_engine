# Fact Engine

#### Meg Dahlgren

### Setup Instructions

Note: These instructions were tested on MacOS Version 10.14.6 running
Node version 17.7.1.

After unzipping project directory, run `npm install` in the project root directory. 

### Running

In the project rood directory, run `node index.js`

The four example inputs are in the examples directory. Add any
input file you'd like to test here, and modify line 7 of index.js to 
use your filename.

### Future Improvements

#### Test Coverage

- I have a few basic tests of the FactStore's functionality, but test coverage could be much better. The parser - which is pretty brittle - could have some test coverage to mitigate its current fragility (but ideally would be refactored).

#### Error handling

- The Parser in particular is brittle. It could be refactored to handle bad inputs more gracefully.

#### Usability

- Take a file path as a command line argument.
  - Rather than hard coding the paths to input files and relying on them being in a particular directory, allow a user to specify path at runtime
  - This would also address some of the Parser's fragility
  
#### Decoupling

- I have focused most of my effort on decoupling functionality (e.g., data storage, data parsing, query results) as much as possible. For example, my initial approach stored a lot of state about the query results in the FactStore object, rather than handling that separately. I created the QueryResult class to handle query result state, but I think there is still more that could be done to decouple the components of this code.