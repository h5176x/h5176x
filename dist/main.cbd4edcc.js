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
})({"d6sW":[function(require,module,exports) {
$(".tab li").click(function () {
  $(this).addClass("active").siblings().removeClass("active");
  var index = $(this).index();
  $(".ta-list").removeClass("show");
  $(".tab" + index).addClass("show");
});
$(".ke").hover(function () {
  $(".slide .ke p").slideToggle();
}); //回到顶部按钮***********************************************************

(function () {
  //回到顶部按钮函数
  var clientH = document.documentElement.clientHeight; //获取当前视口高度

  var backTop = $('#go_top'); //  $(window).on('scroll',function(){
  //      var osTop=document.documentElement.scrollTop||document.body.scrollTop; //计算的当前高度，兼容IE及其他
  //      if (osTop >= clientH/2) {
  //          backTop.fadeIn(200);
  //          backTop.css('display', 'block');
  //      } else {
  //          backTop.fadeOut(200);
  //      }
  //  });

  backTop.click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 360);
  });
})(); // 向上循环滚动


(function ($) {
  $.fn.myScroll = function (options) {
    //默认配置
    var defaults = {
      speed: 40,
      //滚动速度,值越大速度越慢
      rowHeight: 24 //每行的高度

    };
    var opts = $.extend({}, defaults, options),
        intId = [];

    function marquee(obj, step) {
      obj.find("ul").animate({
        marginTop: '-=1'
      }, 0, function () {
        var s = Math.abs(parseInt($(this).css("margin-top")));

        if (s >= step) {
          $(this).find("li").slice(0, 1).appendTo($(this));
          $(this).css("margin-top", 0);
        }
      });
    }

    this.each(function (i) {
      var sh = opts["rowHeight"],
          speed = opts["speed"],
          _this = $(this);

      intId[i] = setInterval(function () {
        if (_this.find("ul").height() <= _this.height()) {
          clearInterval(intId[i]);
        } else {
          marquee(_this, sh);
        }
      }, speed);

      _this.hover(function () {
        clearInterval(intId[i]);
      }, function () {
        intId[i] = setInterval(function () {
          if (_this.find("ul").height() <= _this.height()) {
            clearInterval(intId[i]);
          } else {
            marquee(_this, sh);
          }
        }, speed);
      });
    });
  };
})(jQuery); //数字递加


$.fn.countTo = function (options) {
  options = options || {};
  return $(this).each(function () {
    // set options for current element
    var settings = $.extend({}, $.fn.countTo.defaults, {
      from: $(this).data('from'),
      to: $(this).data('to'),
      speed: $(this).data('speed'),
      refreshInterval: $(this).data('refresh-interval'),
      decimals: $(this).data('decimals')
    }, options); // how many times to update the value, and how much to increment the value on each update

    var loops = Math.ceil(settings.speed / settings.refreshInterval),
        increment = (settings.to - settings.from) / loops; // references & variables that will change with each update

    var self = this,
        $self = $(this),
        loopCount = 0,
        value = settings.from,
        data = $self.data('countTo') || {};
    $self.data('countTo', data); // if an existing interval can be found, clear it first

    if (data.interval) {
      clearInterval(data.interval);
    }

    data.interval = setInterval(updateTimer, settings.refreshInterval); // initialize the element with the starting value

    render(value);

    function updateTimer() {
      value += increment;
      loopCount++;
      render(value);

      if (typeof settings.onUpdate == 'function') {
        settings.onUpdate.call(self, value);
      }

      if (loopCount >= loops) {
        // remove the interval
        $self.removeData('countTo');
        clearInterval(data.interval);
        value = settings.to;

        if (typeof settings.onComplete == 'function') {
          settings.onComplete.call(self, value);
        }
      }
    }

    function render(value) {
      var formattedValue = settings.formatter.call(self, value, settings);
      $self.html(formattedValue);
    }
  });
};

$.fn.countTo.defaults = {
  from: 0,
  // the number the element should start at
  to: 0,
  // the number the element should end at
  speed: 1000,
  // how long it should take to count between the target numbers
  refreshInterval: 100,
  // how often the element should be updated
  decimals: 0,
  // the number of decimal places to show
  formatter: formatter,
  // handler for formatting the value before rendering
  onUpdate: null,
  // callback method for every time the element is updated
  onComplete: null // callback method for when the element finishes updating

};

function formatter(value, settings) {
  return value.toFixed(settings.decimals);
} // custom formatting example


$('#count-number').data('countToOptions', {
  formatter: function formatter(value, options) {
    return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
  }
}); // start all the timers

$('.timer').each(count);

function count(options) {
  var $this = $(this);
  options = $.extend({}, options || {}, $this.data('countToOptions') || {});
  $this.countTo(options);
}
},{}]},{},["d6sW"], null)
//# sourceMappingURL=main.cbd4edcc.js.map