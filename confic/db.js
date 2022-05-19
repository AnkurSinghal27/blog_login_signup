const knex = require('knex')({
    client :'mysql',
    connection:{
        host:'localhost',
        user:'root',
        password:'Ankur@123',
        database:'login_signup'

    }
});

knex.schema.createTable("permission",table=>{
    table.increments("id").primary(),
    table.string("email").unique(),
    table.string("password"),
    table.string("name"),
    table.integer("age")
})
.then(()=>{
    console.log("table created")
}).catch(err=>{
    console.log(err.message)
});

knex.schema.createTable("blog", table=>{
    table.increments("id").primary()
    table.string("userId")
    table.string("title")
    table.string("description")
}).then(()=>{
    console.log("table created")
}).catch(err=>{
    console.log(err.message)
});

module.exports=knex