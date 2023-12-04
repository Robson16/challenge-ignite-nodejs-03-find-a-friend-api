-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'ONG');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'ONG';
