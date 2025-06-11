# url-shortener

## Description
A local full stack URL shortener app built with React, Node, and Redis.

## Requirements
If you're using **Docker** (recommended), you only need:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

If you want to run the app **without Docker**, you’ll also need:

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/)
- [Redis](https://redis.io/) (installed locally or running in another container)


## Local Configuration
Eventually (or maybe already, depending on when you're reading this), this app will run alongside an analytics app. To simplify development, this repo is designed to be inside a parent folder with a shared `docker-compose.yml`.

To run the app in Docker:

1. Create a **root folder** and move this repository into it.
2. Inside the root folder, create a `docker-compose.yml` file with the following contents:

```yaml
services:
  redis:
    image: redis:7
    container_name: redis
    ports:
      - "6379:6379"

  url-shortener-api:
    build: ./url-shortener
    ports:
      - "5001:5001"
    command: npm run dev
    volumes:
      - ./url-shortener:/app
      - /app/node_modules
    working_dir: /app
    depends_on:
      - redis
    environment:
      - REDIS_HOST=redis
      - REDIS_PORT=6379
      - NODE_ENV=development

  client:
    build: ./url-shortener/client
    volumes:
      - ./url-shortener/client:/app
      - /app/node_modules
    ports:
      - "5173:5173"
    stdin_open: true
    tty: true
```

Your simple root folder should look like:
```
root-folder/
├── url-shortener/
└── docker-compose.yml
```

3. From the root folder, start the app by running: `docker compose up`.

4. Once you see `Listening on port 5001` in the logs, open your browser and navigate to `localhost:5173`.
