<template>
  <div>
    <uix-page-title title="{{name}}"></uix-page-title>
    <div class="wrapper pt-0">
      <div class="panel">
        <div class="panel-body">
          <uix-form size="small" label-position="top">
            <uix-row :gutter="20">
              <uix-col :sm="6">
                <uix-form-item label="input">
                  <uix-input
                    class="w-full"
                    size="small"
                    v-model="searchParams.aaa"
                  ></uix-input>
                </uix-form-item>
              </uix-col>

              <uix-col :sm="6">
                <uix-form-item label="select">
                  <uix-select
                    class="w-full"
                    filterable
                    multiple
                    placeholder="全部"
                    v-model="searchParams.select"
                    size="small"
                  >
                    <uix-option
                      v-for="item in selectList"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                    ></uix-option>
                  </uix-select>
                </uix-form-item>
              </uix-col>
              <uix-col :sm="12">
                <uix-form-item label="datepicker">
                  <uix-date-picker
                    class="w-full"
                    v-model="searchParams.date"
                    size="small"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></uix-date-picker>
                </uix-form-item>
              </uix-col>
            </uix-row>
            <uix-row :gutter="20"> </uix-row>
            <uix-row>
              <uix-col :md="24" class="align-right">
                <uix-button size="small" type="primary" @click="search()">
                  查询
                </uix-button>
                <uix-button size="small" @click="reset()">重置</uix-button>
              </uix-col>
            </uix-row>
          </uix-form>
        </div>
      </div>
      <div class="panel">
        <div class="panel-heading">
          <uix-button size="small" type="primary">
            操作按钮
          </uix-button>
        </div>
        <div class="panel-body clearfix">
          <uix-table
            v-loading="loading"
            :data="tableData"
            stripe
            style="width: 100%;min-height:300px;"
          >
            <uix-table-column label="aaa" prop="aa" min-width="120">
            </uix-table-column>
            <uix-table-column
              prop="bbb"
              label="金额"
              min-width="130"
              align="right"
            >
            </uix-table-column>
            <uix-table-column fixed="right" min-width="80" label="操作">
              <template slot-scope="{ row }">
                <uix-button size="mini">
                  查看
                </uix-button>
              </template>
            </uix-table-column>
          </uix-table>

          <uix-pagination
            v-if="page.pageNo"
            background
            class="pull-right mt-md"
            layout="total, prev, pager, next, jumper"
            :current-page.sync="page.pageNo"
            @current-change="getTableData"
            :page-size="page.pageSize"
            :total="page.totalCount"
          ></uix-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { format } from 'date-fns';
import { remote } from '@/utils/ipc';
import services from '../services';
import { Page, SearchParam } from '../types';

@Component
export default class {{name}} extends Vue {
  loading: boolean = false;
  cacheParams: any = null;
  searchParams: SearchParam = this.getInitParams();

  tableData: Array<any> = [];
  list: Array<any> = [];

  page: Page = {
    pageSize: 20,
    totalCount: 0,
    totalPageCount: 0,
    pageNo: 1
  };

  private mounted(): void {
    this.getTableData();
  }

  getInitParams() {
    return {
      aa: ''
    };
  }

  getList(): void {
    services.getList().then(({ data: { data, code } }: any) => {
      if (code === 200) {
        this.list = data;
      }
    });
  }

  toDetail(aa: string): void {
    window.parent.open(
      `${window.parent.location.origin}/app/wrappageManage/wrappageBillDetail?lala=${aa}`
    );
    remote.$state.go('app.ll.ll', { aa });
  }

  getParams(): any {
    const { pageNo, pageSize } = this.page;
    const [startDate, endDate] = this.searchParams.data || [];
    let params = {
      aa: this.searchParams.aa,
      startDate: startDate ? format(startDate, 'YYYY-MM-DD') : '',
      endDate: endDate ? format(endDate, 'YYYY-MM-DD') : '',
      pageNo,
      pageSize
    };
    return params;
  }
  // 搜索
  search(): void {
    this.page.pageNo = 1;
    this.page.totalCount = 0;
    this.getTableData();
  }

  async getTableData() {
    this.loading = true;
    this.tableData = [];
    try {
      const res = await services.getTableData(this.getParams());
      this.tableData = res.data.pageContent;
      this.page.totalCount = res.page.totalCount;
      this.loading = false;
    } catch (err) {
      this.loading = false;
    }
  }
  // 重置
  reset(): void {
    this.searchParams = this.getInitParams();
  }
}
</script>

<style lang="scss"></style>
