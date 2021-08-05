((window, document) => {
    'use-strict';
    
    class Util {
        static getRandomNumber(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }

    window.Util = Util;

})(window, document);

