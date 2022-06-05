heroku login
rm -rf build
npm run build
cp build_after/* build
cd build
git init . && git add . && git commit -m u
heroku git:remote -a productcatalog5app
git push --force heroku master
cd ..

api: productcatalog5api.herokuapp.com
app: productcatalog5app.herokuapp.com