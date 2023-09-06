-- CreateTable
CREATE TABLE "banking_service" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "service_name" VARCHAR(255) NOT NULL,
    "service_details" VARCHAR(255),
    "user_id" UUID NOT NULL,
    "financial_service_id" UUID NOT NULL,
    "service_status" VARCHAR(50) NOT NULL,
    "service_start_date" TIMESTAMP(6),
    "service_end_date" TIMESTAMP(6),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "banking_service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "financial_service_id" UUID NOT NULL,
    "insurance_policy_id" UUID NOT NULL,
    "banking_service_id" UUID NOT NULL,
    "customer_status" VARCHAR(50) NOT NULL,
    "customer_start_date" TIMESTAMP(6),
    "customer_end_date" TIMESTAMP(6),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "financial_service" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "description" VARCHAR(255),
    "service_type" VARCHAR(255),
    "service_status" VARCHAR(50),
    "creation_date" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "last_updated" TIMESTAMP(6),
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" UUID NOT NULL,
    "tenant_id" VARCHAR(255) NOT NULL,

    CONSTRAINT "financial_service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "insurance_policy" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "policy_name" VARCHAR(255) NOT NULL,
    "policy_details" VARCHAR(255),
    "user_id" UUID NOT NULL,
    "financial_service_id" UUID NOT NULL,
    "policy_status" VARCHAR(50) NOT NULL,
    "policy_start_date" TIMESTAMP(6),
    "policy_end_date" TIMESTAMP(6),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "insurance_policy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nps" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "score" INTEGER NOT NULL,
    "user_id" UUID NOT NULL,
    "financial_service_id" UUID NOT NULL,
    "nps_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nps_status" VARCHAR(50) NOT NULL,
    "nps_comment" VARCHAR(255),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" VARCHAR(255) NOT NULL,
    "firstName" VARCHAR(255),
    "lastName" VARCHAR(255),
    "roq_user_id" VARCHAR(255) NOT NULL,
    "tenant_id" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "banking_service" ADD CONSTRAINT "banking_service_financial_service_id_fkey" FOREIGN KEY ("financial_service_id") REFERENCES "financial_service"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "banking_service" ADD CONSTRAINT "banking_service_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "customer" ADD CONSTRAINT "customer_banking_service_id_fkey" FOREIGN KEY ("banking_service_id") REFERENCES "banking_service"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "customer" ADD CONSTRAINT "customer_financial_service_id_fkey" FOREIGN KEY ("financial_service_id") REFERENCES "financial_service"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "customer" ADD CONSTRAINT "customer_insurance_policy_id_fkey" FOREIGN KEY ("insurance_policy_id") REFERENCES "insurance_policy"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "customer" ADD CONSTRAINT "customer_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "financial_service" ADD CONSTRAINT "financial_service_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "insurance_policy" ADD CONSTRAINT "insurance_policy_financial_service_id_fkey" FOREIGN KEY ("financial_service_id") REFERENCES "financial_service"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "insurance_policy" ADD CONSTRAINT "insurance_policy_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nps" ADD CONSTRAINT "nps_financial_service_id_fkey" FOREIGN KEY ("financial_service_id") REFERENCES "financial_service"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nps" ADD CONSTRAINT "nps_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

