FROM node:alpine

ENV APP_PORT 3000
ENV SWAGGER_ROUTE /swagger
ENV SWAGGER_FILE api/swagger.json
ENV SWAGGER_STATS_ROUTE /swagger-stats/ui
ENV SWAGGER_ENABLED true
ENV TYPEORM_MIGRATIONS src/database/migrations/**/*.ts
ENV TYPEORM_MIGRATIONS_DIR src/database/migrations
ENV TYPEORM_ENTITIES src/api/models/**/*.ts
ENV TYPEORM_ENTITIES_DIR src/api/models
ENV TYPEORM_SYNCHRONIZE false
ENV TYPEORM_LOGGING error
ENV TYPEORM_LOGGER advanced-console

#OVERRIDE THESE AT RUNTIME
ENV APP_SCHEMA http
#ENV APP_HOST localhost
#ENV APP_EXPOSED_PORT 3000

ENV TYPEORM_DISABLED true
ENV TYPEORM_CONNECTION sqlite
ENV TYPEORM_HOST localhost
ENV TYPEORM_PORT 3306
ENV TYPEORM_USERNAME root
ENV TYPEORM_PASSWORD password
ENV TYPEORM_DATABASE mysql-ms

# Create work directory
WORKDIR /usr/src/app

COPY . /usr/src/app
RUN rm -r ./test

RUN apk --no-cache --virtual build-dependencies add \
  python \
  make \
  g++ \
  && npm install --force yarn -g \
  && yarn \
  && npm i -g cross-env \
  && npm i -g nps \
  && apk del build-dependencies


# Build and run the app
CMD ./start-service.sh