import Komp from "./komp.js";

export class UserCard extends Komp {
    get html() {
        return `<div>
                   <div> Name: {{name.first}} {{name.middle}} {{name.last}} </div>
                   <div> Age: {{age}} </div>
                   <div> City: {{city}} </div>
                </div>`;
    }
    constructor(a,b) {
        super(a,b);
    }
}

const exampleUser = {
    name: {
        first: 'John',
        middle: 'Lee',
        last: 'Doe',
    },
    age: 99,
    city: 'Blackacre'
};

// New card with data will appear in #app element
const exampleCard = new UserCard(exampleUser, "#app");