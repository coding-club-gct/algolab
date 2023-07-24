@echo off

cd backend
docker compose up -d

cd ../judge0
docker compose up -d

cd ../app 
npm run dev