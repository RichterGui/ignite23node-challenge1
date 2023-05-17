import { parse } from "csv-parse";
import { createReadStream } from "fs";

const filePath = new URL("./import.csv", import.meta.url);

async function csv() {
  // const filePath = __dirname + "/import.csv";
  createReadStream(filePath).pipe(
    parse({ columns: true }, async (err, records) => {
      if (err) {
        console.error(err);
      } else {
        for (const rec of records) {
          const response = await fetch("http://localhost:3333/tasks", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(rec),
          });

          if (response.ok) {
            console.log("Record posted successfully");
          } else {
            console.log("Failed to post record:", response.status);
          }
        }
      }
    })
  );
}

csv();
