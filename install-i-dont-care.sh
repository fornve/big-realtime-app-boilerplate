#!/bin/bash
export path=`pwd`
export hostname='framework.me'
echo ${path}

docker rm -f nginx-proxy
docker rm -f nginx-proxy-companion
docker rm -f framework-backend

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

cd backend &&
docker build -t framework-backend . &&
docker run -td --name framework-backend \
    -e VIRTUAL_HOST=${hostname} \
	-e LETSENCRYPT_HOST=${hostname} \
	-v ${path}/backend:/backend \
	framework-backend

cd ${path}
