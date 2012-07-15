---
layout: post
title: "An Introduction to the CSS Flexbox Module"
date: 2012-07-20 00:37:52
---


CSS, despite its relatively low perceived skill ceiling, always seems to have a killer feature up its sleeve. Remember how media queries made responsive layouts possible and revolutionized front-end development? Well, today, we’re going to talk about a new layout mode, called flexbox – new in CSS3. I’m sure you’re raring to go! Let’s get started after the jump.

##CSS Flexbox Support

Currently, the CSS Flexbox specification is a working draft and things will change! The examples this tutorial covers could potentially fail to work in the future, as browsers change their flexbox implementation to match up with the specification. The aim of this tutorial is to provide you with a basic understanding of CSS flexbox, and demonstrate how to use it in your web pages.

Please note that this tutorial will use webkit/non-vendor-prefixed examples for the sake of brevity. Have a look at caniuse.com for a list of browsers that support the flexbox module, and reference the necessary prefixes in your projects, accordingly.

##Background on Layout Modes

CSS Flexbox is essentially a layout mode. There are existing layout modes within CSS, and they’ve been there for a long while. One example of a layout mode is block (e.g. display: block). Block layouts are a great way to style entire documents, many elements are treated by the browser as block level, by default; these include common elements, such as paragraphs and divs.

Occasionally, when an element is not block, it’s likely to be inline. Inline level elements include the anchor tag, input tag & the strong tag. The developer tools in Chrome actually allow you to view the “computed style” of an element, which is a great way to determine what CSS properties and values have been applied to elements that weren’t explicitly set by the developer.

Here’s a quick tip for accessing the computed style of an element using JavaScript’s window.getComputedStyle method.

var elem = document.querySelector('h1#someId');
window.getComputedStyle(elem).display; //block

Block and inline layout modes aside, CSS also has tabled and positioned layout modes. The reason layout modes are being referenced is because flexbox is a new layout mode, which allows for greater flexibility when laying out web pages.

The flexbox layout provides us with simple techniques to easily dictate the manner in which items are to be laid out.

##How Can You Use Flexbox?

To force an element to use the flexbox layout, we add the flexbox value to the display property.



By default, a flexbox is a block level element; we can define an inline-level element like so:

Similar to the example above, you’ll want to apply the flexbox layout to the parent of the children whose positioning you’d like to control. Let’s look at simple, live example.

You’ll notice that the list item elements are now flowing horizontally, similar to how they might render, if we had used float: left. The list item elements can now be referred to as flexbox items.

Note: a direct descendent of a flexbox, which is absolutely positioned, e.g. using position: absolute, cannot be a flexbox item, as it breaks the usual flow.

You may notice that the items (the list item elements) have assumed a horizontal flow (the direction of the flow is also known as the main axis). Fortunately, we are able to control this flow (and thus what is considered to be the main axis) and avoid the use of floats!

##Exploring flex-direction

We can apply the flex-direction property and specify the direction in which we wish for our flexbox items to be laid out. The property accepts row, row-reverse, column & column-reverse as values. The default value is row.

Using similar markup to the above example, we can add one more CSS property:value pair: (flex-direction: column)

If working along, go ahead and try changing the column value on the flex-direction property to column-reverse, and witness how the flexbox items are displayed in a columned layout, but in the reverse order.

##Wrapping With flex-wrap

By default, a flexbox is single-line. One which cannot contain its children may overflow using the flex-wrap property; we can instruct the flexbox to become multi-line, in which case the flexbox items can wrap over. flex-wrap accepts the values, nowrap (the default value), wrap & wrap-reverse.

Notice how, in the demo, the items ‘wrap’ over, since they cannot be contained within their small 100px parent. Using the developer tools, try toggling the overflow: hidden and -webkit-flex-wrap bits. Without the flex-wrap and overflow properties, the items overflow their parent.

