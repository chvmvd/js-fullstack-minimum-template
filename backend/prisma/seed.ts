import { PrismaClient, Todo } from "@prisma/client";

const prisma = new PrismaClient();

const todos: Todo[] = [
  {
    id: "0ee2a4fb-ef05-4360-afee-c5f280dedee8",
    title: "買い物に行く。",
    description: "牛乳、卵、パンを買う。",
  },
  {
    id: "7a91436f-5c63-4db7-a830-1f4cb14bd150",
    title: "報告書を書く。",
    description: "プロジェクトの進捗を報告する。",
  },
];

async function main() {
  console.log("Start seeding...");
  for (const todo of todos) {
    const createdTodo = await prisma.todo.create({
      data: todo,
    });
    console.log(`Created ToDo with id: ${createdTodo.id}`);
  }
  console.log("Seeding finished.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
