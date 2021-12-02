import { Server, Model, Factory } from "miragejs";

export function makeServer({ environment = "development" } = {}) {
  let server = new Server({
    environment,
    models: {
      user: Model,
    },

    routes() {
      this.get("/api/users", (schema) => {
        return schema.users.all();
      });
    },
  });

  return server;
}
