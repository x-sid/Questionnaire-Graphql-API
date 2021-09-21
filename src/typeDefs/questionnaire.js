const { gql } = require("apollo-server-express");

module.exports = gql`
  scalar Date

  type Questionnaire {
    id: Int!
    title: String!
    url: String!
    link: String!
    questions: [Question]
    createdAt: Date!
    updatedAt: Date!
  }

  type Question {
    question: String!
    answerType: String!
  }

  type Questionnaires {
    success: Boolean!
    message: String!
    data: [Questionnaire]
  }

  type QuestionnaireResponse {
    success: Boolean!
    message: String!
    data: Questionnaire
  }

  input QuestionnaireInput {
    title: String!
    questions: [QuestionInput]
  }

  input ManageQuestionnaireInput {
    id: Int!
    title: String!
    questions: [QuestionInput]
  }

  input QuestionInput {
    question: String!
    answerType: String!
  }

  type Query {
    allQuestionnaires: Questionnaires
    getQuestionnaireById(id: Int!): QuestionnaireResponse
    getQuestionnaireByUrl(url: String!): QuestionnaireResponse
  }

  type Mutation {
    createQuestionnaire(data: QuestionnaireInput): QuestionnaireResponse
    manageQuestionnaire(data: ManageQuestionnaireInput): QuestionnaireResponse
  }
`;
