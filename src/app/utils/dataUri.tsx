import DataUriParser from "datauri/parser";
import { DataURI } from "datauri/types";
import path from "path";

const getDataUri = (file: { name: string; content: DataURI.Input; }) => {
  const parser = new DataUriParser();
  console.log(file)
  const extName = path.extname(file.name).toString();
  console.log(extName)
  return parser.format(extName, file.content);
};

export default getDataUri;
