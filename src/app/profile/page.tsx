import { MotionPageTransitionFromTop } from "@/components/motion/motion-page";
import PageContent from "./content";

export default function Page() {
  return (
    <MotionPageTransitionFromTop>
      <PageContent />
    </MotionPageTransitionFromTop>
  );
}
