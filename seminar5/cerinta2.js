import fs from "fs/promises";
import path from "path";
import { rimraf } from "rimraf";

const DIR_NAME = "new-folder";
const FILE_NAME = "secret.txt";
const FILE_PATH = path.join(DIR_NAME, FILE_NAME);

async function createDirectory() {
  try {
    await fs.mkdir(DIR_NAME, { recursive: true });
    console.log(`Director creat: ${DIR_NAME}`);
  } catch (err) {
    console.error("Eroare la crearea directorului: ", err);
  }
}

async function createFile() {
  const content = "Mesaj secret!";

  try {
    await fs.writeFile(FILE_PATH, content, "utf8");
    console.log(`Fisier creat: ${FILE_NAME}`);
    console.log(`Continut: ${content}`);
  } catch (err) {
    console.error("Eroare la crearea fisierului: ", err);
  }
}

async function deleteDirectory() {
  try {
    await rimraf(DIR_NAME);
    console.log(`Director ${DIR_NAME} sters cu succes!`);
  } catch (err) {
    console.error("Eroare la stergerea directorului: ", err);
  }
}

(async () => {
  await createDirectory();
  await createFile();

  setTimeout(() => {
    deleteDirectory();
  }, 3000);
})();
