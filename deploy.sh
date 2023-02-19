echo "Swithching to branch master"

git checkout master

echo "Building..."

yarn build

echo "Building..."

scp -r -i ~/.ssh/clown ./build/* huangyanming@34.81.220.222:/var/www/clown.huangyanming.com

echo "done"