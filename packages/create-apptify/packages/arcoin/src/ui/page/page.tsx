import { Breadcrumb } from '@arco-design/web-vue';
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

export const BhPage = defineComponent({
  name: 'BhPage',
  setup() {
    const route = useRoute();
    const breadcurmbs = route.matched.map((i) => i.meta.locale);
    return { breadcurmbs };
  },
  render() {
    return (
      <div class="p-5">
        {/* <Breadcrumb items={this.breadcurmbs} /> */}
        <div class="bg-white p-5 pt-2">{this.$slots?.default?.()}</div>
      </div>
    );
  },
});
