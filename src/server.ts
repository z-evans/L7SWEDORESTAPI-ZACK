import app from "./app";

const PORT = process.env.PORT || 3000;

//function to start the server
const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log("Server is running on port:" + PORT);
    });
  } catch (error) {
    console.error("Error when starting server -> ", error);

    process.exit(1);
  }
};

startServer();
