import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `MainContent`.
 */
export type MainContentProps = SliceComponentProps<Content.MainContentSlice>;

/**
 * Component for "MainContent" Slices.
 */
const MainContent = ({ slice }: MainContentProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for main_content (variation: {slice.variation})
      Slices
    </section>
  );
};

export default MainContent;
