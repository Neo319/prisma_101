import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction(async (tx) => {
    const posts = await tx.post.findMany();
    for (const post of posts) {
      await tx.post.update({
        where: { id: post.id },
        data: {
          status: post.published ? "Published" : "Unknown",
        },
      });
    }
  });
}

main()
  .catch(async (e: unknown) => {
    console.error(e);
    process.exit(1); // red underline here
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
