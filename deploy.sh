#!/usr/bin/env sh

# build
npm run build

# Add and push to git
git add dist && git commit -m "Some changes"
git subtree push --prefix dist origin gh-pages

# https://medium.com/@Roli_Dori/deploy-vue-cli-3-project-to-github-pages-ebeda0705fbd
# https://cli.vuejs.org/ru/guide/deployment.html#github-pages