-- CreateEnum
CREATE TYPE "UserRoles" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "yearOfBirth" TIMESTAMP(3) NOT NULL,
    "role" "UserRoles" NOT NULL,
    "avatar" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "refresh_token" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
