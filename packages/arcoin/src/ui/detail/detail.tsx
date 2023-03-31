import { Descriptions, Modal, ModalConfig } from '@arco-design/web-vue';
import { DescriptionsInstance } from '@arco-design/web-vue/es/descriptions';
import { isFunction } from 'lodash';
import { createVNode, nextTick, render } from 'vue';

const fields = [
  { label: '故障日期', field: 'faultDate' },
  { label: '项目', field: 'projectName' },
  { label: '责任划分', field: 'responsibility' },
  { label: '公司内部责任', field: 'ownResponsibility' },
  { label: '供应商责任', field: 'supplierName' },
  { label: '处理单位', field: 'processingCompany' },
  { label: '列车号', field: 'trainCodes' },
  { label: '车厢号', field: 'carriageNums' },
  { label: '故障系统', field: 'faultSystemName' },
  { label: '故障设备名称', field: 'faultDeviceName' },
  { label: '处理情况', field: 'dealStatus' },
  { label: '紧急程度', field: 'urgency' },
  { label: '公里数', field: 'kilometers' },
  { label: '关闭情况', field: 'closedStatus' },
  { label: '故障处理人数', field: 'personNum' },
  { label: '故障处理耗时', field: 'processingDuration' },
  { label: '信息反馈编号', field: 'informationFeedbackNum' },
  { label: '更换配件(旧)', field: 'faultMaterialSerialNum' },
  { label: '更换配件(新)', field: 'newMaterialSerialNum' },
  { label: '更换依据', field: 'replaceDescription' },
  { label: '备注', field: 'remark' },
  { label: '故障描述', field: 'faultDescription' },
];

interface Prop {
  visible: boolean;
  data: Record<string, any>;
  schema?: any[];
}

export const DetailModal = (props: Prop, { emit }: any) => {
  let data = fields.map(({ label, field }) => ({ label, value: props.data[field] || '无' }));

  if (props.schema) {
    data = props.schema.map((item) => {
      if (isFunction(item.value)) {
        return {
          label: item.label,
          value: item.value(props.data),
          span: item.span,
        };
      }
      return {
        label: item.label,
        value: props.data[item.value] || '-',
        span: item.span,
      };
    });
  }

  return (
    <Modal
      visible={true}
      title={`故障详情`}
      titleAlign="start"
      width="1080px"
      footer={false}
      maskClosable={false}
      onCancel={() => emit('cancel')}
    >
      <Descriptions data={data} layout="inline-vertical" tableLayout="fixed" size="large"></Descriptions>
    </Modal>
  );
};
DetailModal.emits = ['cancel'];

export const DEFAULT_PROPS: InstanceType<typeof Modal>['$props'] = {
  title: '详情',
  titleAlign: 'start',
  width: '480px',
  footer: false,
  maskClosable: false,
};

export type DetailModalProps = { modalProps: ModalConfig } & DescriptionsInstance['$props'];

export const openDetailModal = (data: Record<string, any>, schema?: any[]) => {
  let container: Element | undefined;

  const onCancel = async () => {
    await nextTick();
    if (container) {
      render(null, container);
      document.body.removeChild(container);
    }
  };

  const openModal = () => {
    container = document.createElement('div');
    const vm = createVNode(DetailModal, {
      data,
      schema,
      onCancel,
    });
    render(vm, container);
    document.body.appendChild(container);
  };

  openModal();
};

export type BhDetailProps = InstanceType<typeof Descriptions>;
