//ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'adal-finance',
      cwd: '/var/www/adal-finance',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3000',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
}
