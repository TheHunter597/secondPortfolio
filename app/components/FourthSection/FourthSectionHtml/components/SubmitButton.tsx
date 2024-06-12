import { useFormStatus } from "react-dom";
import { ColorRing } from "react-loader-spinner";

// export default function SubmitButton() {
//   const { pending } = useFormStatus();

//   return (
//     <>
//       {pending ? (
//         <ColorRing height={60} width={60} wrapperClass=" self-center" />
//       ) : (
//         <button type="submit">Send</button>
//       )}
//     </>
//   );
// }

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
export default function SubmitButton() {
  const { pending } = useFormStatus();
  const uploadAnimations = useAnimation();
  const uploadingAnimations = useAnimation();
  const completeAnimations = useAnimation();
  const loadingAnimation = useAnimation();
  async function animate() {
    uploadAnimations.start({
      zIndex: 1,
    });
    uploadAnimations.start({
      top: "100%",
    });
    await uploadingAnimations.start({
      top: 0,
    });
    await loadingAnimation.start({
      width: "100%",
      transition: {
        duration: 2.5,
      },
    });
  }
  useEffect(() => {
    async function animateComplete() {
      uploadingAnimations.start({
        zIndex: 0,
      });
      loadingAnimation.start({
        width: 0,
      });
      await completeAnimations.start({
        top: 0,
      });
      await uploadAnimations.start({
        top: 0,
        zIndex: 30,
        transition: {
          delay: 2,
        },
      });

      uploadingAnimations.set({
        top: "-100%",
        zIndex: 20,
      });
      completeAnimations.set({
        top: "100%",
        zIndex: 10,
      });
    }
    if (!pending) {
      animateComplete();
    }
    loadingAnimation.start({
      width: 0,
    });
  }, [pending]);
  return (
    <button
      className="rounded-md text-center w-full h-12 bg-red-400 hover:bg-red-500
       flex flex-col items-center justify-center relative overflow-hidden duration-300 hover:-translate-y-1"
      onClick={animate}
    >
      <motion.div
        className=" w-full h-full text-center font-bold text-lg text-white cursor-pointer
             transition duration-300 bg-red-400 ease-in-out absolute whitespace-nowrap z-30 top-0
            flex items-center justify-center"
        animate={uploadAnimations}
      >
        Submit Message
      </motion.div>
      <motion.div
        className="w-full h-full text-center font-bold text-lg text-white cursor-pointer
             transition duration-300 bg-red-400 ease-in-out z-20 absolute bottom-full flex items-center justify-center"
        animate={uploadingAnimations}
      >
        Sending...
        <motion.div
          className="h-2 w-0 bg-green-300 bottom-0 absolute rounded-b-md"
          animate={loadingAnimation}
        ></motion.div>
      </motion.div>
      <motion.div
        className="w-full h-full  text-center font-bold text-lg text-white cursor-pointer
             transition duration-300 bg-red-400 ease-in-out z-10 absolute bottom-full  flex items-center justify-center"
        animate={completeAnimations}
      >
        Complete
      </motion.div>
    </button>
  );
}
