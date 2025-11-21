sudo docker stack rm meydoon
sleep 5

git pull
sleep 1

cd server
sudo docker build -t meydoon_server .

cd ..
sleep 10
sudo docker stack deploy -c docker-compose.yml meydoon