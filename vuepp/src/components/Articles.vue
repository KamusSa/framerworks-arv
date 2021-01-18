<template>
  <div id="articleList">
    <article class="article-item" v-for="article in articles" :key="article.id">
      <div class="image-wrap">
        <img
          :src="url + 'get-image/' + article.image"
          :alt="article.title"
          v-if="article.image"
        />
        <img
          src="../assets/images/default.jpeg"
          :alt="article.title"
          v-if="!article.image"
        />
      </div>

      <h2>{{ article.title }}</h2>
      <span class="date">{{ article.date }}</span>
      <a href="#">Leer más</a>

      <div class="clearfix"></div>
    </article>
  </div>
</template>

<script>
export default {
  name: "Articles",
  props: ["articles"],
};
</script>
