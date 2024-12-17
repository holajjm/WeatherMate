import React from "react";
import Button from "@components/layout/Button";

function Submit({ text, ...rest }:{text:string}){
  return <Button type="submit" text={text} color={"skyFull"} onClick={() => console.log("button")} { ...rest }></Button>
}

export default Submit;