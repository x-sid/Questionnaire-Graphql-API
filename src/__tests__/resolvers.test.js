const { gql } = require("apollo-server-express");
const { testClient } = require("../../server");
const { query, mutate } = testClient;

describe("TESTING QUESTIONNAIRE RESOLVERS", () => {
  let url;
   const CREATE_QUESTIONNAIRE = gql`
     mutation Mutation($createQuestionnaireData: QuestionnaireInput) {
       createQuestionnaire(data: $createQuestionnaireData) {
         success
         message
         data {
           id
           title
           url
           link
           questions {
             question
             answerType
           }
           createdAt
           updatedAt
         }
       }
     }
   `;

   const GET_QUESTIONNAIRE = gql`
     query Query($id: Int!) {
       getQuestionnaireById(id: $id) {
         success
         message
         data {
           id
           url
           questions {
             question
             answerType
           }
           link
           title
         }
       }
     }
   `;

   const GET_QUESTIONNAIRE_URL = gql`
     query Query($url: String!) {
       getQuestionnaireByUrl(url: $url) {
         success
         message
         data {
           id
           url
           questions {
             question
             answerType
           }
           link
           title
         }
       }
     }
   `;

    const MANAGE_QUESTIONNAIRE = gql`
      mutation Mutation($manageQuestionnaireData: ManageQuestionnaireInput) {
        manageQuestionnaire(data: $manageQuestionnaireData) {
          success
          message
          data {
            id
            url
            questions {
              question
              answerType
            }
            link
            title
          }
        }
      }
    `;
    
  it("Create Questionnaire", async () => {
    const createQuestionnaireData = {
      title: "Do you know graphql",
      questions: [
        {
          question: "How long have you been using gql",
          answerType: "short answer",
        },
        {
          question: "On a scale of 1-10 how would you rate your skill",
          answerType: "short answer",
        },
      ],
    };

    const { data } = await mutate({
      mutation: CREATE_QUESTIONNAIRE,
      variables: { createQuestionnaireData },
    });

    const successResponse = data.createQuestionnaire;
    url = successResponse.data.url;
    expect(successResponse.success).toEqual(true);
    expect(successResponse.data).toHaveProperty("id");
  });

  it("Get Questionnaire by Id", async () => {
    const { data } = await query({
      mutation: GET_QUESTIONNAIRE,
      variables: { id: 1 },
    });

    const successResponse = data?.getQuestionnaireById;
    expect(successResponse.success).toEqual(true);
    expect(successResponse.data).toHaveProperty("id");
  });

  it("Get Questionnaire by url", async () => {
    const { data } = await query({
      mutation: GET_QUESTIONNAIRE_URL,
      variables: { url },
    });

    const successResponse = data?.getQuestionnaireByUrl;
    expect(successResponse.success).toEqual(true);
    expect(successResponse.data).toHaveProperty("id");
  });

  it("Update Questionnaire", async () => {
    const manageQuestionnaireData = {
      id: 1,
      title: "Do you know graphql",
      questions: [
        {
          question: "How long have you been using gql",
          answerType: "short answer",
        },
        {
          question: "On a scale of 1-10 how would you rate your skill",
          answerType: "short answer",
        },
        {
          question: "Which gql server library are you conversant with",
          answerType: "short answer",
        },
      ],
    };

    const { data } = await mutate({
      mutation: MANAGE_QUESTIONNAIRE,
      variables: { manageQuestionnaireData },
    });

    const successResponse = data.manageQuestionnaire;
    expect(successResponse.success).toEqual(true);
    expect(successResponse.data.questions.length).toEqual(3);
  });

  it("Delete Questionnaire", async () => {
    const manageQuestionnaireData = {
      id: 1,
      title: "Do you know graphql",
      questions: [
        {
          question: "How long have you been using gql",
          answerType: "short answer",
        },
      ],
    };

    const { data } = await mutate({
      mutation: MANAGE_QUESTIONNAIRE,
      variables: { manageQuestionnaireData },
    });

    const successResponse = data.manageQuestionnaire;
    expect(successResponse.success).toEqual(true);
    expect(successResponse.data.questions.length).toEqual(1);
  });
});
