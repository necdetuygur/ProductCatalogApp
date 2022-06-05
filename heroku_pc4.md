heroku login
rm -rf build
npm run build
cp build_after/* build
cd build
git init . && git add . && git commit -m u
heroku git:remote -a productcatalog4app
git push --force heroku master
cd ..

api: productcatalog4api.herokuapp.com
app: productcatalog4app.herokuapp.com