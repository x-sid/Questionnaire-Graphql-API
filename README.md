# QUESTIONNAIRE GRAPHQL API

A todo list application api

## Tech Stack

- Nodejs
- Express
- Postgres
- Sequelize ORM
- Jest
- Graphql
- Apollo-server-express

## Backend Server

To run this application

- Run npm install
- Provide the required environment variables in .env.sample or use default
- Run npm start

### Thought Process

After reading the requirements it was quite straight forward at least that was what i thought so i created my project directory
and created folders and files to handle different parts of the api. It was all nice and good until it was time to design the database schema.
The first idea that came to me was to normalize the data i.e create separate tables for questionnaire and questions and establish a one to many relationship between them. But after critically looking at the UI, i noticed that update,delete and re-order are done in bulk and not as individual request and to achieve this with a normalized database would mean looping through to make multiple update/delete database calls or writing a complex SQL query which is not efficient. That was when i decided that a better approach would be to embed the questions on the questionnaire table by creating a column called questions of type JSONB. Doing it this way allowed me to handle delete,update and re-ordering of questions by accepting the current state of the questionnaire as payload and just updating the database table using the questionnaire Id.

Another problem i had was with generating a shareable link. Considering the fact that i was building just the api with no frontend app to redirect to, it was quiet tricky. Generating the link was easy, and creating a resolver/endpoint to handle getting a questionnaire by url was straight forward. However without a fronted app to handle making a graphql request with the url to fetch the questionnaire. I was kind of confused on how the structure of the link should look like. In situations like this i would call the attention of someone on the frontend to discuss how the structure of the link would be and based on the outcome of the discussion i would have a better idea as to how the link should be structured.

## Run Tests
- npm run test
