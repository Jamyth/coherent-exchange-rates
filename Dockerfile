FROM nginx:alpine

COPY ./build /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf