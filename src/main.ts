import { Server } from './server'
import { Enviroments } from './enviroments'


async function main() {
  const envs = new Enviroments()
  const server = new Server(envs)

  await server.bootstrap()
}

void main()
