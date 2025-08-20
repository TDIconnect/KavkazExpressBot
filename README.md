# Kavkaz Express Mini App

This repository contains a starter implementation for a Telegram Mini App used for internal communication at Kavkaz Express trucking company.

## Features

- Minimal Express server with in-memory user management (admin signup, login, role-based user creation).
- Placeholder messaging API mimicking a simple chat.
- Designed to be extended with dispatcher, driver, safety, accounting and other department features.

## Development

```bash
npm install   # install dependencies (express, telegraf)
npm start     # start the HTTP API on port 3000
```

The current implementation keeps data in memory for demonstration purposes. It should be replaced with a persistent database and production-ready authentication for real usage.
