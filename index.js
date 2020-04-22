const express = require('express');

// load webroot
const webroot = require('./webroot');

// initialize service
webroot.init();


/**
 * Updates
 * ⊗ 1) Single persistent obj for each controller
 * √  2) Service Layers
 * ⊘ 3) Error Logs [Event Emitter]
 *     √  3.1) Mongo Log
 *     ⊗ 3.2) Log files
 * √  4) Bind each module controller, model, service to available for this
 * √  5) Auto Routes - Based on What exported will be available as route if config enabled in Parameters.js
 * ⊝ 6) Auth Middleware
 * ⊗ 7) Data Scripts
 * ⊗ 8) Route Validator - e.g. Route should be /controller/<router name>
 */