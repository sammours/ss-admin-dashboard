import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'nx run ss-admin-dashboard:serve:development',
        production: 'nx run ss-admin-dashboard:serve:production',
      },
      ciWebServerCommand: 'nx run ss-admin-dashboard:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
