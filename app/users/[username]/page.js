import React from "react";

function page({ params }) {
  const { username } = params;
  return <h1>page {username}</h1>;
}

export default page;
