import React from "react";
import { RequestFiles } from "./requests";

const Files = () => {
  var fileList = [];
  fileList = RequestFiles()
  console.log(JSON.stringify(fileList))

  for (var i = 0; i < fileList.length;i++){
    
  }
  return (
    <div>

    </div>
  )
}

export default Files