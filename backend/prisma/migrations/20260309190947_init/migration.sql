-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('CLIENT', 'EMPLOYEE', 'OWNER');

-- CreateEnum
CREATE TYPE "AppointmentStatus" AS ENUM ('BOOKED', 'CONFIRMED', 'CANCELLED', 'COMPLETED', 'NO_SHOW');

-- CreateEnum
CREATE TYPE "BookingSource" AS ENUM ('WEB', 'ADMIN');

-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('FULL', 'DEPOSIT');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'CANCELLED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "NotificationChannel" AS ENUM ('EMAIL', 'SMS');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('BOOKING_CONFIRMATION', 'REMINDER', 'CANCELLATION', 'RESCHEDULE');

-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('PENDING', 'SENT', 'FAILED');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "first_name" VARCHAR(100) NOT NULL,
    "last_name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(30),
    "password_hash" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "salons" (
    "id" UUID NOT NULL,
    "owner_id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "address_line" VARCHAR(255),
    "city" VARCHAR(100),
    "postal_code" VARCHAR(20),
    "phone" VARCHAR(30),
    "email" VARCHAR(255),
    "logo_url" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "salons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_profiles" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "salon_id" UUID NOT NULL,
    "position" VARCHAR(100),
    "bio" TEXT,
    "photo_url" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_categories" (
    "id" UUID NOT NULL,
    "salon_id" UUID NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "description" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "service_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" UUID NOT NULL,
    "salon_id" UUID NOT NULL,
    "category_id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "image_url" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "duration_minutes" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_services" (
    "id" UUID NOT NULL,
    "employee_profile_id" UUID NOT NULL,
    "service_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "employee_services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "salon_working_hours" (
    "id" UUID NOT NULL,
    "salon_id" UUID NOT NULL,
    "day_of_week" INTEGER NOT NULL,
    "open_time" VARCHAR(5),
    "close_time" VARCHAR(5),
    "is_closed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "salon_working_hours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_schedules" (
    "id" UUID NOT NULL,
    "employee_profile_id" UUID NOT NULL,
    "day_of_week" INTEGER NOT NULL,
    "start_time" VARCHAR(5),
    "end_time" VARCHAR(5),
    "is_working" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_schedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appointments" (
    "id" UUID NOT NULL,
    "salon_id" UUID NOT NULL,
    "client_id" UUID NOT NULL,
    "employee_profile_id" UUID NOT NULL,
    "service_id" UUID NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "status" "AppointmentStatus" NOT NULL DEFAULT 'BOOKED',
    "booking_source" "BookingSource" NOT NULL DEFAULT 'WEB',
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" UUID NOT NULL,
    "appointment_id" UUID NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "payment_type" "PaymentType" NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "provider" VARCHAR(50),
    "paid_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" UUID NOT NULL,
    "appointment_id" UUID NOT NULL,
    "client_id" UUID NOT NULL,
    "salon_id" UUID NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gallery_images" (
    "id" UUID NOT NULL,
    "salon_id" UUID NOT NULL,
    "image_url" TEXT NOT NULL,
    "title" VARCHAR(255),
    "description" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "gallery_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "appointment_id" UUID,
    "channel" "NotificationChannel" NOT NULL,
    "type" "NotificationType" NOT NULL,
    "status" "NotificationStatus" NOT NULL DEFAULT 'PENDING',
    "sent_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" UUID NOT NULL,
    "actor_user_id" UUID,
    "action" VARCHAR(100) NOT NULL,
    "entity_type" VARCHAR(50) NOT NULL,
    "entity_id" UUID,
    "old_values" JSONB,
    "new_values" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "employee_profiles_user_id_salon_id_key" ON "employee_profiles"("user_id", "salon_id");

-- CreateIndex
CREATE UNIQUE INDEX "employee_services_employee_profile_id_service_id_key" ON "employee_services"("employee_profile_id", "service_id");

-- CreateIndex
CREATE UNIQUE INDEX "salon_working_hours_salon_id_day_of_week_key" ON "salon_working_hours"("salon_id", "day_of_week");

-- CreateIndex
CREATE UNIQUE INDEX "employee_schedules_employee_profile_id_day_of_week_key" ON "employee_schedules"("employee_profile_id", "day_of_week");

-- CreateIndex
CREATE INDEX "appointments_salon_id_idx" ON "appointments"("salon_id");

-- CreateIndex
CREATE INDEX "appointments_client_id_idx" ON "appointments"("client_id");

-- CreateIndex
CREATE INDEX "appointments_employee_profile_id_idx" ON "appointments"("employee_profile_id");

-- CreateIndex
CREATE INDEX "appointments_service_id_idx" ON "appointments"("service_id");

-- CreateIndex
CREATE INDEX "appointments_start_time_end_time_idx" ON "appointments"("start_time", "end_time");

-- CreateIndex
CREATE UNIQUE INDEX "reviews_appointment_id_key" ON "reviews"("appointment_id");

-- AddForeignKey
ALTER TABLE "salons" ADD CONSTRAINT "salons_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_profiles" ADD CONSTRAINT "employee_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_profiles" ADD CONSTRAINT "employee_profiles_salon_id_fkey" FOREIGN KEY ("salon_id") REFERENCES "salons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_categories" ADD CONSTRAINT "service_categories_salon_id_fkey" FOREIGN KEY ("salon_id") REFERENCES "salons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_salon_id_fkey" FOREIGN KEY ("salon_id") REFERENCES "salons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "service_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_services" ADD CONSTRAINT "employee_services_employee_profile_id_fkey" FOREIGN KEY ("employee_profile_id") REFERENCES "employee_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_services" ADD CONSTRAINT "employee_services_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salon_working_hours" ADD CONSTRAINT "salon_working_hours_salon_id_fkey" FOREIGN KEY ("salon_id") REFERENCES "salons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_schedules" ADD CONSTRAINT "employee_schedules_employee_profile_id_fkey" FOREIGN KEY ("employee_profile_id") REFERENCES "employee_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_salon_id_fkey" FOREIGN KEY ("salon_id") REFERENCES "salons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_employee_profile_id_fkey" FOREIGN KEY ("employee_profile_id") REFERENCES "employee_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_appointment_id_fkey" FOREIGN KEY ("appointment_id") REFERENCES "appointments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_appointment_id_fkey" FOREIGN KEY ("appointment_id") REFERENCES "appointments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_salon_id_fkey" FOREIGN KEY ("salon_id") REFERENCES "salons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gallery_images" ADD CONSTRAINT "gallery_images_salon_id_fkey" FOREIGN KEY ("salon_id") REFERENCES "salons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_appointment_id_fkey" FOREIGN KEY ("appointment_id") REFERENCES "appointments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_actor_user_id_fkey" FOREIGN KEY ("actor_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
