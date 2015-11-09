# I wanted C#-style string interpolation for JavaScript and was bored.

So here's **interp.js**.

It's a single function added to the String object which you can call like this:

`'the {0} black {1} jumped over the other {1} {0}ly.'.interp(['quick', 'fox']);`

which returns:

`the quick black fox jumped over the other fox quickly.`
