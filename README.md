# GraphQL - GRAPHCOOL - Relay Modern

This is a guide that help to use graph.cool with Relay

I used this page as a guide

    https://www.howtographql.com/react-relay/1-getting-started/

**1. Create new React Project**

<code>$ yarn create react-app hackernews</code>

Create a new <b>React Project</b> using the create-react-app.

<br/>

**2. Test run the project**

<code>$ cd hackernews</code>

Change to project directory.

<code>$ yarn start</code>

Run the project.

<code>http://localhost:3000/</code>

Then open in browser if it didn't opened by default

<br/>

**3. Install graphcool cli**

Note: <em>Stop the project first.</em>

<code>$ npm install -g graphcool</code>

<br/>

**4. Init Graphcool**

<code>$ graphcool init graphcool</code>

This will put all your Graphcool files inside graphcool folder of your project.

<br/>

**5. Add the schema**

    type Link @model {
      id: ID! @isUnique
      url: String!
      description: String!
      postedBy: User @relation(name: "UsersLinks")
      votes: [Vote!]! @relation(name: "VotesOnLink")
    }

    type User @model {
      id: ID! @isUnique
      name: String!
      links: [Link!]! @relation(name: "UsersLinks")
      votes: [Vote!]! @relation(name: "UsersVotes")
    }

    type Vote @model {
      id: ID! @isUnique
      user: User @relation(name: "UsersVotes")
      link: Link @relation(name: "VotesOnLink")
    }

Next copy the content of schema to the <b><em>graphcool/types.graphql</em></b> .

<br/>

**6. Deploy the project to Graphcool Cloud using**

<code>$ cd graphcool</code>

to change to graphcool directory.

<code>$ graphcool deploy --new-service [put your Service name here]</code>

<code>$ graphcool deploy --new-service Hackernews</code>

or

<code>$ graphcool deploy -n [put your Service name here]</code>

<code>$ graphcool deploy -n Hackernews</code>

CLI will prompt you to select the Cluster and afterwards initialise the project.

choose:

<code>shared-eu-west-1 </code>

Leave the target name <b><em>prod</em></b>

<br/>

**7. Adding a mutation**

<b>A mutation is a data insertion in the database.</b>

Note: <em>Be sure you still in the <code> graphcool</code> folder</em>

<code> $ graphcool playground</code>

run this cood to open the graphcool playground.

Or simply open it from the project page on the console page.

    mutation CreateGraphcoolLink {
      createLink(
        url: "http://graph.cool"
        description: "this is graph cool link"
      ) {
        id
      }
    }

This is an example of the code to write for a mutation.

    Then hit the run button.

<br/>

**8. Testing the added mutation**

    {
      allLinks{
        description
        id
        url
      }
    }

Add this in a new tab in the graphcool playground

    Then hit the run button.

<br/>

**9. Change the project hierarchy and the css from this link**

* Add a <code>components</code> and <code>styles</code> folders inside the <code>src</code> folder

* Move the <code>App.js</code> file inside <code>components</code> folder.

* Move the <code>App.css</code> file inside <code>styles</code> folder.

      .
      ├── README.md
      ├── node_modules
      ├── graphcool
      ├── package.json
      ├── public
      │   ├── favicon.ico
      │   ├── index.html
      │   └── ma nifest.json
      ├── src
      │   ├── App.test.js
      │   ├── components
      │   │   └── App.js
      │   ├── index.js
      │   ├── index.css
      │   ├── logo.svg
      │   ├── serviceWorker.js
      │   └── styles
      │       └── App.css
      └── yarn.lock

This is what we end up with

* Update this line in the index.js file

      import App from './components/App';

* Update this line in the App.js file

      import '../styles/App.css';

* Add this line to the index.html file

      <link rel="stylesheet" href="https://unpkg.com/tachyons@4.10.0/css/tachyons.min.css"/>

