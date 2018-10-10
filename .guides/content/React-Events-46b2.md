## Recap

The things we now know:

*   What components are and how to make them
*   How to nest components

*   and therefore how to load children components from a parent component

*   JSX: the unorthodox-but-whatever-it's-the-20th-century marriage of JS and HTML
*   How to pass data _down_ from a parent to its children

*   and how to get that data in the child through props

*   What state is

*   and how to use it as well as setState
*   and that we can have local state as well

*   The top-down approach to data flow in React

There are a few more basics to go over before we wrap up React fundamentals. It's important you understand the above before moving forth. So make sure everything is clear, and then let's finish up our React foundation.

If you want to make sure you're on track, or just start clean, clone/fork an [updated version of the Hangman code](https://github.com/Elevationacademy/hangman-class/tree/props-and-state) (make sure it's the `props-and-state` branch) with which you should be starting this lesson.

In this lesson, we will talk about sending data back _up_ the component tree - i.e. from a child back to its parent, or its grand-parent, or its neanderthal ancestor - _up, up, and away!_


## Data Flow Problem

It's great to have a top-down data flow because that assures us we only have one source of truth to all our data, and only one place where a change can take place. This change will update the DOM accordingly for us, and we need not worry about messing with DOM manipulation ourselves.

However, we're missing something. What happens if I want one of the _children_ to trigger some change?

