## Welcome to React

Can you smell it? It's the aroma of a chemical <em>react</em>ion about to unload a whole new programming paradigm.

React is - quite simply - a JS library for building User Interfaces.

So far, any time we wanted to display information on our webpage (i.e. building our UI), we've used jQuery.

Except for lots of things, there's nothing really wrong with jQuery. However, as you've probably noticed by now, it can become a mess to manage when your project grows.

And so The Great and Powerful Facebook has created React and open-sourced it for our use. Amen.

As with any new tech, we always recommend checking out the docs, but let's explore ourselves for a bit, shall we?

## What We're Building

Throughout the React fundamentals lessons, we're going to slowly build the classic game Hangman. The rules of the game are simple:

*There is a secret word
*There is a hint for the word
*The user sees a blank line for each letter in the word
*Each time the user selects a letter (from the alphabet), it fills up the blank lines for each occurence of the word
*If the user selects more than 5 letters without guessing the word, the game is lost