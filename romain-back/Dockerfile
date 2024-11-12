FROM node:22-alpine
RUN npm install -g pnpm
WORKDIR /app
COPY package*.json ./
RUN pnpm install --no-frozen-lockfile
COPY . .
RUN pnpm run build
COPY ./.env ./build
RUN apk update && apk add --no-cache postgresql-client
EXPOSE 3333
CMD ["node", "start"]