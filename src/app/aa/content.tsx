"use client";

import { CustomContainer } from "@/components/container/custom-container";
import FormAddUpdateDirector from "../admin/(schools)/directors/components/form-add-update";

export default function PageContent() {
  return (
    <>
      <CustomContainer>
        <div className="w-full h-full min-h-screen flex items-center justify-center">
          <div className="w-auto min-w-[400px] bg-white rounded-lg drop-shadow-md p-6">
            <FormAddUpdateDirector canSubmit={true}/>
          </div>
        </div>
      </CustomContainer>
    </>
  );
}
