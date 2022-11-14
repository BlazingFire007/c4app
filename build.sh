#!/bin/bash
go build .
cd client
pnpm install
pnpm build
cd ..
