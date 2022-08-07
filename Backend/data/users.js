const bcrpt=require("bcryptjs");

const users=[
{
    name:"Admin user",
    email:"Admin@example.com",
    password:bcrpt.hashSync("123456",10),
    isAdmin:true
},
{
    name:"jon",
    email:"jon@example.com",
    password:bcrpt.hashSync("123456",10)

},
{
    name:"Mahmoud",
    email:"Mahmoud@example.com",
    password:bcrpt.hashSync("123456",10)
},
{
    name:"Reda",
    email:"Reda@example.com",
    password:bcrpt.hashSync("123456",10)
}
]

module.exports=users;