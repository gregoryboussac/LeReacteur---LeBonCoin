const offer = require("../routes/offer");

module.exports = async (policyContext, config, { strapi }) => {
  const userId = policyContext.state.user.id;
  if (policyContext.request.params.id) {
    const offerId = policyContext.request.params.id;
    const offer = await strapi.entityService.findOne(
      "api::offer.offer",
      offerId,
      { populate: ["owner"] }
    );
    if (offer.owner.id !== userId) {
      return false;
    } else {
      return true;
    }
  } else {
    console.log(policyContext.request.body);
    const ownerID = JSON.parse(policyContext.request.body.data).owner;
    if (ownerID !== userId) {
      return false;
    }
    return true;
  }
};
