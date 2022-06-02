# React Project Deploy Heroku
- [https://betterprogramming.pub/how-to-deploy-your-react-app-to-heroku-aedc28b218ae](https://betterprogramming.pub/how-to-deploy-your-react-app-to-heroku-aedc28b218ae)
- [https://ondm.herokuapp.com/](https://ondm.herokuapp.com/)
```nec
heroku login
rm -rf build
npm run build
cp build_after/* build
cd build
git init . && git add . && git commit -m u
heroku git:remote -a ondm
git push --force heroku master
cd ..

git push origin --all && git push gitlab --all && exit
```