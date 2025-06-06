FROM node:20 AS build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:alpine
USER root
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf
EXPOSE 80 443
CMD [ "nginx", "-g", "daemon off;", "-c", "/etc/nginx/nginx.conf" ]