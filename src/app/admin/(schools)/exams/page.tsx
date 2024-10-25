import { MotionPageTransitionFromBottom } from "@/components/motion/motion-page";
import PageContent from "./content";

export default function Page() {
  return (
    <MotionPageTransitionFromBottom>
      <PageContent />
    </MotionPageTransitionFromBottom>
  );
}
