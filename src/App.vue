<template>
  <div id="app">
    <LateralBar @submit-description="handleSubmitDescription" :emitter="emitter"/>
    <ContentSection :emitter="emitter" />
  </div>
</template>

<script>
import { callChatGPT } from "@/utils/api";
import LateralBar from "@/components/LateralBar.vue";
import ContentSection from "@/components/ContentSection.vue";
import mitt from "mitt";

export default {
  components: {
    LateralBar,
    ContentSection,
  },
  data() {
    return {
      emitter: mitt(),
    };
  },
  methods: {
    async handleSubmitDescription(description) {
      this.emitter.emit("submission-start");
      const prompt = `${description}`;
      try {
        const code = await callChatGPT(prompt);
        this.emitter.emit("submission-complete", code);
      } catch (error) {
        console.error("Error calling ChatGPT:", error);
        this.emitter.emit("submission-complete", "<p>Error generating website. Please try again later.</p>");
      }
    },
  },
};
</script>