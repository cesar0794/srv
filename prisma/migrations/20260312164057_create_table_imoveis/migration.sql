-- CreateTable
CREATE TABLE "imoveis" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT,
    "thumb" TEXT,
    "endereco" TEXT,
    "cidade" TEXT,
    "uf" TEXT,
    "valor" TEXT,
    "descricao" TEXT,
    "userId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "imoveis_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "imoveis" ADD CONSTRAINT "imoveis_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
