export interface TabBarItem {
  name: string
  value: number | null
  active: boolean
  title: string
  icon: string
}

const tabBarItems = ref<TabBarItem[]>([
  {
    name: 'home',
    value: null,
    active: true,
    title: 'home',
    icon: 'home'
    ,
  },
  {
    name: 'hi',
    value: null,
    active: false,
    title: 'hi',
    icon: 'app'
    ,
  },
],)

export function useTabBar() {
  const tabBarList = computed(() => tabBarItems.value,)

  const activeTabBar = computed(() => {
    const item = tabBarItems.value.find((item: TabBarItem,) => item.active,)
    return item || tabBarItems.value[0]
  },)

  const getTabBarItemValue = (name: string,) => {
    const item = tabBarItems.value.find((item: TabBarItem,) => item.name === name,)
    return item && item.value ? item.value : null
  }

  const setTabBarItem = (name: string, value: number,) => {
    const tabBarItem = tabBarItems.value.find((item: TabBarItem,) => item.name === name,)
    if (tabBarItem) {
      tabBarItem.value = value
    }
  }

  const setTabBarItemActive = (name: string,) => {
    tabBarItems.value.forEach((item: TabBarItem,) => {
      item.active = item.name === name
    },)
  }

  return {
    tabBarList,
    activeTabBar,
    getTabBarItemValue,
    setTabBarItem,
    setTabBarItemActive,
  }
}
