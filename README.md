# *Sammy* search interface

*Sammy* is a web application that allows users to search for AI-generated summaries and reviews of books, movies, and articles. The app provides a simple, intuitive interface and leverages the OpenAI API to generate content based on user queries.

## Features

- Search for summaries and reviews of:
  - Books
  - Movies
  - Articles
- Real-time AI-generated results
- Responsive, modern web interface

## Search Options & Example Queries

You can enter queries in the search bar for the following options:

| Option   | Description                         | Example Search Query                  |
|----------|-------------------------------------|---------------------------------------|
| Book     | Get a summary/review of a book      | `The Great Gatsby book review`        |
| Movie    | Get a summary/review of a movie     | `Inception movie summary`             |
| Article  | Get a summary/review of an article  | `Quantum computing article summary`   |

# Installation
## Requirements

- **Node.js** (v16 or higher recommended)
- **Docker** (optional, for containerized deployment) and **Docker Compose** (for multi-container orchestration)

All further dependencies will be installed by **npm** during setup

## Local Setup for development

### 1. Clone the Repository

```shell
git clone https://github.com/p0wertiger/Sammy_bar.git
cd Sammy_bar
```

### 2. Install Node.js

- Download and install Node.js from [nodejs.org](https://nodejs.org/en).
- For Linux, you can use your system's package manager.

### 3. Install Dependencies

```shell
npm install
```
This will install all required dependencies as defined in `package.json`.

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory with the following content:

```
OPENAI_API_KEY=your_openai_api_key_here
```

#### How to Obtain an OpenAI API Key

1. Register or log in at [OpenAI](https://platform.openai.com/).
2. Go to your API dashboard and generate a new API key.
3. Copy the key and paste it into your `.env.local` file.

### 5. Run the development environment

```
npm run dev
```
The application will be available at [http://localhost:3000](http://localhost:3000).

## Running with Docker

Project includes a `Dockerfile` to build an universal image, suitable for both development and production use. Building process uses named intermediate images, by specifying the target image you can switch your desired outcome.

In order to use it locally, you need to install Docker Desktop or Rancher Desktop or similar environment which provides Docker-compatible tooling.

### Using Docker Compose

The repository includes a `docker-compose.yml` file for easy orchestration. It is the easiest way to run the application.

#### Development Mode - default

```
docker compose up
```
This command will build and start the application in development mode, mapping local code live changes into the container.

#### Production Mode

For production, you must set the build `target` parameter in `docker-compose.yml` to `"production"`. This causes generation of static release files which are embedded inside the container.

**Example (in `docker-compose.yml`):**
```
services:
  sammybar:
    build:
      context: .
      target: production
    # ... other settings ...
```

Then, start the production container:

```
docker compose up --build -d
```
- Ensure your `.env` file contains the correct production OpenAI API key.
- Consider setting `restart: always` in your production compose file for reliability.

#### Stopping and Removing Containers

```
docker compose down
```
To remove all containers and volumes:

```
docker compose down -v
```

# Deploying to Production

You can deploy the project to any web hosting which provides support for **Node.js** apps or Docker containers.

## Basic rules

- **Environment Variables:** Use production API keys and secrets in your `.env` file. Keep this file safe - limit outside access rights and do not commit to any repository.
- **Volumes:** Remove code volume bindings so the code inside the container cannot be changed from outside.
- **Restart Policy:** Use `restart: always` to ensure uptime.
- **Ports:** Bind the application to the correct ports as needed.
- **Reverse Proxy:** For public deployments, use a reverse proxy (e.g., Nginx) to handle SSL and domain routing.
- **Scaling:** For more advanced setups, consider using Docker Swarm or Kubernetes.

## Deploying to Vercel (TODO)
- Create account on Vercel
- Project configuration
- Adding environment variables
- Production deployment

# Future project roadmap
- Search history
- Favourite results
- Result filters
- Sharing the results
- User authentication

---

# Technical reference

## Project Structure

- `srca/app/components/` – React components (SearchBar, LoadingAnimation, SearchResults)
- `src/app/page.js` - home page
- `src/app/api/search/route.js` – API endpoint for OpenAI integration
- `src/app/global.css` - Tailwind CSS global configuration
- `src/app/custom.css` – custom CSS styles

## Styling with Tailwind CSS

Tailwind CSS includes tooling that rebuilds CSS styles on the fly. You can use all the built-in styles but also create your own.

- [Basic styles](https://tailwindcss.com/docs/styling-with-utility-classes)
- [Custom styles](https://tailwindcss.com/docs/adding-custom-styles)
- [Responsiveness](https://tailwindcss.com/docs/responsive-design)
- VS Code [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

## Documentation

- [Node.js](https://nodejs.org/en)
- [Next.js](https://nextjs.org/docs)
- [React](https://reactjs.org/docs/getting-started.html)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [OpenAI API](https://platform.openai.com/docs/api-reference/)
- [Docker](https://docs.docker.com/)
- [Vercel](https://vercel.com/docs)
