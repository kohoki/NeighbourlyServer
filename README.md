# Project 3 | Neighbourly | Server repo

## Description

Neighbourly is a platform on which neighbours can get in touch with each other by lending and borrowing items which are not needed on a daily basis. The lender and borrower can communicate with each other by using a messaging feature. 

## User Stories

- 404: As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
- Signup: As an anon I can sign up in the platform so that I can start borrowing and lending items
- Login: As a user I can login to the platform so that I can start borrowing and lending items
- Logout: As a user I can logout from the platform so no one else can use it
- Add an item to lend: As a user I can create a new item for lending
- Borrow items: As a user I can browse through the list of items to borrow
- Contact lender: As a user I can communicate via messaging with the lender to clarify the details for borrowing the item
- User profile: I can edit my user profile by adding an image, addresses, first and last name and finally adding a description about me. 

## Backlog

- Create communities and groups e.g. a specific community for a certain area of a city
- Rating feature: users can rate the lending/borrowing process with a star system
- Comment function: users can insert comments in the rating feature
- Make items for lending invisible if user don't wish to lend them at the moment
- Search bar: ability to search other users or items
- Option to delete the user profile

# Client

## Pages

- Welcome page (public)
- Sign in (public)
- Login (public)
- About Neighbourly (public)
- Help (public)
- Home (user only)
- Profile and belonging editing pages (user details and addresses) (user only)
- Lend item and edit/delete item pages (user only)
- Borrow (user only)
- Contact lender (user only)
- Lend (user only)
- Messages and details of message (user only)

# Server

## Models

User model:
```
username - String // required and unique
firstName - String
lastName - String
email - String // required & unique
userImage - String
password - String // required
aboutMe - String
addresses - [ObjectID<Addresses>]
createdItems - [ObjectID<Items>]
borrowedItems - [ObjectID<Items>]
messages - [ObjectID<Messages>]
```

Item model:
```
itemName - String // required
image - String
description - String // required
availability - String
borrowed - Boolean // default false
borrower - [ObjectID<User>]
creator - [ObjectID<User>]
```

Addresses model:
```
nameOfAddress - String // required
number - Number // required
street - String // required
postalCode - String // required
city - String // required
creator - [ObjectID<User>]
```

Messages model:
```
item - [ObjectID<Item>]
lender - [ObjectID<User>]
borrower - [ObjectID<User>]
communication - [ {message: String, userId: [ObjectID<User>]} ]
```


## Links

### Git hub links

Client repo: [GitHub repository Link](https://github.com/kohoki/NeighbourlyFrontend)
Server repo: [GitHub repository Link](https://github.com/kohoki/NeighbourlyServer)

###  Deployment links

Deployment client: [Deployment Link](https://thunderous-pothos-7bbea3.netlify.app)
Deployment server: [Deployment Link](https://calm-lime-cobra-gear.cyclic.app)

### Slides
[Slide](https://docs.google.com/presentation/d/1SjeynzCFU6cWQCfT-JRzoS_JVov-3NZ7M4l-KZS0r1g/edit#slide=id.p)