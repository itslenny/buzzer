/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {



  //root route //////////////////////////////
  '/': 'PageController.index',

  //API routes //////////////////////////////

  // buzz socket routes
  'get /api/buzz/do/:room/:who/:num?':'BuzzController.do',
  'get /api/buzz/reset/:roomid':'BuzzController.reset',

  // room socket routes
  '/api/room/watch/:roomid':'RoomController.watch',

  // auth api routes
  'post /api/auth':'AuthController.login',
  'get /api/auth':'AuthController.check',
  'delete /api/auth':'AuthController.logout',



  //OLD ROUTES
  'get /api/room/live/:roomid':'RoomController.live',
  'get /api/room/mine':'RoomController.mine',


  //catch-all route for angular HTML5 mode
  "get *":{
    controller:"PageController",
    action:"index",
    skipAssets: true,
    skipRegex: /^\/api\/.*$/
  }

};
