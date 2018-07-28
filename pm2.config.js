module.exports = {
    apps : [
        {
          name: "shopkeeper",
          script: "./run.js",
          watch: false,
          env: {
            "NODE_ENV": "production",
          }
        }
    ]
  }