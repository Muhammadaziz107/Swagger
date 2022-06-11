import React from "react";
import { Context } from "../Context/Authentication";

const useToken = setterOnly => {
  const ctx = React.useContext(Context);

  return setterOnly ? [ctx.setState] : [ctx.state, ctx.setState];
};

export default useToken;
