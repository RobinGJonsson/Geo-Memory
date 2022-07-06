# My Coach

**Version 1.0.0**

Geo Memory is a regular memory game that allows the player to choose difficulty and level settings

---

## Features

- __Main Page Title Box__
    - The title box contains buttons that let's the player access the instructions, the leaderboard and start the game.

![Title Box](assets/images/title-box.png)

- __Instructions__

    - The game instructions are written to make the game and its features very clear.

![Instructions](assets/images/instructions.png)

- __The Game Area__


-__The Game Board__

![Game Board](assets/images/game-board.png)

-__Game Options__

![Game Options](assets/images/game-options.png)

- __Leaderboard__

- __The Footer__

    - The footer is the same on every page of the site and always stays at below the game area.
    - The footer contains links to the developer's github page and linkedin page through the companies icons.

![Footer](assets/images/footer.png)

# Media Queries
- Max-height: 1100px
    Change card dimensions through a css variable.
    Removes all modal padding.
    Change footer position to static.

- Max-height: 900px
    Change card dimensions through a css variable.

- Max-width: 850px
    Change card dimensions through a css variable.
    Change grid gap.
    Change footer position to static.
    <img src="assets/images/grid-gap.png" width=500 height=auto/>

- Max-width: 500px
    Change card dimensions through a css variable.
    Change modal footers to display block.
    <img src="assets/images/modal-footer.png" width=500 height=auto/>
    <br>

- Max-width: 320px
    Change card dimensions through a css variable.
    Change game title font size.


### Features Left to Implement

- Add more levels.
- Add difficulty of matching country names with pictures.

## Testing

### The Title Box Buttons


### Footer Icons 

### Instructions

### Game Options

### Difficulty Container

### Info Container

### Game Board

### Cards

### Game Over Modals 

### Exit/Reset Buttons 

## Validator Testing

- HTML
    - No errors were returned when passing through the official [W3C validator](https://validator.w3.org/nu/?doc=https%3A%2F%2Fcode-institute-org.github.io%2Flove-running-2.0%2Findex.html)

- CSS
    - No errors were found when passing through the official [Jigsaw validator](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Fvalidator.w3.org%2Fnu%2F%3Fdoc%3Dhttps%253A%252F%252Fcode-institute-org.github.io%252Flove-running-2.0%252Findex.html&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=en#css)

- JS
    - Functions declared in within loops errors were found on three occasions when passing through the official [JSHint validator](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Fvalidator.w3.org%2Fnu%2F%3Fdoc%3Dhttps%253A%252F%252Fcode-institute-org.github.io%252Flove-running-2.0%252Findex.html&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=en#css)
    
    - These errors are due to adding event listeners inside of a function. But as far as I know this is the best way to go about it anyway.


### Bugs

- There are no known bugs.

### Solved Bugs

- Instructions content is to long to show all of it, and overflows from the viewport and doesn't scroll 

## Deployment

The project was deployed on GitHub Pages. I used Gitpod as a development environment where I commited all changes to git version control system.
I used push command in Gitpod to save changes into GitHub.

- The site was deployed to GitHub pages.
- I logged into github
- In the GitHub repository, I went to the Settings tab.
- From there I clicked the Pages section and cliked the source drop down menu called Branch and selected main.
- Once the master branch has been selected, the page will be automatically refreshed 

The live link can be found here - https://robingjonsson.github.io//

To run localy:
- Log in to GitHub and click on repository to download
- Select `Code` and click Download the ZIP file.
- After download you can extract the file and use it in your local environment 


## Credits

### Content

- The ShuffleCards function is the Fisher Yates algorithm that I found on https://www.geeksforgeeks.org/shuffle-a-given-array-using-fisher-yates-shuffle-algorithm/
- All icons on the page were taken from [Font Awesome](https://fontawesome.com/)

### Media

- Back of cards image: https://www.pinterest.es/pin/405183297723217911/
- Malmö Sweden Image: https://www.pexels.com/photo/monochrome-photo-of-the-turning-torso-skyscraper-5899438/
- New York USA Image: https://www.pexels.com/photo/buildings-with-lights-at-nighttime-472037/
- Sydney Austrailia Image:https://www.pexels.com/photo/sydney-opera-house-australia-1878293/
- Moscow Russia Image: https://www.pexels.com/photo/saint-basil-s-cathedral-753339/
- Agra India Image: https://www.pexels.com/photo/taj-mahal-and-the-four-minarets-1603650/
- Dubai United Arab Emirates Image: https://www.pexels.com/photo/blue-and-gray-high-rise-building-162031/
- Paris France Image:https://www.pexels.com/photo/photo-of-cars-parked-on-side-of-street-across-the-eiffel-tower-3182530/
- Rome Italy Image:https://www.pexels.com/photo/administration-ancient-arches-architecture-356966/
- London England Image: https://www.pexels.com/photo/bridge-over-river-in-city-258117/
- Athens Greece Image: https://www.pexels.com/photo/ruins-of-a-temple-with-ancient-architectural-design-6336038/