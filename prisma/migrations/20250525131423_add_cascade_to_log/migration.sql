-- DropForeignKey
ALTER TABLE "Log" DROP CONSTRAINT "Log_id_almacen_fkey";

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_id_almacen_fkey" FOREIGN KEY ("id_almacen") REFERENCES "Almacen"("id_almacen") ON DELETE CASCADE ON UPDATE CASCADE;
