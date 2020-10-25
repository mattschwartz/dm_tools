cd /Users/mattschwartz/GitHub/foundry-bak

echo Committing with message $1

git add .
git commit -m "$1"
git push
