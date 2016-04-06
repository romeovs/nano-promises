# nano-promises

[![Build Status](https://img.shields.io/travis/romeovs/nano-promises.svg?style=flat-square)][travis]
[![Coverage Status](https://img.shields.io/coveralls/romeovs/nano-promises.svg?style=flat-square)][coveralls]
[![Dependencies](https://img.shields.io/david/romeovs/nano-promises.svg?style=flat-square)][david]
[![devDependencies](https://img.shields.io/david/dev/romeovs/nano-promises.svg?style=flat-square)][david-dev]
[![license](https://img.shields.io/badge/license-ISC-373737.svg?style=flat-square)][license]
[![gitter](https://img.shields.io/badge/GITTER-join%20chat%20→-00d86e.svg?style=flat-square)][gitter]

`nano-promises` is a lightweight wrapper around the fabulous
[`nano`][nano] driver.  It provides
the same features but uses promises instead of callbacks.

## Example
```js
import nano from 'nano';
import prom from 'nano-promises';

var db = prom(nano('http://localhost:5984')).db.use('test');

db.insert({ 'crazy': true }, 'rabbit')
  .then(function([body, headers]) {
    console.log(body)
  })
  .catch(function(err) {
    console.error(err);
  });

```

`nano-promises` promises always resolve to a value of the form `[body,
headers]` or reject to a value of the form `error`.  So it is important to
use desructuring in the `then` handler of the promise.

## `async/await`

The above example does not seem convincing to swith to a promise-based
approach. `nano-promises` becomes very handy when used together
with the `async/await` proposal for ES7:

```js
var isRabbitCrazy = async function() {
  try {
    var [doc] = await db.get('rabbit');
    return doc.crazy;
  } catch(err) {
    console.log('error fetching rabbit:', err);
    throw err;
  }
};

```

I don't know about you but I find this very expressive!


### Attribution
I love the [`nano`][nano] library.  It has a very good api design and there's
a lot of work put into it! 

The code in this repo is mostly adapted from [`co-nano`][co-nano], but with
promises instead of thunks.

### License
This code is licensed under the [ISC license][license]

[travis]:    https://travis-ci.org/romeovs/nano-promises
[coveralls]: https://coveralls.io/r/romeovs/nano-promises?branch=master
[david]:     https://david-dm.org/romeovs/nano-promises
[david-dev]: https://david-dm.org/romeovs/nano-promises#info=devDependencies
[license]:   ./LICENSE
[gitter]:    https://gitter.im/romeovs/nano-promises?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge
[nano]:      https://github.com/dscape/nano#nanousename
[co-nano]:    https://github.com/OlavHN/co-nano
