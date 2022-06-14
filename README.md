# Fact Engine

#### Meg Dahlgren

### Setup Instructions

Note: These instructions were tested on MacOS Version **fill in version here** running
Node version **fill in version here**.

After unzipping project directory, run `npm install` in the project root directory. 

### Running

In the project rood directory, run `node index.js`

The four example inputs are in the examples directory. Add any
input file you'd like to test here, and modify line 7 of index.js to 
use your filename.

### Future Improvements

#### Usability

- Take a file path as a command line argument.
  - Rather than hard coding the paths and storing them in one directory, allow a user to specify path at runtime.

#### Error handling

- The Parser in particular is brittle. It could be refactored to handle bad inputs more gracefully.

#### Decoupling

- I have focused most of my effort on decoupling functionality (e.g., data storage, data parsing, query results) as much as possible. There is still room for improvement here.