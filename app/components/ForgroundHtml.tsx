import { createClient } from "@/prismicio";
import ForegroundHtmlContent from "./ForgroundHtmlContent";

export default async function ForgroundHtml() {
  const client = createClient();
  let projects = (await client.getAllByType("landingpageproject"))
    .map((project) => project.data)
    .map((project) => {
      return project.slices[0];
    });
  let firstProject = projects.shift();
  projects.push(firstProject);
  return (
    <ForegroundHtmlContent
      // @ts-ignore
      landingPageProjectsData={projects != undefined ? projects : []}
    />
  );
}
