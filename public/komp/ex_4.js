import Komp from "./komp.js";

class NameBuilder extends Komp {

    get html() {
        return `<div>
                  Name: <input type="text" k-bind="name"  size="10">
                  Age:  <input type="number" k-bind="age" size="3">
                  <p>Your name is <b>{{name}}</b> and you are <b>{{age}}</b> years old</p>
                  <button k-on:click="reset">Reset</button>
                </div>`;
    }

    reset() {
        this.props.name = "John Doe";
        this.props.age = 99;
    }
}

new NameBuilder({}, "#app");