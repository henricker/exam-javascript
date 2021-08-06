((window, document) => {
    'use-strict';
    
    class Util {
        static getRandomNumber(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        static toReal(number) {
            let str = 'R$ ';
            
            if(`${number}`.includes('.')) {
                const beforeComma = `${number}`.split('.')[0];
                str = str.concat(`${beforeComma},`);


                let afterComma = `${number}`.split('.')[1];
                if(afterComma.length === 1)
                    return str.concat(`${afterComma}0`);
                
                afterComma = afterComma.slice(0, 2);
                return str.concat(`${afterComma}`);
            }
            return str.concat(`${number},00`);
        }
    }
    window.Util = Util;

})(window, document);

