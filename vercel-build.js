const { spawnSync } = require('child_process');

const result = spawnSync('prisma', ['generate'], { stdio: 'inherit' });

if (result.error) {
  console.error('Error generating Prisma Client:', result.error);
  process.exit(1);
}
