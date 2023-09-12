import { runServer } from "./presentation/server/index.js";
import cluster from 'cluster';
import os from 'os';
import { config } from 'dotenv';

config();

const port = parseInt(process.env.PORT || "3000");

console.log("MODEL : ", process.env.MODEL_PATH);

if (cluster.isPrimary) {
  // Fork workers for each CPU core
  const numWorkers = os.cpus().length;
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numWorkers; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  runServer(port);
}
