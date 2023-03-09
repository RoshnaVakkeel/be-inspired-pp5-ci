# Welcome to **[Be Inspired (PP5 CI)](https://be-inspired-pp5-ci.herokuapp.com/)**

## PERSPECTIVE
To be inspired and to spread positivity around..

## Links to Repositories and Live Sites

[Live site for the Front End](https://be-inspired-pp5-ci.herokuapp.com/)

[Live site for the Back End](https://be-inspired-drf-api.herokuapp.com/)

[Back End Respository](https://github.com/RoshnaVakkeel/be-inspired-drf-api)

## [Contents](#contents)
- [User Experience (UX)](#user-experience-ux)
	- [Site Goals](#site-goals)
	- [User Personas](#user-personas)
	- [Scope](#scope)
- [Agile Methodology](<#agile-methodology>)
    - [Epics and User Stories](<#epics-and-user-stories>)
        - [Website UI](<#website-ui>)
        - [Authentication](<#authentication>)
		- [Main page Layout](<#main-page-layout>)
		- [Post Management](<#post-management>)
        - [Recommendation Management](<#recommendation-management>)
        - [Comment Management](<#comment-management>)
        - [Likes Management](<#likes-management>)
        - [Profile Management](<#profile-management>)
    - [Acceptance Criteria](<#acceptance-criteria>)
	- [Tasks](<#tasks>)
	- [User Story Management](<#user-story-management>)
        - [Sprints](#sprints)
- [Design](<#design>)
	- [Colours](<#colours>)
	- [Typography](<#typography>)
	- [Imagery](<#imagery>)
	- [Wireframes](<#wireframes>)
    - [Database Schema](<#database-schema>)
- [Features](<#features>)

- [Technologies](<#technologies>)
	- [Languages Used](<#languages-used>)
	- [Frameworks, Libraries and Programs](<#frameworks-libraries-and-programs>)
- [Production](#production)
	- [React](<#react>)
- [Testing](<#testing>)
	- [User Story Testing](<#user-story-testing>)
	- [Testing Technologies](<#testing-technologies>)
		- [Manual Testing](<#manual-testing>)
			- [Validation](<#validation>)
- [Issues and Fixes](<#issues-and-fixes>)
- [Deployment](<#deployment>)
	- [Heroku](<#heroku>)
- [Credits and Resources](<#credits-and-resources>)
	- [Code](<#code>)
	- [Learning Resources](<#learning-resources>)
	- [Content](<#content>)
	- [Media](<#media>)
- [Acknowledgements](<#acknowledgements>)


- [User Experience (UX)](#user-experience-ux)
	- [Site Goals](#site-goals)
	- [User Personas](#user-personas)
	- [Scope](#scope)

## Agile Methodology

## Acceptance Criteria
For all the User Stories, Acceptance Criteria were enlisted. The purpose of this was to provide a reference point for the developmental steps. I made sure to cross-check that all the required steps intended was implemented. It also helped with Testing to make sure that all the necessary aspects and features were covered. The acceptance criteria is described on the column next to the user stories (column H) [here]().

### Tasks
The tasks for the website development process was closely followed as mentioned in CI's Advanced Frontend React module "I Moments" walkthrough project. The task is generally the developers step towards preparing the app.
The tasks that I have followed during the development phase were carried out in this order.

**Before Project Inception**

- Design Entity Relationship Diagram 
- Set up and create  Back End API. For this backend was built using the Django Rest API framework. All information a=can be found in [BE INSPIRED - DRF API](https://github.com/RoshnaVakkeel/be-inspired-drf-api)

- Create Frontend Repository in GitHub
- Create Project, Epics, User Stories and prepare Kanban Board

**Creation of Project in GitPod**

- Set up ReactJS project


### User Story Management

#### Sprints
The project was divided mainly into three main sprints spanning a week.

- **Sprint 1** was to set up Backend be-inspired-drf-api.

- **Sprint 2** was to set up Frontend ReactJS app and connect with backend API (Faced tough challenges, details in Errors and Fix section)
	- Set up axios interceptors, create async handles and connect to backend.
	- Set up Sign Up and Sign In pages
	- Make forms in fronend, input data and push data into be-inspired-drf-api
	- Pull and show data from be-inspired-drf-api

- **Sprint 3** was to set up Frontend ReactJS app pages, styling, functions and fixing bugs and testing.

## Technologies

### Languages Used
- [CSS](https://en.wikipedia.org/wiki/CSS)
- [HTML5](https://en.wikipedia.org/wiki/HTML5)
- [JavaScript](https://en.wikipedia.org/wiki/JavaScript)
- [React JSX](https://reactjs.org/docs/introducing-jsx.html)

### Frameworks, Libraries and Programs

**Frameworks and Libraries **
- [React Bootstrap4](https://react-bootstrap-v4.netlify.app/) - for styling the site and site responsiveness across various devices
- [ReactJS](https://reactjs.org/) - to build the functionality of the site
- [Font Awesome](https://fontawesome.com/) - to add various icons to the site


## Production

Installations:
- React library - using the command `npx create-react-app . --template git+https://github.com/Code-Institute-Org/cra-template-moments.git --use-npm`
For the React project set up
- react-bootstrap - using the command `npm install react-bootstrap@1.6.3 bootstrap@4.6.0`
This is used to render the layout and styling of the website. The library makes it easy to create and use standard interface elements that are responsive.
- react-router-dom - using the command `npm install react-router-dom@5.3.0`
 This library makes the site navigation easier without the need to refresh the page. In social media sites ith mutiple components, it provides a quick and responsive user experience.
- axios - installed using command `npm install axios`.It manages the calls to the backend database. Simplifies the API requestsand the included interceptors refresh JSON Web Tokens which the site uses.
- infinite-scroll-component - installed using command ` npm install react-infinite-scroll-component`.
It is used to enable infinite scrolling on the Posts and Recommendations components and on comments. Infinite scrolling is a standard feature in all social media sites.
- jwt decode -
- `npm test`
- `npm install msw --save-dev`
