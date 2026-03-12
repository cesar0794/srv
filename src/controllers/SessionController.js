import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt"; // faltava esse import também
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export default {
  async createSession(request, response) {
    try {
      const { email, password } = request.body;
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        return response.json({
          message: "usuário ou senha incorretos",
        });
      } // <-- chave fechando o if(!user) estava no lugar errado

      const checkPassword = await compare(password, user.password);

      if (!checkPassword) {
        return response.json({
          message: "usuário ou senha incorretos",
        });
      }

      const token = jwt.sign(
        { id: user.id },
        "9b27c03fa7acf6b538fd6f740b6e3ce2",
        {
          expiresIn: "1d",
        },
      );

      delete user.password;

      return response.json({ user, token });
    } catch (error) {
      return response.json({ message: error.message });
    }
  },
};
