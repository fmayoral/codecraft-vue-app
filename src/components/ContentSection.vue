<template>
    <div class="content-section">
        <div class="overlay" :class="{ active: isLoading }">
            <img v-if="isLoading" src="@/assets/spinner.gif" alt="Loading..." class="spinner" :class="{ active: isLoading }" />
        </div>
        <iframe ref="contentIframe" class="content-iframe" frameborder="0"></iframe>
    </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
    name: "ContentSection",
    props: {
        emitter: {
          type: Object,
          required: true
        }
    },
    setup(props) {
        const contentIframe = ref(null);
        const isLoading = ref(false);

        onMounted(() => {
          props.emitter.on("submission-start", () => {
            isLoading.value = true;
          });

          props.emitter.on("submission-complete", (newContent) => {
            isLoading.value = false;
            contentIframe.value.contentWindow.document.open();
            contentIframe.value.contentWindow.document.write(newContent);
            contentIframe.value.contentWindow.document.close();
          });
        });

        return { isLoading, contentIframe };
    },
};
</script>

<style scoped> .content-section {
     position: relative;
     width: 100%;
     height: 100%;
 }

 .overlay {
     position: absolute;
     top: 0;
     left: 0;
     width: 100%;
     height: 100vh;
     background-color: rgba(0, 0, 0, 1);
     display: flex;
     justify-content: center;
     align-items: center;
     opacity: 0;
     pointer-events: none;
     transition: opacity 0.3s ease;
     z-index: 100;
 }

 .overlay.active {
     opacity: 1;
     pointer-events: auto;
 }

 .spinner {
     width: 400px;
     height: 300px;
     opacity: 0;
     transition: opacity 1s ease;
 }

 .spinner.active {
     opacity: 1;
 }

 @keyframes spin {
     100% {
         transform: rotate(360deg);
     }
 }

 .content-iframe {
     width: 100%;
     height: 100vh;
     position: absolute;
     top: 0;
     left: 0;
     border: none;
 }
</style>