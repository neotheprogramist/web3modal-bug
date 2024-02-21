import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { defaultWagmiConfig } from "@web3modal/wagmi";

export default component$(() => {

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    console.log(defaultWagmiConfig);
  });

  return (
    <>
      <h1>Hi 👋</h1>
      <p>
        Can't wait to see what you build with qwik!
        <br />
        Happy coding.
      </p>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
