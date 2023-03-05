const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Description',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = '.swagger.json';
const endpointsFiles = ['./routes/index.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

   swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
    console.log('Swagger documentation generated successfully');
  });
  /*
   swaggerAutogen()(outputFile, endpointsFiles, doc).then(async () => {
    await import('./server.js'); // Your project's root file
  });
  */