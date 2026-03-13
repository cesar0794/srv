import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
  async createImobi(request, response) {
    try {
      const thumb = request.file.filename;
      const {
        id,
        name,
        email,
        telefone,
        tipo,
        endereco,
        cidade,
        uf,
        valor,
        descricao,
      } = request.body;

      const user = await prisma.user.findUnique({ where: { id: Number(id) } });
      if (!user) {
        return response.json({ message: "Usuário não encontrado" });
      }
      const slugify = (str) =>
        str
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "")
          .replace(/[\s_-]+/g, "-")
          .replace(/^-+|-+$/g, "");

      const slug = slugify(tipo);

      const imobi = await prisma.imobi.create({
        data: {
          thumb,
          tipo,
          endereco,
          cidade,
          uf,
          valor,
          descricao,
          name,
          email,
          telefone,
          slug,
          userId: user.id,
        },
      });
      return response.json(imobi);
    } catch (error) {
      return response.json({ message: error.message });
    }
  },

  async findAllImobi(request, response) {
    try {
      const imobi = await prisma.imobi.findMany();

      return response.json(imobi);
    } catch (error) {
      return response.json({ message: error.message });
    }
  },

  async findImobi(request, response) {
    try {
      const { slug } = request.params;

      const imobi = await prisma.imobi.findFirst({
        where: { slug: slug },
      });

      if (!imobi) {
        return response.json({
          message: "Não foi possivel encontrar esse imóvel",
        });
      }

      return response.json(imobi);
    } catch (error) {
      return response.json({ message: error.message });
    }
  },
};
