export const svgRequire = (req) => {
  const use = Array.prototype.slice.call(document.getElementsByTagName('use'));
  use.forEach(elem => {
    const { href } = elem;
    const svg = `${/(?!#).*/.exec(href.baseVal)[0]}.svg`;
    let files = {};

    req.keys().forEach((filename)=>{
      if (new RegExp(filename).test(svg)) {
        files[filename] = req(filename);
      }
    });
  });
};

export let j$ = null;
export let eventQueue = [];

if (typeof j$ === 'undefined') {
  window.j$ = {};
}

document.addEventListener('DOMContentLoaded', () => {
  eventQueue.forEach(fn => {
    fn();
  });
}, { passive: true });

j$ = arg => {
  var htmlEls;
  var matches;

  if (arg instanceof Function) {
    eventQueue.push(arg);
    return document;
  } if (arg instanceof Object) {
    return new j$.Fn([arg]);
  }
  if (arg instanceof HTMLElement) {
    htmlEls = [arg];
  } else {
    matches = arg ? arg.match(/^<(\w+)>$/) : null;

    if (matches) {
      htmlEls = [document.createElement(matches[1])];
    } else {
      htmlEls = Array.prototype.slice.call(document.querySelectorAll(arg));
    }
  }

  return new j$.Fn(htmlEls);
};

// eslint-disable-next-line func-names
j$.Fn = function (elements) {
  this[0] = elements;
  return this;
};

