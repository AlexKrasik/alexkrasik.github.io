import Komp from "https://cdn.jsdelivr.net/gh/AlexKrasik/KompJS@master/dist/komp.js";

class myComponent extends Komp {
    get html() {
        return `<div>{{propName}}</div>`
    }
}

new myComponent({propName: "propValue"}, "#app")