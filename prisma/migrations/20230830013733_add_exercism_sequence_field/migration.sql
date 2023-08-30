/*
  Warnings:

  - Added the required column `sequence` to the `exercism` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rest` to the `plan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "exercism" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "sequence" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "plan" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "rest" BOOLEAN NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
