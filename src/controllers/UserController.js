import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient({});

export default {
  async createUser(request, response) {
    const { name, email, password } = request.body;

    try {
      // 1. Verificação de existência
      const userExists = await prisma.user.findUnique({ where: { email } });

      if (userExists) {
        return response.status(400).json({ message: "Usuário já existe" });
      }

      const HashPassword = await hash(password, 8);

      // 2. Criação do usuário (Atenção à sintaxe: prisma.user.create)
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: HashPassword,
        },
      });

      return response.status(201).json(user);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  },

  async findAllUser(request, response) {
    try {
      const user = await prisma.user.findMany();
      return response.json(user);
    } catch (error) {
      return response.json({ message: error.message });
    }
  },
};
