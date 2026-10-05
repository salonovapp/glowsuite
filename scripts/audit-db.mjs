import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const version = await prisma.$queryRawUnsafe('SELECT version();');
  console.log('PostgreSQL Version:', version);

  const tables = await prisma.$queryRawUnsafe(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    ORDER BY table_name;
  `);
  console.log('Tables:', tables);

  const migrations = await prisma.$queryRawUnsafe(`
    SELECT id, migration_name, finished_at, applied_steps_count 
    FROM _prisma_migrations 
    ORDER BY finished_at ASC;
  `);
  console.log('Applied Migrations:', migrations);
}

main()
  .catch((e) => {
    console.error('Error:', e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
