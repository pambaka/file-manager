import fs from "node:fs/promises";
import { getCurrentDir } from "./current-dir.js";
import { ERROR_MESSAGE } from "./const.js";

const listDirContent = async () => {
  try {
    await fs
      .readdir(getCurrentDir(), { withFileTypes: true })
      .then((dirEntries) => {
        const entriesTable = dirEntries.map((dirEntry) => ({
          Name: dirEntry.name,
          Type: dirEntry.isFile() ? "File" : "Directory",
        }));

        entriesTable.sort((a, b) => {
          if (a.Type < b.Type) return -1;
          return 1;
        });

        console.table(entriesTable, ["Name", "Type"]);
      });
  } catch {
    console.error(ERROR_MESSAGE.operationFailed);
  }
};

export default listDirContent;
