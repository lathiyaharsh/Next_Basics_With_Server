import React from 'react'



type Props = {
    params: {
        userId: string;
    };
  };

function page({ params }: Props) {
  return (
    <div>User Profile {params.userId}</div>
  ) 
}

export default page