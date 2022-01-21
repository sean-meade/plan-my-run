# Plan My Run

[Plan My Run](https://sean-meade.github.io/plan-my-run/) is a website which allows runners to plan a run. It gives them the ability to choose a location, time, day, and then to map out their route with mouse clicks. The running will recieve back weather information for the time and day, and a distance update on each click of the route they are planning.  

The longer the run the more difficult it gets. You have to make sure you plan your route so you run long enough distances to continue to progress. You can run the same shorter distance multiple times to make it up but speaking from experience will drive you crazy. It is important to know how far you must run before going out.

![Site display on different screens](assets/images/amiresponsive.png "Image showing website on multiple platforms")

---

## Contents

- [Plan My Run](#plan-my-run)
  - [Contents](#contents)
  - [UX](#ux)
    - [Project Goals](#project-goals)
    - [Site Owner Goals](#site-owner-goals)
    - [Site Visitor/User Goals](#site-visitoruser-goals)
    - [User Stories](#user-stories)
    - [User Requirements and Expectations](#user-requirements-and-expectations)
      - [**Requirements**](#requirements)
      - [**Expectations**](#expectations)
    - [Design Choices](#design-choices)
      - [**Fonts**](#fonts)
      - [**Colours**](#colours)
  - [Wireframes](#wireframes)
    - [**Site Layout**](#site-layout)
  - [Information Architecture](#information-architecture)
  - [Technologies](#technologies)
    - [Languages](#languages)
    - [Libraries & Frameworks](#libraries--frameworks)
    - [Tools](#tools)
  - [Features](#features)
    - [Implemented Features](#implemented-features)
    - [Future Features](#future-features)
    - [Redundant features](#redundant-features)
  - [Changes applied since planning](#changes-applied-since-planning)
  - [Testing](#testing)
  - [Deployment](#deployment)
    - [Local Deployment](#local-deployment)
    - [Deployment to Github](#deployment-to-)
  - [Credits](#credits)
    - [Images](#images)
    - [Image editing](#image-editing)
    - [Code ideas](#code-ideas)
  - [Acknowledgements](#acknowledgements)

---

## UX

### Project Goals

The main goal of this project is to provide an app that helps runners plan their run. I am achieving this by providing a way for runners to map out potential routes which provides a feedback on distance. Also by adding the ability to get weather information for location, day and time.

### Site Owner Goals

- Provide the users with a helpful web application.
- Take the hassle out of finding a running route with the right distance.
- Provide weather information to inform gear choice.

### Site Visitor/User Goals

- Ability to choose what location to start the run in.
- Ability to choose the day and time for a run and with the location recieve weather information.
- Ability to use the mouse to map out a running route and recieve the distance of the route in return.

### User Stories

**Applies to all site users:**

- As a user, I am able to quickly understand how to navigate the site.
- As a user, I am able to choose what location to start the run in.
- As a user, I am able to change the location when I want.
- As a user, I am able to choose the day and time for a run and with location recieve weather information
- As a user, I am able to change the day and time and update the weather information.
- As a user, I am able to use the mouse to map out a running route and recieve the distance of the route in return.
- As a user, I am able to undo points of my route and the distance and map updates accordingly.
- As a user, I am able to make my run a looped run (returns back to where I started) and the distance and map updates accordingly.


**Applies to new site users:**

- As a user, I am able to understand how to use it without instruction.

**Applies to all returning users:**

- As a user, I am able to 

[Back to content](#contents)

### User Requirements and Expectations

#### **Requirements**

- Visually pleasant app design
- Easy site navigation
- Information of the content layed out in a simple and clear way on both mobile and larger screens
- Self-explanatory icons where text is absent

#### **Expectations**

- Quick app load time

[Back to content](#contents)

### Design Choices

#### **Fonts**

- *All fonts*

  ```font-family: "Playfair Display", serif;```

#### **Colours**

![Colour palette](assets/images/colour-pallette.png "Image of the Colour Palette used for this website")

[Back to content](#contents)

## Wireframes

### **Site Layout**

Site moc-ups were designed using [figma](figma). The focus was on defining the basic layout structure of the app and identifying how the display would change on different screen sizes such as mobile, tablet and larger screens.

You can view the wireframes created for this project in [site wireframes](/docs) folder.

  **Please note, as I was developing the project, I have identified some weaknesses in the UX and therefore made the required changes. The deployed site looks somewhat different in comparison to the wireframes. These changes will allow the user to have a better experience and allow easier navigation. The design theme of the features is a close match to the overall site to ensure continuation and flow.*

[Back to content](#contents)

---

## Information Architecture


[Back to content](#contents)

---  

## Technologies

### Languages

- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

### Libraries & Frameworks

- [jQuery](https://jquery.com/)
- [Google fonts](https://fonts.google.com/)
- [Font-Awesome](https://fontawesome.com/icons?d=gallery)

### APIs
The weather API was used through [rapidapi.com](https://rapidapi.com/)

- [Weather API](https://www.weatherapi.com/)
- [Mapbox API](https://docs.mapbox.com/api/overview/)

### Tools

- [Git](https://git-scm.com/)
- [GitHub](https://github.com/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Color editor](https://coolors.co/)
- [Favicons](https://fontawesome.com/)
- [Pixabay](https://pixabay.com/)

[Back to content](#contents)

---

## Features


### Implemented Features

- The site has **responsive design** when viewed on a mobile, tablet, and desktop.
- **Easy navigation** to external sites, such as social media accounts.
- The user is given feedback when they interact with the website (i.e. login to the website, add new gift, commit to buying a gift etc).

[Back to content](#contents)

---

## Changes applied since planning

---

## Testing

## Functional Testing

TC001 

**Description**

Test something.

**Steps**

- Navigate to https://website
- 

**Expected**

This happened

**Actual**

This happened 

![TC001](img-of-test)

<hr>

TC002


## Validator Testing

### CSS

Base Css

![Base CSS](docs/testing/base_css.JPG)

### JavaScript

Base JS

![Base JS](docs/testing/base_js.JPG)

### HTML

The following Validated with no errors:
- Home Page
- 

![Success](docs/testing/html_validator.JPG)

The Following Validator with the same error:
- The something page

![Error](docs/testing/edit_gift_add.JPG)


[Back to content](#contents)

---

## Deployment

**NAME** project was deployed using the **VS Code IDE**, using **Git** and **GitHub**.

Before deploying the application, install the following:

- Git

### Local Deployment

To deploy Art-ial locally, take the following steps:

1. From the applications [repository](link-to-repo), click the *code* button and download the zip file.

    Alternatively, you can clone the repository using the following line in your terminal:

```terminal
git clone link-to-repo
```

2. Access the folder in your terminal window 

[Back to content](#contents)

### Deployment to 

[Back to content](#contents)

---

## Credits

### Images

* 

### Image editing

* 

### Code ideas

* 

[Back to content](#contents)

---

## Acknowledgements

Site creators:

[Sean Meade](https://github.com/sean-meade)

[Back to content](#contents)

