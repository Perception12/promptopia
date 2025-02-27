"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const UpdatePrompt = () => {
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  useEffect(() => {
    const getPrompt = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    if (promptId) getPrompt();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

// export default UpdatePrompt;

const Page  = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdatePrompt />
    </Suspense>
  )
}

export default Page;
