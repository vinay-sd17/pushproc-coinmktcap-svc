# pushproc-coinmktcap-svc-server
pushproc-coinmktcap-svc server

# Prerequisite
1. MongoDB (installed locally or remote)

Installing MongoDB using Docker
1. run "docker-compose up -d" on terminal at the root folder, this will boot MongoDB locally
2. check MongoDB is running in your machine by firing "docker ps" on terminal

# Steps to bootstrap API application
1.  npm install
2.  npm run dev

# Access api by
http://localhost:8080/swagger

# Monitor Api server status:
http://localhost:8080/metrics/ux#/

![Alt text](../server/docs/metrics-1.png?raw=true "Metrics 1")

![Alt text](../server/docs/metrics-2.png?raw=true "Metrics 2")
