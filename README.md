# post-it
*Description:* Web application that lets you post what's on your mind for other users to see and react to.

*Tech stack:* Angular - frontend, Firebase (Auth, Firestore, Hosting) - backend, database.


### Endpoints:
**[‘/sign-in’]** - lets the user sign in.  
**[‘/sign-up’]** - lets the user sign up.  
**[‘/home’]** - lets the user post and see other posts.  
**[‘/user/:{id}’]** - shows the user profile, where they have all their personal posts.  


### Types of users:
**Normal user:** Can only write posts, see other posts, additionally react to and comment on other posts.  
**Moderator:** Just like the Normal user, but can also delete posts for whatever reasons and give other users the Moderator role.  

### Functionalities:
- [x] Create an account.  
- [x] Log into an account.  
- [x] Create posts.  
- [x] React to posts.  
- [x] Comment on posts.  
- [x] See user profile.  
- [x] See additional user details such as: personal posts, post count, description, full name.  
