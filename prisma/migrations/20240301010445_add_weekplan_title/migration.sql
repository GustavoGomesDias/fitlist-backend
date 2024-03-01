/*
  Warnings:

  - Added the required column `title` to the `weekDayPlan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "weekDayPlan" ADD COLUMN     "title" TEXT NOT NULL;
