const exp = require("express");
const { router } = require("./routes/index");

const app = exp();
app.use("/", router);


const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
