#!/bin/sh
cp /app/env_example .env
exec "$@"
