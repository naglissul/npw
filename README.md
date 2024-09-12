# Blog/portfolio

Deployed here: [https://www.npw.lt](https://www.npw.lt)

Now using docusaurius. v3

---

## setup

Clone repo, create `.env` file from `.env.template` and set the `NODE_ENV=production`.

To setup deployment for your own - go to firebase console with your google account, create new project, copy that projectId, also generate firebase SDK file. Then modify `.github/workflows/firebase-merge.yml` file, change projectId to your project id. Then go to your gh repo settings and set up the secret named `FIREBASE_SERVICE_ACCOUNT_NPW_LT` and then just paste the whole content of the firebase SDK json file. You can also add your custom domain if you want, but for that just follow the firebase tutorials, they are really good.

## dev

```bash
npm install
npm start
```

It generates static html content from src/content/ markdown files and puts into dist/ folder (ofc, the `npm start` command only simulates it, `npm run build` actually does it).

No fancy frameworks, just webpack.

Everything mainly described in webpack.config.js file

## prod

```bash
git push
```

Merging to main branch triggers gh actions deployment which runs `npm run build` and deploys on firebase.

## changelog

Old version v1 is in this repo: [github.com/naglissul/npw-old](https://github.com/naglissul/npw-old)

Commit messages are very basic, everything is pushed straight to the main branch. Since this is a static portfolio/blog website, don't expect everything be in fancy versions with multiple complex functionalities. Maybe later gonna add functionality to subsribe to the blog via email.
