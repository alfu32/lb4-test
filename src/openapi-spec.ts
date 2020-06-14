import {ApplicationConfig} from '@loopback/core';
import {readFileSync} from 'fs';
import {Lb4TestApplication} from './application';

/**
 * Export the OpenAPI spec from the application
 */
async function exportOpenApiSpec(): Promise<void> {
  const config: ApplicationConfig = {
    rest: {
      port: +(process.env.PORT ?? 3000),
      host: process.env.HOST
        ?? readFileSync('/proc/sys/kernel/hostname').toString()
        ?? 'localhost',
    },
  };
  const outFile = process.argv[2] ?? '';
  const app = new Lb4TestApplication(config);
  await app.boot();
  await app.exportOpenApiSpec(outFile);
}

exportOpenApiSpec().catch(err => {
  console.error('Fail to export OpenAPI spec from the application.', err);
  process.exit(1);
});
