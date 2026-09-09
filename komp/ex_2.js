import Komp from "./komp.js";

class UserCard extends Komp {
    get html() {
        return `<div>
                   <div> Name: {{name.first}} {{name.middle}} {{name.last}} </div>
                   <div> Age: {{age}} </div>
                   <div> City: {{city}} </div>
                </div>`;
    }

    updateExample() {
        // By single property
        this.props.age = 24;

        // Or few at once.
        // Missing properties (name.middle in example) will remain untouched
        this.props.name = {first: 'Mike', last: 'Evans'};
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

const exampleCard = new UserCard(exampleUser, "#app");

exampleCard.updateExample(); // DOM will be updated with new props values
exampleCard.props.name.middle = '"Badboy"';