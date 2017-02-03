docker network rm blindating
docker network create blindating
docker run -d -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=f00tBall' --rm --net blindating --name blindating-sql orangeeez/blindating-sql
docker run -it -d --rm --net blindating --name blindating -p 8000:5000 -p 8002:5002 orangeeez/blindating