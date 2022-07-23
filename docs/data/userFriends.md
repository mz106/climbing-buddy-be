
##userFriends - links users on a many-to-many relationship ( jonction table/model )
[https://en.wikipedia.org/wiki/Associative_entity](https://en.wikipedia.org/wiki/Associative_entity)

Because a user can have many other users as firends, and at the same time he can be one of many friends of a certain user.

v 0.1.0

I wansn't sure if we had to create this table or if seequelize will crefate it automatically for us, but it looks like is best if we do create it ourselves. 
[https://sequelize.org/docs/v6/core-concepts/assocs/#many-to-many-relationships](https://sequelize.org/docs/v6/core-concepts/assocs/#many-to-many-relationships)
[https://sequelize.org/docs/v6/advanced-association-concepts/advanced-many-to-many/](https://sequelize.org/docs/v6/advanced-association-concepts/advanced-many-to-many/)

id - integer (auto create by MySql/Postgres), PK

userId - integer, FK, required

friendId - integer, FK, required
    
Actually, the accepted answer in this stackoverflow is what we need for a self-referencing many-to-many
[https://stackoverflow.com/questions/25363782/how-to-have-a-self-referencing-many-to-many-association-in-sequelize](https://stackoverflow.com/questions/25363782/how-to-have-a-self-referencing-many-to-many-association-in-sequelize)