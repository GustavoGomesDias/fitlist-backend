/*
  Warnings:

  - You are about to drop the `WeekDayPlan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "WeekDayPlan" DROP CONSTRAINT "WeekDayPlan_trainingPlanId_fkey";

-- DropForeignKey
ALTER TABLE "exercism" DROP CONSTRAINT "exercism_weekDayPlanId_fkey";

-- DropTable
DROP TABLE "WeekDayPlan";

-- CreateTable
CREATE TABLE "weekDayPlan" (
    "id" TEXT NOT NULL,
    "day" INTEGER NOT NULL,
    "rest" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "trainingPlanId" TEXT NOT NULL,

    CONSTRAINT "weekDayPlan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "weekDayPlan" ADD CONSTRAINT "weekDayPlan_trainingPlanId_fkey" FOREIGN KEY ("trainingPlanId") REFERENCES "trainingPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercism" ADD CONSTRAINT "exercism_weekDayPlanId_fkey" FOREIGN KEY ("weekDayPlanId") REFERENCES "weekDayPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
