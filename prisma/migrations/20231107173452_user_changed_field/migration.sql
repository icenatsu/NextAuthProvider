/*
  Warnings:

  - You are about to drop the column `user` on the `user` table. All the data in the column will be lost.
  - Added the required column `utilisateur` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user`
    RENAME COLUMN `user` To `utilisateur`;
