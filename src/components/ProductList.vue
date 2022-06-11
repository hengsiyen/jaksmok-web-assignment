<template>
  <div>
    <div class="list-group list-group-flush border-bottom product-list">
      <template v-if="productList.content.length > 0">
        <button v-for="(item_content, key) in productList.content"
          class="list-group-item list-group-item-action view-detail"
          :class="{ 'active': seleted_id && seleted_id === item_content.id }" :key="key"
          :title="item_content.title + ' by ' + item_content.author + ' in ' + item_content.year"
          @click="callViewDetail(item_content.id)">
          <blockquote class="blockquote mb-0">
            <p class="mb-0">{{ item_content.title }}</p>
            <small class="">
              by {{ item_content.author }} in
              <cite :title="item_content.title">{{ item_content.year }}</cite>
            </small>
          </blockquote>
        </button>
      </template>
      <template v-else>
        <div class="list-group-item text-center">
          No result found.
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: "ProductList",
  props: {
    productList: {
      type: Object,
      default: () => {
        return {
          content: [],
          page: 1,
          size: 20,
          totalElements: 0,
          totalPages: 0
        }
      }
    }
  },
  data() {
    return {
      seleted_id: null
    }
  },
  mounted() {
    /**
    * The function Jquery for open drawer for mobile layout 
    */
    $(".view-detail").click(function () {
      $('.product-list').addClass('d-none d-md-block')
      $('.btn-back').addClass('d-block')
      $('.btn-back').removeClass('d-none')
      $('.drawer').addClass('drawer-active')
    });
  },
  methods: {
    callViewDetail(id) {
      this.seleted_id = id
      this.$emit('callback-view-detail', id)
    }
  }

};
</script>
