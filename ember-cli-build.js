'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    'ember-bootstrap': {
      importBootstrapCSS: false,
      blacklist: ['bs-popover', 'bs-accordion']
    }
  });

  return app.toTree();
};
