import { MotionPageTransitionFromBottom } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Suspense } from "react";

export default function Page() {
  return (
    <MotionPageTransitionFromBottom>
      <Suspense>
        <PageContent />
      </Suspense>
    </MotionPageTransitionFromBottom>
  );
}
