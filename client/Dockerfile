FROM node:alpine
WORKDIR /app/dist
COPY . .
RUN npm i -g pnpm
RUN pnpm install
CMD ["pnpm", "build"]
