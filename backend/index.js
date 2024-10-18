const express = require('express');
const cors = require("cors");
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/tasks/schema'); 
require('dotenv').config();

const app = express();
app.use(cors());

// Middleware for GraphQL
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true, 
}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/graphql`);
});
