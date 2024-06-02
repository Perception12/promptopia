"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const [numPostsDeleted, setNumPostsDeleted] = useState(0);

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };

    if (session?.user.id) fetchPrompts();
  }, [numPostsDeleted]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete?");

    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/prompt/${post._id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setNumPostsDeleted((prev) => prev + 1);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
