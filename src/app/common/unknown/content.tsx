import Hero from "./(components)/hero";
import FormRoleChoice from "./(components)/form-role-choice";

export default function PageContent() {
  return (
    <>
      <div className="w-full flex flex-col items-center gap-12">
        <Hero />
        <FormRoleChoice />
      </div>
    </>
  );
}
