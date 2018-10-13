## Background

Can you smell it? It's the aroma of a chemical **react**ion about to unload a whole new programming paradigm.

It's time for **REACT**!

React is - quite simply - a **JS library for building User Interfaces**. It is a great tool for building **SPA**s\* (**S**ingle **P**age **A**pplications), which is what we've been building so far, but in a kind of hacky way.

###### \*In short, an SPA just means that the app re-writes the current page with new data whenever a change is made, as opposed to always asking the sever for a new page (new HTML). You can read more about SPAs [here](https://medium.com/@pshrmn/demystifying-single-page-applications-3068d0555d46).

So far, any time we wanted to display/update information on our webpage (i.e. building our UI), we've used **jQuery**.

Except for lots of things, there's nothing really wrong with jQuery. However, as you've probably noticed by now, it can become a mess to manage when your project grows.

And so The Great and Powerful Facebook has [created React and open-sourced](https://reactjs.org/blog/2013/06/05/why-react.html) it for our use. Amen.

As with any new tech, we _always_ recommend checking out [the docs](https://reactjs.org/), but let's explore ourselves for a bit, shall we?

#### Why React?

If React is just for UI, and we already know jQuery & Handlebars like a rabbit knows alfalfa sprouts, then why bother with it at all?

React is an extremely popular framework that is used throughout the industry.  
You can read about some of the benefits [here](https://www.telerik.com/blogs/5-benefits-of-reactjs-to-brighten-a-cloudy-day), but one of the most touted benefits is React's _speed_.

When we worked with jQuery and proper data flow, **we always re-rendered our _entire_ page's data**.  
While our data-flow was good, if you look at the DOM as something changes, it looks like this:

![](https://s3-us-west-2.amazonaws.com/learn-app/lesson-images/jquery-rerender.gif)

Notice that all the divs have to re-render whenever we delete _one_ element.  
We may not notice any performance issues on small-scale apps, but once our apps become bigger, then re-rendering everything isn't as feasible.

Even just conceptually it makes sense to only update _the thing that changed_, rather than change _everything_.

React comes with what's known as a [**Virtual DOM**](https://reactjs.org/docs/faq-internals.html) - they did not invent this concept (and we'll go more in depth later) - but briefly: the Virtual DOM is a copy of our _actual_ DOM that is **purely a normal JS object**.

Using the Virtual DOM, React does the following:

*   Once an event happens, figure out what needs to change in the _Virtual_ DOM
*   Update the Virtual DOM accordingly (if it needs to update)
*   Compare the Virtual and Real DOM

*   In the comparison, React will look for differences
*   When it finds a difference, it will update the actual DOM in that _one_ location

This may seem like a lot, but ultimately **it is much easier and faster to work with objects than to render the DOM**.

So even though React does some behind-the-scenes work before updating the DOM, it eventually only has to update the relevant element(s) in the DOM.

Here's how the same re-render looks in React:

![](https://s3-us-west-2.amazonaws.com/learn-app/lesson-images/react-rerender.gif)

Notice that only one div is physically affected when we delete an element.

To boil down one of the reasons React is faster, remember this:  
**Rendering the DOM is expensive**, whereas manipulating objects is (generally) much cheaper. **React renders less** and manipulates objects more using the Virtual DOM.

Sure, there are other frameworks that do other things; some better, some worse. But once you learn one framework, picking up another tends to be relatively straightforward, so no need to worry about "only" learning React ;)

So with that out of the way, let's get Reacting.

## What We're Building 

Throughout the React fundamentals lessons, we're going to gradually build the classic game of _Hangman_. The rules of the game are simple:

*   There is a secret word
*   There is a hint for the word
*   The user sees a blank line for each letter in the word
*   Each time the user selects a letter (from the alphabet), it fills up the blank lines _for each_ occurence of the word
*   If the user selects more than 5 letters without guessing the word, the game is lost

Here is a modern depiction of the game:

![](https://s3-us-west-2.amazonaws.com/learn-app/lesson-images/WhatsApp+Image+2018-07-23+at+18.25.04.jpeg)

Our app will not look like this - in fact it will be quite bare-boned. We do this to make it easier to focus on the React fundamentals.

## Setup

To start a new react project we will use **npm** to do a lot of the heavy lifting for us. To that end, we're going to install an npm package called **create-react-app** globally:

`npm install -g create-react-app`
  
This will, you guessed it, allow us to create a react application with all the necessary setup.  

Notice the _global_ `-g` install so that we can use this command from anywhere.

The next part is to use that package, with a name for the project we want to create.  
We'll be building a simple hangman app, so we'll run:

`create-react-app hangman`

**Note**: Since we're working with codio, **you don't actually need this project installed locally** - but you should know how to create react apps on your own for future projects in this course. Plus, since this is your first time working with React, it will be good to get familiar with the file structure.

This might take a while to run. _Hang_ in there. You might have to hit 'Enter' if the loading gets stuck.

![](https://s3-us-west-2.amazonaws.com/learn-app/lesson-images/react-app-loading.PNG)

## File Structure

12 Years later...  
Open up the project using `code hangman` or using whichever editor you use, and let's take a look around:

![](https://s3-us-west-2.amazonaws.com/learn-app/lesson-images/react-basic-file-structure.PNG)

Hoo-wee, that's a heck-of-a setup.

But it's not that crazy. We already know **node\_modules**, **public**, **.gitignore**, **package.json**, and the **README.md**

So really all that's new is the **src** folder and its contents. Of those, we're really only interested (for now) in **App.js** and **index.js**

Before we delve into the actual code, let's run `npm start`\* and see what we have to play with.

###### \*If you check out _package.json_ you'll see that under scripts.start we have react-scripts start - this is what we're executing when we do npm start - this is what actually starts our react application

A few moments after running the command, a new tab should have opened up with a plain "Welcome to React" page. Good start - we now know everything is setup properly.

Ok, let's look at some code.

### index.js

Let's start with the **index.js** file. First, a couple of things:

*   It is a normal JavaScript file
*   You will likely never change it

Except for the `import`s at the top of the file, you should only see this code for now:

```javascript
ReactDOM.render(<App />, document.getElementById('root')); registerServiceWorker();
```

  
Breaking this down:

*   `ReactDOM` gives us high-level methods for operations related to the DOM. One such method is...
*   `ReactDOM.render(...)` - this takes two parameters
    1.  What to render
    2.  Where to render it...and renders the first param
*   `<App />` - this is _what_ we're going to render.

*   Though it looks remarkably similar, **it's not HTML**. It is [JSX](https://reactjs.org/docs/introducing-jsx.html) (a syntax extension to JS which will eventually be used to render HTML) and we'll talk about it properly soon
*   Specifically, it is representing a **component** which we'll also learn about in a sec

*   `document.getElementById('root')` - this is _where_ we're going to render <App />

*   This is plain old vanilla JS. Literally telling it to find something on the DOM with an id of 'root'

*   You can pretty safely ignore the `registerServiceWorker( )` line, though if you're interested in what it does, [here](https://stackoverflow.com/questions/47953732/what-does-registerserviceworker-do-in-react-js) you go.

So where is this root to which we're adding whatever <App /> is?

That's in your **index.html** file - a file you will, again, not really want to touch.

Inside the file, between all the comments, you should see a simple div. This is where everything in our app will render, eventually:

```javascript
 <div id="root"></div>
```
  
To drive the point home, change the `ReactDOM.render...` line from above to this:

```javascript
ReactDOM.render(
    <h1 style={{color:'gold'}}\>Hai.</h1>, 
    document.getElementById('root')
);
```

Now save and go back to your browser and look at that - a golden "Hai."

Of course, we're not going to be writing our JSX inside of this `render` function, but now you see exactly what ReactDOM.render(...) does: take some JSX\*, put it in the element with ID `root`.

###### \*Behind the scenes, React takes this JSX and uses it to generate HTML. We'll go into that soon.

**p.s:** again, JSX is not HTML - it is closer to JS.  
Thus, if we wanted to add a class attribute to the h1 above, we would have to use className (camelCase) instead, like this:

```javascript
ReactDOM.render(
    <h1 className='goldClass'>Hai.</h1>, 
    document.getElementById('root')
);
```
This will be true for event handlers as well ( onClick instead of onclick ), but no need to worry about that right now.

Ok, **reset back to the `<App />` from before**, and let's be off to our next file!

### App.js

This is where the React fun begins.

Following a few imports, we see a **class** called App, which **inherits** from Component

This is just normal OOP that we've already learned! App is an arbitrary name, but good practice, and Component is just another class we're inheriting from - React provides this class for us.

This is one example of why we often say that React is very close to its JS roots - it uses plain JS, no magic here.

What exactly is this class doing...?

```javascript
class App extends Component {
  render() {
    return (/*some JSX*/)
  }
}
```

The class has one **method** called `render`

This method is **required when you inherit from Component**, otherwise all the great React stuff won't work.

You can do whatever you want inside of `render` - it's a normal method after all, **but `render` can only return JSX!**

**Note:** you can return as much JSX as you want _but_ it must all be encompassed within one tag (a `div`, `li`, any)  
**Another note:** generally, we wrap our returned JSX in parentheses to avoid issues with [automatic semicolon insertion](http://www.bradoncode.com/blog/2015/08/26/javascript-semi-colon-insertion/).

Try it yourself. Change some stuff in there. Remove the logo. Play with the text. Add some inline-css (using the `style` property as with the `ReactDOM.render(...)` example above) - you should see all the changes appear on the page each time your save your file!

Ok great. Let's talk a little about **JSX**, then dive into **components**.

### JSX

So what's the deal with the JSX in the **.js** file? Don't we always separate JS and HTML into separate files?

Yes. But,

1.  It's not HTML, it's JSX
2.  React is different like that

We're still separating **concerns**, but we're doing it with separate **_components_** instead of separate files.

**JSX** stands for **J**ava**S**cript **X**ML - and as we mentioned earlier, it is an extension to JS.

This extension allows us to write what _looks_ like HTML (but isn't), but alongside regular JS.

When we write JSX, React will use that to create **React elements**, which are effectively descriptions of where you want to see your data appear on the DOM. React will then read these elements (which are plain objects) and use them to create the DOM for us, and keep it up to date (we'll see how that works later).

One of the main benefits of JSX is that, unlike jQuery/handlebars, we don't have to "chase" our DOM in order to create/update it. When we use JS to work with our DOM, we can be certain that the logic we write will apply directly to the parts of the DOM that are relevant.

Check out this example:

```javascript
class App extends Component {
  text = 'dynamically'
  render() {
    return (
      <h1>Going to display some text...{this.text}</h1>
    );
  }
}
```

Don't worry too much about what a Component is yet, but look at what the above code produces:

![](https://s3-us-west-2.amazonaws.com/learn-app/lesson-images/react-simple-binding.PNG)

Holy wack unlyrical lyrics Andre, you're reacting right!

We did a few things here.

*   Define a text parameter for the class

*   Later we'll do this differently, but for the example it's fine

*   Insert text\* (our data) _as part of_ our JSX, exactly where we want it to appear on the DOM

*   In this case, we want it in between the h1 tags

*   Wrap text with curly braces { }

*   This is JSX's way of identifying JS expressions
*   We could put any valid JS expression in these braces - operations, function calls, whatever

Notice that we had to use `this.text` - that's because `text` is a **class-level** variable, and must be referenced accordingly using this

**Also note:** we **cannot** have logic such as if-statements or for-loops inside of JSX. We **can** have logic like ternary operators and iterators, which we'll see later on.

**Spot check:** create another method inside of App called getStuff  
This method should return some text. Call this method in render using a JSX expression to render the text. Try it yourself for a minute then have a peek at the solution down below:




```javascript
class App extends Component {
  getStuff = () => "Wild function'ed text"

  render() {
    return (<h1>Stuff: {this.getStuff()}</h1>)
  }
}

export default App;
```

This is much better than the old jQuery/Handlebar days - or worse, actually doing something like `document.getElemenById("..").innerHTML = ...`.  
Ha - new age!

## Components

Ok so finally, what exactly is a component?

On a high level, a component will represent a part of our app that shows some data to the user.

If we had a restaurant app, we might have a component for the entire menu, and then sub (children) components for each menu item. We'll talk more about component-hierarchy soon.

Here is a more formal definition of a **component**, per the [docs](https://reactjs.org/docs/components-and-props.html):

_Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen._

We'll talk about props in the next lesson, but the **React elements** returned are exactly what we have inside of our component's return statements - in our case, the JSX we wrote!

React handles all the "put-this-data-on-the-DOM" part - we just have to create a component that describes _where in the DOM_ it should go once it's rendered.

Another benefit of components is that **once we create one, we can re-use it** anywhere in our app.

A component, as we saw, is just a class that inherits from Component. If we define our components well, then much like normal classes, they should be independent and data-oriented, and therein lies their re-usability.

* * *

Final thing about simple components for now.  
At the end of the **App.js** file you'll notice this bit:

```javascript
export default app
```

This is exporting the class we created above, and is important because otherwise we could not access it from other files!

In fact, comment out that line and then look back at your page. See this?

![](https://s3-us-west-2.amazonaws.com/learn-app/lesson-images/react-no-export-error.PNG)

Exactly what we said before. In the **index.js** file - the file that is trying to use <App /> - we get an error!  
Look at this **import** at the top of index.js:

```javascript
import App from './App';
```

It's not messing around; if we don't **export** App, how can anyone **import** it?  
Lesson learned: **you must export all your components so that others can import it.**

**Spot check:** create your own component (in **App.js**)

*   Define two class-level variables, num1 and num2
*   You should render the sum of the two numbers in a simple div
*   Change (for this practice only) the **index.js**'s ReactDOM.render(...) to render your component instead of App
*   Don't forget your export/import ;)

Try doing it on your own before looking:

```javascript
//index.js
import Sum from './App'
ReactDOM.render(<Sum />, document.getElementById('root'));


//App.js
class Sum extends Component {
  num1= 57
  num2 = -12
  render() {
    return (
      <div>The sum is {this.num1 + this.num2}</h1>
    );
  }
}

export default Sum;
```

## More Components

Alright. From this section and henceforth for this lesson, **you should be working with the code setup provided by Codio.** 

Alternatively, you can work **using the intro branch** of [this repository](https://github.com/Elevationacademy/react-hangman) on your own editor, but you'll have to copy-paste your results in the end to complete the exercises. 

##

Now, even though we saw that we can put any JSX inside `App`'s `render` function, we're going to do something a little different.  
We're going to load **child components** in there, instead.

React is _built_ around components. If we put all our JSX in one place, it would defeat the purpose.  
Let's think about the components we'll need for our hangman game.

*   A component to show the remaining guesses
*   One to show the \_ \_ \_ \_ and fill up with letters
*   One for the letters we can choose

For now that should be enough.

Starting with the last one, we can break it down some more:

*   A component to hold all our letters
*   A component that represents a single letter

A component for a single letter may seem extreme. Indeed, _how small should we make our components?_ is a popular question. Some will say _as small as possible_ - but that's more of a buzz-phrase than concrete guidance.

The React docs themselves have a nice [Thinking In React](https://reactjs.org/docs/thinking-in-react.html) section which is worth checking out - but the short of it is that you should make your components small enough so they are maintainable and serve one specific purpose.

Back to our components, in our **App.js** (remember, **you should be in the Codio environment**), start by clearing everything before adding `<Letters />` inside the `render` function's **return**. Right now, of course, it won't do anything (except throw an error) because `Letters` doesn't exist, but we'll create it. 

This is how your updated `App` class should look it:

```javascript
class App extends Component {
  render() {
    return (
      <Letters />
    );
  }
}
```

Notice that `<Letters />` is ultimately just JSX! It represents a component which will return some JSX, thereby keeping this `App` component clean.

Naturally, we should now make the `Letters` component.

To keep things organized, we've **created a `components` folder inside of the `src` directory** - and created an empty `Letters.js` file in there - this is good practice.


Notice that we use a **capital letter for component files** by convention.

Alright, as for the `Letters.js` file - it should look very similar to `App.js` except with a different class & export name.  

In the `render`'s **return**, return a simple `div` with some text. After you've tried, have a peek [at this pen](https://codepen.io/ElevationPen/pen/pxwjzO?editors=0010) to make sure you got it right.

Once you've done that, save and look at the webpage and --- figure out how to solve the error ;) Notice **where** the error is happening and **what** the error message means. 


Hint (highlight to see): <span style="color: transparent">Letter's is not defined... hmm, but we just created a Letters component. Who needs to know about this component? How do we let it know?</span>

Solve (higlight to see): <span style="color: transparent">We need to import Letters in App.js! `import Letters from './components/Letters';`</soan>

And Lo! Our component has appeared.

## Functional Components

So far we understand a component to be just some class that returns some JSX to render some stuff. Quite something.

Soon, we will introduce something called **state** that will make the big hoo-ha of React make sense. Some components either have a state or affect a state.

But in certain situations, a component can be _so simple_ that it doesn't have or affect **state** at all. For these cases, we don't need a class, not to mention the Component inheritance, or even the render method.

These components - whose sole job is to render something on the page - are called **functional (stateless) components**\* because, and here's the punchline, they're just functions:

###### \*These are also known as **presentational components**, as opposed to our other **container components** that do have/affect **state**

```javascript
const Banner = function () {
    return (<div className="banner">THE LOGO</div>)
}
```

If you comment out your `App` component and place `Banner` in its place (and of course, export it) - you'll see the simple banner `div` rendered on the page. 

**Spot check:** do that to see it work. Then rewrite it as a single-line _arrow_ function. Then revert back to the original `App`

See the solution [here](https://codepen.io/ElevationPen/pen/YJQyMY?editors=0010)

You could make the case that so far (and possibly in the exercises) our components could all be functional - and that might be true, but they will become more intricate, so keep them as they are for now (unless otherwise stated) =]




