heroku login
rm -rf build
npm run build
cp build_after/* build
cd build
git init . && git add . && git commit -m u
heroku git:remote -a ludd
git push --force heroku master
cd ..

git push origin --all && git push gitlab --all && exit

productcatalog@proton.me:Product.741852

api: nkhu.herokuapp.com
app: ludd.herokuapp.com