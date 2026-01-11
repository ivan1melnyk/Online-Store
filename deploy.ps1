Write-Host "Building React..."
# Terminal Command pwd doesnt work from a file directory
# Conflict (file dir is /root but npm run deploy we set up from /roo/client)
# That's why we need to set pwd for file directory syncronize terminal directory
cd ..

cd client
npm run build

Write-Host "Deploying to GitHub Pages..."
cd ..
if (Test-Path docs) {
  Remove-Item -Recurse -Force docs
}

Move-Item client\build docs

git add docs
git commit -m "Deploy React to GitHub Pages"
git push