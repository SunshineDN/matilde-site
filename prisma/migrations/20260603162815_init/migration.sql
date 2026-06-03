-- CreateTable
CREATE TABLE "Page" (
    "slug" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "partner_name" TEXT NOT NULL,
    "phrases" JSONB NOT NULL,
    "images" JSONB NOT NULL,
    "music_url" TEXT,
    "payment_status" TEXT NOT NULL DEFAULT 'pending',
    "payment_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("slug")
);
