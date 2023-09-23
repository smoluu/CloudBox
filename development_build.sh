#! /usr/bin/bash
echo "Starting build..."
cd "$(dirname "$0")"
cd "react-app"
npm install

docker build -f Dockerfile.devdb -t dev-db .

cd ..
cd api
python3 -m venv env
source env/bin/activate
pip3 install -r requirements.txt

#node version 16.20.2

