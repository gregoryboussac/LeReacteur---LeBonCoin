"use strict";

/**
 * offer controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::offer.offer", ({ strapi }) => ({
  async deleteAll(ctx) {
    try {
      const userdId = ctx.state.user.id;
      const user = await strapi.entityService.findOne(
        "plugin::users-permissions.user",
        userdId,
        { populate: ["offers"] }
      );
      for (let i = 0; i < user.offers.length; i++) {
        const offer = user.offers[i];
        await strapi.entityService.delete("api::offer.offer", offer.id);
      }

      //   const idToDelete = ctx.request.params.id; // 1

      return { message: "All offers deleted" }; // Réponse au client
    } catch (error) {
      ctx.response.status = 500;
      return { message: error.message };
    }
  },
  // async create(ctx) {
  //   try {
  //     // console.log(t.body.data);
  //     const requesterID = ctx.state.user.id;
  //     const parsedBody = JSON.parse(ctx.request.body.data);
  //     console.log(typeof parsedBody);
  //     if (parsedBody.owner !== requesterID) {
  //       ctx.response.status = 403;
  //       return "vous n'etes pas autorisés a faire cette acion";
  //     }
  //     const { data, meta } = await super.create(ctx);
  //     return { data, meta };
  //   } catch (error) {
  //     ctx.response.status = 500;
  //     return { message: error.message };
  //   }
  // },
}));
