FROM node:latest

WORKDIR /app

# COPY things
COPY package*.json ./
COPY tsconfig.json ./tsconfig.json
COPY jest.config.js ./jest.config.js
COPY .babelrc.js ./.babelrc.js
COPY lint ./lint
COPY scripts ./scripts
COPY src ./src
COPY .env ./.env
COPY config ./config
COPY docs ./docs
COPY prisma ./prisma

# install dependencies
RUN npm i --include=dev


# Build
RUN npm run build

# DB migration
RUN npx prisma db push

# Expose port 3000
EXPOSE 8080
CMD ["npm", "start"]
