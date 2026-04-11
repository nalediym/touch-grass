#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import {
  checkConditions,
  readState,
  logTouchGrass,
} from "../lib/grass.mjs";
import { pickActivity } from "../lib/nudge.mjs";

const server = new Server(
  { name: "touch-grass", version: "0.1.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "check_grass_conditions",
      description:
        "Check current outdoor conditions (weather, temperature, time until sunset) and the user's grass-touching streak. Use this to decide whether and how urgently to remind the user to go outside. Returns location, weather, sunset timing, and streak state.",
      inputSchema: { type: "object", properties: {} },
    },
    {
      name: "suggest_activity",
      description:
        "Get a random outdoor activity suggestion appropriate for current conditions. Use this when nudging the user — gives you a specific thing to suggest rather than a vague 'go outside'.",
      inputSchema: { type: "object", properties: {} },
    },
    {
      name: "log_touch_grass",
      description:
        "Record that the user went outside and touched grass. Call this ONLY when the user confirms they went outside. Updates their streak.",
      inputSchema: {
        type: "object",
        properties: {
          activity: {
            type: "string",
            description:
              "What the user did outside (e.g., 'walk', 'coffee on porch', 'stretched'). Optional.",
          },
        },
      },
    },
    {
      name: "get_stats",
      description:
        "Get the user's current grass-touching stats: streak, longest streak, total touches, last touched date, session counts.",
      inputSchema: { type: "object", properties: {} },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args = {} } = request.params;

  try {
    if (name === "check_grass_conditions") {
      const conditions = await checkConditions();
      return {
        content: [
          { type: "text", text: JSON.stringify(conditions, null, 2) },
        ],
      };
    }

    if (name === "suggest_activity") {
      const conditions = await checkConditions();
      const activity = pickActivity(conditions);
      return {
        content: [
          {
            type: "text",
            text: `${activity.emoji} ${activity.label}`,
          },
        ],
      };
    }

    if (name === "log_touch_grass") {
      const result = await logTouchGrass(args.activity || "outside time");
      return {
        content: [
          {
            type: "text",
            text:
              `🌿 Logged: ${result.activity}. ` +
              `Current streak: ${result.streak} days (best: ${result.longestStreak}). ` +
              `Total touches: ${result.totalTouches}.`,
          },
        ],
      };
    }

    if (name === "get_stats") {
      const state = await readState();
      return {
        content: [{ type: "text", text: JSON.stringify(state, null, 2) }],
      };
    }

    throw new Error(`Unknown tool: ${name}`);
  } catch (err) {
    return {
      content: [{ type: "text", text: `Error: ${err.message}` }],
      isError: true,
    };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
