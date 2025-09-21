const app = require('./app');
const config = require('./utils/config');

app.listen(config.PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${config.PORT}`);
});
