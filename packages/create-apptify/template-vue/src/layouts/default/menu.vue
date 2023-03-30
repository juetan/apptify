<script lang="tsx">
import { menuItems, MenuItem } from '../../router/index';

export default defineComponent({
  name: 'LayoutMenu',
  methods: {
    goto(path: string) {
      this.$router.push(path);
    },

    renderItem(routes: MenuItem[]) {
      return routes.map((route) => {
        const icon = route.icon ? () => <i class={route.icon} /> : null;
        const node = route.children?.length ? (
          <a-sub-menu key={route.title} v-slots={{ icon, title: () => route.title }}>
            {this.renderItem(route?.children)}
          </a-sub-menu>
        ) : (
          <a-menu-item key={route.title} v-slots={{ icon }} onClick={() => this.goto(route.path)}>
            {route.title}
          </a-menu-item>
        );

        return node;
      });
    },
  },

  render() {
    return (
      <a-menu
        style={{ width: '200px', height: '100%' }}
        default-open-keys={['0']}
        default-selected-keys={['0_2']}
        show-collapse-button
        breakpoint="xl"
      >
        {this.renderItem(menuItems)}
      </a-menu>
    );
  },
});
</script>
