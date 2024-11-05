FROM node:22 AS base
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

FROM base AS dev
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]


FROM base AS staging
RUN npm run build


FROM base AS prod
CMD ["npm", "run", "build"]


