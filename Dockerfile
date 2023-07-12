FROM node:lts-buster

RUN git clone https://github.com/rogerpq/raganork-md /rogerpq
WORKDIR 8000
ENV TZ=Asia/Baghdad
RUN yarn install --network-concurrency 1
CMD ["node", "index.js"]
