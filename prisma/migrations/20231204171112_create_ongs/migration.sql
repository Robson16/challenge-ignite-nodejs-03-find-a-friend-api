-- CreateTable
CREATE TABLE "ongs" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "zip_code" DECIMAL(65,30) NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "ongs_pkey" PRIMARY KEY ("id")
);
