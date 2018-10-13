## Recap

Alright, so far we've played with components a little - but we still haven't done anything very interesting. Remember,

*   We want to break components down to fundamental parts of the app
*   Components can be nested to create parent-child relationships, like normal HTML
*   We must **export** and **import** our components accordingly

Here is [a repo](https://github.com/Elevationacademy/react-hangman/tree/props) - make sure you're in the `props` branch - with the setup you should have based on the previous lesson, in case you want to compare. You can clone it, or keep working from your own if you're up to speed.

Of course, remember that eventually everything needs to go in the Codio files.

Anyway, now we want to start interacting between components. Specifically, we want to pass data from one component to another. To do this, we need to talk about **props**. But first, a little setup in our `Letters` component...

* * *

## Setup

In our last lesson, we created - among others - a `Letters` and `Letter` component. Intuitively, we would like `Letters` to hold all the letters of the alphabet, and then let the `Letter` component display each one.

Initially, you'd think we would start by creating an array with all the letters of the alphabet - but to save you a headache later on, we're going to instead create an _object_.

This object will map each letter to its current status, i.e whether the user has selected the letter or not ( false by default ). So let's create a `letterStatus` object inside of **Letters.js**. Where exactly do we write non-JSX code in this file?

Remember, `Letters` is a **class**, so we can define **properties** at the _class level_, but any logic has to be within a **method**. As such, here is a `generateLetterStatus` method that creates this object for us:

```javascript
generateLetterStatus() {
  let letterStatus = {}
  for (let i = 65; i < 91; i++) {
    letterStatus[String.fromCharCode(i)] = false
  }
  return letterStatus
}
```
  
You can explore this method\* if you like, but this is a React lesson so don't burn too much time on it.

###### \*Part of the trick uses [ASCII characters](https://www.asciitable.com/). For instance, the number 65 represents the letter "A" in ASCII, 66 represents "B", and so forth until 90 which represents "Z".

Now when we call `generateLetterStatus`, we'll get this:

```javascript
{  
  "A": false,
  "B": false,
  ...
}
```

Which is great for finding any letter's status really fast - in **O(1)**, in fact!  

###### We'll see the false in action, and when it changes to true in the next lesson.

Great, now let's go back inside the `render` function and get that object:

```javascript
render() {
    let letterStatus = this.generateLetterStatus()
    //more render stuff
}
```
  
Remember, we're still in a **class**, hence the `this` to access the method. We still won't see anything different, but we'll get there in a sec.

* * *

## Props

Ok. Now we have an object of letters, and we want to start displaying them. But we want our `Letter` component to display each letter. That means we need to _pass some data down_ to the `Letter` component.

The way we pass data _down_ in React (i.e. from a **parent** to its **children**) is by using `props`.

`props` is short for **properties**, and it is something **built-in to every react component**.

The process starts from the parent. Before, when we wanted `Letters` to render `Letter`, we did something like this inside of the `Letters` component:

```javascript
render() {
  return (
    <div>
      <Letter />
    </div>
  );
}
```

Now if we want to pass some data down, we just have to do this:

```javascript
return (
    <div>
        <Letter letter="A" />
    </div>
);
```

What we're doing here is passing a variable called `letter`, whose value is `"A"` to the `Letter` component.

And to access that variable in the `Letter` component, we'll use the built-in **props**, like this:

```javascript
class Letter extends Component {

  render() {
    return (
      <span>{this.props.letter}</span>
    );
  }
}
```

Now if you refresh the page you'll see the letter "A" appear!

Here we've accessed the props in `Letter`, which is a child component of `Letters`. The parent _gave_ its child a letter, and the child simply displayed it - it's pretty similar to a function that receives an argument and does something with it!

As per the react [docs](https://facebook.github.io/react-native/docs/props),

_Most components can be customized when they are created, with different parameters. These creation parameters are called **props**._

And that's what we saw above. The `letter` is a **parameter** of any `Letter` component we create.

* * * 

Of course, we don't have to hard-code each letter. Passing strings is pretty straightforward, but to pass a variable down we'll have to wrap it in curly braces, like this:

```javascript
const letter = "A"
return (
    <div>
        <Letter letter={letter} />
    </div>
);
```

This will have the exact same effect as before, but we add the curly braces so the JSX knows that `letter` is a variable.

That's well and fine for a single letter, but we don't want to copy paste the above several times, and we _have_ a `letterStatus` object at our disposal, so let's see a more elegant solution.

* * *

### Mapping Props

First thing's first, since `letterStatus` is an object whose _keys_ are the letters, we have to use `Object.keys` to extract those into an array\*. That will make looping over them simpler:

###### _Yes_, it's a little strange to use an object when we need an array - but we guarantee the object will come in handy later. Trust.

```javascript
Object.keys(letterStatus) // result is ["A", "B", "C", ...]
```

Our goal is to generate the following code programmatically instead of via copy-pasting:

```javascript
const letters = Object.keys(letterStatus)
return (
    <div>
        <Letter letter={letters[0]} />
        <Letter letter={letters[1]} />
        <Letter letter={letters[2]} />
        //...
    </div>
);
```
  
Note, the above _will_ work - but it's just wrong. Please don't do this. Please eat a teaspoon of salt if you ever do this.

One way we could create the above is to **use a for-loop to generate each of those lines** - remember, we're dealing with **JSX** here - we're allowed to combine JS and "HTML" freely. Try to think of a solution using a for loop which, of course, should be in a separate method.  
  
Go ahead and create a `generateLetterTags` method - it should take `letterStatus` as a parameter.

**Hint:** The following is legitimate. That is, you can create an array of Letter components and wrap _them_ with curly braces. This will work:

```javascript
render() {
    return (
        <div>
            {[<Letter letter="A" />,
            <Letter letter="B" />]}
        </div>
    );
}
```

Now it's up to you to **define a `generateLetterTags` method that returns an array of `Letter` components by looping through `letterStatus`'s keys** (using `Object.keys`). Don't forget your curly braces. 

Give it a go and then check out [this solution](https://codepen.io/ElevationPen/pen/LgjoNr?editors=0010#) on codepen.

Now that we have this method, we can go back to our `render` function in `Letters` and combine our `letterStatus` object and `generateLetterTags` method, like so:

```javascript
render() {
    let letterStatus = this.generateLetterStatus()
    return (
        <div>
            <div>Letters will be here</div>
            {this.generateLetterTags(letterStatus)}
        </div>
    );
}
```

Save and look at your page - all the letters are there!

And you know what's crazy? We haven't touched our `Letter` component since we told it to render using **props** - that's because it doesn't care about anything except for what it should display. Talk about separation of concerns.

Ok so the above was nice, but we can make it nicer. A whole `for` loop just to generate a simple list is excessive, and really all we're doing is **mapping** each letter to a different format. That is, changing `"A"` to `<Letter letter="A"/>`

To that end, let's use our old `map` friend provided by our friendly neighborhood ES6. Let's change the `generatLetterTags` so it looks like this instead:

```javascript
generateLetterTags(letterStatus){
    return Object.keys(letterStatus).map(l => {
        return (<Letter letter={l} />)
    })
}
```

First, that looks much nicer. Let's break it down real quick:

*   `map` will iterate over something (in this case our `Object.keys(letterStatus)` array - which is just all our letters)
*   Do something with each item (the `l =>` above indicates that) - in this case, create the `<Letter...` tag
*   Finally, return a new _array_ with all our tags - `map` always returns an array

The two `returns` may be a little strange, but they make sense:

*   The inner one returns each letter's new form (inside a `Letter` tag)
*   The outer one belongs to the function, and returns an array of all of the letters' new forms

Nice.

We'll be using `map`s henceforth with React, so make sure you're comfortable with them.

* * *

### Props for Functional Components

There is nothing stopping us from passing parameters down to functional components, either.

The passing is done exactly as before, but on the receiving side (in the functional component), we do **not** use `this.props`

Instead, we just receive the `props` as almost-normal function parameters, like this:

```javascript
//Parent
let someData = "Oliver"
<FunctionalComponent props={someData} />

//Child
const FunctionalComponent = function(props){
  console.log(props.props)
  return (<div>Got this data: {props.props}</div>)
}
```

We have to access `props.props` because properties gets sent down as an object.

That said, we can use [**ES6 Destructing**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) to clean up our code a bit. Notice the function parameter in this one:

```javascript
//Parent
<FunctionalComponent data={someData} />

//Child
const FunctionalComponent = function( {data} ){
  console.log(data) //no need for braces
  return (<div>Got this data: {data}</div>) //JSX always needs braces for expressions
}
```

Either way, the key in the parent ( `data=...` ) **must match** the parameter name in the child ( `{data}` )

* * *

### Prop Keys

For the eagle-eyed, you will have noticed that though the `generateLetterTags` code from before works just dandy, we get the following warning in our console:

`Warning: Each child in an array or iterator should have a unique "key" prop.`

We could be reckless and ignore the warning, but that might bite us in the butt eventually.

What the warning is telling us is that when we pass "an array or iterator\*" to a child (to `Letter` in our case), we should somehow make it unique. And it even tells us to make it unique by using a `key` props.  

###### \*iterators are just data structures that can be iterated over

Just like we passed `letter = { l }` before, we can do the same thing with `key`:

```javascript
generateLetterTags(letterStatus){
    return Object.keys(letterStatus).map(l => {
        return (<Letter key={l} letter={l} />) //notice the key property we're passing
    })
}
```

This both takes care of the warning, and gives us a simple way to access each letter.

Also notice we just passed more than one property at the same time - definitely legal and acceptable to do.

* * *

## State

Knowing how to pass things from a parent to a child is fundamental to React. This is known as a **top-down** approach to data flow, and one of the benefits is that **children components are not aware of their parents** - this allows us to reuse them anywhere so long as they receive the data (props) they need.

To take full advantage of React's top-down approach though, we have to introduce something called **state**.

From [Thinkster](https://thinkster.io/tutorials/understanding-react-state),

_State is an object that determines how \[a\] component\* renders & behaves_.

###### \*and, possibly, its children

In other words, it is where we will store component-specific data to be displayed.

- hold on to this definition for now; we'll see what it means as we go along.

Remember how we said earlier that there is another component aside from `Letters` that will want access to all our letters?

![](https://s3-us-west-2.amazonaws.com/learn-app/lesson-images/hangman-mult-letter-use.PNG)

If we think of both the top and bottom parts as separate components, then _both_ of them need to know about the _state_ of the letters at any given time. The top part needs to know which letter to display, the bottom part needs to know which letter to fade-out. Hence, **state**.

Because both of them need to know about the letters, and because we're using a **top-down** approach to data flow, then it follows that we should store our state in `App.js` - the component that is the **parent** of both `Letters`, and the other component we haven't created yet.

**Note:** we do **not** always want to store our state in `App`. State should be stored at the _closest common parent_ component - in our case, it just so happens that `App` is that component.

**Another note**: remember functional vs. container components? This is the **state** we were talking about. Any component that **doesn't** have its own `state` can be a functional component.

* * *

Go on to your `App.js` file and - before the `render` method - create a `constructor` (regular OOP) inside the class. Inside the constructor, call `super`, and then add the following:

```javascript
 this.state = {
   letterStatus: {}
 }
```

If you've forgotten your class syntax, or just want to verify you did it right, take a peek [here](https://codepen.io/ElevationPen/pen/LgjobB?editors=0010):

Now, of course, we need to populate that `letterStatus` object - but we already have a function for that - so go ahead and cut that out from `Letters` and paste it into `App`. (This will break your app for now. Don't Panic)

At this point, `App.js` should look like this:

```javascript
class App extends Component {
  constructor() {
    super()
    this.state = {
      letterStatus: {}
    }
   }

  generateLetterStatus() {
    let letterStatus = {}
    for (let i = 65; i < 91; i++) {
        letterStatus[String.fromCharCode(i)] = false
    }
    return letterStatus
}

  render() {
    return (
      <div>
        <Score />
        <Letters />
      </div>
    );
  }
}

export default App;
```

Because `App` is nothing more than a class, when React loads it, it will first (as all classes do) load its constructor and any attributes therein. Thus, instead of `letterStatus: { }` we'll now have:

```javascript
constructor() {
  super()
  this.state = {
    letterStatus: this.generateLetterStatus()
  }
}
```

By doing this we've set our **initial state** in the constructor, which really makes a whole lot of sense.

You might be seeing some errors now, so to make everything work again we need to do a couple of things:

*  Pass the `letterStatus` object from the `state` to the `Letters` component

*   Since state is just a normal object, you should use `this.state.letterStatus`

*  Inside the `Letters` component, remove the call to the `generateLetterStatus` function, and instead replace it with `this.props.letterStatus`

You should be able to do this on your own. Please refer back to the **Props** section and try it out before checking against [this solution](https://codepen.io/ElevationPen/pen/OBjYQP?editors=0010) on codepen.


It may seem odd to make all these changes right now (the app works exactly the same as it did _before_ we had **state**), but we will see exactly where the benefit of state comes into play soon. In particular:

*   State allows us to have **one source of truth** for our data
    *   We have _one_ place where we store our information, and everyone who needs access to it will get it from there


*   State helps us keep our **top-down** approach to data flow
    *   The data will always flow down from the state in the parent to (the props in) the children


*   State allows us to seamlessly update the DOM by _only_ changing data in `state`

* * *

### Note about State & Props

Though we often pass data from one component's `state` to its children, and the children retrieve that data using `props` - **the two are not related at all!**

A component's `state` is simply used for data storage that will determine the behavior/rendering of that component.

---

### Updating State & (briefly) Events

We'll see more usage of this in the next lesson, but let's look at how we can update the `state` and the consequences thereof. The following example will be the **basis** for the next part of our hangman game, but **not** the actual way to do it.

We will eventually want to let the user "guess" a letter, which means it should be removed from the select-able letters, as per the rules of hangman.

So for now, we're going to create a button in `App` that removes the first letter of the `letterStatus` object each time its pressed. Again, this is **not** exactly how we'll do it, but for now go ahead and **add a `button` (standard "HTML" button) to your `App` component's `render`**. It should have a `click` event handler.

Now, instead of adding the `onclick` event that we know, React will have us using `onClick` (camelCase) instead - that is because this is JSX and not HTML. Another difference is that we will have to use `this` again to call the function - remember, we're still in a class. Ultimately, your button code should look like this:

```javscript
<button onClick={this.deleteLetter}>Remove First</button>
```

###### **Note:** we're _not_ invoking the function in the `onClick`

Of course, we should create this function. So for now just add this to your class to make sure it works:

```javascript
deleteLetter(){
  console.log("A rhino is under my desk")
}
```

Save, click, make sure it's printing what you want.

Ok, for the actual code, we're going to have to deal with `state`. Since `state` is a class attribute, we're going to want to access it with `this`, right? Checkout what you see when you `console.log(this)` inside of `deleteLetter`, though.. it's undefined! Check it out for yourself.

The reason `this` is currently undefined is because **a React component does not automatically bind methods to itself** - for reasons we're not going to get into right now, we have to bind methods to their components ourselves. And we're going to **use ES6 arrow function syntax** to do that. Change your `deleteLetter` function to look like this:

```javascript
deleteLetter = () =>{ //slick ES6 syntax that automatically binds this for us. Yuh.
  console.log(this)
}
```

###### Note: there are [other ways](https://medium.freecodecamp.org/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56) to bind `this`; worth looking into.

And look at that, we see some interesting stuff in the console!

Most notably, we see that we have access to `state` through `this` now.

To complete our `deleteLetter` function, you may be tempted to do something like this:

```javascript
const letters = Object.keys(this.state.letterStatus)
const firstLetter = letters[0]
delete this.state.letterStatus[firstLetter] //this is modifying the state directly. Bad.
```

<span style="color: red">↑Don't do that↑</span>
---------------

Sure, sometimes that will work, but it can lead to bugs that will be hard to track down. See [this](https://daveceddia.com/why-not-modify-react-state-directly/) for a more **in-depth explanation of why not to modify `state` directly**.

* * *

### setState

The **only** way you should **ever** modify the `state` is using React's built-in `setState` method.

This method is built-in to every component, and is accessed through `this`:

```javascript
this.setState({propertyName: newValue})
```

The `setState` method takes an object whose key\* is some key in the `state` to be modified, and whose value is the updated value for that key.

###### \*It is possible - and encouraged - to update multiple keys at once (instead of calling the method multiple times)

In short, when we use `setState`, React will - among other things\* - update the DOM for us, according to the new state.

###### \*There's more going on in setState which is outside the scope of this lesson, but see [here](https://medium.com/@baphemot/understanding-reactjs-setstate-a4640451865b) for a good article.

When we use `setState`, we often need the property's current value to start with.  
For instance, if we have a `Bank` class which has a `money` property in its `state`, and we want to double it, we need to access `this.state.money` first.

It is perfectly valid to do this:

```javascript
this.setState({money: this.state.money * 2})
```

Note that we are **not** modifying the `state` directly. We are merely accessing the `money` property, and multiplying it by 2. The modification is handled by `setState`

**However**, say we had a `clients` _array_ as a property of `state`. And say we wanted to remove the last item in that array. We should **not** do this:

```javascript
let currentClients = this.state.clients
currentClients.pop()
this.setState({client: currentClients})
```
  
This is bad because because `this.state.clients` is an array, which is a [reference type](https://codeburst.io/explaining-value-vs-reference-in-javascript-647a975e12a0) - that means that even though we've created a new variable, `currentClients`, any modifications we make to that (the `.pop()` on the second line) will still affect the original array in `state`, as well.

Check out [this codepen](https://codepen.io/ElevationPen/pen/MqBNjP?editors=1010) that shows how to use the [ES6 spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) to avoid this problem.

* * *

Back to our game, we'll be doing this:

```javascript
deleteLetter = () => {
  let letterStatus = {...this.state.letterStatus}
  const letters = Object.keys(letterStatus)
  let firstLetter = letters[0]  

  delete letterStatus[firstLetter]

  this.setState({ letterStatus: letterStatus }) //the right-hand side is the updated object!
}
```

1.  Create a new temporary variable, `letterStatus`\*
2.  Get the letters using `Object.keys` like we have been doing
3.  Use the `delete` keyword to remove the first letter from `letterStatus`
4.  Call `setState` with an updated object

*   The **key** should be the item in the `state` we wish to change
*   The **value** should be the updated value of whatever we're changing

###### \*Note the use of the [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) - this guarantees we do not modify the original state's letterStatus. Remember, objects (letterStatus. is an object) are also [reference types](https://codeburst.io/explaining-value-vs-reference-in-javascript-647a975e12a0).

We'll go more in-depth about this later on, but for now save, and go click on your button to see the letters vanish!

---

Take note of this _very cool thing_ that just happened: we've changed the DOM by _only_ changing the state. No explicit calls to any elements, no crazy code backflips; just change the one piece of data we want to change, and let React take care of the rest.

Remember our definition of `state`?  
_an object that determines how a component renders & behaves_

That's exactly what's happened here. Our `Letters` components pass down each letter to the `Letter` component, _according to the letters available in state_! This is fundamental React: **our components only render the current `state`, ever**.

* * *

### setState + Callback

Something we haven't mentioned yet but will be relevant soon: **`setState` is asynchronous**.

That means that once we call `setState`, we can't write another line of code immediately after and expect it to be up-to-date with the new `state`

Go over to [this codepen](https://codepen.io/ElevationPen/pen/WgXBqY) to see this in action.

Notice that the alerted `this.state.num` lags behind the true value of the updated `num`, _even though_ the alert comes after we invoke `this.setState`

Generally, this shouldn't be a problem if we architect our code right, but sometimes we need to deal with updated state right away.

For that, like with many asynchronous solves in JS, we need to use a **callback**.

Yup, `setState` has a second - optional - parameter for a function to be invoked once the state is done updating.

Go ahead, try this yourself in the codepen - make code alert the correct `num` in the `state`.

After you've tried yourself, check out [this pen](https://codepen.io/ElevationPen/pen/GYvaBR?editors=0010) to see the change you need to make to get it to work.

