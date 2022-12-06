import Typicode from "pushproc-coinmktcap-client";

const client: Typicode = new Typicode({
  apiKey: "PUSH-API-123",
});

client.getCryptoListings().then((p) => {
  console.log(p)
});
