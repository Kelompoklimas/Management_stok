const { PrismaClient } = require("@prisma/client");
const Prisma = new PrismaClient();
const Tags = Prisma.tags;

const allTags = async () => {
  const findAllTags = await Tags.findMany({
    select: {
      id: true,
      name_tags: true,
    },
  });

  return findAllTags;
};

async function createTags(p_name_category) {
  const tags = await Prisma.tags.create({
    data: {
      name_tags: p_name_category,
    }
  });
  return console.log ("succes create tags");
}

module.exports =  {
  allTags,
  createTags,
}
