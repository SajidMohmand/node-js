const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const e = require("express");
const app = express();

const PORT = 3000;
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => {
  console.log(`Server listen on Port: ${PORT}`);
});

app.get("/users", (req, res) => {
  const html = `
    <ul> 
       ${users.map((user) => `<li>${user.first_name}</li>`).join("")} 
    </ul>
    `;

  res.send(html);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const user = users.find((user) => req.params.id == user.id);

    return res.json(user);
  })
  .patch((req, res) => {

    const id = req.params.id;
    const updated = req.body;

    const index = users.findIndex((user)=> id == user.id)

    if(index == -1) {
        return res.json({
            id: "!user not find",
            status: "done"
        })
    }else{


        const updatedUser = { ...users[index], ...updated};
        users[index] = updatedUser;
        console.log(updated);
        

        fs.writeFile("MOCK_DATA.json", JSON.stringify(users), (err,data)=>{

            return res.json({
                id: `Updated Successfully id: ${index+1}`,
                status: "Done"
            })
        })

    }



  })
  .delete((req, res) => {
    const index = users.findIndex((user) => req.params.id == user.id);

    if (index !== -1) {
      const user = users[index];

      users.splice(index, 1);

      fs.writeFile("MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.json({
          id: `Deleted User Id: ${user.id}`,
          name: `${user.first_name}`,
          status: "done",
        });
      });
    } else {
      return res.json({
        id: "User Not Find",
        status: "Done",
      });
    }
  });


app
  .route("/api/users")
  .get((req, res) => {
    res.json(users);
  })
  .post((req, res) => {
    const body = req.body;
    users.push({ ...body, id: users.length + 1 });

    fs.writeFile("MOCK_DATA.json", JSON.stringify(users), (err, data) => {
      return res.json({
        status: "done",
        id: `Successfully added user: ${users.length}`,
      });
    });
  });
