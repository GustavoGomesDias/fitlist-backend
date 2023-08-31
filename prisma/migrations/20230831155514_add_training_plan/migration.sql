/*
  Warnings:

  - You are about to drop the column `planId` on the `exercism` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `plan` table. All the data in the column will be lost.
  - Added the required column `weekDayPlanId` to the `exercism` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trainingPlanId` to the `plan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "exercism" DROP CONSTRAINT "exercism_planId_fkey";

-- DropForeignKey
ALTER TABLE "plan" DROP CONSTRAINT "plan_userId_fkey";

-- AlterTable
ALTER TABLE "exercism" DROP COLUMN "planId",
ADD COLUMN     "weekDayPlanId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "plan" DROP COLUMN "userId",
ADD COLUMN     "trainingPlanId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "trainingPlan" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "trainingPlan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "trainingPlan" ADD CONSTRAINT "trainingPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plan" ADD CONSTRAINT "plan_trainingPlanId_fkey" FOREIGN KEY ("trainingPlanId") REFERENCES "trainingPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercism" ADD CONSTRAINT "exercism_weekDayPlanId_fkey" FOREIGN KEY ("weekDayPlanId") REFERENCES "plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