j$.Fn.prototype = {
  // eslint-disable-next-line func-names
  html: function (string) {
    if (typeof string !== 'undefined') {
      this[0].forEach(el => {
        el.innerHTML = string;
      });

      return this;
    }
    return this[0][0].innerHTML;
  },
  // eslint-disable-next-line func-names
  text: function (string) {
    let text = '';

    if (typeof string !== 'undefined') {
      this[0].forEach(el => {
        el.innerText = string;
      });

      return this;
    }

    this[0].forEach(el => {
      text += el.innerText;
    });

    return text;
  },
  // eslint-disable-next-line func-names
  parents: function (className) {
    let target = this[0][0];
    let $parents = null;

    while (target.parentNode != null && target.parentNode !== document.documentElement) {
      if (target.matches) {
        if (target.matches(className)) {
          $parents = new j$.Fn([target]);
          break;
        }
      } else if (target.msMatchesSelector) {
        if (target.msMatchesSelector(className)) {
          $parents = new j$.Fn([target]);
          break;
        }
      }
      target = target.parentNode;
    }
    return $parents;
  },
  // eslint-disable-next-line func-names
  parent: function () {
    var parents = [];
    var currentParent = null;

    this[0].forEach(el => {
      currentParent = el.parentElement;

      if (parents.indexOf(currentParent) === -1) {
        parents.push(currentParent);
      }
    });

    return new j$.Fn(parents);
  },
  // eslint-disable-next-line func-names
  prev: function () {
    let prev = null;

    this[0].forEach(el => {
      prev = el.previousElementSibling;
    });

    return new j$.Fn([prev]);
  },
  // eslint-disable-next-line func-names
  next: function () {
    let next = null;

    this[0].forEach(el => {
      next = el.nextElementSibling;
    });

    return new j$.Fn([next]);
  },
  // eslint-disable-next-line func-names
  find: function (selector) {
    const matchingElements = [];
    let currentMatchesQuery = null;
    let currentMatches = null;

    this[0].forEach(el => {
      const className = el.className ? `.${el.className.replace(/(?!\s)(\W)/g, '\\$1').replace(/\s/g, '.')}` : null;

      currentMatchesQuery = /^\s?>/.test(selector)
        ? document.querySelectorAll(`${className} ${selector.replace(/^\s/, '')}`)
        : el.querySelectorAll(selector);
      currentMatches = Array.prototype.slice.call(currentMatchesQuery);
      currentMatches.forEach(match => {
        if (matchingElements.indexOf(match) === -1) {
          matchingElements.push(match);
        }
      });
    });

    return new j$.Fn(matchingElements);
  },
  // eslint-disable-next-line func-names
  children: function (tagName) {
    const children = [];

    this[0].forEach(el => {
      for (let i = 0; i < el.children.length; i += 1) {
        const $children = el.children[i];

        if (tagName) {
          if ((/^./.test(tagName) && $children.className === tagName) || (/^#/.test(tagName) && $children.id === tagName)) {
            children.push($children);
          } else if ($children.nodeName.toLowerCase() === tagName) {
            children.push($children);
          }
        } else {
          children.push($children);
        }
      }
    });

    return new j$.Fn(children);
  },
  // eslint-disable-next-line func-names
  siblings: function () {
    let sibling = this[0][0].parentNode.firstChild;
    const siblings = [];

    while (sibling) {
      if (sibling.nodeType === 1 && sibling !== this[0][0]) {
        siblings.push(sibling);
      }

      sibling = sibling.nextSibling;
    }

    return new j$.Fn(siblings);
  },
  // eslint-disable-next-line func-names
  closest: function (selector) {
    if (!Element.prototype.matches) {
      Element.prototype.matches = Element.prototype.msMatchesSelector
      || Element.prototype.webkitMatchesSelector;
    }

    if (!Element.prototype.closest) {
      // eslint-disable-next-line func-names
      Element.prototype.closest = function (s) {
        var el = this;
        if (!document.documentElement.contains(el)) return null;
        do {
          if (el.matches(s)) return el;
          el = el.parentElement;
        } while (el !== null);
        return null;
      };
    }

    let closest = null;
    this[0].forEach(el => {
      closest = el.closest(selector);
    });

    return new j$.Fn([closest]);
  },
  // eslint-disable-next-line func-names
  click: function () {
    this[0].forEach(el => {
      el.click();
    });

    return this;
  },
  // eslint-disable-next-line func-names
  trigger: function (eventName) {
    this[0].forEach(el => {
      const event = document.createEvent('Event');
      event.initEvent(eventName, true, true);
      el.dispatchEvent(event);
    });

    return this;
  },
  // eslint-disable-next-line func-names
  hover: function (mouseoverhandle, mouseouthandle) {
    this[0].forEach(el => {
      el.addEventListener('mouseenter', mouseoverhandle, { passive: false });
      el.addEventListener('mouseleave', mouseouthandle || mouseoverhandle, { passive: false });
    });

    return this;
  },
  // eslint-disable-next-line func-names
  on: function (eventName, elementSelector, handle) {
    this[0].forEach(el => {
      if (elementSelector && typeof elementSelector === 'string') {
        if (eventName === 'ready') {
          el.addEventListener('DOMContentLoaded', e => {
            handle.call(e);
          }, { passive: false });
        } else {
          el.addEventListener(eventName, e => {
            for (let target = e.target; target && target !== this; target = target.parentNode) {
              if (target.matches) {
                if (target.matches(elementSelector)) {
                  e.$this = target;
                  handle.call(target, e);
                  break;
                }
              } else if (target.msMatchesSelector) {
                if (target.msMatchesSelector(elementSelector)) {
                  e.$this = target;
                  handle.call(target, e);
                  break;
                }
              }
            }
          }, { passive: false });
        }
      } else {
        const func = elementSelector;

        if (eventName === 'ready') {
          el.addEventListener('DOMContentLoaded', e => {
            func.call(e);
          }, { passive: false });
        } else {
          el.addEventListener(eventName, e => {
            e.$this = el;
            func.call(e.target, e);
          }, { passive: false });
        }
      }
    });

    return this;
  },
  // eslint-disable-next-line func-names
  off: function (eventName, elementSelector, handle) {
    // eslint-disable-next-line func-names
    this[0].forEach(function (el) {
      if (elementSelector && typeof elementSelector === 'string') {
        // eslint-disable-next-line func-names
        el.removeEventListener(eventName, function (e) {
          for (let target = e.target; target && target !== this; target = target.parentNode) {
            if (target.matches) {
              if (target.matches(elementSelector)) {
                e.$this = target;
                handle.call(target, e);
                break;
              }
            } else if (target.msMatchesSelector) {
              if (target.msMatchesSelector(elementSelector)) {
                e.$this = target;
                handle.call(target, e);
                break;
              }
            }
          }
        }, { passive: false });
      } else {
        const func = elementSelector || null;
        el.removeEventListener(eventName, e => {
          e.$this = el;
          func.call(e.target, e);
        }, { passive: false });
      }
    });

    return this;
  },
  // eslint-disable-next-line func-names
  addClass: function (className) {
    this[0].forEach(el => {
      el.classList.add(className);
    });

    return this;
  },
  // eslint-disable-next-line func-names
  removeClass: function (className) {
    this[0].forEach(el => {
      el.classList.remove(className);
    });

    return this;
  },
  // eslint-disable-next-line func-names
  toggleClass: function (className) {
    this[0].forEach(el => {
      el.classList.toggle(className);
    });

    return this;
  },
  // eslint-disable-next-line func-names
  hasClass: function (className) {
    let hasClass = false;

    this[0].forEach(el => {
      hasClass = el ? new RegExp('(\\s|^)' + className + '(\\s|$)').test(el.className) : false;
      // if (el.className.replace(/[\n\t]/g, ' ').indexOf(className) > -1) {
      //   hasClass = true;
      // } else {
      //   hasClass = false;
      // }
    });

    return hasClass;
  },
  // eslint-disable-next-line func-names
  attr: function (attributeName, attributeValue) {
    if (typeof attributeValue !== 'undefined') {
      this[0].forEach(el => {
        el.setAttribute(attributeName, attributeValue);
      });

      return this;
    }
    return this[0][0].getAttribute(attributeName);
  },
  // eslint-disable-next-line func-names
  data: function (attributeName, attributeValue) {
    if (typeof attributeValue !== 'undefined') {
      this[0].forEach(el => {
        el.dataset[attributeName] = attributeValue;
      });

      return this;
    }
    return this[0][0].dataset[attributeName];
  },
  // eslint-disable-next-line func-names
  removeAttr: function (attributeName) {
    this[0].forEach(el => {
      el.removeAttribute(attributeName);
    });

    return this;
  },
  // eslint-disable-next-line func-names
  width: function (isScrollWidth) {
    let width = '';

    this[0].forEach(el => {
      if (isScrollWidth) {
        width = el.scrollWidth;
      } else {
        width = el.innerWidth || el.offsetWidth || el.scrollWidth || el.clientWidth;
      }
    });

    return width;
  },
  // eslint-disable-next-line func-names
  height: function () {
    let height = '';

    this[0].forEach(el => {
      height = el.innerHeight || el.offsetHeight || el.scrollHeight || el.clientHeight;
    });

    return height;
  },
  // eslint-disable-next-line func-names
  css: function (style, value) {
    if (typeof style !== 'undefined' && typeof value !== 'undefined') {
      this[0].forEach(el => {
        el.style[style] = value;
      });

      return this;
    }
    return getComputedStyle(this[0][0])[style];
  },
  // eslint-disable-next-line func-names
  empty: function () {
    while (this[0][0].firstChild) {
      this[0][0].removeChild(this[0][0].firstChild);
    }

    return this;
  },
  // eslint-disable-next-line func-names
  remove: function () {
    this[0].forEach((el) => {
      if (!('remove' in Element.prototype)) {
        el.parentNode.removeChild(el);
      } else {
        el.remove();
      }
    });
  },
  // eslint-disable-next-line func-names
  append: function (arg) {
    if (arg instanceof j$.Fn) {
      // eslint-disable-next-line func-names
      arg[0].forEach(function (el) {
        const elem = el.length ? el.cloneNode(true) : el;
        this[0][0].appendChild(elem);
      }.bind(this));
    } else if (arg instanceof HTMLElement) {
      const child = arg.length ? arg.cloneNode(true) : arg;
      this[0][0].appendChild(child);
    } else if (typeof arg === 'string') {
      this[0].forEach(el => {
        el.innerHTML += arg;
      });
    }

    return this;
  },
  // eslint-disable-next-line func-names
  before: function (arg) {
    if (arg instanceof j$.Fn) {
      // eslint-disable-next-line func-names
      arg[0].forEach(function (el) {
        this[0][0].parentNode.insertBefore(el, this[0][0]);
      }.bind(this));
    }

    return this;
  },
  // eslint-disable-next-line func-names
  after: function (arg) {
    if (arg instanceof j$.Fn) {
      // eslint-disable-next-line func-names
      arg[0].forEach(function (el) {
        if (this[0][0].parentNode.lastChild === this[0][0]) {
          this[0][0].parentNode.appendChild(el, this[0][0]);
        } else {
          this[0][0].parentNode.insertBefore(el, this[0][0].nextSibling);
        }
      }.bind(this));
    }

    return this;
  },
  // eslint-disable-next-line func-names
  val: function (value) {
    if (typeof value !== 'undefined') {
      this[0].forEach(el => {
        el.value = value;
      });

      return this;
    }
    return this[0][0].value;
  },
  // eslint-disable-next-line func-names
  offset: function () {
    const wScroll = {
      y: /(iPhone||iPad)\W+.*\sOS\s12_/.test(navigator.userAgent) ? window.scrollY : 0
    };
    let $el = this[0][0];
    let top = 0;
    let left = 0;

    while ($el && typeof ($el.offsetLeft) !== 'undefined' && typeof ($el.offsetTop) !== 'undefined') {
      top += $el.offsetTop - $el.scrollTop + $el.clientTop;
      left += $el.offsetLeft - $el.scrollLeft + $el.clientLeft;

      $el = $el.offsetParent;
    }

    return { top: (top + wScroll.y), left: left };
  },
  // eslint-disable-next-line func-names
  position: function () {
    let $el = this[0][0];
    let top = 0;
    let left = 0;
    const parentTop = $el.offsetParent.offsetTop;
    const parentLeft = $el.offsetParent.offsetLeft;

    while ($el) {
      top += $el.offsetTop - $el.scrollTop + $el.clientTop;
      left += $el.offsetLeft - $el.scrollLeft + $el.clientLeft;

      $el = $el.offsetParent;
    }

    return { top: (top - parentTop), left: (left - parentLeft) };
  },
  // eslint-disable-next-line func-names
  prop: function (type, value) {
    let prop = null;

    if (typeof value !== 'undefined') {
      this[0].forEach(el => {
        el[type] = value;
      });

      return this;
    }

    this[0].forEach(el => {
      prop = el[type];
    });

    return prop;
  },
  // eslint-disable-next-line func-names
  eq: function (index) {
    return new j$.Fn([this[0][index]]);
  },
  // eslint-disable-next-line func-names
  index: function () {
    const children = this[0][0].parentNode.children;

    let num = 0;
    for (let i = 0; i < children.length; i += 1) {
      if (children[i] === this[0][0]) {
        return num;
      }
      if (children[i].nodeType === 1) {
        num += 1;
      }
    }
    return -1;
  }
};

export const prjs = {
  $w: j$(window),
  $d: j$(document),
  $hb: j$('html, body'),
  $b: j$('body')
};

/* device */
export const device = () => {
  let angle = window.screen.orientation ? window.screen.orientation.angle : 0;

  if (prjs.$w.width() <= 740 || /Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    return 'M';
  }
  if ((angle === 0 && prjs.$w.width() > 740 && prjs.$w.width() < 1024) || /Android|webOS|iPad|BlackBerry/i.test(navigator.userAgent)) {
    return 'T';
  } if ((angle !== 0 && prjs.$w.width() > 730 && prjs.$w.width() < 815) || /iPhone/i.test(navigator.userAgent)) {
    return 'M';
  }
  return 'P';
};

export const validate = {
  req: value => {
    return !!value;
  },
  reqZero: value => {
    return !!((value || value === 0));
  },
  digit: value => {
    return /^\d+$/.test(value);
  },
  decimal: value => {
    return /^\d+\.?(\d+)?$/.test(value);
  },
  phone: value => {
    return /^09\d{8}$/.test(value);
  },
  password: (value, length) => {
    return new RegExp(`^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{${length},}$`).test(value);
  },
  same: (value, checkValue) => {
    return (value === checkValue);
  }
};

export const scrollTo = obj => {
  const supportsNativeSmoothScroll = 'scrollBehavior' in document.documentElement.style;
  const element = obj.elem ? obj.elem : document.scrollingElement || document.documentElement;
  let start = supportsNativeSmoothScroll ? element.scrollTop : null;
  const startDate = +new Date();

  const easeInOutQuad = (t, b, c, d) => {
    // eslint-disable-next-line no-param-reassign
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    // eslint-disable-next-line no-param-reassign
    t -= 1;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  const animateScroll = () => {
    const top = obj.top ? obj.top : 0;
    const change = (top - start);
    const currentDate = +new Date();
    const currentTime = currentDate - startDate;
    element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, 600), 10);

    if (currentTime < 600) {
      requestAnimationFrame(animateScroll);
    } else {
      element.scrollTop = top;
      if (obj.callback) { obj.callback(); }
    }
  };

  const animateScrollOld = () => {
    const currentPos = obj.elem ? obj.elem.scrollTop : window.pageYOffset;
    let time = 250;
    time = +time;
    window.requestAnimationFrame(function step(currentTime) {
      start = !start ? currentTime : start;
      const progress = currentTime - start;

      if (currentPos < obj.top) {
        element.scrollTop = ((((obj.top - currentPos) * progress) / time) + currentPos);
      } else {
        element.scrollTop = (currentPos - (((currentPos - obj.top) * progress) / time));
      }
      if (progress < time) {
        window.requestAnimationFrame(step);
      } else {
        element.scrollTop = obj.top;
        if (obj.callback) { obj.callback(); }
      }
    });
  };

  if (supportsNativeSmoothScroll) {
    animateScroll();
  } else {
    animateScrollOld();
  }
};

/* documentOff */
export const documentOff = (element, func) => {
  const elem = element.split(',');
  const composedPath = (el) => {
    const path = [];

    while (el) {
      path.push(el);

      if (el.tagName === 'HTML') {
        path.push(document);
        path.push(window);
        return path;
      }

      // eslint-disable-next-line no-param-reassign
      el = el.parentElement;
    }

    return null;
  };

  const matchesElem = e => {
    const path = e.path || (e.composedPath && e.composedPath()) || composedPath(e.target);
    let matches = false;
    const same = (ele) => {
      path.some(el => {
        if (el === ele) {
          matches = true;
          return false;
        }

        return null;
      });
    };

    e.stopPropagation();

    for (let i = 0; i < elem.length; i += 1) {
      const $elem = document.querySelectorAll(elem[i].replace(/^\s/, ''));

      for (let j = 0; j < $elem.length; j += 1) {
        same($elem[j]);
      }
    }

    if (!matches && func) {
      func.call();
      document.removeEventListener('click', matchesElem, false);
    }
  };

  document.addEventListener('click', matchesElem, false);
};
