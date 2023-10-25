-- DropForeignKey
ALTER TABLE "exercism" DROP CONSTRAINT "exercism_weekDayPlanId_fkey";

-- DropForeignKey
ALTER TABLE "trainingPlan" DROP CONSTRAINT "trainingPlan_userId_fkey";

-- DropForeignKey
ALTER TABLE "weekDayPlan" DROP CONSTRAINT "weekDayPlan_trainingPlanId_fkey";

-- AlterTable
ALTER TABLE "trainingPlan" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "trainingPlan" ADD CONSTRAINT "trainingPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "weekDayPlan" ADD CONSTRAINT "weekDayPlan_trainingPlanId_fkey" FOREIGN KEY ("trainingPlanId") REFERENCES "trainingPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercism" ADD CONSTRAINT "exercism_weekDayPlanId_fkey" FOREIGN KEY ("weekDayPlanId") REFERENCES "weekDayPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
