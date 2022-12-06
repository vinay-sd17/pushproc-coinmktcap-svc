import PushProcCoinMktCapClient from "pushproc-coinmktcap-client";

const client: PushProcCoinMktCapClient = new PushProcCoinMktCapClient({
  apiKey: "PUSH-API-123",
});

client.getCryptoListings({
  sort: "market_cap",
  cryptocurrency_type: "all",
  start: 1,
  limit: 10
}).then((p) => {
  console.log(p)
});
