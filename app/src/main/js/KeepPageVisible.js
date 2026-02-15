(function() {
    'use strict';
    
    // 覆盖 document.hidden 属性，始终返回 false
    // Override document.hidden to always return false
    try {
        Object.defineProperty(document, 'hidden', {
            get: function() { return false; },
            configurable: true
        });
    } catch(e) {}
    
    // 覆盖 document.visibilityState 属性，始终返回 'visible'
    // Override document.visibilityState to always return 'visible'
    try {
        Object.defineProperty(document, 'visibilityState', {
            get: function() { return 'visible'; },
            configurable: true
        });
    } catch(e) {}
    
    // 覆盖 document.webkitHidden 属性（旧版 WebKit）
    // Override document.webkitHidden for older WebKit
    try {
        Object.defineProperty(document, 'webkitHidden', {
            get: function() { return false; },
            configurable: true
        });
    } catch(e) {}
    
    // 覆盖 document.webkitVisibilityState 属性（旧版 WebKit）
    // Override document.webkitVisibilityState for older WebKit
    try {
        Object.defineProperty(document, 'webkitVisibilityState', {
            get: function() { return 'visible'; },
            configurable: true
        });
    } catch(e) {}
    
    // 拦截 visibilitychange 事件，防止页面检测到可见性变化
    // Intercept visibilitychange events to prevent pages from detecting visibility changes
    var originalAddEventListener = document.addEventListener;
    document.addEventListener = function(type, listener, options) {
        if (type === 'visibilitychange' || type === 'webkitvisibilitychange') {
            // 不添加可见性变化监听器
            // Don't add visibility change listeners
            return;
        }
        return originalAddEventListener.call(this, type, listener, options);
    };
    
    console.log('[Fulguris] Page visibility API overridden - page will always appear visible');
})();
