<script setup lang="ts">
import { useTimeAgo } from '@vueuse/core'
import LinkMenu from 'components/molecules/menus/link-menu.vue'
import type { PropType } from 'vue'

// emits
defineEmits(['delete-link', 'edit-link', 'qr-code', 'copy-link'])

// props
const props = defineProps({
  alias: {
    type: [String, null] as PropType<string | null>,
    required: true,
  },
  target: {
    type: String,
    default: () => '',
    required: false,
  },
  shortUrl: {
    type: String,
    default: () => '',
    required: false,
  },
  description: {
    type: [String, null] as PropType<string | null>,
    default: () => '',
    required: false,
  },
  visitCount: {
    type: Number,
    default: () => 0,
    required: false,
  },
  createdAt: {
    type: String,
    default: () => null,
    required: false,
  },
  updatedAt: {
    type: String,
    default: () => null,
    required: false,
  },
})
</script>

<template>
  <div
    class="flex w-full flex-col items-center gap-y-4 rounded-md border bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900 md:px-6 md:py-5 lg:flex-row"
  >
    <div
      class="flex w-full flex-row items-center justify-between lg:flex-col lg:items-start lg:space-y-1"
    >
      <p class="text-xs uppercase tracking-wider text-gray-300">Short Link</p>

      <NuxtLink
        target="_blank"
        :to="props.shortUrl"
        class="flex items-center text-sm text-gray-500"
      >
        <span v-slice="30" :title="props.shortUrl" class="truncate hover:underline">
          {{ props.shortUrl }}
        </span>
      </NuxtLink>
    </div>

    <div
      class="flex w-full flex-row items-center justify-between lg:flex-col lg:items-start lg:space-y-1"
    >
      <p class="text-xs uppercase tracking-wider text-gray-300">Target</p>
      <NuxtLink
        v-slice="30"
        target="_blank"
        :to="props.target"
        class="truncate text-sm text-gray-500 hover:underline"
      >
        {{ props.target }}
      </NuxtLink>
    </div>

    <div
      class="flex w-full flex-row items-center justify-between lg:flex-col lg:items-start lg:space-y-1"
    >
      <p class="text-xs uppercase tracking-wider text-gray-300">Views</p>

      <p class="truncate text-sm text-gray-500">
        <span class="text-sm dark:text-gray-200">{{ props.visitCount }}</span>
        {{ props.visitCount > 1 ? 'views' : 'view' }}
      </p>
    </div>

    <div
      class="flex w-full flex-row items-center justify-between lg:flex-col lg:items-start lg:space-y-1"
    >
      <p class="text-xs uppercase tracking-wider text-gray-300">Added</p>

      <p class="text-sm text-gray-500" :title="props.createdAt">
        {{ useTimeAgo(props.createdAt).value }}
      </p>
    </div>

    <div class="flex w-full flex-row items-center justify-between space-x-4 lg:w-fit">
      <nuxt-link
        :to="`/dashboard/${props.alias}`"
        title="Link Statistics"
        class="cursor-pointer rounded p-1 hover:bg-red-300 hover:bg-opacity-20"
      >
        <icon name="ph:chart-line-up" class="text-red-500" size="26" />
      </nuxt-link>
      <div
        title="Copy Link"
        class="cursor-pointer rounded p-1 hover:bg-red-300 hover:bg-opacity-20"
      >
        <icon name="ph:copy" class="text-red-500" size="26" @click="$emit('copy-link')" />
      </div>

      <div title="QR Code" class="cursor-pointer rounded p-1 hover:bg-red-300 hover:bg-opacity-20">
        <icon
          name="ph:qr-code"
          class="text-red-500"
          size="26"
          @click="$emit('qr-code', props.shortUrl)"
        />
      </div>

      <div
        title="Edit Link"
        class="cursor-pointer rounded p-1 hover:bg-red-300 hover:bg-opacity-20"
      >
        <link-menu @edit-link="$emit('edit-link')" @delete-link="$emit('delete-link')" />
      </div>
    </div>
  </div>
</template>