There’s a useful shorthand property for flex-direction and flex-wrap, as shown below:

##A Quickie Example

While certainly not the nicest looking there is, this example menu demonstrates some uses for flexbox.

- A width of 300px has been set on the flexbox, itself, to demonstrate wrapping.
- A general idea for a menu could be to utilize media queries in order to serve a mobile friendly menu, where flex-direction: column might make sense.

What would be nice is to instruct the flexbox items to spread out and use the space they have available to them – something like this. That’s what the flex property is for.

##Flexing

Flexing is the ability of the container to alter its width or height to fill the available space.”

The flex property is a nice feature; it offers something new that would have been difficult to achieve in the past.

With this property, we can set a preferred size for our items. Do keep in mind that the flex property is applied on flexbox items, not on the flexbox itself. The browser will attempt to set the size of the flexbox items on a per line basis. It will then try to evenly distribute the remaining free space on the items. If we look at the menu example, and use the developer tools to discover the computed width of the flexbox items, we’ll see that it is 78px. Let’s investigate further…

You’re probably wondering, “How did the flexbox items gain their extra space when we set their preferred width to 60px?”

- In the first line, there are three items, which should be around 60pxflex property (that’s a total of 180px).
- The width of the entire flexbox is 300px. That, minus 180px (the total preferred size of the items), is 120px. However, it doesn’t appear that we actually have 120px of free space.
- Each flexbox item has a margin-right of 10px; that’s a total of 30px for three items, leaving us with 90px of free space.
- But wait, each item also has padding: 5px – that’s 5px of padding on the top, right, bottom, and left. So, similar to the margin-right property, each item uses up 10px of padding in regard to its width. We’re left with 60px of free space – well almost.
- Each item has border: 1px solid black – 1px on the left and right sides. A total of two pixels per item, so, for three items, that comes to 6px. We’re now left with 54px of free space.
- With 54px of free space, we can distribute that equally to the three items on the first line – that’s 18px, per item, which now makes sense why, when we set a preference of 60px, the computed width turned into 78px.

As you may have guessed, the last line (containing the item ‘Contact us’) flexes to the full width of the flexbox.

Flexbox items can be given different widths; an item with a flex of 2 is said to be twice as flexible as an item with a flex of 1. So, when it comes to distributing free space between the two items, the item with a flex of 1 will be given half the space that the item with a flex of 2 receives.

##Ordering

Flexbox gives us an easy way to order certain items using CSS, regardless of the order that they appear in the document. Here is a quick example.

Given the following markup:

We can target the first list item element using the nth-child pseudo class, and then apply the flex-order property to it. Flexbox items are, by default, at order 0. By placing the first list item at order 2, the browser will display items 2 & 3 first, which will be followed by item 1.

##Alignment

We’re able to align flexbox items on the main axis using the flex-pack property. This property accepts the following as values:

- start
- end
- center
- justify
- distribute

The demo for this tutorial provides some examples of the different types of alignment. Looking at the jsbin example, we can see that the items have only been centered on one axis: the main axis. This is essentially the axis upon which the flexbox items are placed.

We can change the axis by adjusting the flex-direction property. By setting it to column, it becomes apparent that the main axis has changed. In order to affect the alignment of the cross axis, (the axis perpendicular to the main axis) we can use flex-align.

###Centering an Item

Definitely check out the live demo if you’re confused.

##Further Reading

- flexiejs offers cross browser support for flexbox.
- Modernizr can detect support for flexbox.
- html5rocks contains a tutorial on flexbox
- Alex Russell, who works on Google Chrome, has an interesting set of CSS classes for using flexbox.
- inserthtml has a fun tutorial on the flexbox specification, it includes a great set of visuals which can help in understanding certain concepts.
- The book Stunning CSS3 has a section on flexbox.

Thanks for reading, and be sure to refer to caniuse.com for a list of browsers that support the flexbox module, as well as which vendor prefixes should be referenced.
