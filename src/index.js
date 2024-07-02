import app from "./app.js";
import { sequelize } from "./db/database.js";

async function main() {
    const PORT = process.env.PORT || 3000;

    try {
        await sequelize.sync({ force: false });
        app.listen(PORT, () => {
            console.log(`listening on port ${PORT}`);
        });
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}
main();