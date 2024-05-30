import express from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const app = express();

app.use(express.json());

app.post("/User", async (req, res) => {
  await prisma.player.create({
    data: {
      email: req.body.email,
      age: req.body.age,
      name: req.body.name,
    },
  });
  res.status(201).json({ message: "Usuario criado com sucesso..." });
});

app.put("/User/:id", async (req, res) => {
  const user = await prisma.player.update({
    where: {
      id: req.params.id,
    },

    data: {
      email: req.body.email,
      age: req.body.age,
      name: req.body.name,
    },
  });
  res.status(201).json(user);
});

app.delete("/User/:id", async (req, res) => {
  await prisma.player.delete({
    where: {
      id: req.params.id,
    },
  });

  res.status(200).json({ message: "Usuario deletado com sucesso" });
});

app.get("/User", async (req, res) => {
  const users = await prisma.player.findMany();
  res.status(200).json(users);
});

app.listen(3000, () => {
  console.log("Servidor iniciado na porta 3000");
});
