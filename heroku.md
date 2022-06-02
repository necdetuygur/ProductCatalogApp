heroku login
rm -rf build
npm run build
cp build_after/* build
cd build
git init . && git add . && git commit -m u
heroku git:remote -a ondm
git push --force heroku master
cd ..