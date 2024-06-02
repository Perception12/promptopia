"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const params = useParams();

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };

    if (params.id) fetchPrompts();
  }, []);


  return (
    <Profile
      name={session?.user.name}
      desc={`Welcome to ${session?.user.name}'s profile`}
      data={posts}
    />
  );
};

export default UserProfile;
