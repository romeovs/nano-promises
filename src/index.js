var wrap = function(fn) {
  if( typeof fn !== 'function' ) {
    throw new Error('function required for wrap');
  }

  return function() {
    // copy args
    var args = new Array(arguments.length);

    for(var i = 0; i < args.length; ++i) {
      args[i] = arguments[i];
    }

    return new Promise(function(resolve, reject) {
      // add callback to arguments
      args.push(function(err, res, header) {
        if ( err ){
          reject(err);
        } else {
          resolve([res, header]);
        }
      });

      // apply function
      fn.apply(this, args);
    });
  };
};

var wrapper = function (methods, object) {
  var wrapped = {};

  methods.forEach(function(method) {
    switch (typeof method) {
      case 'string':
        wrapped[method] = wrap(object[method]);
        break;
      case 'object':
        wrapped[method.name] = wrapper(method.methods, object[method.name]);
        break;
    }
  });

  return wrapped;
};

var promisify = function(nano) {

  var methods = [
    'create'
  , 'get'
  , 'destroy'
  , 'list'
  , 'compact'
  , 'replicate'
  , 'changes'
  , 'follow'
  ];

  var dbMethods = [
    'insert'
  , 'destroy'
  , 'follow'
  , 'get'
  , 'head'
  , 'copy'
  , 'bulk'
  , 'list'
  , 'fetch'
  , 'view'
  , 'show'
  , 'atomic'
  , 'search'
  , {
      name: 'attachment'
    , methods: ['insert', 'get', 'destroy']
    }
  , {
      name: 'multipart'
    , methods: ['insert', 'get']
    }
  ];

  var wrapped = {
    db:      wrapper(methods, nano.db)
  , use:     function(dbName) { return wrapper(dbMethods, nano.use(dbName)); }
  , request: wrap(nano.request)
  , auth:    wrap(nano.auth)
  , session: wrap(nano.session)
  , config:  nano.config
  };
  wrapped.db.use = wrapped.use;
  return wrapped;
};

module.exports = function(nano) {
  return promisify(nano);
};
