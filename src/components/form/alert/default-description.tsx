export default function FormAlertDefaultDescription(props: {
  canSubmitMessage?: string;
}) {
  return (
    <>
      {props.canSubmitMessage && props.canSubmitMessage.length > 0 ? (
        <div className="w-full flex items-center justify-end">
          <p className="w-auto text-end opacity-75">{props.canSubmitMessage}</p>
        </div>
      ) : null}
    </>
  );
}
