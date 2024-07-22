import { useState } from "react";
import { motion } from "framer-motion";

export const Hero = () => {
  const CMD = "ept mirror add https://registry.edgeless.top";

  const [showTip, setShowTip] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(CMD).then(() => {
      setShowTip(true);
      setTimeout(() => {
        setShowTip(false);
      }, 2000);
    });
  };

  return (
    <section
      className="w-screen  flex justify-center items-center bg-bgDark1 mb-0 hero-bg-gradient pb-24 sm:pb-32 md:pb-44 lg:pb-0"
      style={{ height: "100vh" }}
      id="home"
    >
      <div className="w-full md:w-[800px] xl:w-[900px] flex flex-col justify-center items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-secondaryColor text-sm sm:text-base font-bold">
            Official Nep Mirror
          </h3>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          <h1 className="mt-2 sm:mt-2 text-4xl sm:text-6xl lg:text-7xl xl:text-7xl font-bold tracking-wide  text-primaryText  px-8 sm:px-20 md:px-24 lg:px-24">
            Nep 官方镜像源
          </h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div
            className="mt-10 px-4 py-2 backdrop-blur-lg rounded-xl"
            style={{
              background: "rgb(40,44,52)",
              color: "rgb(191 193 201 / 1)",
            }}
          >
            <div className="group h-full flex items-center">
              <svg
                width="22"
                height="13"
                viewBox="0 0 22 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 relative block w-3 -rotate-90"
                aria-hidden="true"
              >
                <path
                  d="M1 1L11 11L21 1"
                  stroke="currentColor"
                  strokeWidth="2"
                ></path>
              </svg>
              <code className="flex-1 font-mono font-light text-sm mr-2">
                {CMD}
              </code>
              <div className="relative">
                <button
                  className="block mr-1 transition hover:scale-110 active:scale-100 active:transition-colors"
                  title="Copy to clipboard"
                  onClick={onCopy}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M7 6V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3v3c0 .552-.45 1-1.007 1H4.007A1.001 1.001 0 0 1 3 21l.003-14c0-.552.45-1 1.006-1zM5.002 8L5 20h10V8zM9 6h8v10h2V4H9z"
                    ></path>
                  </svg>
                </button>
                <p
                  className="absolute left-1/2 top-[calc(100%+8px)] -translate-x-1/2 whitespace-nowrap rounded bg-black/50 p-2 text-sm leading-none opacity-0 transition data-[visible=true]:opacity-100"
                  data-visible={showTip}
                  aria-hidden="true"
                >
                  已复制！
                </p>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="flex flex-col gap-2 sm:flex-row mt-14 mb-14 sm:mb-14 justify-center">
            <a
              href="https://ept.edgeless.top/"
              target="_blank"
              className="contained-button w-64 sm:w-52 h-12 mr-0 sm:mr-4 lg:mr-6 mb-2 sm:mb-0"
              aria-label="Download ept"
            >
              获取 ept
            </a>
            <a
              href="https://ept.edgeless.top/nep/introduction/1-whats.html"
              target="_blank"
              className="w-64 sm:w-52 h-12 rounded-xl font-bold text-primaryText border border-solid  flex justify-center items-center cursor-pointer bg-bgDark2 hover:bg-bgDark3 border-primaryColor transition"
              aria-label="Learn more"
            >
              了解更多
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
