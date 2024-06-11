import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import ProjectMainContent from "./ProjectMainContent";
type Params = { uid: string };
export const dynamic = "force-dynamic";
export default async function Page({ params }: { params: Params }) {
  const client = createClient();

  const page = await client.getByUID("project", params.uid).catch((e) => {
    notFound();
  });

  const content = prismic.asHTML(page.data.slices[0]?.primary.description);

  const image = page.data.slices[0]?.primary["projectImage"].url;
  if (content != null) {
    return <ProjectMainContent image={image} content={content} />;
  }
  return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();
  const page = await client
    .getByUID("project", params.uid)
    .catch(() => notFound());

  return {
    title: page.data.slices[0]?.primary["title"],
    description: page.data.meta_description,
  };
}

// export async function generateStaticParams() {
//   const client = createClient();
//   const pages = await client.getAllByType("project");

//   return pages.map((page) => {
//     return { uid: page.uid };
//   });
// }
