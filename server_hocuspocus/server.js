import { Server } from "@hocuspocus/server";
import { Logger } from '@hocuspocus/extension-logger';

const port = process.env.PORT || 1234;

const server = new Server({
    port: port,
    extensions: [
        // Mantienes la extensión Logger para ver los logs de conexión y desconexión
        new Logger({
            logWhen: [
                'onConnect', 
                'onDisconnect', 
                'onMessage', 
                'onListen', 
                'onLoadDocument', 
                'onStoreDocument'
            ]
        }),
        // ¡No necesitas más extensiones si solo usas Yjs puro!
    ],
    // Puedes usar los hooks de conexión para contar usuarios, si lo deseas
    async onConnect({ documentName }) {
        console.log(`[CONEXIÓN] Cliente conectado a: ${documentName}`);
        // Puedes agregar aquí la lógica de conteo de conexiones global/por documento
    },
    async onClose({ documentName }) {
        console.log(`[DESCONEXIÓN] Cliente desconectado de: ${documentName}`);
    },
    
    // NOTA: Asegúrate de que no hay una coma después del último elemento del array `extensions`
    // y que no hay una coma después del último hook (onClose, en este caso).
});

// Iniciar el servidor
server.listen(); 

console.log(`Hocuspocus server listening on ${port}`);