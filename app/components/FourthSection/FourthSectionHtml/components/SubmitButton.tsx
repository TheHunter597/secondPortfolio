import { useFormStatus } from "react-dom";
import { ColorRing } from "react-loader-spinner";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <ColorRing height={60} width={60} wrapperClass=" self-center" />
      ) : (
        <button type="submit">Send</button>
      )}
    </>
  );
}
