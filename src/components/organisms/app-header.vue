<script lang="ts" setup>
import Logo from 'components/atoms/logo.vue'
import PrimaryButton from 'components/atoms/button/primary-button.vue'
import SecondaryButton from 'components/atoms/button/secondary-button.vue'
import ThemeSwitch from 'components/molecules/switch/theme-switch.vue'
import DrawerSwitch from 'components/molecules/switch/drawer-switch.vue'

const route = useRoute()

const { y } = useWindowScroll()
</script>

<template>
  <header
    :class="[
      y >= 10
        ? 'border-b bg-opacity-50 backdrop-blur transition-all duration-200 dark:bg-opacity-50'
        : '',
    ]"
    class="fixed z-50 w-full bg-gray-50 px-6 dark:border-gray-700 dark:bg-gray-900"
  >
    <div class="mx-auto flex h-16 max-w-screen-xl flex-row items-center justify-between">
      <nuxt-link class="flex items-center space-x-3" to="/">
        <logo />
      </nuxt-link>

      <div class="flex items-center space-x-8">
        <div class="flex space-x-6">
          <theme-switch />
          <drawer-switch />
        </div>

        <div class="hidden md:flex">
          <div class="flex w-auto flex-row space-x-4">
            <nuxt-link
              v-if="route.path.includes('/auth/register') || route.path === '/'"
              to="/auth/login"
            >
              <secondary-button class="w-auto">Login</secondary-button>
            </nuxt-link>
            <nuxt-link
              v-if="route.path.includes('/auth/login') || route.path === '/'"
              to="/auth/register"
            >
              <primary-button class="w-auto">Sign up</primary-button>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
