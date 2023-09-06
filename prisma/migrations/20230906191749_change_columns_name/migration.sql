/*
  Warnings:

  - You are about to drop the column `repetitions` on the `exercism` table. All the data in the column will be lost.
  - You are about to drop the column `series` on the `exercism` table. All the data in the column will be lost.
  - Added the required column `serie` to the `exercism` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "exercism" DROP COLUMN "repetitions",
DROP COLUMN "series",
ADD COLUMN     "repetition" INTEGER,
ADD COLUMN     "serie" INTEGER NOT NULL;