![](https://s3-us-west-2.amazonaws.com/learn-app/lesson-images/hangman-mult-letter-use.PNG)

Think about the hangman game we're building. When the user clicks a letter, we want _that_ letter to be removed - i.e. show some visual cue that it's been pressed - **and** we want it to appear elsewhere.

But the letter is in our `Letter` component - that's a grand-child of where our `state` is, which holds our `letterStatus` object.

So how does a single letter component trigger a change in `App`'s state? That would be quite the event...

## Events

Remember that we send data downwards. But we can also send other things downwards. Specifically, **a parent can send functions down to its children** pretty much the same way it sends other data.

If you recall, in our `App.js` we have a `deleteLetter` method that - when invoked - removes the first letter of the `letterStatus` object. Before, we had a button click triggering that function. Instead, let's **pass the function down** to the `Letter` component and have the _letter_ itself invoke it.

Given the following two notes, you should be able to figure out how to pass the `deleteLetter` function down to the `Letter` component and invoke it `onClick` of a letter, on your own:

1.  You can pass a function the same way you pass anything else
2.  You can access the function through `props` the same way you can access other data passed down

###### Note: you'll have to pass the function down _twice_, from the `App` component to the `Letters` component, and from `Letters` to `Letter`

Tried? Succeeded? Partially succeeded? Didn't quite make it? Wallowed in misery at the deluge of errors?
Either way, take a look at one possible solution:

**App** - pass the function to the Letters component, just like we pass the letterStatus

```javascript
<Letters letterStatus={this.state.letterStatus} deleteLetter={this.deleteLetter} />
```

**Letters** - same deal

```javascript
generateLetterTags(letterStatus){
    return Object.keys(letterStatus).map(l => {
        return (<Letter key={l} letter={l} deleteLetter={this.props.deleteLetter} />) //note that we're passing it to *each* letter
    })
}
```

**Letter** - invoke the funtion on click! Just like we originally had with the button code

```javascript
render() {
    return (
        <span onClick={this.props.deleteLetter}>{this.props.letter}</span>
    );
```

Hey hey, you've just changed the state from the child! Check it out in the browser - click any letter and watch the first letter dissappear.  
  
To recap what happened, check this flowchart out.

###### No MS Paint was harmed in the making of this chart

![](https://s3-us-west-2.amazonaws.com/learn-app/lesson-images/react-data-flowchart.PNG)

Just like the image at the beginning of the lesson: <b>data</b> (in the above, the <code>deleteLetter</code> function) <b>goes down, and events</b> (the invocation) <b>come up</b> - and when the events cause a change in the <code>state</code>, React will re-render our DOM accordingly and automatically.

If you ask me, that was pretty... _eventful_.

## Hangman!

We finally have enough React knowledge to make our game work!

And that means we can finally talk about why we wanted a `letterStatus` object as opposed to just a `letters` array.

Think about this: when the user selects a letter,

1.  it should have some visual marking on it that marks it as selected - this will come from `Letters`
2.  if that letter is part of the secret word, then it should appear in the `Solution` section - and be invisible otherwise

As such, both `Solution` and `Letters` need to display their letters differently _depending on whether the letter was selected_. That means we need to know the _status_ of each letter at any given time. Hence, **letterStatus**. Let's see this object in action.

Since we want to _style_ our letters different, and since we like to keep all our styling in CSS, we're going to pass a **styleClass** property to each `Letter`. Check this out:

```javascript
generateLetterTags() {
    const letterStatus = this.props.letterStatus
    return Object.keys(letterStatus).map(l => {
        return (<Letter
            key={l}
            styleClass={letterStatus[l] ? "selected" : null}
            letter={l}
            deleteLetter={this.props.deleteLetter} />)
    })
}
```

A few things we've done:

*   Changed the **function signature** - the function no longer receives `letterStatus`, but rather it gets it by itself from `props`
*   Split our `return` to several lines for clarity - this is why we wrap our return value in parentheses, by the way

*   See the section about Automatic Semicolon Insertion in the JS docs [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return) to find out why it wouldn't work otherwise

*   Added a `styleClass` property - we will use this inside of `Letter` to determine what styling to give each letter

What we're doing is passing down the `styleClass` property _conditionally_ - that is, if `letterStatus[l]` resolves to `true`, we'll pass the string `selected`, otherwise we'll pass `null`

This is why we have a `letterStatus` object! Imagine we only had an array of letters - it would definitely be more complex to determine which `styleClass` to send down.

###### If you're confused about the **ternary operator** (the question mark syntax), just think of it as a sentene:  
_Is letterStatus of  _l _true ? If so, send 'selected', otherwise send null_  
Read about about ternary operators [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) if you like.

That means, of course, that we need to receive this new property inside of `Letter` from `props` - we'll get to that in a bit.

In the `Solution` component, you should directly send a `styleClass` of "solutionLetter" - but you should _conditionally_ send the `letter` parameter.

If the `letterStatus` is `true`, send the letter; otherwise, send an underscore space: `"_ "` as a placeholder. Try it out yourself, and see this to make sure you got it:

```javascript
generateLetterTags() {
    return this.state.word.split("").map(l =>{
        return (<Letter 
        key={l} 
        styleClass="solutionLetter" 
        letter={this.props.letterStatus[l] ? l: "_ "} />)
    })
}
```

Ok, time to get those style classes and do something with them. Into the `Letter` component we go. Checkout this updated `render`:

```javascript
render() {
    return (
        <span
            className={this.props.styleClass} onClick={this.deleteLetter}>
            {this.props.letter}
        </span>
    );
}
```

All that's really changed is that we've added `className` (remember React likes camelCase) and accessed the `styleClass` that its parent gave it, using `props`!

The `Letters` parent will send a string of `selected` or `null`, and the `Solution` parent will always send `solutionLetter` - all those option, and our `Letter` component couldn't care one bit. It just wants a `styleClass` so it can know which `className` to assign!

Add some styling in `index.css` to see the effects for yourself ;)

* * *

Now let's talk about the `deleteLetter` method which we used as an example of how a child can access a parent.

Of course, we don't want to **delete** a letter, we want to **select** one, and then in `App` change its status from `false` to `true`.

So first thing's first, we'll want to **change the `deleteLetter` method in `App` to a `selectLetter` method**.

*   The method should accept one parameter, a letter
*   It should make a copy of the `state`, like it did before
*   It should change the letter's status to `true` inside `letterStatus`
*   It should call `setState` with the updated object

You've got this!

```javascript
selectLetter = (letter) => {
  let letterStatus = {...this.state.letterStatus}
  letterStatus[letter] = true
  this.setState({ letterStatus: letterStatus })
}
```

Next, inside of `Letter`, we don't want to directly call `selectLetter`. We need to call it and pass the selected letter - as per the function signature we just created.

As such, instead of `onClick` calling the method from `props` directly, we'll call an internal method in `Letter`, like so:

```javascript
class Letter extends Component {
    selectLetter = () => { //new method we're adding to this class
        this.props.selectLetter(this.props.letter) //calling App's selectLetter
    }
    
    render() {
        return (
            <span
                className={this.props.class} onClick={this.selectLetter}> //calling this component's selectLetter
                {this.props.letter}
            </span>
        );
    }
}
```

So now `onClick` is calling `Letter`'s own `selectLetter` function, which (using `props`) calls the `selectLetter` that was passed down to it from `App`. The Letter method passes the `App` method `this.props.letter`, and bam it's done.

This really is one of the greatest things about using a framework like React. In order to select the letter, we don't have to do any fancy `$("#...)` and find our letter - each `Letter` component represents a letter, and so `this.props.letter` is already targeting our letter for us!

If you remember the flowchart from earlier, it's still pretty similar but with slight modifications:

![](https://s3-us-west-2.amazonaws.com/learn-app/lesson-images/react-data-flowchart-selectLetter.PNG)

So now an internal method of `Letter` is invoking `App`'s `selectLetter` method - this gives us a lot more flexibility if we wanted to do other things before invocation (like maybe check if the user finished the game?)

* * *

And that's wraps up the Hangman basics! If all is well, you should see this when you go to the browser:

![](https://s3-us-west-2.amazonaws.com/learn-app/lesson-images/working-hangman-start.PNG)

Notice the underscores? Inspect one and look at its class - it's `solutionLetter`, just like we defined!

Now click a letter, say `J` - it changed! Look at its class now next to the others:

![](https://s3-us-west-2.amazonaws.com/learn-app/lesson-images/working-hangman-dom-selected.PNG)

Here the styling is simple, `text-decoration: line-through` - but you could do a lot more.

Now for the big finale, what happens when you click on one of the letters in the secret word?

![](https://s3-us-west-2.amazonaws.com/learn-app/lesson-images/working-hangman-near-end.PNG)

Ba-bam, they appear in the `Solution` section, exactly where we want them to. 

Here's an overall recap of the app:

*   We have one `letterStatus` object in `App`'s `state`

*   Each letter is initially mapped to a value of `false`, representing that it has **not** been selected
*   Both `Letters` and `Solution` use this object to display their letters/underscores/crossed-out-letters according to their status

*   The `Letter` component calls `selectLetter` when a letter is pressed
*   The `selectLetter` method changes the status of the selected letter to `true`

*   This change occurs through the `setState` function

*   Both `Letters` and `Solution` get updated automatically because `setState` was called

*   Now, whichever letter is mapped to `true` will be displayed differently

Huzzah for React's DOM re-rendering!  
**Huzzah for `setState`!**  
**Huzzah for re-usable components and separation of concerns!**

![](https://s3-us-west-2.amazonaws.com/learn-app/lesson-images/huzzah.PNG)


