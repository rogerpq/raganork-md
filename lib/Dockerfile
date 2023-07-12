FROM node:lts-buster

RUN git clone https://github.com/rogerpq/raganork-md /skl/Repthon
WORKDIR /skl/Repthon
ENV TZ=Asia/Baghdad
RUN yarn install --network-concurrency 1
CMD ["node", "index.js"]