* Replace the code in the index.css file

      body {
        margin: 0;
        padding: 0;
        font-family: Verdana, Geneva, sans-serif;
      }

      input {
        max-width: 500px;
      }

      .gray {
        color: #828282;
      }

      .orange {
        background-color: #ff6600;
      }

      .background-gray {
        background-color: rgb(246,246,239);
      }

      .f11 {
        font-size: 11px;
      }

      .w85 {
        width: 85%;
      }

      .button {
        font-family: monospace;
        font-size: 10pt;
        color: black;
        background-color: buttonface;
        text-align: center;
        padding: 2px 6px 3px;
        border-width: 2px;
        border-style: outset;
        border-color: buttonface;
        cursor: pointer;
        max-width: 250px;
      }

**10. Install react-relay**

Note: <em> You should change to <b>hacknews</b> directory first.</em>

    $ cd ..

    $ yarn add react-relay

<br/>

**11. Install relay-compiler**

    $ yarn add relay-compiler --dev

<br/>

**12. Install the babel-plugin-relay**

    $ yarn add babel-plugin-relay --dev

<br/>

**13. Install the graphql**

    $ yarn add --dev graphql

**14. Eject the React app**

    $ yarn eject

This will let you see the project configuration files

<br/>

**15. Add the relay blugin configuration**

In the <code>package.json</code> file update this lines

    "babel": {
      "presets": [
        "react-app"
      ],
      "plugins": [
        "relay"
      ]
    },

<br/>

**16. Creating environment**

* Create the <code>Environment.js</code> in the <code>src</code> folder and add this code to it

      // 1
      const {
        Environment,
        Network,
        RecordSource,
        Store,
      } = require('relay-runtime')

      // 2
      const store = new Store(new RecordSource())

      // 3
      const network = Network.create((operation, variables) => {
        // 4
        return fetch('__RELAY_API_ENDPOINT__', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query: operation.text,
            variables,
          }),
        }).then(response => {
          return response.json()
        })
      })

      // 5
      const environment = new Environment({
        network,
        store,
      })

      // 6
      export default environment

* Understand the steps here:

  1. You first import the required JS modules that you need to instantiate and configure the Environment.

  2. Here you instantiate the required Store that will store the cached data.

  3. Now you create a Network that knows your GraphQL server from before, it’s instantiated with a function that returns a Promise of a networking call to the GraphQL API - here that’s done using fetch.

  4. The Network needs to know the server endpoint for your API. In the next step, you’ll replace the placeholder __RELAY_API_ENDPOINT__ with your actual endpoint.

  5. With the store and network available you can instantiate the actual Environment.

  6. Lastly you need to export the environment from this module.

* navigate to the <code>graphcool</code> folder

      $ cd graphcool

* Run this command

      $ graphcool info
  this will show you all the end points

* <b>Copy</b> the line in front of <code>Relay</code> into the <code>Environment.js</code> file, replace the placeholder <code>____RELAY_API_ENDPOINT\___</code>

<br/>

**17. Download the schema to local file**

Note: <em>Be sure you still in the <code> graphcool</code> folder</em>

* Install the <code>graphql-cli</code>

      $ npm install -g graphql-cli

* Run this command to create the <code>.graphqlconfig</code> file

      $ graphql init

* It will ask you for some data about the project

  1. Project name: <code>Hackernews</code>
  2. Schema file path: <code>schema.graphql</code>
  3. Endpoint URL: <code>https://api.graph.cool/relay/v1/cjreosu0f541a0194saplq1is</code>
  4. Endpoint name: <code>relay</code>
  5. Subscription URL: <code>(Enter to skip)</code>
  6. Add another: <code>No</code>
  7. File format: <code>JSON</code>


          {
            "projects": {
              "Hackernews": {
                "schemaPath": "schema.graphql",
                "extensions": {
                  "endpoints": {
                    "relay": "https://api.graph.cool/relay/v1/cjreosu0f541a0194saplq1is"
                  }
                }
              }
            }
          }

* Now, to get the schema in local files

      $ graphql get-schema

.  
.  
.  
.  
.  
.  
.  
.  
.  
.  
.  
.  
.  
.  
