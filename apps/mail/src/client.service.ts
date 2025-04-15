import {
  ClientProvider,
  ClientsModuleOptionsFactory,
  Transport,
} from '@nestjs/microservices';

export class ClientService implements ClientsModuleOptionsFactory {
  createClientOptions(): Promise<ClientProvider> | ClientProvider {
    return {
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3005,
        tlsOptions: {
          rejectUnauthorized: false,
        },
      },
    };
  }
}
