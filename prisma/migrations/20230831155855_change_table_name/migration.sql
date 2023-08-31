/*
  Warnings:

  - You are about to drop the `plan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "exercism" DROP CONSTRAINT "exercism_weekDayPlanId_fkey";

-- DropForeignKey
ALTER TABLE "plan" DROP CONSTRAINT "plan_trainingPlanId_fkey";

-- DropTable
DROP TABLE "plan";

-- CreateTable
CREATE TABLE "WeekDayPlan" (
    "id" TEXT NOT NULL,
    "day" INTEGER NOT NULL,
    "rest" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "trainingPlanId" TEXT NOT NULL,

    CONSTRAINT "WeekDayPlan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WeekDayPlan" ADD CONSTRAINT "WeekDayPlan_trainingPlanId_fkey" FOREIGN KEY ("trainingPlanId") REFERENCES "trainingPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercism" ADD CONSTRAINT "exercism_weekDayPlanId_fkey" FOREIGN KEY ("weekDayPlanId") REFERENCES "WeekDayPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
