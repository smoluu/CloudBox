#! /usr/bin/bash
# depencies: gnome-terminal,docker
echo "Starting development..."
cd "$(dirname "$0")" #set directory to project root

gnome-terminal --tab -t "docker-mysql-container" -- bash -c \
  "docker run -p 3306:3306 -v mysql:/var/lib/mysql --rm --name dev-db --health-cmd='mysqladmin ping --silent' --env-file db.env dev-db;"

echo "Waiting for mysql container to launch on 3306..."
sleep 1

# check mysql health status until status is healthy
status=""
while [ "$status" != "healthy" ]; do
  sleep 1;
  status=$(docker inspect -f {{.State.Health.Status}} dev-db)
  echo -n "."
done
echo ""
echo "Mysql started"


echo "Waiting for react-app to start."
gnome-terminal --tab -t "react-app" -- bash -c \
 "cd react-app/; \
  npm start; \
  exec bash"
echo "React-app started."

echo "Waiting for Flask-api to start."
gnome-terminal --tab -t "flask-api" -- bash -c \
  "cd api/; \
  source env/bin/activate; \
  flask --app api.py --debug run; \
  exec bash"
echo "Flask-api started."
