const meats = [
    {
        name: "Chicken Breast",
        type: "Poultry",
        readyToEat: true
    },
    {
        name: "Beef Steak",
        type: "Beef",
        readyToEat: true
    },
    {
        name: "Salmon Fillet",
        type: "Fish",
        readyToEat: true
    },
    {
        name: "Pork Chop",
        type: "Pork",
        readyToEat: false
    },
    {
        name: "Lamb Chop",
        type: "Lamb",
        readyToEat: false
    },
    {
        name: "Turkey Breast",
        type: "Poultry",
        readyToEat: false
    },
];

module.exports = {
    meats,
}
// I can now import this into another file