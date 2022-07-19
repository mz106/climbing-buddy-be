
##User Object

v 0.1.0

This will correspond with the user object in the fe repo, to be stored in the state 'user'

id - integer (auto create by MySql/Postgres), PK

username - String, unique, required

password - String, unique, required // the **hashed** password

fullName - String, required // would be nice to display the name in the app, instead of username

email - String, required, unique 

bio - Text, // biography, text about himself, so other users would know something about him

hasRopes - Boolean, required // what is this for? 

location - String, required // location of the user ? for matching with other close by users maybe ? 





