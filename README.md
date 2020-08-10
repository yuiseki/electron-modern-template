# electron-modern-template

- electron
- typescript
- react

## Getting Started
```bash
# clone this repository
git clone git@github.com:yuiseki/electron-modern-template.git my-electron-project
cd my-electron-project

# remove git and init as new repository
rm -rf .git
git init

# install dependencies
yarn
```

### Development Scripts

```bash
# run application in development mode
yarn dev

# compile source code and create webpack output
yarn compile

# `yarn compile` & create build with electron-builder
yarn dist

# `yarn compile` & create unpacked build with electron-builder
yarn dist:dir
```
