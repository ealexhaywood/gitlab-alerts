#
# ---- Base Node ----
FROM alpine:3.9 AS base
# install node
RUN apk add --no-cache nodejs tini
# install git bash, openssh
RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh
# set working directory
WORKDIR /root/chat
# Set tini as entrypoint
ENTRYPOINT ["/sbin/tini", "--"]
# copy project file
COPY package.json .
 
#
# ---- Dependencies ----
FROM base AS dependencies
# install node packages
RUN npm set progress=false && npm config set depth 0
RUN npm install --only=production 
# copy production node_modules aside
RUN cp -R node_modules prod_node_modules
# install ALL node_modules, including 'devDependencies'
RUN npm install
 
# #
# # ---- Test ----
# # run linters, setup and tests
# FROM dependencies AS test
# COPY . .
# RUN  npm run lint && npm run setup && npm run test
 
#
# ---- Release ----
FROM base AS release
# copy production node_modules
COPY --from=dependencies /root/chat/prod_node_modules ./node_modules
# copy app sources
COPY . .
# expose port and define CMD
EXPOSE 80
EXPOSE 443
CMD npm run start