#!/bin/bash
export path=`pwd`
export hostname='framework.me'
echo ${path}
mkdir mysql

docker rm -f nginx-proxy
docker rm -f nginx-proxy-companion
docker rm -f framework-backend
docker rm -f framework-rabbit
docker rm -f framework-mysql
docker network create framework

docker run -d -p 80:80 -p 443:443 \
	--name nginx-proxy \
	-v ${path}/nginx-proxy/certs:/etc/nginx/certs:ro \
	-v ${path}/nginx-proxy/vhost.d:/etc/nginx/vhost.d \
	-v ${path}/nginx-proxy/html:/usr/share/nginx/html \
	-v /var/run/docker.sock:/tmp/docker.sock:ro \
	--label com.github.jrcs.letsencrypt_nginx_proxy_companion.nginx_proxy \
	jwilder/nginx-proxy

docker run -d \
	--name nginx-proxy-companion \
	-v ${path}/nginx-proxy/certs:/etc/nginx/certs:rw \
	-v /var/run/docker.sock:/var/run/docker.sock:ro \
	--volumes-from nginx-proxy \
	jrcs/letsencrypt-nginx-proxy-companion

docker run -d \
	--name framework-mysql \
	--network framework \
	-e MYSQL_ROOT_PASSWORD=framework \
	-e MYSQL_DATABASE=framework \
	-e MYSQL_USER=framework \
	-e MYSQL_PASSWORD=framework \
	-v ${path}/mysql:/var/lib/mysql \
	mysql:5.7

sleep 1
docker run -d \
	-p 15672:15672 \
	--network framework \
	--hostname framework-rabbit \
	--name framework-rabbit \
	rabbitmq:3

sleep 2
docker exec -it framework-rabbit rabbitmq-plugins enable rabbitmq_management &&
sleep 1
docker exec -it framework-rabbit rabbitmqctl add_user admin admin &&
docker exec -it framework-rabbit rabbitmqctl set_user_tags admin administrator &&
docker exec -it framework-rabbit rabbitmqctl set_permissions -p / admin ".*" ".*" ".*"

cd backend &&
sleep 5
docker build -t framework-backend . &&
docker run -td --name framework-backend \
	-p 8080:8080 \
	--network framework \
    -e RABBITMQ=framework-rabbit \
    -e MYSQL=framework-mysql \
    -e VIRTUAL_HOST=${hostname} \
	-e LETSENCRYPT_HOST=${hostname} \
	-v ${path}/backend:/backend \
	framework-backend

cd ${path}
