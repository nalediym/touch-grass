FROM node:24-alpine

WORKDIR /app

COPY plugin/mcp-server/package.json plugin/mcp-server/package-lock.json ./plugin/mcp-server/
RUN cd plugin/mcp-server && npm ci --omit=dev

COPY plugin/lib ./plugin/lib
COPY plugin/mcp-server/index.mjs ./plugin/mcp-server/

ENV NODE_ENV=production

ENTRYPOINT ["node", "/app/plugin/mcp-server/index.mjs"]
