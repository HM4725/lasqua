# la squa

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### How to run docker container
```
npm run build
docker build -t lasqua .
docker run --name lasqua -p 80:8080 lasqua
```