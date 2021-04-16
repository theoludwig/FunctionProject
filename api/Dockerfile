FROM node:14.16.1

WORKDIR /app

COPY ./package*.json ./
RUN npm install
COPY ./ ./

# docker-compose-wait
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait
RUN chmod +x /wait

CMD /wait && npm run dev
