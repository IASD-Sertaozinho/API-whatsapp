-- CreateEnum
CREATE TYPE "Message" AS ENUM ('COMUM', 'MULHERES', 'JOVENS');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "cel" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "message" "Message" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userCel" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_cel_key" ON "User"("cel");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_userCel_key" ON "Admin"("userCel");

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_userCel_fkey" FOREIGN KEY ("userCel") REFERENCES "User"("cel") ON DELETE RESTRICT ON UPDATE CASCADE;
