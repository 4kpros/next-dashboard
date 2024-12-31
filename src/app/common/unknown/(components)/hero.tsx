export default function Hero() {
  return (
    <section className="w-full mt-6">
      <div className="w-full flex flex-col items-center justify-center gap-12">
        <div className="w-full max-w-[600px] flex flex-col items-center justify-center text-center gap-6">
          <h1 className="w-full text-4xl font-semibold">
            Role Pending Activation
          </h1>
          <p className="w-auto leading-relaxed text-base">
            Your account is registered but currently set to anonymous. Complete
            the required steps to activate your role and access personalized
            features.
          </p>
        </div>
      </div>
    </section>
  );
}
