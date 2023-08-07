import fastify from "fastify";
import { pokemonRoutes } from './routes/pokemon'

const app = fastify({
  logger:true
});

app.register(pokemonRoutes)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("Server running: http://localhost:3333");
  });
