<template>
  <div class="container my-5">
    <div class="btn-back d-none d-md-none text-muted">
      <i class="fa-solid fa-angle-left fa-2x"></i>
    </div>
    <div class="row">
      <div class="col-md-6 col-lg-5 block-list">
        <div class="border-top-0 border-left-0 border-right-0 list-group-item">
          <h4>Product List</h4>
        </div>
        <template v-if="on_loading">
          <Loading />
        </template>
        <template v-else>
          <ProductList :product-list="product_list" @callback-view-detail="getProductDetail" />

          <div class="mt-5 product-list">
            <paginate :page-count="product_list.totalPages" :page-range="3" :margin-pages="2"
              :click-handler="getProductList" :prev-text="`<i class='fa-solid fa-angle-left'></i>`"
              :next-text="`<i class='fa-solid fa-angle-right'></i>`"
              :container-class="'pagination justify-content-center'" :page-class="'page-item'" :prev-class="'page-item'"
              :next-class="'page-item'" :page-link-class="'page-link'" :prev-link-class="'page-link'"
              :next-link-class="'page-link'">
            </paginate>
          </div>
        </template>
      </div>
      <div class="col-md-6 col-lg-6 offset-lg-1 d-md-block drawer">
        <template v-if="on_loading_detail">
          <Loading />
        </template>
        <template v-else>
          <div v-if="product_detail">
            <img :src="product_detail.imageUrl" :alt="product_detail.title" class="rounded mx-auto mt-3 d-block w-75">
            <div class="row mt-5">
              <div class="col-8">
                <a :href="product_detail.wikipediaLink" target="_blank" class="h4 text-dark"
                  :title="product_detail.wikipediaLink">{{ product_detail.title }}</a>
              </div>
              <div class="col-4 text-right">
                <p class="h4" :title="'Year: ' + product_detail.year">
                  {{ product_detail.year }}
                </p>
              </div>
              <div class="col-12">
                <p class="font-weight-bold" :title="product_detail.author">Author: {{ product_detail.author }}</p>
              </div>
              <div class="col-12">
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                  industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                  scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                  into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
                  release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
                  software like Aldus PageMaker including versions of Lorem Ipsum.</p>
              </div>
            </div>
          </div>
          <div v-else>
            <template v-if="error_message">
              <MessageError :error="error_message.error" :message="error_message.message" />
            </template>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ProductList from "@/components/ProductList.vue";
import Loading from "../components/Loading.vue";
import MessageError from '../components/MessageError.vue'
import $ from 'jquery'

export default {
  name: "HomeView",
  metaInfo: {
    title: 'Priduct List',
    titleTemplate: '%s | Home'
  },
  components: {
    ProductList,
    Loading,
    MessageError
  },
  data() {
    return {
      username: "sampleId",
      password: "Secret",
      on_loading: true,
      on_loading_detail: false,
      product_list: {
        content: [],
        page: 1,
        size: 20,
        totalElements: 0,
        totalPages: 0
      },
      product_detail: null,
      error_message: null,
    }
  },
  mounted() {
    this.getProductList(this.product_list.page)

    /**
  * The function Jquery for close drawer for mobile layout
  */
    $('.btn-back').click(function () {
      $('.drawer').removeClass('drawer-active')
      $('.btn-back').addClass('d-none')
      $('.btn-back').removeClass('d-block')
      $('.product-list').removeClass('d-none d-md-block')
    });
  },
  methods: {
    // The function to get product list
    getProductList(page) {
      this.product_list.page = page
      this.$axios
        .get('http://assignment-be.jaksmok.com/api/v1/books', {
          params: {
            page: this.product_list.page,
            size: this.product_list.size
          },
          auth: {
            username: this.username,
            password: this.password
          }
        })
        .then((response) => {
          this.product_list = response.data
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          this.on_loading = false
        })
    },

    // The function to get product detiail by id of the product.
    getProductDetail(id) {
      this.on_loading_detail = true
      this.$axios
        .get('http://assignment-be.jaksmok.com/api/v1/books/' + id, {
          auth: {
            username: this.username,
            password: this.password
          }
        })
        .then((response) => {
          this.product_detail = response.data
        })
        .catch((error) => {
          this.error_message = error.response.data
        })
        .finally(() => {
          this.on_loading_detail = false
        })
    }
  }
};
</script>

<style scoped lang="scss">
.btn-back {
  display: none;
}

@media only screen and (max-width: 768px) {
  .drawer {
    width: 100%;

    position: absolute;
    background: white;
    height: 100%;
    top: 0;
    left: -100%;
    padding-top: 2rem;
    padding-bottom: 4rem;
    z-index: 4;

    &-active {
      left: 0;
    }
  }

  .btn-back {
    cursor: pointer;
    display: block;
    position: absolute;
    top: 1rem;
    left: 1rem;
    z-index: 5;
  }
}
</style>
