import { Pagination } from '@/types/global';
import { Divider, Table, TableData } from '@arco-design/web-vue';
import { defineComponent, PropType, reactive, ref, computed, watch } from 'vue';
import { BhDetailProps } from '../../detail';
import { BhForm, BhFormProps, BhFormModal, BhFormModalProps, BhFormModalInstance } from '../../form';
import { BhTableApi, BhTableColumn, colFilter } from './type';

export const BhTable = defineComponent({
  name: 'Table',
  props: {
    /**
     * 表格数据
     */
    data: {
      type: Array as PropType<TableData[]>,
    },

    /**
     * 获取数据的函数
     */
    api: {
      type: Function as PropType<BhTableApi>,
    },

    /**
     * 表格列设置
     * @description 详见 https://arco.design/vue/components/table-cn#columns
     */
    columns: {
      type: Array as PropType<BhTableColumn[]>,
      required: true,
    },

    /**
     * 分页参数配置
     */
    pagination: {
      type: Object as PropType<Pagination>,
      default: () => reactive({ current: 1, pageSize: 10, total: 300 }),
    },

    /**
     * 搜索表单配置
     * @description 详见Form组件的props
     */
    search: {
      type: Object as PropType<BhFormProps>,
    },

    /**
     * 新建弹窗配置
     * @description 详见FormModal组件的props
     */
    create: {
      type: Object as PropType<BhFormModalProps>,
    },

    /**
     * 修改弹窗配置
     * @description 详见FormModal组件的props
     */
    modify: {
      type: Object as PropType<BhFormModalProps>,
    },

    /**
     * 详情弹窗配置
     * @description 详见Detail组件的props
     */
    detail: {
      type: Object as PropType<BhDetailProps>,
    },
  },
  setup(props) {
    const loading = ref(false);
    const createRef = ref<BhFormModalInstance>();
    const modifyRef = ref<BhFormModalInstance>();
    const renderData = ref<TableData[]>([]);
    const inlineSearch = computed(() => (props.search?.items?.length || 0) < 4);

    const getPaging = (pagination: Partial<Pagination>) => {
      const { current: pageNum, pageSize } = { ...props.pagination, ...pagination };
      return { pageNum, pageSize };
    };

    const loadData = async (pagination: Partial<Pagination> = {}) => {
      if (!props.api) return;

      const query = props.search?.model || {};
      const paging = getPaging(pagination);

      loading.value = true;
      props
        .api(query, paging)
        .then((resData) => {
          const { pageNum = 1, total = 1, list = [] } = resData.data || {};
          renderData.value = list;
          Object.assign(props.pagination, { current: pageNum, total });
        })
        .finally(() => {
          loading.value = false;
        });
    };

    const reloadData = () => loadData({ current: 1, pageSize: 10 });

    const openModifyModal = (data: any) => modifyRef.value?.open(data.record);

    const onPageChange = (current: number) => loadData({ current });

    const onCreateOk = () => {
      reloadData();
      props.create?.onOk?.();
    };

    const onModifyOk = () => {
      reloadData();
      props.modify?.onOk?.();
    };

    watch(
      () => props.data,
      (data) => Array.isArray(data) && (renderData.value = data),
    );

    loadData();

    return {
      loading,
      createRef,
      modifyRef,
      renderData,
      inlineSearch,
      loadData,
      reloadData,
      openModifyModal,
      onPageChange,
      onCreateOk,
      onModifyOk,
    };
  },
  render() {
    Object.assign(this.columns, { instance: this });
    console.log(this);

    return (
      <div class="bh-table w-full">
        {!this.inlineSearch && (
          <div class="mt-4">
            <BhForm class="grid grid-cols-4 gap-x-4" {...this.search}></BhForm>
          </div>
        )}
        {!this.inlineSearch && <Divider class="mt-0" />}
        <div class={`mb-4 flex justify-between ${this.inlineSearch && 'mt-4'}`}>
          <div class="flex-1">
            {this.create && (
              <BhFormModal
                ref={(el: any) => (this.createRef = el)}
                onOk={this.onCreateOk}
                {...(this.create as any)}
              ></BhFormModal>
            )}
            {this.modify && (
              <BhFormModal
                ref={(el: any) => (this.modifyRef = el)}
                onOk={this.onModifyOk}
                {...(this.modify as any)}
              ></BhFormModal>
            )}
            {this.$slots.action?.()}
          </div>
          <div>{this.inlineSearch && <BhForm layout="inline" {...this.search}></BhForm>}</div>
        </div>
        <div>
          <Table
            row-key="id"
            loading={this.loading}
            pagination={this.pagination}
            data={this.renderData}
            bordered={false}
            columns={this.columns.filter((i) => colFilter(i))}
            onPageChange={this.onPageChange}
          ></Table>
        </div>
      </div>
    );
  },
});

export type BhTableInstance = InstanceType<typeof BhTable>;

export type BhTableProps = BhTableInstance['$props'] & InstanceType<typeof Table>['$props'];

export * from './type';
