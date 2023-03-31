<script lang="tsx">
import { RouteRecordRaw } from 'vue-router';
import { menuItems, MenuItem } from '../../../router/index';

export default defineComponent({
  name: 'LayoutMenu',
  methods: {
    goto(route: MenuItem) {
      if (route.external) {
        location.href = route.path;
        return;
      }

      this.$router.push(route);
    },

    renderItem(routes: MenuItem[], isTop = false) {
      return routes.map((route) => {
        const icon = route.icon ? () => <i class={route.icon} /> : null;
        const node = route.children?.length ? (
          <a-menu-item-group key={route.id} v-slots={{ icon, title: () => route.title }}>
            {this.renderItem(route?.children)}
          </a-menu-item-group>
        ) : (
          <a-menu-item key={route.id} v-slots={{ icon }} onClick={() => this.goto(route)}>
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
        style={{ width: '100%', height: '100%' }}
        default-open-keys={['0']}
        default-selected-keys={['0_2']}
        // show-collapse-button
        breakpoint="xl"
        levelIndent={0}
      >
        {this.renderItem(menuItems, true)}
      </a-menu>
    );
  },
});
</script>
