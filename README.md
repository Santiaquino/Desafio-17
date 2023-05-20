## Desafio 17 - Modulos de Testing

- Se agregaron los paquetes con npm de "mocha", "chai" y "supertest" para crear pruebas sobre las APIS de carts, products y sessions
- Se agrego una carpeta llamada test donde se crearon 3 pruebas de cada API para corroborar que esos endpoints funcionan de manera correcta

### Pasos a seguir:

- Primero en una consola se debe ejecutar "npm run start" como lo dice abajo para el inicio de la aplicacion
- Luego en otra consola se debe ejecutar "npx mocha test/archivo.test" (se puede ejecutar cualquiera de los 3 archivos)
- Tambien en la segunda consola se puede ejecutar "npx mocha test" para que se ejecuten todos los tests directamente

### cosas a tener en cuenta:

- inicie la ejecucion de la aplicacion con "npm run start"
- en el config.js de la carpeta config (en src) la aplicacion se esta ejecutando en el entorno productivo, para cambiarlo solo tenes que cambiar en la linea 5 "PRODUCTION" por "DEVELOPMENT"
- al estar en el entorno productivo cuando hagamos un GET al endpoint "/loggerTest" se mostraran por consola los loggers a partir del nivel info, si queremos ver todos los loggers hay que cambiar al entorno desarrollo como esta explicado en el item anterior
