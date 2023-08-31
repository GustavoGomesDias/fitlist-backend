/*
  Warnings:

  - A unique constraint covering the columns `[day]` on the table `weekDayPlan` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "weekDayPlan_day_key" ON "weekDayPlan"("day");
