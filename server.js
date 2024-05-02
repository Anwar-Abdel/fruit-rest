const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const methodOverride = require('method-override');

//------------DATA--------------//
// inside of fruits.js
const {fruits} = require('./models/fruits');
//console.log(fruits);
const {meats} = require('./models/meats');
//console.log(meats);
const {veggies} = require('./models/veggies');
//console.log(veggies);
const {snacks} = require("./models/snacks")
console.log(snacks)
// -----------MIDDLEWARE-------------//
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.use('/', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//add middle for PUT AND DELETE methods

//------------ROUTES-----------------//
//------------INDEX ROUTE------------//

app.get('/home', (req, res)=> {
    // send array as a response
    res.render('home/index')
});

app.get('/about', (req, res)=> {
    // send array as a response
    res.render('about/index')
});

app.get('/fruits', (req, res)=> {
    // send array as a response
    res.render('fruits/index', {allFruits: fruits})
});

app.get('/recipes', (req, res)=> {
    // send array as a response
    res.render('recipes/index')
});

app.get('/meats', (req, res)=> {
    // send array as a response
    res.render('meats/index', {allMeats: meats})
});

app.get('/veggies', (req, res)=> {
    // send array as a response
    res.render('veggies/index', {allVeggies: veggies})
});

//------------INDEX ROUTE------------//
app.get('/fruits/new', (req, res)=>{
    res.render('fruits/new.ejs', {})
})


//----------SHOW ROUTE FRUITS---------------//
app.get('/fruits/:indexOfFruitsArray', (req, res) => {
    let idx = parseInt = (req.params.indexOfFruitsArray);
    if (idx >= fruits.length){
        //res.send('There is no fruit at that index');
        //res.send(fruits);
        res.render('404', {});
    } else {
        //res.send(fruits[idx]);
        res.render('fruits/show', {fruit: fruits[idx]});
    }
});

//----------SHOW ROUTE MEATS---------------//
app.get('/meats/:indexOfMeatsArray', (req, res) => {
    let idx = parseInt = (req.params.indexOfMeatsArray);
    if (idx >= meats.length){
        //res.send('There is no fruit at that index');
        //res.send(fruits);
        res.render('404', {});
    } else {
        //res.send(fruits[idx]);
        res.render('meats/show', {meat: meats[idx]});
    }
});

//----------SHOW ROUTE VEGGIES---------------//
app.get('/veggies/:indexOfVeggiesArray', (req, res) => {
    let idx = parseInt = (req.params.indexOfVeggiesArray);
    if (idx >= veggies.length){
        //res.send('There is no veggie at that index');
        //res.send(fruits);
        res.render('404', {});
    } else {
        //res.send(fruits[idx]);
        res.render('veggies/show', {veggie: veggies[idx]});
    }
});

//------------GET - EDIT PAGE------------//
app.get('/fruits/:id/edit', (req, res)=> {
    const fruit = fruits[req.params.id];
    let id = parseInt(req.params.id);
    res.render('fruits/edit', {fruit, id});
});
 
//------------GET - DELETE PAGE------------//
app.get('/fruits/:id/delete', (req, res)=> {
    const fruit = fruits[req.params.id];
    let id = parseInt(req.params.id);
    res.render('fruits/delete', {fruit, id});
});

//------------POST NEW FRUIT------------//
app.post('/fruits', (req, res)=>{
    console.log('-------- FORM BODY -------\n', req.body);
    // add more code here
    if(req.body.readyToEat === 'on'){
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
    }
    fruits.push(req.body);
    res.redirect('/fruits');
})

//------------PUT - UPDATE FRUIT-------------//
app.put('/fruits/:id', (req, res) =>{
    console.log('------- UPDATE FRUIT ---------\n', req.body);
    if (req.body.readyToEat === 'on'){
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
    }
    fruits[parseInt(req.params.id)] = req.body;
    res.redirect('/fruits'); //redirect to /fruits route to get to index page
});

//------------DELETE - DELETE FRUIT-------------//
app.delete('/fruits/:id', (req, res)=>{
    //remove the fruit item from the fruits array
    fruits.splice(parseInt(req.params.id),1);
    res.redirect('/fruits'); // redirect back to index page (/fruits)
})


app.get("/snacks", (req,res) => {
    res.render("snacks/indexSnacks.ejs", {allSnacks: snacks})
})

app.get("/snacks/new", (req,res) => {
  res.render("snacks/new.ejs")
})

app.get("/snacks/:indexOfSnacks", (req,res) => {
    let number = parseInt(req.params.indexOfSnacks);
    if(number >= snacks.length) {
        res.render("404", {})
    } else {
        res.render("snacks/showSnacks", {snack: snacks[number], idNew: number})
    }
})

//route for edit button

app.get("/snacks/:snackId/editSnack", (req,res)=> {
   // const newSnack = snacks[req.params.snackId]
   // let number = parseInt(req.params.snackId);
   let number = parseInt(req.params.snackId);
   let newSnack = snacks[number]
    //console.log(newSnack)
 res.render("snacks/editSnack",{newSnack: newSnack, editId: number } )
})

app.get("/snacks/:deleteId/deleteSnack", (req,res)=> {
    // const newSnack = snacks[req.params.snackId]
    // let number = parseInt(req.params.snackId);
    let delNumber = parseInt(req.params.deleteId);
    let delSnack = snacks[delNumber]
     //console.log(newSnack)
  res.render("snacks/deleteSnack",{newSnack: delSnack, delId: delNumber} )
 })

app.post("/snacks", (req,res) => {
    //res.render("snacks/new.ejs");
  //  console.log("form body", req.body);
  if(req.body.readyToEat === "on") {
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }
    snacks.push(req.body)
    res.redirect("/snacks")
})

app.put("/snacks/:newId", (req,res) => {
    if(req.body.readyToEat === "on") {
        req.body.readyToEat =true;
    } else {
        req.body.readyToEat =false;
    }
    snacks[parseInt(req.params.newId)] = req.body;
    res.redirect("/snacks")
})

app.delete("/snacks/:delId", (req,res) => {
   snacks.splice(parseInt(req.params.delId), 1); 
   res.redirect("/snacks")
})
//------------LISTEN FOR SERVER-------------//
app.listen(PORT, () => {
    console.log("Server is listening!!!", PORT);
});