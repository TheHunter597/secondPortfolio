import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `ProjectData`.
 */
export type ProjectDataProps = SliceComponentProps<Content.ProjectDataSlice>;

/**
 * Component for "ProjectData" Slices.
 */
const ProjectData = ({ slice }: ProjectDataProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for project_data (variation: {slice.variation})
      Slices
    </section>
  );
};

export default ProjectData;
