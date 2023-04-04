import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = await hash("password", 12);
  const user = await prisma.user.upsert({
    where: { email: "test@test.com" },
    update: {},
    create: {
      email: "test@test.com",
      name: "Test User",
      password,
    },
  });

  console.log({ user });

  const restaurant = await prisma.restaurant.createMany({
    data: [
      {
        name: "The Blue Door",
        address: "123 Main St, Anytown USA",
        description:
          "A cozy bistro serving classic French cuisine with a modern twist.",
      },
      {
        name: "Sushi Island",
        address: "456 Broad Ave, Cityville USA",
        description:
          "A sushi bar with an extensive menu of traditional and creative rolls.",
      },
      {
        name: "The Rusty Fork",
        address: "789 High St, Smalltown USA",
        description:
          "A farm-to-table restaurant specializing in seasonal, locally-sourced ingredients.",
      },
      {
        name: "Pizzeria Primo",
        address: "321 Main St, Anytown USA",
        description:
          "A casual pizza joint with a wide selection of toppings and specialty pies.",
      },
      {
        name: "Taste of India",
        address: "555 Broad Ave, Cityville USA",
        description:
          "An authentic Indian restaurant with a variety of vegetarian and non-vegetarian dishes.",
      },
      {
        name: "La Cantina",
        address: "888 High St, Smalltown USA",
        description:
          "A lively Mexican restaurant with a colorful decor and flavorful dishes.",
      },
      {
        name: "The Steakhouse",
        address: "444 Oak St, Bigcity USA",
        description:
          "A classic steakhouse with a variety of cuts and sides, and an extensive wine list.",
      },
    ],
  });

  console.log(`Created restaurants: ${restaurant.count}`);
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
