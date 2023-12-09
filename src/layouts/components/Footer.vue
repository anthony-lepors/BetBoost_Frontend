<template>
  <div class="h-100 d-flex align-center justify-space-between">
    <!-- 👉 Footer: left content -->
    <span class="d-flex align-center">
      &copy;
      {{ new Date().getFullYear() }}
      Développé 
      Par <a
        href="https://www.alpacs.fr"
        target="_blank"
        rel="noopener noreferrer"
        class="text-alpacs ms-1"
      >ALPacs</a>
    </span>
    <!-- 👉 Footer: right content -->
    <span class="d-md-flex gap-x-4 text-primary d-none">
      <a
        href="https://mybetboost.com"
        target="noopener noreferrer"
      >Site web</a>
      <a
        href="https://mybetboost.com/mentions-legales/"
        target="noopener noreferrer"
      >Mentions légales</a>
      <a
        href="https://mybetboost.com/politique-confidentialite/"
        target="noopener noreferrer"
      >Politique de Confidentialité</a>
    </span>
  </div>
</template>
