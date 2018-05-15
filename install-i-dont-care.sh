#!/bin/bash
export path=`pwd`
export hostname='watchie.me'
export project='watchie'
echo ${path}
mkdir mysql

docker rm -f nginx-proxy
docker rm -f nginx-proxy-companion
docker rm -f ${project}-backend
docker rm -f ${project}-rabbit
docker rm -f ${project}-mysql
docker network create ${project}

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
	--name ${project}-mysql \
	--network ${project} \
	-e MYSQL_ROOT_PASSWORD=${project} \
	-e MYSQL_DATABASE=${project} \
	-e MYSQL_USER=${project} \
	-e MYSQL_PASSWORD=${project} \
	-v ${path}/mysql:/var/lib/mysql \
	mysql:5.7

sleep 1
docker run -d \
	-p 15672:15672 \
	--network ${project} \
	--hostname ${project}-rabbit \
	--name ${project}-rabbit \
	rabbitmq:3

sleep 2
docker exec -it ${project}-rabbit rabbitmq-plugins enable rabbitmq_management &&
sleep 1
docker exec -it ${project}-rabbit rabbitmqctl add_user admin admin &&
docker exec -it ${project}-rabbit rabbitmqctl set_user_tags admin administrator &&
docker exec -it ${project}-rabbit rabbitmqctl set_permissions -p / admin ".*" ".*" ".*"

cd backend &&
sleep 5
docker build -t ${project}-backend . &&
docker run -td --name ${project}-backend \
	-p 8080:8080 \
	--network ${project} \
    -e RABBITMQ=${project}-rabbit \
    -e MYSQL=${project}-mysql \
    -e VIRTUAL_HOST=${hostname} \
	-e LETSENCRYPT_HOST=${hostname} \
	-v ${path}/backend:/backend \
	${project}-backend

cd ${path}
