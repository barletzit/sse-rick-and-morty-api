## Server-Sent Events (SSE) Implementation With Paginated API

This project demonstrates real-time data synchronization using Server-Sent Events (SSE) to fetch and display character data from the Rick and Morty API.

### What is SSE?

Server-Sent Events (SSE) is a server push technology enabling a client to receive automatic updates from a server via HTTP connection. Unlike WebSockets, SSE is a unidirectional communication channel - server to client only.

### Project Implementation

#### Server Side
The server implements SSE through three main components:

1. **Express Endpoint**
```typescript
app.get("/api/characters/fetch", SseCharactersHandler);
```

2. **SSE Handler**
- Sets up SSE connection with appropriate headers
- Manages event streaming and connection lifecycle
- Processes data and sends events for progress, completion, or errors

3. **Data Processing**
- Fetches paginated data from Rick and Morty API
- Sends real-time progress updates
- Includes artificial delay (1s) to demonstrate streaming
- Handles three types of events:
  - `progress`: Updates about current sync status
  - `complete`: Final success message
  - `error`: Error information if something fails

#### Client Side
To consume these events, connect to the SSE endpoint using:

```typescript
const eventSource = new EventSource('http://localhost:3000/api/characters/fetch');

eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);
};
```

### Running the Project

1. Start the server: `npm run dev` in `/server`
2. Start the client: `npm run dev` in `/client`
3. The SSE connection will establish when clicking on the "Start Fetching Characters" button

Note: CORS is configured to allow connections from the default Vite development server (http://localhost:5173).
