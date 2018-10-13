For the following exercises, you will find the component files already ready for you. You just need to fill them in with the necessary code.

{Check It!|assessment}(test-3060299803)

{Check It!|assessment}(test-3401134569)

## Component Tree

Following the above exercises, we can now map out our app's components in the following way:

![](https://s3-us-west-2.amazonaws.com/learn-app/lesson-images/react-component-tree-basic.PNG)

This is a nice high-level representation of our app, and will serve us when we start to talk about data flow.

`App` is our **root component**, we have `Score` and `Letters` as `App`'s **children**, and finally (for now), we have `Letter` as a **child** of `Letters`.

Note that the hierarchy of the component tree is determined by nesting the component tags in our JSX, which ultimately renders to normal nested HTML that we've seen before.  
Though we won't ever see a `<Letters>` tag physically in the DOM, we can imagine the hierarchy looking like this:

```html
<App>

  <Letters>
    <Letter></Letter>
    <Letter></Letter>
    ....
  </Letters>

  <Score>
  </Score>
</App>
```

Instead, we'll see whatever is inside the JSX of each component's `render`'s return - but still in this hierarchy.

We highly encourage/suggest/recommend/command-by-the-word-of-law you to draw out **component trees** when using React.

## Done

Alright that's enough teasing, off to the next lesson about how to handle data in React!

## Sign up for a Mini Group about this subject

If you feel like you need some extra help understanding this lesson, you can sign up for a Mini Group [here](https://docs.google.com/forms/d/e/1FAIpQLSdUQIETKPzK61GpcJM7G4HaHyQgrEqGw7QAgGLHfkp90gGZfw/viewform?usp=pp_url&entry.64034666=Introduction+to+React).
