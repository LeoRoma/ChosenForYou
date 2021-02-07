# ChosenForYou

## Task

```
For this task you have been provided with an array of objects. These objects contain properties that
you will need to create this component. You will not need additional data to complete this task. You
can use vanilla Javascript, JQuery or a mix of both. Frameworks, such as React and Angular, are not
allowed. Please stick to vanilla JS or JQuery, vanilla CSS and html.
Things to keep in mind:
1. Develop with mobile first in mind. It should be responsive (works on all devices).
2. It should work on all major browsers (chrome, IE etc).
3. Be as creative as you want.
4. Keep your code simple and easy to read.

THE TASK:

Using the array create a carousel that displays all the items. It is up to you to what you chose to
display for each item i.e image, title and price or image and price.
You have to apply three filters to the carousel:
1. Search filter that creates and returns an array of items/item that matches the input to the
productTitle.
2. Price range that creates and returns an array of items that fall in between the range.
3. Product type i.e jeans, jackets-coats – there is not a property provided for this but take a
look at the productUrls to help with this.
If you click on one of the items it should open up a popup with information about the product with a
link to the product.
The title and subtitle are provided below.
Title – ‘Chosen for you’
Subtitle – ‘We think you will love these’
```

## Approach
I have started structuring the empty Html to what it will be the final page, so I could visualise where to put the different component on the page. Which first I have created different divs such as: Landing page, filters and carousel.

Once I have structured the page, to be able to render the products from the json object to the html file, I have created a script.js file where I have mapped in a array of objects the variable "productDataWomens" to display with a inner html.

My next task was to be able to build different filters. The first filter that I was building was the "filter by type", to complete this task, I have first created a loop to get all the types from the "productUrl", where I have first split by "/" and get the type that was on index 6, after stored the types in a new array with distinct items, which I have called "productTypes". After I have looped the "productTypes" array to create the options for the "filter by type". And finally filter by type the "productDataWomens" list if the type was included in the "productUrl".

After I have started to create a sort filter (I know that wasn't in the task to do, but I thought was a nice to have). The sort filter was simply passing in a function the "productDataWomens" list into a function where was sorting the price asc/desc.

For the search filter I have created an input field, where taking the input from the user was filtered the value by matching with "productTitle".

Finally to build the range filter I have used JQuery to build the range slider, but also to get the value selected from the user and return only the product that where within those range.
Once I have completed to build all these filters I have founded a bug, which is once I have filtered with a filter and after using another filter the carousel was displaying new products without keeping the first filter option. For example if I wanted to sort the price in ascending order, and after I was filtering by type, was giving me back only the types without taking in consideration the sort. To be able to sort out this problem I have first extracted all the filters in a function "applyingFilters()", where I was chaining the method .filter() on the "productDataWomens", which I could pass different filters, and I could the new products on based of the previous filtered list.

The pop up task I have build with a modal, where once the clicks on a product card appear a card with all the information and the url of the product.

Completed this last task, I have started to create a responsive landing page and trying to experiment some animation. And I have also build a responsive pop up card.

The most complicate task for this project was to build a responsive carousel that displays multiple items without any external libraries or framework. To complete this task I have did several research on Google to look at the different documentations that suit for my purpose. I have added also the possibility to scroll the carousel with touch for the mobile version. For the mobile version, I thought that was a nice to have to give to the user an option to change the view of the products from a carousel to normal. 

During this project I have learnt a lot about vanilla JS, and I have found it that is the best practice to build everything from scratch without using any external JS libraries and framework.

## Demo
This is the link to the project where I have hosted in Netlify: https://chosen-for-you.netlify.app/
