-- CreateTable
CREATE TABLE "Trash" (
    "id_trash" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "id_usuario" INTEGER NOT NULL,

    CONSTRAINT "Trash_pkey" PRIMARY KEY ("id_trash")
);

-- AddForeignKey
ALTER TABLE "Trash" ADD CONSTRAINT "Trash_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;
