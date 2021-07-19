const app = require("./app");

const port = process.env.PORT || 3000;
const address = process.env.IP || "0.0.0.0";

app.listen(port, address, () =>
  console.log(`Server is up at ${address} on ${port}`)
);
