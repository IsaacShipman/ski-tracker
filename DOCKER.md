# 🐳 Docker Setup for Ski Weather Tracker

This guide explains how to run the Ski Weather Tracker dashboard using Docker.

## Prerequisites

- Docker Desktop installed
- Docker Compose installed (included with Docker Desktop)

## Quick Start

### Development Mode (Hot Reload)

Run the development server with hot module replacement:

```bash
docker compose up
```

The app will be available at: **http://localhost:5173**

- Hot reload is enabled - changes to your code will automatically refresh
- The `node_modules` directory is persisted in a Docker volume for faster rebuilds

### Production Mode (Optimized Build)

Build and run the production-optimized version with Nginx:

```bash
docker compose --profile production up ski-tracker-prod
```

The app will be available at: **http://localhost:8080**

- Optimized build with minification
- Served by Nginx for better performance
- Gzip compression enabled
- Static asset caching

## Common Commands

### Build the Docker image
```bash
docker compose build
```

### Run in detached mode (background)
```bash
docker compose up -d
```

### Stop the containers
```bash
docker compose down
```

### View logs
```bash
docker compose logs -f
```

### Rebuild and restart
```bash
docker compose up --build
```

### Clean up everything (containers, volumes, images)
```bash
docker compose down -v
docker rmi ski-tracker-dashboard-dev ski-tracker-dashboard-prod
```

## Project Structure

- `Dockerfile` - Multi-stage Docker build configuration
  - **development** stage: Node.js with Vite dev server
  - **build** stage: Builds the production assets
  - **production** stage: Nginx serving static files

- `docker-compose.yml` - Docker Compose configuration
  - `ski-tracker-dev` - Development service (default)
  - `ski-tracker-prod` - Production service (requires `--profile production`)

- `nginx.conf` - Nginx configuration for production
  - Client-side routing support
  - Static asset caching
  - Gzip compression
  - Security headers

## Troubleshooting

### Port already in use
If port 5173 or 8080 is already in use, edit `docker-compose.yml`:
```yaml
ports:
  - "3000:5173"  # Change 5173 to your preferred port
```

### Changes not reflecting (Mac/Windows)
If hot reload isn't working, the `usePolling: true` setting in `vite.config.ts` should help. If issues persist, try:
```bash
docker compose down
docker compose up --build
```

### Permission issues
On Linux, you might need to adjust file permissions:
```bash
sudo chown -R $USER:$USER .
```

## Notes

- Development mode mounts your local files as volumes, so changes are reflected immediately
- `node_modules` is excluded from the volume mount for better performance
- Production build creates an optimized, minified bundle served by Nginx
