<template>
	<div class="bh-table w-full">
		<div v-if="inlineSearch" class="mt-4">
			<BhForm class="grid grid-cols-4 gap-x-4" v-bind="search"></BhForm>
		</div>
		<Divider class="mt-0" />
		<div v-if="inlineSearch" :class="`mb-4 flex justify-between ${inlineSearch && 'mt-4'}`">
			<div class="flex-1">
				<BhFormModal v-if="create" ref="createRef" @ok="onCreateOk" v-bind="create"></BhFormModal>
				<BhFormModal v-if="modify" ref="modifyRef" @ok="onModifyOk" v-bind="modify"></BhFormModal>
				{{ $slots.action?.() }}
			</div>
			<div v-if="inlineSearch">
				<BhForm layout="inline" v-bind="search"></BhForm>
			</div>
		</div>
		<div>
			<Table row-key="id" :loading="loading" :pagination="pagination" :data="innerData" :bordered="false"
				:columns="columns" onPageChange={this.onPageChange}></Table>
		</div>
	</div>
</template>

<script lang="ts">
import { Pagination } from '@/types/global';
import { Divider, Table, TableData } from '@arco-design/web-vue';
import { defineComponent, PropType, reactive, ref, computed, watch } from 'vue';
import { BhDetailProps } from '../../detail';
import { BhForm, BhFormProps, BhFormModal, BhFormModalProps, BhFormModalInstance } from '../../form';
import { BhTableApi, BhTableColumn, colFilter } from './type';

export default defineComponent({
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
		const innerData = ref<TableData[]>([]);
		const inlineSearch = computed(() => (props.search?.items?.length || 0) < 4);

		const getPaging = (pagination: Partial<Pagination>) => {
			const { current: pageNum = 1, pageSize = 10 } = { ...props.pagination, ...pagination };
			return { pageNum, pageSize };
		};

		const loadData = async (pagination: Partial<Pagination> = {}) => {
			if (!props.api) return;

			const query = props.search?.model || {};
			const paging = getPaging(pagination);

			loading.value = true;
			props
				.api(query, paging)
				.then((resData: any) => {
					const { pageNum = 1, total = 1, list = [] } = resData.data || {};
					innerData.value = list;
					Object.assign(props.pagination, { current: pageNum, total });
				})
				.finally(() => {
					loading.value = false;
				});
		};

		watch(
			() => props.data,
			(data) => Array.isArray(data) && (innerData.value = data),
		);

		loadData();

		return {
			loading,
			createRef,
			modifyRef,
			innerData,
			inlineSearch,
			loadData,
		};
	},
	methods: {
		loadData() {

		},
		reloadData() {
			this.loadData({ current: 1, pageSize: 10 });
		},
		openModifyModal(data: any) {
			this.modifyRef.value?.open(data.record)
		},
		onPageChange(current: number) {
			this.loadData({ current })
		},
		onCreateOk() {
			this.reloadData();
			this.$emit('createOk');
		},
		onModifyOk() {
			this.reloadData();
			this.$emit('modifyOk');
		},
	}
});

</script>

<style scoped></style>