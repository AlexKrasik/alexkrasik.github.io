import Komp from "./komp.js";

class Counter extends Komp {

    get html() {
        return `<div>
                   <button k-on:click="add">Counter: {{count}}</button>
                </div>`;
    }

    add(e) {
        this.props.count++;
    }
}

new Counter({count: 0}, "#app")