import { existsSync, mkdirSync, readdirSync, writeFileSync } from "fs";
import { join } from "path";

const getWorkingDirectory = () => {
  const workingDirectory = join(__dirname, "../..", "projects");
  if (!existsSync(workingDirectory)) mkdirSync(workingDirectory);
  return workingDirectory;
};

const getProjectDirectory = (projectId: string) => {
  const projectFolder = join(getWorkingDirectory(), projectId);
  if (!existsSync(projectFolder)) mkdirSync(projectFolder);
  return projectFolder;
};

const getItemDirectory = (projectId: string, itemId: string) => {
  const itemFolder = join(getProjectDirectory(projectId), itemId);
  if (!existsSync(itemFolder)) mkdirSync(itemFolder);
  return itemFolder;
};

const uploadFiles = (
  projectId: string,
  folders: { name: string; filename: string; file: Buffer }[]
) => {
  for (const { name, file, filename } of folders) {
    console.log("name :>> ", name);
    console.log("projectId :>> ", projectId);
    const folderDirectory = getItemDirectory(projectId, name);
    writeFileSync(join(folderDirectory, filename), file);
  }
};

const fetchProjectFiles = (projectId: string) => {
  const projectDirectory = getProjectDirectory(projectId);
  const files = readdirSync(projectDirectory, { withFileTypes: true });
};
export { fetchProjectFiles, uploadFiles };
