<template>
  <div>
    <uix-page-title
      title="{{name}}"
      :breadcrumb-items="breadcrumbItems"
    ></uix-page-title>
    <div class="wrapper pt-0">
      <uix-card shadow="never">
        <uix-form label-position="right" size="small" label-width="120px">
          <uix-row :gutter="20">
            <uix-col :md="12">
              <uix-form-item label="lalal：">
                <uix-input
                  class="w-full"
                  disabled
                  v-model="detail.aa"
                ></uix-input>
              </uix-form-item>
            </uix-col>
            <uix-col :md="12">
              <uix-form-item label="lalal：">
                <uix-input
                  class="w-full"
                  disabled
                  v-model="detail.ll"
                ></uix-input>
              </uix-form-item>
            </uix-col>
          </uix-row>
        </uix-form>
      </uix-card>
      <uix-card class="mt-md align-center" shadow="never">
        <uix-button size="small" type="primary" style="width:150px">
          lala
        </uix-button>
      </uix-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { remote } from '@/utils/ipc';
import services from '../services';

@Component
export default class extends Vue {
  detail: any = {};
  breadcrumbItems = [
    {
      name: '{{desc}}',
      click: () => {
        remote.$state.go('app.aa');
      }
    },
    { name: '{{desc}}' }
  ];

  private mounted(): void {
    this.getDetail();
  }

  async getDetail() {
    const { aa } = this.$route.query;
    const params = {
      aa
    };

    try {
      const { data, status }: any = await services.getDeatil(params);
      if (status) {
        this.detail = data;
      }
    } catch {}
  }
}
</script>

<style lang="scss"></style>
