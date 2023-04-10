<template>
    <div class="lateral-bar" :class="{ expanded: isExpanded }">
      <div class="arrow-tab" @click="toggleExpanded">
        <i class="arrow" :class="{ 'arrow-left': isExpanded, 'arrow-right': !isExpanded }"></i>
      </div>
      <div class="content" v-show="isExpanded">
        <textarea v-model="description" placeholder="Enter website description here"></textarea>
        <button @click="submit" :disabled="isSubmitting">Submit</button>
      </div>
    </div>
  </template>
  
  <script>
  const preffix = 'I want to create a website, please begin your response with html code directly, as your response will be consumed by a client and used directy to populate a webpage live. This is the website description:\n';
  const suffix = '\nPlease do it in one page, including CSS, and JS. Do not explain or reply with anything else that\'s'
    + 'not part of the HTML document. Using pre-existing styling and JS libraries is preferred to reduce the amount of code.'
    + 'Once all the code generation is done, add a END-OF-WEBSITE after the last website token';
  
  export default {
    props: {
      emitter: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        description: "",
        isSubmitting: false,
        isExpanded: true,
      };
    },
    methods: {
      submit() {
        this.isSubmitting = true;
        this.isExpanded = false;
        this.$emit("submit-description", `${preffix}${this.description}${suffix}`);
      },
      toggleExpanded() {
        this.isExpanded = !this.isExpanded;
      },
    },
    created() {
      this.emitter.on("submission-complete", () => {
        this.isSubmitting = false;
      });
    },
    beforeUnmount() {
      this.emitter.off("submission-complete");
    },
  };
  </script>
  
  <style scoped>
  .lateral-bar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 500px;
    display: flex;
    flex-direction: column;
    background-color: #f8f9fa;
    box-shadow: 3px 0px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    z-index: 100;
  }
  .lateral-bar:not(.expanded) {
    transform: translateX(-500px);
  }
  .arrow-tab {
    position: absolute;
    top: 50%;
    right: -30px;
    width: 30px;
    height: 60px;
    background-color: #f8f9fa;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-shadow: 3px 0px 6px rgba(0, 0, 0, 0.1);
  }
  .arrow {
    width: 0;
    height: 0;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
  }
  .arrow-right {
    border-left: 8px solid #333;
  }
  .arrow-left {
    border-right: 8px solid #333;
  }
  .content {
    padding: 20px;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  textarea {
    flex-grow: 1;
    margin-bottom: 20px;
    resize: none;
    border: 1px solid #ced4da;
    border-radius: 4px;
    padding: 10px;
  }
  button {
    align-self: flex-end;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    padding: 8px 16px;
    font-size: 16px;
  }
  button:disabled {
    background-color: #a3caff;
    cursor: not-allowed;
  }
  </style>
  