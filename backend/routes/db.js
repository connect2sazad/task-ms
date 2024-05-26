const path = require('path');
const mysqldump = require('mysqldump');
const fs = require('fs');

const { app } = require('../index');
const { dbconfig } = require('../config');

app.get('/export-database', async (req, res) => {
    const dumpDirectory = path.join(__dirname, 'dumps');
    const dumpFilePath = path.join(dumpDirectory, `backup~${formatCurrentTime()}.sql`);
    let time = new Date();
    time = time.toString();
    time = time.replace(':', '');
    console.log(time);

    try {
        // Ensure the dump directory exists
        if (!fs.existsSync(dumpDirectory)) {
            fs.mkdirSync(dumpDirectory);
        }

        await mysqldump({
            connection: dbconfig,
            dump: {
                schema: {
                    table: {
                        dropIfExist: true,
                    },
                },
                data: false,  // This will exclude the data and only dump the table structures
            },
            dumpToFile: dumpFilePath,
        });

        res.status(200).send('Database dump created successfully and saved on the server.');
    } catch (error) {
        console.error('Error creating the database dump:', error);
        res.status(500).send('Error creating the database dump');
    }
});


function formatCurrentTime() {
    const now = new Date();

    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based in JavaScript
    const year = now.getFullYear();

    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const formattedHours = String(hours).padStart(2, '0');

    return `${day}-${month}-${year}_${formattedHours}-${minutes}-${seconds}${ampm}`;
}