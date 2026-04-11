# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-04-11

First public release. 🌿

### Added

- **Claude Code plugin** (`plugin/.claude-plugin/plugin.json`) bundling a SessionStart hook, MCP server, and agent skill.
- **SessionStart hook** (`plugin/hooks/session-start.mjs`) that fetches live weather, sunset timing, and streak state, then injects a decision-ready context block into every Claude Code session.
- **MCP server** (`plugin/mcp-server/index.mjs`) exposing four tools:
  - `check_grass_conditions` — weather, temperature, minutes until sunset, streak state
  - `suggest_activity` — random activity recommendation (golden-hour-aware)
  - `log_touch_grass` — records that the user went outside, updates streak
  - `get_stats` — raw session telemetry and streak history
- **Agent skill** (`plugin/skills/touch-grass/SKILL.md`) teaching the agent when to nudge, when to stay quiet, and what tone to use.
- **Local state management** at `~/.touch-grass/state.json` for streak and session tracking.
- **IP-based location detection** via `ip-api.com` (cached 24h).
- **Weather + sunset** via `open-meteo.com` (no API key, no account).
- **Next.js marketing site** at [touch-grass-xi.vercel.app](https://touch-grass-xi.vercel.app) with copyable install command, nudge demo, MCP tools reference, and a PWA manifest.
- **GitHub Actions CI** — syntax checks, hook smoke test, MCP `tools/list` smoke test, Next.js typecheck/lint/build.
- **VHS demo tape** at `plugin/docs/demo.tape` for reproducible README recordings.

### Privacy

- All state stored locally in `~/.touch-grass/`.
- Only two external calls: `ip-api.com` for city coordinates (cached 24h) and `api.open-meteo.com` for weather and sunset.
- No accounts, no API keys, no telemetry.

[0.1.0]: https://github.com/nalediym/touch-grass/releases/tag/v0.1.0
