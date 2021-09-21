const { generateUrl } = require("../helpers");
const {
  NotFoundResponse,
  InternalErrorResponse,
  BadRequestResponse,
  SuccessResponse,
} = require("../core/errorHandler");

module.exports = {
  Query: {
    allQuestionnaires: async (parent, args, { db }) => {
      try {
        const questionnaires = await db.Questionnaire.findAll();
        if (!questionnaires.length) {
          return new NotFoundResponse("No questionnaire found", []);
        }
        return new SuccessResponse("Success", questionnaires);
      } catch (e) {
        return new InternalErrorResponse("Something went wrong", []);
      }
    },

    getQuestionnaireById: async (parent, { id }, { db }) => {
      try {
        const questionnaire = await db.Questionnaire.findByPk(id);

        if (!questionnaire) {
          return new NotFoundResponse("Questionnaire not found", {});
        }

        return new SuccessResponse("Success", questionnaire);
      } catch (e) {
        return new InternalErrorResponse("Something went wrong", {});
      }
    },

    getQuestionnaireByUrl: async (parent, { url }, { db }) => {
      try {
        const questionnaire = await db.Questionnaire.findOne({
          where: { url },
        });

        if (!questionnaire) {
          return new NotFoundResponse("Questionnaire not found", {});
        }

        return new SuccessResponse("Success", questionnaire);
      } catch (e) {
        return new InternalErrorResponse("Something went wrong", {});
      }
    },
  },

  Mutation: {
    createQuestionnaire: async (parent, args, { req, baseUrl, port, db }) => {
      try {
        const { data } = args;
        const { title, questions } = data;
        const { url, link } = generateUrl({ req, port, baseUrl });
        const payload = {
          title,
          url,
          link,
          questions,
        };

        const newQuestionnaire = await db.Questionnaire.create(payload);

        console.log(newQuestionnaire);

        return new SuccessResponse("Questionnaire created", newQuestionnaire);
      } catch (e) {
        console.log(e);
        return new InternalErrorResponse(e, {});
      }
    },

    manageQuestionnaire: async (parent, args, { db }) => {
      try {
        const { data } = args;
        const { title, questions, id } = data;

        const updatedQuestionnaire = await db.Questionnaire.update(
          {
            title,
            questions,
          },
          { where: { id }, returning: true, plain: true }
        );

        if (!updatedQuestionnaire[1]) {
          return new BadRequestResponse("Bad request", {});
        }

        return new SuccessResponse(
          "Questionnaire updated",
          updatedQuestionnaire[1]
        );
      } catch (e) {
        return new InternalErrorResponse("Something went wrong", {});
      }
    },
  },
};
