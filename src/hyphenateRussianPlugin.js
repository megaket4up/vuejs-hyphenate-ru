export function hyphenate(text) {
    let RusA = "[абвгдеёжзийклмнопрстуфхцчшщъыьэюя]";
    let RusV = "[аеёиоуыэю\я]";
    let RusN = "[бвгджзклмнпрстфхцчшщ]";
    let RusX = "[йъь]";
    let Hyphen = "\xAD";

    let re1 = new RegExp("("+RusX+")("+RusA+RusA+")","ig");
    let re2 = new RegExp("("+RusV+")("+RusV+RusA+")","ig");
    let re3 = new RegExp("("+RusV+RusN+")("+RusN+RusV+")","ig");
    let re4 = new RegExp("("+RusN+RusV+")("+RusN+RusV+")","ig");
    let re5 = new RegExp("("+RusV+RusN+")("+RusN+RusN+RusV+")","ig");
    let re6 = new RegExp("("+RusV+RusN+RusN+")("+RusN+RusN+RusV+")","ig");

    text = text.replace(re1, "$1"+Hyphen+"$2");
    text = text.replace(re2, "$1"+Hyphen+"$2");
    text = text.replace(re3, "$1"+Hyphen+"$2");
    text = text.replace(re4, "$1"+Hyphen+"$2");
    text = text.replace(re5, "$1"+Hyphen+"$2");
    text = text.replace(re6, "$1"+Hyphen+"$2");

    return text;
}

export const hyphenateDirective = {
    inserted(el) {
        el.innerText = hyphenate(el.innerText);
    }
};

const myselectPlugin = {
    install: function (Vue, options) {
        Vue.directive('hyphenate', hyphenateDirective);
    },
};

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(myselectPlugin);
}

export default myselectPlugin;