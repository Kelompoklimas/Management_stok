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

module.exports = allTags;
