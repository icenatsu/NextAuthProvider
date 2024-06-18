/*
  Warnings:

  - You are about to drop the column `pseudo` on the `user` table. All the data in the column will be lost.
  - Added the required column `user` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user`
    RENAME COLUMN `pseudo` To `user`;
