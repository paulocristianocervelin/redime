-- Primeiro, criar a nova tabela member_departments
CREATE TABLE IF NOT EXISTS "redime"."member_departments" (
  "id" BIGSERIAL PRIMARY KEY,
  "memberProfileId" BIGINT NOT NULL,
  "departmentId" BIGINT NOT NULL,
  "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "member_departments_memberProfileId_departmentId_key" UNIQUE ("memberProfileId", "departmentId")
);

-- Migrar dados existentes de member_profiles.departmentId para member_departments
INSERT INTO "redime"."member_departments" ("memberProfileId", "departmentId", "joinedAt", "createdAt", "updatedAt")
SELECT
  "id" as "memberProfileId",
  "departmentId",
  CURRENT_TIMESTAMP as "joinedAt",
  CURRENT_TIMESTAMP as "createdAt",
  CURRENT_TIMESTAMP as "updatedAt"
FROM "redime"."member_profiles"
WHERE "departmentId" IS NOT NULL
ON CONFLICT ("memberProfileId", "departmentId") DO NOTHING;

-- Adicionar foreign keys
ALTER TABLE "redime"."member_departments"
ADD CONSTRAINT "member_departments_memberProfileId_fkey"
FOREIGN KEY ("memberProfileId") REFERENCES "redime"."member_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "redime"."member_departments"
ADD CONSTRAINT "member_departments_departmentId_fkey"
FOREIGN KEY ("departmentId") REFERENCES "redime"."departments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Agora pode remover a coluna departmentId de member_profiles
ALTER TABLE "redime"."member_profiles" DROP COLUMN IF EXISTS "departmentId";
