/*
  Warnings:

  - The `payload` column on the `Track` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Track" DROP COLUMN "payload",
ADD COLUMN     "payload" JSONB;
