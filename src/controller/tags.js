const { PrismaClient } = require("@prisma/client");
const { createResTagsMongo } = require("../service_mongo/tags");
const Prisma = new PrismaClient();
const Tags = Prisma.tags;

const allTags = async () => {
  const findAllTags = await Tags.findMany({
    select: {
      id: true,
      name_tags: true,
    },
  });
  if (findAllTags.length > 0) {
    await createResTagsMongo("Success", "", JSON.stringify(findAllTags));
    return findAllTags;
  } else {
    await createResTagsMongo("NotFound", "", "Tags Not Found");
    return "NotFound";
  }
};

async function createTags(p_name_category) {
  const tags = await Prisma.tags.create({
    data: {
      name_tags: p_name_category,
    },
  });
  return console.log("succes create tags");
}

module.exports = {
  allTags,
  createTags,
};
