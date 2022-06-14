# Fact Engine

#### Meg Dahlgren

### Setup Instructions

Note: These instructions were tested on MacOS Version 10.14.6 running
Node version 17.7.1, and npm version 8.12.1.

After unzipping project directory, in a terminal window navigate to project root director and  run `npm install`. 

### Running

In the project root directory, run `node src/index.js`

The four example inputs are in the examples directory. Add any
input file you'd like to test here, and modify line 7 of index.js to 
use your filename. Currently, 'in3.txt' is hardcoded, so the contents of './examples/in3.txt' will be read and processed.

### Future Improvements

#### Test Coverage

- I have a few basic tests of the FactStore's functionality, but test coverage could be much better. The parser - which is pretty brittle - could have some test coverage to mitigate its current fragility (but ideally would be refactored).

#### Add TypeScript

- I am fairly new to TypeScript, so in the interest of time, I did not use it here. But I would implement it as a future improvement. I really appreciate the ability to catch more errors at compile time (rather than runtime) by using strong typing.

#### Refactor the Parser

- As mentioned above, the Parser is brittle. In its current form it depends on good inputs and will choke if it encounters anything it doesn't know how to parse. This should be handled much more gracefully.

#### Error handling

- Related to above: all of my classes and functions currently depend on good inputs. Not adding it was a tradeoff that I made in the interest of respecting the allotted time for this exercise, so that I could focus on minimal coupling among the components of my solution (this could be better still).

#### Usability

- Take a file path as a command line argument.
  - Rather than hard coding the paths to input files and relying on them being in a particular directory, allow a user to specify path at runtime
  - This would also address some of the Parser's fragility
  
#### Decoupling

- I have focused most of my effort on decoupling functionality (e.g., data storage, data parsing, query results) as much as possible. For example, my initial approach stored a lot of state about the query results in the FactStore object, rather than handling that separately. I created the QueryResult class to handle query result state, but I think there is still more that could be done to decouple the components of this code.

#### Thank you!

I really enjoyed working on this problem! It really made me think, which I think is the best kind of test. In the interest of respecting the time allowance for this test, I am turning it in in its current state, but as you can see from my notes above, there are many improvements I would love to make on it.
