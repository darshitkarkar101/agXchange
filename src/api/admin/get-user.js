const Joi = require("joi");

const enums = require("../../../json/enums.json");
const messages = require("../../../json/messages.json");

const logger = require("../../logger");
const utils = require("../../utils");
const { ObjectID } = require("mongodb");

// User Profile update
module.exports = exports = {
  handler: async (req, res) => {
    const { user } = req;
    try {
      req.query.page = req.query.page ? req.query.page : 1;
      req.query.limit = req.query.limit ? req.query.limit : 10000;
      let limit = parseInt(req.query.limit);
      console.log("limit",limit)
      let skip = (parseInt(req.query.page) - 1) * limit;
      let search = req.query.search
        ? {}
        : {};

      let role = req.query.role;
      if (role) {
        search.role = ObjectID("6491020d7ad1814b989e9d10");
      }
   
      let count = await global.models.GLOBAL.ADMIN.find(search).count();
      let user = await global.models.GLOBAL.ADMIN.find(search)
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(skip);


      if (user.length > 0) {
        let data4createResponseObject = {
          req: req,
          result: 0,
          message: messages.ITEM_FOUND,
          payload: { data:user, count },
          logPayload: false,
        };
        return res
          .status(enums.HTTP_CODES.OK)
          .json(utils.createResponseObject(data4createResponseObject));
      } else {
        let data4createResponseObject = {
          req: req,
          result: -1,
          message: messages.ITEM_NOT_FOUND,
          payload: {},
          logPayload: false,
        };
        return res
          .status(enums.HTTP_CODES.OK)
          .json(utils.createResponseObject(data4createResponseObject));
      }
    } catch (error) {
      logger.error(
        `${req.originalUrl} - Error encountered: ${error.message}\n${error.stack}`
      );
      let data4createResponseObject = {
        req: req,
        result: -1,
        message: messages.GENERAL,
        payload: {},
        logPayload: false,
      };
      return res
        .status(enums.HTTP_CODES.INTERNAL_SERVER_ERROR)
        .json(utils.createResponseObject(data4createResponseObject));
    }
  },
};
