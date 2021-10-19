class CssManager {
    constructor(id) {
        let styleSheet = document.querySelector(id);

        styleSheet = styleSheet.sheet
            ? styleSheet.sheet
            : styleSheet.styleSheet;

        this.sheet = styleSheet;
    }

    insertRule(selector, styles) {
        let update = false;

        for (let i = 0; i < this.sheet.rules.length; i++) {
            if (this.sheet.rules[i].selectorText === selector) {
                this.sheet.removeRule(i);
                break;
            }
        }

        this.sheet.insertRule(`${selector} { ${styles} }`, 0);
    }
}