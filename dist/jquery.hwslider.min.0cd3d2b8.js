// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/jquery.hwslider.min.js":[function(require,module,exports) {
/*
 * hwSlider���ݻ����л���� - v1.0
 * by �¹��
*/
;

(function ($, window, document, undefined) {
  var HwSlider = function HwSlider(ele, opt) {
    var self = this;
    self.$element = ele, self.defaults = {
      width: 600,
      height: 320,
      start: 1,
      speed: 400,
      interval: 3000,
      autoPlay: false,
      dotShow: true,
      arrShow: true,
      touch: true,
      afterSlider: function afterSlider() {}
    }, self.clickable = true, self.options = $.extend({}, self.defaults, opt);
  };

  HwSlider.prototype = {
    init: function init() {
      var self = this,
          ele = self.$element;
      var sliderInder = ele.children("ul");
      var hwsliderLi = sliderInder.children("li");
      var hwsliderSize = hwsliderLi.length;
      var index = self.options.start;
      var touchStartY = 0,
          touchStartX = 0;

      if (self.options.arrShow) {
        var arrElement = '<a href="javascript:;" class="arr prev"><</a><a href="javascript:;" class="arr next">></a>';
        ele.append(arrElement);
      }

      for (i = 1; i <= hwsliderSize; i++) {
        if (index == i) {
          hwsliderLi.eq(index - 1).addClass("active");
        }
      }

      if (self.options.dotShow) {
        var dot = "";

        for (i = 1; i <= hwsliderSize; i++) {
          if (index == i) {
            dot += '<span data-index="' + i + '" class="active"></span>';
          } else {
            dot += '<span data-index="' + i + '"></span>';
          }
        }

        var dotElement = '<div class="dots">' + dot + "</div>";
        ele.append(dotElement);
      }

      var resize = function resize() {
        var sWidth = ele.width();
        var sHeight = self.options.height / self.options.width * sWidth;
        ele.css("height", sHeight);

        if (self.options.arrShow) {
          var arrOffset = (sHeight - 40) / 2;
          ele.find(".arr").css("top", arrOffset + "px");
        }

        if (self.options.dotShow) {
          var dotWidth = hwsliderSize * 20;
          var dotOffset = (sWidth - dotWidth) / 2;
          ele.find(".dots").css("left", dotOffset + "px");
        }
      };

      ele.css("height", self.options.height);
      resize();
      $(window).resize(function () {
        resize();
      });

      if (self.options.arrShow) {
        ele.find(".next").on("click", function (event) {
          event.preventDefault();

          if (self.clickable) {
            if (index >= hwsliderSize) {
              index = 1;
            } else {
              index += 1;
            }

            self.moveTo(index, "next");
          }
        });
        ele.find(".prev").on("click", function (event) {
          event.preventDefault();

          if (self.clickable) {
            if (index == 1) {
              index = hwsliderSize;
            } else {
              index -= 1;
            }

            self.moveTo(index, "prev");
          }
        });
      }

      if (self.options.dotShow) {
        ele.find(".dots span").on("click", function (event) {
          event.preventDefault();

          if (self.clickable) {
            var dotIndex = $(this).data("index");

            if (dotIndex > index) {
              dir = "next";
            } else {
              dir = "prev";
            }

            if (dotIndex != index) {
              index = dotIndex;
              self.moveTo(index, dir);
            }
          }
        });
      }

      if (self.options.autoPlay) {
        var timer;

        var play = function play() {
          index++;

          if (index > hwsliderSize) {
            index = 1;
          }

          self.moveTo(index, "next");
        };

        timer = setInterval(play, self.options.interval);
        ele.hover(function () {
          timer = clearInterval(timer);
        }, function () {
          timer = setInterval(play, self.options.interval);
        });
      }

      if (self.options.touch) {
        hwsliderLi.on({
          touchstart: function touchstart(e) {
            touchStartY = e.originalEvent.touches[0].clientY;
            touchStartX = e.originalEvent.touches[0].clientX;
          },
          touchend: function touchend(e) {
            var touchEndY = e.originalEvent.changedTouches[0].clientY,
                touchEndX = e.originalEvent.changedTouches[0].clientX,
                yDiff = touchStartY - touchEndY,
                xDiff = touchStartX - touchEndX;

            if (Math.abs(xDiff) > Math.abs(yDiff)) {
              if (xDiff > 5) {
                if (index >= hwsliderSize) {
                  index = 1;
                } else {
                  index += 1;
                }

                self.moveTo(index, "next");
              } else {
                if (index == 1) {
                  index = hwsliderSize;
                } else {
                  index -= 1;
                }

                self.moveTo(index, "prev");
              }
            }

            touchStartY = null;
            touchStartX = null;
          },
          touchmove: function touchmove(e) {
            if (e.preventDefault) {
              e.preventDefault();
            }
          }
        });
      }
    },
    moveTo: function moveTo(index, dir) {
      var self = this,
          ele = self.$element;
      var clickable = self.clickable;
      var dots = ele.find(".dots span");
      var sliderInder = ele.children("ul");
      var hwsliderLi = sliderInder.children("li");

      if (clickable) {
        self.clickable = false;
        var offset = ele.width();

        if (dir == "prev") {
          offset = -1 * offset;
        }

        sliderInder.children(".active").stop().animate({
          left: -offset
        }, self.options.speed, function () {
          $(this).removeClass("active");
        });
        hwsliderLi.eq(index - 1).css("left", offset + "px").addClass("active").stop().animate({
          left: 0
        }, self.options.speed, function () {
          self.clickable = true;
        });
        self.options.afterSlider.call(self);
        dots.removeClass("active");
        dots.eq(index - 1).addClass("active");
      } else {
        return false;
      }
    }
  };

  $.fn.hwSlider = function (options) {
    var hwSlider = new HwSlider(this, options);
    return this.each(function () {
      hwSlider.init();
    });
  };
})(jQuery, window, document);
},{}],"D:/Users/h/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51489" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["D:/Users/h/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/jquery.hwslider.min.js"], null)
//# sourceMappingURL=/jquery.hwslider.min.0cd3d2b8.js.map